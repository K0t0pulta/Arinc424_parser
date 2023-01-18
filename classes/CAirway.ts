// указатель для этого объекта ER
//TODO: тут много параметров нужно расшифровать
export default class CAirway {
    recordType : string;
    region : string;
    sectionCode : string;
    subCode : string;
    routeIdent : string;
    sequenceNumber : number;
    fixIdent : string;
    icaoCode : string;
    fixSectionCode : string;
    fixSubSectionCode : string;
    continuationNumber : number;
    descCode : string;
    boundaryCode : string;
    routeType : string;
    level : string;
    direct : string;
    cruiseTable : string;
    EU : string;
    recommendedNAVAID : string;
    NAVAIDIcaoCode : string;
    RNP : string;
    theta : string;
    rho : string;
    outboundMagCourse : string;
    routeDistance : number;
    inboundMagCourse : string;
    minAlt : string;
    minAlt2 : string;
    maxAlt : string;
    fixRadius : string;
    verticalScaleFactor : string;
    RVSM_MinLvl : string;
    VSF_RVSM_MinLvl : string;
    recordNumber : number;
    cycle : string;
    continuationNumber2 : number;
    application : string;
    startEnd : string;
    RA_Code : string;
    RA_Type : string;
    RA_Designation : string;
    RA_Multiple : string;
    RA_Code2 : string;
    RA_Type2 : string;
    RA_Designation2 : string;
    RA_Multiple2 : string;
    RA_Code3 : string;
    RA_Type3 : string;
    RA_Designation3 : string;
    RA_Multiple3 : string;
    RA_LinkContinuation : string;
    continuationRecordNumber : number;
    continuationCycle : number;
    constructor(line1: string, line2: string) {
        this.recordType = line1[0]; //(S)tandard or (T)ailored
        this.region = line1.slice(1,4); // три символа
        this.sectionCode = line1[4]; //код секции (тип объекта)
        this.subCode = line1[5]; //Subsection Code
        //6 thru 12 Blank (Spacing) (7)
        this.routeIdent = line1.slice(13,19).trim(); //Route Identifier
        //18 Reserved (1)
        //19 thru 24 Blank (Spacing) (6)
        this.sequenceNumber = +line1.slice(25,29).trim(); //Sequence Number
        this.fixIdent = line1.slice(29,34).trim(); //Fix Identifier
        this.icaoCode = line1.slice(34,36).trim();
        this.fixSectionCode = line1[36]; //Section Code
        this.fixSubSectionCode = line1[37]; //Section Code
        this.continuationNumber = +line1[38];
        this.descCode = line1.slice(39,43).trim(); //Waypoint Description Code
        this.boundaryCode = line1[43]; //Boundary Code
        this.routeType = line1[44]; //Route Type
        this.level = line1[45];
        this.direct = line1[46]; //Direction Restriction
        this.cruiseTable = line1.slice(47,49).trim(); //Cruise Table Indicator
        this.EU = line1[49]; //EU Indicator
        this.recommendedNAVAID = line1.slice(50,54).trim(); //Recommended NAVAID
        this.NAVAIDIcaoCode = line1.slice(54,56).trim();
        this.RNP = line1.slice(56,59).trim();
        //59 thru 61 Blank (Spacing) (3)
        this.theta = line1.slice(62,66).trim();
        this.rho = line1.slice(66,70).trim();
        this.outboundMagCourse = line1.slice(70,72).trim(); //Outbound Magnetic Course
        this.routeDistance = +line1.slice(74,78).trim(); //Route Distance From
        this.inboundMagCourse = line1.slice(78,80).trim(); //Inbound Magnetic Course
        //82 Blank (Spacing) 
        this.minAlt = line1.slice(83,88).trim();
        this.minAlt2 = line1.slice(88,93).trim();
        this.maxAlt = line1.slice(93,98).trim();
        this.fixRadius = line1.slice(98,101).trim(); //Fix Radius Transition Indicator
        this.verticalScaleFactor = line1.slice(101,104).trim(); //Vertical Scale Factor
        this.RVSM_MinLvl = line1.slice(104,107).trim(); //RVSM Minimum Level
        this.VSF_RVSM_MinLvl = line1.slice(107,110).trim(); //VSF RVSM Maximum Level
        //110 thru 113 Reserved (4)
        //114 thru 122 Blank (Spacing) (9)
        this.recordNumber = +line1.slice(123,128).trim();
        this.cycle = line1.slice(128).trim();   
        this.continuationNumber2 = +line2[38].trim();
        this.application = line2[39].trim(); //Application Type
        this.startEnd = line2[40]; //Start/End Indicator
        //41 thru 65 empty
        this.RA_Code = line2.slice(66,68).trim(); //Restricted Airspace ICAO Code
        this.RA_Type = line2[68]; //Restricted Airspace Type
        this.RA_Designation = line2.slice(69,79).trim(); //Restricted Airspace Designation
        this.RA_Multiple = line2[68]; //Restricted Airspace Multiple Code
        this.RA_Code2 = line2.slice(66,68).trim(); //Restricted Airspace ICAO Code
        this.RA_Type2 = line2[68]; //Restricted Airspace Type
        this.RA_Designation2 = line2.slice(69,79).trim(); //Restricted Airspace Designation
        this.RA_Multiple2 = line2[68]; //Restricted Airspace Multiple Code
        this.RA_Code3 = line2.slice(66,68).trim(); //Restricted Airspace ICAO Code
        this.RA_Type3 = line2[68]; //Restricted Airspace Type
        this.RA_Designation3 = line2.slice(69,79).trim(); //Restricted Airspace Designation
        this.RA_Multiple3 = line2[68]; //Restricted Airspace Multiple Code
        this.RA_LinkContinuation = line2[122]; //Restricted. Airspace Link Continuation
        this.continuationRecordNumber = +line2.slice(123,128).trim();
        this.continuationCycle = +line1.slice(128).trim();
    }
}