// NDB NAVAID Record (DB or PN)

export class CNavaid_ndb {
    recordType : string;
    region : string;
    sectionCode : string;
    subCode : string;
    arptIdent : string;
    icaoCode : string;
    ndbIdent : string;
    ndbIcaoCode : string;
    continuationNumber : number;
    frequency : string;
    class : string;
    latitude : string;
    longitude : string;
    magneticVariation : string;
    datum : string;
    name : string;
    recordNumber : number;
    cycle : string;
    continuationNumber2 : number;
    application : string;
    fir : string;
    uir : string;
    startEnd : string;
    continuationRecordNumber : number;
    continuationCycle : number;

    constructor(line1: string, line2: string) {
        this.recordType = line1[0]; //(S)tandard or (T)ailored
        this.region = line1.slice(1,4); // три символа
        this.sectionCode = line1[4]; //код секции (тип объекта)
        this.subCode = line1[5]; // "B" - NDB
        this.arptIdent = line1.slice(6,10).trim(); //Airport ICAO Identifier
        this.icaoCode = line1.slice(10,12).trim(); //ICAO Code
        //12 - Blank (Spacing)
        this.ndbIdent = line1.slice(13,16).trim(); //NDB Identifier
        //17 thru 18 Blank (Spacing) (2)
        this.ndbIcaoCode = line1.slice(19,21).trim(); //ICAO Code
        this.continuationNumber = +line1[21].trim(); //Continuation Record No. 
        this.frequency = `${line1.slice(22,25)}.${line1.slice(25,27)}`.trim(); //NDB Frequency
        this.class = line1.slice(27,31).trim(); //NDB Class
        this.latitude = line1.slice(32,41).trim(); //NDB Latitude
        this.longitude = line1.slice(41,51).trim(); //NDB Longitude
        //51 thru 73  Blank (Spacing)
        this.magneticVariation = line1.slice(74,79).trim(); //Magnetic Variation
        //79 thru 84 Blank (Spacing)
        //85 thru 89 Reserved (Expansion)
        this.datum = line1.slice(90,93).trim(); //Datum Code
        this.name = line1.slice(93,123).trim(); //NDB Name
        this.recordNumber = Number(line1.slice(123,128).trim());
        this.cycle = line1.slice(128).trim();
        this.continuationNumber2 = +line2[21].trim();
        this.application = line2[22].trim(); //Application Type
        this.fir = line2.slice(23,27).trim(); //FIR Identifier
        this.uir = line2.slice(27,31).trim(); //UIR Identifier
        this.startEnd = line2[31].trim(); //Start/End Indicator
        //32 thru 43 empty
        //43 thru 123 Reserved (Expansion)
        this.continuationRecordNumber = +line2.slice(123,128).trim();
        this.continuationCycle = +line1.slice(128).trim();
    }
}

//VHF NAVAID Record (D)
export class CNavaid_vhf {
    recordType :string;
    region :string;
    sectionCode :string;
    subCode :string;
    arptIdent :string;
    icaoCode :string;
    vorIdent :string;
    vorIcaoCode :string;
    contNumber :string;
    vorFrequency :string;
    NAVAIDclass :string;
    vorLatitude :string;
    vorLongitude :string;
    dmeIdent :string;
    dmeLatitude :string;
    dmeLongitude :string;
    magneticVariation :string;
    elevation :number;
    figureOfMerit :string;
    bias :string;
    frequencyProtection :string;
    datum :string;
    name :string;
    routeInappropriate :string;
    serviceVolume :string;
    recordNumber :number;
    cycle :number;
    continuationNumber2 :number;
    application :string;
    fir :string;
    uir :string;
    startEnd :string;
    continuationRecordNumber :number;
    continuationCycle :number;
    constructor(line1: string, line2: string) {
        this.recordType = line1[0]; //(S)tandard or (T)ailored
        this.region = line1.slice(1,4); // три символа
        this.sectionCode = line1[4]; //код секции (тип объекта)
        this.subCode = line1[5]; // "" - VOR
        this.arptIdent = line1.slice(6,10).trim(); //APT ICAO CODE
        this.icaoCode = line1.slice(10,12).trim(); //REGION ICAO CODE
        this.vorIdent = line1.slice(13,16).trim();
        this.vorIcaoCode = line1.slice(19,21).trim();
        this.contNumber = line1[21].trim();
        this.vorFrequency = `${line1.slice(22,25)}.${line1.slice(25,27)}`.trim();
        this.NAVAIDclass = line1.slice(27,32).trim();
        this.vorLatitude = line1.slice(32,41).trim();
        this.vorLongitude = line1.slice(41,51).trim();
        this.dmeIdent = line1.slice(51,55).trim();
        this.dmeLatitude = line1.slice(55,64).trim();
        this.dmeLongitude = line1.slice(64,74).trim();
        this.magneticVariation = line1.slice(74,79).trim(); //Magnetic Variation
        this.elevation = +line1.slice(79,84).trim();
        this.figureOfMerit = line1[84]; 
        //Figure of Merit. A numerical expression representing the performance or efficiency of a given device, material, or procedure
        this.bias = line1.slice(85,87).trim();
        this.frequencyProtection = line1.slice(87,90).trim();
        this.datum = line1.slice(90,93).trim();
        this.name = line1.slice(93,118).trim(); 
        //118-120 - empty
        this.routeInappropriate = line1[121];              //Route Inappropriate DME
        this.serviceVolume = line1[122];              //DME Operational Service Volume
        this.recordNumber = +line1.slice(123,128).trim();
        this.cycle = +line1.slice(128).trim();
        this.continuationNumber2 = +line2[21].trim();
        this.application = line2[22].trim(); //Application Type
        this.fir = line2.slice(23,27).trim(); //FIR Identifier
        this.uir = line2.slice(27,31).trim(); //UIR Identifier
        this.startEnd = line2[31].trim(); //Start/End Indicator
        //32 thru 43 empty
        //43 thru 123 Reserved (Expansion)
        this.continuationRecordNumber = +line2.slice(123,128).trim();
        this.continuationCycle = +line1.slice(128).trim();
    }
}