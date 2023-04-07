import * as fs from 'fs';
import CProcedure from "../classes/CProcedure";
import CAirportProcedureData from '../classes/CAirportProcedureData';
import { IProcedurePoint } from "../interfaces/IProcedurePoint";
import CWaypoint from '../classes/CWaypoint';
import CAirport from '../classes/CAirport';
import greatCircleCalculator from './greatCircleCalculator';
import { IAirportProcedureData } from '../interfaces/IAirportProcedureData';

const waypointsList = JSON.parse(fs.readFileSync('./db2207-result/waypointsList.json', 'utf8')) as CWaypoint[];
const airportsList = JSON.parse(fs.readFileSync('./db2207-result/airportsList.json', 'utf8')) as CAirport[];

export default function procedureBuilder (stack: any) {
	const airportsProcedures : IAirportProcedureData[] = [];
	const ruwaysCodes = ['R', 'L', 'C', undefined];
	stack.forEach((el: CProcedure) => {
		let point: IProcedurePoint;
		if (el.fixIdent) {
			const waypoint = waypointsList.find((point) => point.waypointIdent === el.fixIdent && point.icaoCode === el.icaoCode);
			const coordinates = waypoint? [waypoint.latitude, waypoint.longitude] : [];
			point = { name: el.fixIdent, icao: el.icaoCode, coordinates };
		} else point = { name: el.fixIdent, icao: el.icaoCode };
		const { procedureIdent, transitionIdent, arptIdent: airport, subCode: type } = el;
		const airportData = airportsList.find((el) => el.airportIdent === airport)
		let requiredAirport = airportsProcedures.find((ap) => ap.AIRPORT_ICAO === airport);
		if (!requiredAirport) {
			requiredAirport = new CAirportProcedureData();
			airportsProcedures.push({
				AIRPORT_ICAO: airport,
				RUNWAYS: [],
				coordinates: [airportData.latitude, airportData.longitude],
				SID: [],
				STAR: [],
				APPROACH: [],
			});
		};
		// console.log(airport);
		// console.log(requiredAirport);
		// console.log(airportsProcedures);
		switch(type) {
			case 'D':
				/*проверяем наличие схемы для конкретного аэропорта */
				const SIDitem = requiredAirport.SID.find(
					(el) => el.name === procedureIdent
				);
				/*если схемы нет, то считаем начальную дистанцию от КТА до первой точки схемы и создаем соответствующую запись для схемы	*/
				if (!SIDitem) {
					const initPoint = { name: airportData.airportIdent, icao: airportData.icaoCode, coordinates: [airportData.latitude, airportData.longitude] };
					const initDistance = (greatCircleCalculator(airportsProcedures[airport].coordinates, point.coordinates, 'nm') || 0);
					airportsProcedures[airport]['SID'].push({name: procedureIdent, runway: transitionIdent, path: [point], distance: initDistance, controlPoint: initPoint});
				} else {
					/*если схема есть, то просто добавляем очередную точку схемы в path[]	*/
					SIDitem.path.push(point);
					SIDitem.distance += greatCircleCalculator(SIDitem.controlPoint.coordinates, point.coordinates, 'nm');
					/* возможен вариант, когда схема описана не точкой с координатами, а некоторым ограничением, как следствие, 
					не имееется ни имени, ни координат. Записываем только именованные точки */
					if (point.name) SIDitem.controlPoint = point;
				}
				if (requiredAirport.RUNWAYS.indexOf(transitionIdent) === -1 && transitionIdent.slice(0,2) === 'RW' && ruwaysCodes.includes(transitionIdent[4])) {
					requiredAirport.RUNWAYS.push(transitionIdent);
				}
				break;
			case 'E':
				const STARitem = requiredAirport.STAR.find((el) => el.name === procedureIdent);
				if (!STARitem) {
					requiredAirport.STAR.push({name: procedureIdent, runway: '', path: [point], distance: 0, controlPoint: point});
				} else {
					STARitem.path.push(point);
					if (transitionIdent.slice(0,2) === 'RW' && ruwaysCodes.includes(transitionIdent[4])) STARitem.runway = transitionIdent;
				}
				break;
			case 'F':
				const APPROACHitem = requiredAirport.APPROACH.find((el) => el.name === procedureIdent);
				if (!APPROACHitem) {
					requiredAirport.APPROACH.push({name: procedureIdent, runway: '', path: [point], distance: 0, controlPoint: point});
				} else {
					APPROACHitem.path.push(point);
					if (transitionIdent.slice(0,2) === 'RW' && ruwaysCodes.includes(transitionIdent[4])) APPROACHitem.runway = transitionIdent;
				}
				break;
		}
	})
	return airportsProcedures;
}
