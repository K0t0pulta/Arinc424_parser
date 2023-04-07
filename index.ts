import * as fs from 'fs';
import CAirport from './classes/CAirport';
import Procedure from './classes/CProcedure';
import CAirway from './classes/CAirway';
import CWaypoint from './classes/CWaypoint';	
import { CNavaid_ndb, CNavaid_vhf } from './classes/CNavaid';
import procedureBuilder from './functions/procedureBuilder';
import lineMaker from './functions/lineMaker';

console.log('Started');
// имя базы данных. сохраняем в папке 
const databaseFile = '2207';

const dbResultDir = `./db${databaseFile}-result`;

if (!fs.existsSync(dbResultDir)) fs.mkdirSync(dbResultDir);

	fs.readFile(`./db/${databaseFile}.txt`, 'utf8', (err, data) => {
		if (err) {
			console.log(err);
			return;
		}
		const lines = data.match(/\n/g)?.length;

		//находим и отдельно сохраняем каждую строку для последующего разбора
		const linesArr: string[] = [];
		let start = 0;

		for (let i = 0; i < lines; i++) {
			//строки фиксированной длины, но так как она может измениться с форматом,
			//то находим символ переноса строки, как контроль конца строки
			//дополнительно прибавляю i для учёта самого символа \n
			let end = Number(data.indexOf('\n') * (i + 1)) + i;
			linesArr.push(lineMaker(data, start, end));
			start = Number(end + 1);
		}

		const linesNumber = linesArr.length;

		const navaidList = [],
			EnrWpList = [],
			AirportList = [],
			AirwayList = [],
			otherList = [],
			headerList = [],
			ProcedureList = [];

		headerList.push(linesArr[0]);
		headerList.push(linesArr[1]);
		for (let i = 2; i < linesNumber; i++) {
			const pointer = linesArr[i][4] + linesArr[i][5];
			switch (pointer) {
				case 'DB':
					const DB = new CNavaid_ndb(linesArr[i], linesArr[i + 1]);
					navaidList.push(DB);
					i++;
					break;
				case 'D ':
					const D = new CNavaid_vhf(linesArr[i], linesArr[i + 1]);
					navaidList.push(D);
					i++;
					break;
				case 'EA':
					const EA = new CWaypoint(linesArr[i], linesArr[i + 1]);
					EnrWpList.push(EA);
					i++;
					break;
				case 'P ':
					if (
						linesArr[i][12] === 'D' ||
						linesArr[i][12] === 'E' ||
						linesArr[i][12] === 'F'
					) {
						const newProcedure = new Procedure(linesArr[i]);
						if (newProcedure.continuationNumber === 1)
							ProcedureList.push(newProcedure);
					}
					if (linesArr[i][12] === 'A') {
						const PA = new CAirport(linesArr[i], linesArr[i + 1]);
						AirportList.push(PA);
						i++;
					}
					if (linesArr[i][12] === 'C') {
						const PC = new CWaypoint(linesArr[i], linesArr[i + 1]);
						EnrWpList.push(PC);
						i++;
					}
					break;
				case 'ER':
					const ER = new CAirway(linesArr[i], linesArr[i + 1]);
					AirwayList.push(ER);
					i++;
					break;
				default:
					otherList.push(i);
			}
		}

		// объединяем все записи в один массив
		const arincAll = {
			Navaid: navaidList,
			EnrWp: EnrWpList,
			Airport: AirportList,
			Airway: AirwayList,
		};

		const navaidAll = {
			Navaid: navaidList,
		};
		const enrWpAll = {
			EnrWp: EnrWpList,
		};
		const airportAll = {
			Airport: AirportList,
		};
		const airwayAll = {
			Airway: AirwayList,
		};

		// fs.writeFileSync(`./${dbResultDir}/header.txt`, JSON.stringify(headerList));

		// fs.writeFileSync(`./${dbResultDir}/airportsList.json`, JSON.stringify(AirportList, null, '\t'));

		// fs.writeFileSync(`./${dbResultDir}/airwaysList.json`, JSON.stringify(AirwayList, null, '\t'));

		// fs.writeFileSync(`./${dbResultDir}/waypointsList.json`, JSON.stringify(EnrWpList, null, '\t'));

		// fs.writeFileSync(`./${dbResultDir}/navaidsList.json`, JSON.stringify(navaidList, null, '\t'));

		// fs.writeFileSync(`./${dbResultDir}/proceduresList.json`, JSON.stringify(ProcedureList, null, '\t'));

		const procedureData = procedureBuilder(ProcedureList);
		fs.writeFileSync(
			`./${dbResultDir}/airportsProcedures-new.json`,
			JSON.stringify(procedureData, null, '\t')
		);
		console.log('done!');
	});
