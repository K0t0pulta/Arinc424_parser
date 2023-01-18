import { IProcedurePoint } from "./IProcedurePoint";

export interface IAirportProcedure {
	name: string,
	path: IProcedurePoint[],
	runway: string,
	distance: number,
	controlPoint: IProcedurePoint
}