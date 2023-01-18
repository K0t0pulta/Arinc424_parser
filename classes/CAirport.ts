// указатель для этого объекта PA
export default class CAirport {
    recordType : string;
    region : string;
    sectionCode : string;
    airportIdent : string;
    icaoCode : string;
    subCode : string;
    iataCode : string;
    continuationNumber : number;
    speedLimitAltitude : string;
    longestRWY : string;
    IFR : string;
    longRWY : string;
    latitude : string;
    longitude : string;
    magVar : string;
    elevation : string;
    speedLimit : string;
    vhf : string;
    vhfIcaoCode : string;
    transAltitude : number;
    transLevel : string;
    pubMil : string;
    timeZone : string;
    dayTime : string;
    MT : string;
    datum : string;
    name : string;
    recordNumber : number;
    cycle : number;
    continuationNumber2 : number;
    appl : string;
    fir : string;
    uir : string;
    SE : string;
    date : string;
    AS : string;
    asIdent : string;
    asIcao : string;
    continuationRecordNumber : number;
    continuationCycle : number;
    constructor (line1: string, line2: string) {
        this.recordType = line1[0]; //(S)tandard or (T)ailored
        this.region = line1.slice(1,4); // три символа
        this.sectionCode = line1[4]; //код секции (тип объекта)
        this.airportIdent = line1.slice(6,10).trim();
        this.icaoCode = line1.slice(10,12).trim(); 
        this.subCode = line1[12].trim();
        this.iataCode = line1.slice(13,16).trim(); 
        this.continuationNumber = +line1[21].trim();
        this.speedLimitAltitude = line1.slice(21,26).trim(); 
        this.longestRWY = line1.slice(26,29).trim(); 
        this.IFR = line1[30].trim();
        this.longRWY = line1[31].trim();
        this.latitude = line1.slice(32,41).trim(); 
        this.longitude = line1.slice(41,51).trim(); 
        this.magVar = line1.slice(51,56).trim(); 
        this.elevation = line1.slice(56,61).trim(); 
        this.speedLimit = line1.slice(61,64).trim(); 
        this.vhf = line1.slice(64,68).trim(); 
        this.vhfIcaoCode = line1.slice(68,70).trim(); 
        this.transAltitude = +line1.slice(70,75).trim(); 
        this.transLevel = line1.slice(75,80).trim(); 
        this.pubMil = line1[80].trim();
        this.timeZone = line1.slice(81,84).trim(); 
        this.dayTime = line1[84].trim();
        this.MT = line1[85].trim();
        this.datum = line1.slice(86,89).trim(); 
        this.name = line1.slice(93,123).trim(); 
        this.recordNumber = +line1.slice(123,128).trim();
        this.cycle = +line1.slice(128).trim();
        this.continuationNumber2 = +line2[21].trim();
        this.appl = line2[22].trim();
        this.fir = line2.slice(23,27).trim();
        this.uir = line2.slice(27,31).trim();
        this.SE = line2[31].trim();
        this.date = line2.slice(32,43).trim();
        this.AS = line2[66].trim();
        this.asIdent = line2.slice(67,71).trim();
        this.asIcao = line2.slice(71,73).trim();
        this.continuationRecordNumber = +line2.slice(123,128).trim();
        this.continuationCycle = +line1.slice(128).trim();
    }
}