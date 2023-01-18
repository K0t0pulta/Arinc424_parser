// указатель для этого объекта EA
export default class CWaypoint {
    recordType: string;
    region: string;
    sectionCode: string;
    subsectionCode: string;
    regionCode: string;
    regionIcaoCode: string;
    subsection: string;
    waypointIdent: string;
    icaoCode: string;
    continuationNumber: number;
    type: string;
    usage: string;
    latitude: string;
    longitude: string;
    magVar: string;
    datum: string;
    nameIndicator: string;
    name: string;
    recordNumber: number;
    cycle: number;
    continuationNumber2: number;
    application: number;
    fir: string;
    uir: string;
    startEnd: string;
    continuationRecordNumber: number;
    continuationCycle: number;
    constructor (line1: string, line2: string)   {
        this.recordType = line1[0]; //(S)tandard or (T)ailored
        this.region = line1.slice(1,4); // три символа
        this.sectionCode = line1[4]; //код секции (тип объекта)
        this.subsectionCode = line1[5]; //Subsection Code
        this.regionCode = line1.slice(6,10).trim(); //Region Code
        this.regionIcaoCode = line1.slice(10,12).trim();
        this.subsection = line1[12]; //Subsection
        this.waypointIdent = line1.slice(13,19).trim(); //Waypoint Identifier
        //18 empty
        this.icaoCode = line1.slice(19,21);
        this.continuationNumber = +line1[21].trim();
        this.type = line1.slice(26,30).trim(); //Waypoint Type
        this.usage = line1.slice(30,31).trim(); //Waypoint Usage
        //31 empty
        this.latitude = line1.slice(32,41).trim(); //Waypoint Latitude
        this.longitude = line1.slice(41,51).trim(); //Waypoint Longitude
        this.magVar = line1.slice(74,79).trim(); //Dynamic Magnetic Variation
        //79 thru 83 Reserved (Expansion) (5)
        this.datum = line1.slice(84,87).trim();
        //87 thru 94 Reserved (Expansion) (5)
        this.nameIndicator = line1.slice(95,98).trim(); //Name Format Indicator
        this.name = line1.slice(98,123).trim(); //Waypoint Name/Description
        this.recordNumber = +line1.slice(123,128).trim();
        this.cycle = +line1.slice(128).trim();
        this.continuationNumber2 = +line2[21].trim();
        this.application = +line2[22].trim(); //Application Type
        this.fir = line2.slice(23,27).trim(); //FIR Identifier
        this.uir = line2.slice(27,31).trim(); //UIR Identifier
        this.startEnd = line2[31].trim(); //Start/End Indicator
        //32 thru 43 empty
        //43 thru 123 Reserved (Expansion)
        this.continuationRecordNumber = +line2.slice(123,128).trim();
        this.continuationCycle = +line1.slice(128).trim();
    }
}