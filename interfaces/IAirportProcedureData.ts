import { IAirportProcedure } from "./IAirportProcedure"
export interface IAirportProcedureData {
	AIRPORT_CODE: string,
	RUNWAYS: string[],
	coordinates: string[]
	SID: IAirportProcedure[],
	STAR: IAirportProcedure[], 
	APPROACH: IAirportProcedure[],
}
