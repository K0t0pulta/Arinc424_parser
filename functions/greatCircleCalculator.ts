function gcDist(a1: number, b1: number, a2: number, b2: number, unit: 'nm' | 'km') : number {
	const D = Math.acos(Math.sin(a1) * Math.sin(a2) + Math.cos(a1) * Math.cos(a2) * Math.cos(b2 - b1));
	const result = unit === 'km'? Number((D * 6372.795).toFixed(2)) : Number((D * 6372.795 / 1.852).toFixed(2))
	return result;
}

function latConvertor(vRaw :string) {
	const v = String(vRaw);
	const sec = Number(`${v.slice(5, 7)}.${v.slice(7)}`);
	const min = Number(v.slice(3, 5)) + sec / 60;
	const grad = Number(v.slice(1, 3)) + min / 60;
	return grad;
}

function longConvertor(vRaw :string) {
	const v = String(vRaw);
	const sec = Number(`${v.slice(6, 8)}.${v.slice(8)}`);
	const min = Number(v.slice(4, 6)) + sec / 60;
	const grad = Number(v.slice(1, 4)) + min / 60;
	return grad;
}

export default function greatCircleCalculator(obj1: string[], obj2: string[], unit: 'nm' | 'km') {
	try {
		const [ a1raw, b1raw ] = obj1; //[latitude, longitude]
		const [ a2raw, b2raw ] = obj2; //[latitude, longitude]
		const a1 = latConvertor(a1raw);
		const b1 = longConvertor(b1raw);
		const a2 = latConvertor(a2raw);
		const b2 = longConvertor(b2raw);
		return Math.round(gcDist(a1 * (Math.PI / 180), b1 * (Math.PI / 180), a2 * (Math.PI / 180), b2 * (Math.PI / 180), unit));
	}	catch (e) {
		return 0
	}
}
