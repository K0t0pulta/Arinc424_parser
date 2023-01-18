//Airport SID/STAR/Approach (PD, PE and PF)
export default class CProcedure {
	recordType: string;
    region: string;
    sectionCode: string;
	arptIdent: string;
	icaoCode: string;
    subCode: string;
	procedureIdent: string;
	routeType: string;
	transitionIdent: string;
	aircraftCode: string;
	sequenceNumber: number;
	fixIdent: string;
	fixIcaoCode: string;
    sectionCode2: string;
    subCode2: string;
	continuationNumber: number;
	waypointCode: string;
	turnDirection: string;
	RNP: string;
	pathTerminator: string;
	turnDirectionValid: string;
	navaid: string;
	navaidIcaoCode: string;
	arcRadius: string;
	theta: string;
	rho: string;
	magneticCourse: string;
	distance_time: number;
	navaidSection: string;
	navaidSubsection: string;
	inbound_outbound: string;
	altitudeDescription: string;
	ATC: string;
	altitude1: number;
	altitude2: number;
	transitionAltitude: string;
	speedLimit: number;
	verticalAngle: string;
	centerFix: string;
	multipleCode: string;
	centerFixIcaoCode: string;
	centerFixSection: string;
	centerFixSubsection: string;
	GNSS_FMS: string;
	speedLimitDescription: string;
	routeQualifier1: string;
	routeQualifier2: string;
	verticalScaleFactor: string;
	recordNumber: number;
    cycle: number;
	constructor (line: string) {
		this.recordType = line[0]; //(S)tandard or (T)ailored
		this.region = line.slice(1,4); // три символа
		this.sectionCode = line[4]; //код секции (тип объекта)
		//5 Blank (Spacing)
		this.arptIdent = line.slice(6,10); //Airport Identifier
		this.icaoCode = line.slice(10,12);
		this.subCode = line[12]; //Subsection Code D - SID, E - STAR, F - Approach
		this.procedureIdent = line.slice(13,19).trim(); //SID/STAR/Approach Identifier
		this.routeType = line[19]; //route Type
		this.transitionIdent = line.slice(20,25).trim(); //Transition Identifier
		this.aircraftCode = line[25]; //Procedure Design Aircraft Category or Type
		this.sequenceNumber = +line.slice(26, 29); //Sequence Number
		this.fixIdent = line.slice(29, 34).trim(); //Fix Identifier 
		this.fixIcaoCode = line.slice(34, 36);
		this.sectionCode2 = line[36]; //код секции (тип объекта)
		this.subCode2 = line[37]; //Subsection Code D - SID, E - STAR, F - Approach
		this.continuationNumber = Number(line[38]);
		this.waypointCode = line.slice(39, 43).trim(); //Waypoint Description Code
		this.turnDirection = line[43]; //Turn Direction
		this.RNP = line.slice(44, 47).trim(); //RNP
		this.pathTerminator = line.slice(47, 49).trim(); //Path and Termination
		this.turnDirectionValid = line[49]; //Turn Direction Valid
		this.navaid = line.slice(50, 54).trim(); //Recommended Navaid
		this.navaidIcaoCode = line.slice(54, 56).trim(); // Navaid ICAO Code
		this.arcRadius = line.slice(56, 62).trim(); // ARC Radius 
		this.theta = line.slice(62, 66).trim(); // Theta
		/*Theta is defined as the magnetic bearing to the waypoint
		identified in the record’s FIX Ident field from the Navaid in the Recommended
		Navaid field. */
		this.rho = line.slice(66, 70).trim(); // RHO
		/*RHO is defined as the geodesic distance in nautical miles to
		the waypoint identified in the record’s Fix Ident field from the NAVAID in the
		Recommended NAVAID field.*/
		this.magneticCourse = `${line.slice(70, 73)}.${line[73]}`; // Magnetic Course
		this.distance_time = +line.slice(74, 78).trim(); // Route Distance/Holding Distance or Time
		this.navaidSection = line[78]; //Recommended Navaid Section
		this.navaidSubsection = line[79]; //Recommended Navaid Subsection
		this.inbound_outbound = line[80]; //Inbound/Outbound Indicator
		//81 Reserved (Spacing)
		this.altitudeDescription = line[82]; //Altitude Description
		this.ATC = line[83]; //ATC Indicator
		this.altitude1 = +line.slice(84, 89).trim(); // Altitude
		this.altitude2 = +line.slice(89, 94).trim(); // Altitude
		this.transitionAltitude = line.slice(94, 99).trim(); // Transition Altitude
		this.speedLimit = +line.slice(99, 102).trim(); // Speed limit
		this.verticalAngle = line.slice(102, 106).trim(); // Vertical Angle
		this.centerFix = line.slice(106, 111).trim(); // Center Fix or TAA Procedure Turn Indicator 5.144 or 5.271
		this.multipleCode = line[111]; //Multiple Code or TAA Sector Identifier
		this.centerFixIcaoCode = line.slice(112, 114).trim(); // Center Fix or TAA Procedure Turn Indicator 5.144 or 5.271
		this.centerFixSection = line[114]; //
		this.centerFixSubsection = line[115]; //
		this.GNSS_FMS = line[116]; //GNSS/FMS Indication
		this.speedLimitDescription = line[117]; //	Speed Limit Description
		this.routeQualifier1  = line[118]; //	Route Qualifier 1 
		this.routeQualifier2  = line[119]; //	Route Qualifier 2
		this.verticalScaleFactor = line.slice(120, 123).trim(); // Vertical Scale Factor 
		this.recordNumber = +line.slice(123,128).trim();
		this.cycle = +line.slice(128).trim();
	}
}