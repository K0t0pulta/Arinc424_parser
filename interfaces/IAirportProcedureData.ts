import { IAirportProcedure } from "./IAirportProcedure"
export interface IAirportProcedureData {
	RUNWAYS: string[],
	coordinates: string[]
	SID: IAirportProcedure[],
	STAR: IAirportProcedure[], 
	APPROACH: IAirportProcedure[],
}