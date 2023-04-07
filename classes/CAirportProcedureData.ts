import {IAirportProcedure} from '../interfaces/IAirportProcedure';
import { IAirportProcedureData } from '../interfaces/IAirportProcedureData'

export default class CAirportProcedureData implements IAirportProcedureData {
  AIRPORT_ICAO: string;
	RUNWAYS: string[];
	coordinates: string[];
	SID: IAirportProcedure[];
	STAR: IAirportProcedure[];
	APPROACH: IAirportProcedure[];
  constructor () {
    this.AIRPORT_ICAO = '';
    this.RUNWAYS = [];
    this.coordinates = [];
    this.SID = [];
    this.STAR = [];
    this.APPROACH = [];
  }
}
