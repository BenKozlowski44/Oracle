const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/oracle-data.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Hull number map by oracle id — source: Naval Vessel Register (public)
const hullNumbers = {
    // DDGs
    cmd_6: '52',  // USS BARRY
    cmd_7: '53',  // USS JOHN PAUL JONES
    cmd_8: '56',  // USS JOHN S McCAIN
    cmd_9: '65',  // USS BENFOLD
    cmd_10: '100', // USS KIDD
    cmd_11: '101', // USS GRIDLEY
    cmd_12: '102', // USS SAMPSON
    cmd_13: '61',  // USS RAMAGE
    cmd_14: '64',  // USS CARNEY
    cmd_15: '68',  // USS THE SULLIVANS
    cmd_16: '75',  // USS DONALD COOK
    cmd_17: '99',  // USS FARRAGUT
    cmd_18: '109', // USS JASON DUNHAM
    cmd_19: '116', // USS THOMAS HUDNER
    cmd_20: '119', // USS DELBERT D BLACK
    cmd_21: '82',  // USS LASSEN
    cmd_36: '55',  // USS STOUT
    cmd_37: '57',  // USS MITSCHER
    cmd_38: '58',  // USS LABOON
    cmd_39: '66',  // USS GONZALEZ
    cmd_40: '67',  // USS COLE
    cmd_41: '71',  // USS ROSS
    cmd_42: '72',  // USS MAHAN
    cmd_43: '74',  // USS McFAUL
    cmd_44: '78',  // USS PORTER
    cmd_45: '94',  // USS NITZE
    cmd_46: '95',  // USS JAMES E WILLIAMS
    cmd_47: '96',  // USS BAINBRIDGE
    cmd_48: '98',  // USS FORREST SHERMAN
    cmd_49: '103', // USS TRUXTUN
    cmd_50: '107', // USS GRAVELY
    cmd_51: '124', // USS HARVEY C. BARNUM JR
    cmd_57: '70',  // USS HOPPER
    cmd_58: '73',  // USS DECATUR
    cmd_59: '108', // USS WAYNE E MEYER
    cmd_60: '110', // USS WILLIAM P LAWRENCE
    cmd_61: '112', // USS MICHAEL MURPHY
    cmd_62: '120', // USS CARL M LEVIN
    cmd_63: '118', // USS DANIEL INOUYE
    cmd_64: '51',  // USS ARLEIGH BURKE
    cmd_65: '80',  // USS ROOSEVELT
    cmd_66: '84',  // USS BULKELEY
    cmd_67: '117', // USS PAUL IGNATIUS
    cmd_68: '79',  // USS OSCAR AUSTIN
    cmd_69: '122', // USS JOHN BASILONE
    cmd_70: '54',  // USS CURTUS D WILBUR
    cmd_71: '59',  // USS RUSSELL
    cmd_72: '60',  // USS PAUL HAMILTON
    cmd_73: '62',  // USS FITZGERALD
    cmd_74: '63',  // USS STETHEM
    cmd_75: '77',  // USS O\'KANE
    cmd_76: '90',  // USS CHAFEE
    cmd_77: '91',  // USS PINCKNEY
    cmd_78: '92',  // USS MOMSEN
    cmd_79: '93',  // USS CHUNG HOON
    cmd_81: '97',  // USS HALSEY
    cmd_82: '104', // USS STERETT
    cmd_83: '106', // USS STOCKDALE
    cmd_84: '111', // USS SPRUANCE
    cmd_85: '123', // USS LENAH H SUTCLIFFE HIGBEE
    cmd_121: '69',  // USS MILIUS
    cmd_122: '76',  // USS HIGGINS
    cmd_123: '83',  // USS HOWARD
    cmd_124: '88',  // USS PREBLE
    cmd_125: '89',  // USS MUSTIN
    cmd_126: '105', // USS DEWEY
    cmd_127: '114', // USS RALPH JOHNSON
    cmd_128: '115', // USS RAFAEL PERALTA
    cmd_129: '113', // USS JOHN FINN
    // LCSs
    cmd_1: '18',  // USS CHARLESTON
    cmd_2: '16',  // USS TULSA
    cmd_4: '12',  // USS OMAHA
    cmd_5: '38',  // USS PIERRE
    cmd_22: '13',  // USS WICHITA
    cmd_23: '15',  // USS BILLINGS
    cmd_24: '17',  // USS INDIANAPOLIS
    cmd_25: '19',  // USS ST LOUIS
    cmd_26: '21',  // USS MINNEAPOLIS SAINT PAUL
    cmd_27: '23',  // USS COOPERSTOWN
    cmd_28: '25',  // USS MARINETTE
    cmd_29: '27',  // USS NANTUCKET
    cmd_30: '29',  // USS BELOIT
    cmd_31: '31',  // USS CLEVELAND
    cmd_92: '6',   // USS JACKSON
    cmd_93: '8',   // USS MONTGOMERY
    cmd_98: '22',  // USS KANSAS CITY
    cmd_99: '3',   // USS FORT WORTH
    cmd_100: '10',  // USS GABRIELLE GIFFORDS
    cmd_106: '12',  // USS OMAHA GOLD (same hull)
    cmd_108: '14',  // USS MANCHESTER
    cmd_110: '20',  // USS CINCINNATI
    cmd_111: '28',  // USS SAVANNAH
    cmd_112: '30',  // USS CANBERRA BLUE
    cmd_113: '30',  // USS CANBERRA GOLD (same hull)
    cmd_114: '32',  // USS SANTA BARBARA BLUE
    cmd_115: '32',  // USS SANTA BARBARA GOLD
    cmd_116: '34',  // USS AUGUSTA
    cmd_117: '36',  // USS KINGSVILLE
    cmd_119: '24',  // USS OAKLAND
    cmd_120: '26',  // USS MOBILE
    // LSDs
    cmd_53: '44',  // USS GUNSTON HALL
    cmd_54: '46',  // USS TORTUGA
    cmd_55: '50',  // USS CARTER HALL
    cmd_56: '51',  // USS OAK HILL
    cmd_86: '45',  // USS COMSTOCK
    cmd_87: '42',  // USS GERMANTOWN
    cmd_88: '48',  // USS ASHLAND
    cmd_89: '49',  // USS HARPER\'S FERRY
    cmd_90: '52',  // USS PEARL HARBOR
    cmd_118: '47',  // USS RUSHMORE
};

let updated = 0;
for (const cmd of data) {
    if (hullNumbers[cmd.id]) {
        cmd.hullNumber = hullNumbers[cmd.id];
        updated++;
    }
}

fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
console.log(`Done — updated ${updated} of ${data.length} commands with hull numbers.`);

// Print any that were skipped
const skipped = data.filter(c => !c.hullNumber && c.platform && c.platform !== 'CO-SM');
if (skipped.length) {
    console.log('\nNo hull number for:');
    skipped.forEach(c => console.log(' ', c.id, c.name, c.platform));
}
