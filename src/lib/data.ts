import type { Officer, Billet, OracleCommand, Slate, Metrics } from "./types"
import { cosmCommandData } from "./cosm-data"

export const slates: Slate[] = [
    {
        "id": "slate-1771335821958",
        "name": "FY26-3",
        "windowStart": "2026-07-01",
        "windowEnd": "2027-07-23",
        "requirements": [
            {
                "id": "req-cmd_50-xo",
                "commandName": "USS GRAVELY",
                "commandId": "cmd_50",
                "role": "XO",
                "incumbent": "TORNAMBE GREGORY",
                "incumbentPrd": "2026-07-01",
                "status": "Filled",
                "filledBy": "harringtonbrianmichael_24"
            },
            {
                "id": "req-cmd_77-xo",
                "commandName": "USS PINCKNEY",
                "commandId": "cmd_77",
                "role": "XO",
                "incumbent": "RAGSDALE CHRISTOPHER THOMA",
                "incumbentPrd": "2026-09-01",
                "status": "Filled",
                "filledBy": "auclairtaylorr_16"
            },
            {
                "id": "req-cmd_72-xo",
                "commandName": "USS PAUL HAMILTON",
                "commandId": "cmd_72",
                "role": "XO",
                "incumbent": "INTOCCIA MATTHEW JAMES",
                "incumbentPrd": "2026-10-01",
                "status": "Filled",
                "filledBy": "hurleyseanpatrick_19"
            },
            {
                "id": "req-cmd_86-xo",
                "commandName": "USS COMSTOCK",
                "commandId": "cmd_86",
                "role": "XO",
                "incumbent": "HODGEMAN JESSICA LYN",
                "incumbentPrd": "2027-02-01",
                "status": "Filled",
                "filledBy": "jonesantoniot_15"
            },
            {
                "id": "req-cmd_3-xo",
                "commandName": "USS TULSA  GOLD (CREW 217)",
                "commandId": "cmd_3",
                "role": "XO",
                "incumbent": "Bradford, Jordan (24-2)",
                "incumbentPrd": "2027-02-25",
                "status": "Draft"
            },
            {
                "id": "req-cmd_31-xo",
                "commandName": "USS CLEVELAND",
                "commandId": "cmd_31",
                "role": "XO",
                "incumbent": "Eickelmann, Angela (TEMP XO)",
                "incumbentPrd": "2027-03-27",
                "status": "Draft"
            },
            {
                "id": "req-cmd_42-xo",
                "commandName": "USS MAHAN",
                "commandId": "cmd_42",
                "role": "XO",
                "incumbent": "BABCOCK DONALD S",
                "incumbentPrd": "2027-05-01",
                "status": "Draft"
            },
            {
                "id": "req-cmd_124-xo",
                "commandName": "USS PREBLE",
                "commandId": "cmd_124",
                "role": "XO",
                "incumbent": "FORWARD DOUGLAS THEODORE",
                "incumbentPrd": "2027-05-01",
                "status": "Draft"
            },
            {
                "id": "req-cmd_18-xo",
                "commandName": "USS JASON DUNHAM",
                "commandId": "cmd_18",
                "role": "XO",
                "incumbent": "BLANCO ANDREW ANTONIO",
                "incumbentPrd": "2027-06-01",
                "status": "Draft"
            },
            {
                "id": "req-cmd_89-xo",
                "commandName": "USS HARPER'S FERRY",
                "commandId": "cmd_89",
                "role": "XO",
                "incumbent": "CHALLBURG MARIBEL",
                "incumbentPrd": "2027-06-01",
                "status": "Draft"
            },
            {
                "id": "req-cmd_121-xo",
                "commandName": "USS MILIUS",
                "commandId": "cmd_121",
                "role": "XO",
                "incumbent": "MARTIN PHILLIP DEJUAN",
                "incumbentPrd": "2027-06-01",
                "status": "Draft"
            },
            {
                "id": "req-cmd_9-xo",
                "commandName": "USS BENFOLD",
                "commandId": "cmd_9",
                "role": "XO",
                "incumbent": "SHRADER JARED ALLEN",
                "incumbentPrd": "2027-07-01",
                "status": "Draft"
            },
            {
                "id": "req-cmd_30-xo",
                "commandName": "USS BELOIT",
                "commandId": "cmd_30",
                "role": "XO",
                "incumbent": "Bell, Timothy",
                "incumbentPrd": "2027-07-01",
                "status": "Draft"
            },
            {
                "id": "req-cmd_47-xo",
                "commandName": "USS BAINBRIDGE",
                "commandId": "cmd_47",
                "role": "XO",
                "incumbent": "PETERS SAVANNAH JUNE",
                "incumbentPrd": "2027-07-01",
                "status": "Draft"
            },
            {
                "id": "req-cmd_54-xo",
                "commandName": "USS TORTUGA",
                "commandId": "cmd_54",
                "role": "XO",
                "incumbent": "HEBENSTREIT KRISTA RAE",
                "incumbentPrd": "2027-07-01",
                "status": "Draft"
            },
            {
                "id": "req-cmd_56-xo",
                "commandName": "USS OAK HILL",
                "commandId": "cmd_56",
                "role": "XO",
                "incumbent": "KIRBY MATTHEW DAVID",
                "incumbentPrd": "2027-07-01",
                "status": "Draft"
            },
            {
                "id": "req-aamdsromania_13-xo-1771777850292",
                "commandName": "AAMDS ROMANIA",
                "commandId": "aamdsromania_13",
                "role": "XO",
                "incumbent": "N/A",
                "incumbentPrd": "N/A",
                "status": "Draft"
            }
        ],
        "candidates": [
            "auclairtaylorr_16",
            "jonesantoniot_15",
            "hurleyseanpatrick_19"
        ],
        "candidateProfiles": [
            {
                "id": "prof-1",
                "slateId": "slate-1771335821958",
                "officerId": "harringtonbrianmichael_24",
                "preferences": [
                    {
                        "key": "LCS - San Diego, CA",
                        "rank": 1
                    },
                    {
                        "key": "DDG - Norfolk, VA",
                        "rank": 2
                    },
                    {
                        "key": "DDG - San Diego, CA",
                        "rank": 3
                    }
                ],
                "experienceSummary": "Extensive ASW experience. Served as OPS on DDG 51.",
                "availabilityDate": "2026-06-01",
                "notes": "Strong candidate for early fill."
            }
        ],
        "status": "Active",
        "approvals": {
            "branchHead": false,
            "pers41": false,
            "swcc": false,
            "swoboss": false
        }
    }
]

export const metrics: Metrics = {
    "resolvedConflicts": 1
}

export const officers: Officer[] = [
{
    "id": "tornambegregory_1772205982821",
    "name": "TORNAMBE GREGORY",
    "rank": "CDR",
    "designator": "1110",
    "currentCommand": "",
    "prd": "",
    "preferences": [],
    "status": "Available",
    "yearGroup": 20090,
    "assignedSlate": "4AGAZ",
    "csr": "4AGAZ",
    "listShift": "Firefighters",
    "preferredLocations": [],
    "preferredPlatforms": []
},

    {
        "id": "cabeclintonr_1771800239015",
        "name": "CABE CLINTON R",
        "rank": "CDR",
        "designator": "1110",
        "currentCommand": "CG 70 LAKE ERIE",
        "prd": "2026-06-01",
        "preferences": [],
        "status": "List Shift",
        "yearGroup": 0,
        "listShift": "Firefighters",
        "assignedSlate": "3rd Look CO Afloat",
        "csr": "7AGAZ",
        "billet": "XO AFLOAT",
        "preferredLocations": [],
        "preferredPlatforms": []
    },
    {
        "id": "harringtonbrianmichael_24",
        "rank": "CDR",
        "name": "HARRINGTON BRIAN MICHAEL",
        "designator": "1110",
        "currentCommand": "MOC FLT FORCES",
        "prd": "2024-11-01",
        "preferences": [],
        "status": "Hold",
        "notes": "Has medical condition that precludes him from Command right now.",
        "yearGroup": 20070,
        "billet": "STFOPSCMDCENWO/BWC/MOC BWC",
        "csr": "5AGAZ",
        "assignedSlate": "3rd Look CO Afloat",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null
    },
    {
        "id": "auclairtaylorr_16",
        "rank": "CDR",
        "name": "AUCLAIR TAYLOR R",
        "designator": "1110",
        "currentCommand": "ATG NORFOLK",
        "prd": "2027-12-01",
        "preferences": [],
        "status": "Slated",
        "notes": "",
        "yearGroup": 20090,
        "billet": "STF REDI GEN",
        "csr": "6AGAZ",
        "assignedSlate": "3rd Look CO Afloat",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "tentativeSlate": "USS TRUXTUN (DDG 103)",
        "listShift": "Slated"
    },
    {
        "id": "jonesantoniot_15",
        "rank": "CDR",
        "name": "JONES ANTONIO T",
        "designator": "1110",
        "currentCommand": "PERS 41",
        "prd": "2027-10-01",
        "preferences": [],
        "status": "Ready FF",
        "notes": "",
        "yearGroup": 20080,
        "billet": "PERS DIST OFFICER",
        "csr": "6AGAZ",
        "assignedSlate": "3rd Look CO Afloat",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null
    },
    {
        "id": "hurleyseanpatrick_19",
        "rank": "CDR",
        "name": "HURLEY SEAN PATRICK",
        "designator": "1117",
        "currentCommand": "MOC C7F",
        "prd": "2027-03-01",
        "preferences": [],
        "status": "Hold",
        "notes": "Was not asked to Fleet-up Tier 2 certs were struggling.  VADM Mclane ordered a change of leadership. Put him in the bull pen. ",
        "yearGroup": 20080,
        "billet": "MOB&SEL/OPS SUP OFF/DIRECTOR",
        "csr": "2AGAZ",
        "assignedSlate": "3rd Look CO Afloat",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null
    },
    {
        "id": "hollinsrenaldonehemiah_24",
        "rank": "CDR",
        "name": "HOLLINS RENALDO NEHEMIAH",
        "designator": "1110",
        "currentCommand": "LSD 48 ASHLAND",
        "prd": "2026-04-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20080,
        "billet": "XO AFLOAT",
        "csr": "7AGAZ",
        "assignedSlate": "3rd Look CO Afloat",
        "preferredLocations": [
            "SD",
            "RS",
            "PH",
            "YJ",
            "SJ"
        ],
        "preferredPlatforms": [
            "DDG",
            "LSD",
            "LCS"
        ],
        "preferencePriority": "Platform"
    },
    {
        "id": "mcquiniffjameslogan_21",
        "rank": "CDR",
        "name": "MCQUINIFF JAMES LOGAN",
        "designator": "1110",
        "currentCommand": "LPD 28 FT LAUD",
        "prd": "2026-08-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20080,
        "billet": "XO AFLOAT",
        "csr": "7AGAZ",
        "assignedSlate": "3rd Look CO Afloat",
        "preferredLocations": [
            "NF",
            "EV",
            "PH",
            "MP",
            "SD"
        ],
        "preferredPlatforms": [
            "DDG",
            "LSD",
            "LCS"
        ],
        "preferencePriority": "Homeport"
    },
    {
        "id": "stoorzajoelelsworth_21",
        "rank": "CDR",
        "name": "STOORZA JOEL ELSWORTH",
        "designator": "1110",
        "currentCommand": "NAVAL ACAD",
        "prd": "2028-12-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20080,
        "billet": "XO AFLOAT",
        "csr": "7AGAZ",
        "assignedSlate": "3rd Look CO Afloat",
        "preferredLocations": [
            "RS",
            "SD",
            "NF",
            "YJ",
            "SJ"
        ],
        "preferredPlatforms": [
            "DDG",
            "LSD",
            "LCS"
        ],
        "preferencePriority": "Homeport"
    },
    {
        "id": "woymatimothy_13",
        "rank": "LCDR",
        "name": "WOYMA TIMOTHY",
        "designator": "1110",
        "currentCommand": "ATG NORFOLK",
        "prd": "2028-10-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20090,
        "billet": "STF REDI GEN/DIR",
        "csr": "4AGAZ",
        "assignedSlate": "No Command Opprotunity",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null
    },
    {
        "id": "kleinematthewr_16",
        "rank": "CDR",
        "name": "KLEINE MATTHEW R",
        "designator": "1110",
        "currentCommand": "USNORTHCOM",
        "prd": "2026-12-01",
        "preferences": [],
        "status": "Joint Lock",
        "notes": "",
        "yearGroup": 20090,
        "billet": "CAG STRATEGIST",
        "csr": "6AGAZ",
        "assignedSlate": "3rd Look CO Afloat",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null
    },
    {
        "id": "grayboschbenjaminthomas_25",
        "rank": "CDR",
        "name": "GRAYBOSCH BENJAMIN THOMAS",
        "designator": "1110",
        "currentCommand": "COMNAVFORJAPAN",
        "prd": "2028-10-01",
        "preferences": [],
        "status": "Defer",
        "notes": "",
        "yearGroup": 20090,
        "billet": "STF OPS&PLN/OPS",
        "csr": "7AGAZ",
        "assignedSlate": "3rd Look CO Afloat",
        "preferredLocations": [
            "YJ",
            "SJ",
            "PH",
            "EV",
            "RS"
        ],
        "preferredPlatforms": [
            "DDG",
            "LCS",
            "LSD"
        ],
        "preferencePriority": "Homeport"
    },
    {
        "id": "karlobrianj_13",
        "rank": "CDR",
        "name": "KARLO BRIAN J",
        "designator": "1110",
        "currentCommand": "COMNAVSURFLANT",
        "prd": "2028-10-01",
        "preferences": [],
        "status": "Ready FF",
        "notes": "",
        "yearGroup": 20090,
        "billet": "HRM/FORCE SAPR PGM",
        "csr": "7AGAZ",
        "assignedSlate": "3rd Look CO Afloat",
        "preferredLocations": [
            "EV",
            "YJ",
            "RS",
            "PH",
            "NF"
        ],
        "preferredPlatforms": [
            "DDG",
            "DDG",
            "DDG"
        ],
        "preferencePriority": "Homeport"
    },
    {
        "id": "longandrewj_13",
        "rank": "CDR",
        "name": "LONG ANDREW J",
        "designator": "1110",
        "currentCommand": "CG 71 CP ST GORG",
        "prd": "2026-01-01",
        "preferences": [],
        "status": "Ready FF",
        "notes": "",
        "yearGroup": 20090,
        "billet": "XO AFLOAT",
        "csr": "7AGAZ",
        "assignedSlate": "3rd Look CO Afloat",
        "preferredLocations": [
            "PH",
            "SD",
            "RS",
            "YJ",
            "EV"
        ],
        "preferredPlatforms": [
            "DDG",
            "LCS",
            "LSD"
        ],
        "preferencePriority": "Homeport"
    },
    {
        "id": "wildemannbrianam_18",
        "rank": "CDR",
        "name": "WILDEMANN BRIANA M",
        "designator": "1110",
        "currentCommand": "LPD 24 ARLINGTON",
        "prd": "2026-05-01",
        "preferences": [],
        "status": "Family Planning",
        "notes": "",
        "yearGroup": 20090,
        "billet": "XO AFLOAT",
        "csr": "7AGAZ",
        "assignedSlate": "3rd Look CO Afloat",
        "preferredLocations": [
            "NF",
            "MP",
            "EV",
            "SD",
            "RS"
        ],
        "preferredPlatforms": [
            "LSD",
            "DDG",
            "LCS"
        ],
        "preferencePriority": "Homeport"
    },
    {
        "id": "asanteosei_11",
        "rank": "CDR",
        "name": "ASANTE OSEI",
        "designator": "1110",
        "currentCommand": "LPD 22 SAN DIEGO",
        "prd": "2026-07-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20100,
        "billet": "XO AFLOAT",
        "csr": "7AGAZ",
        "assignedSlate": "3rd Look CO Afloat",
        "preferredLocations": [
            "PH",
            "RS",
            "SD",
            "YJ",
            "MP"
        ],
        "preferredPlatforms": [
            "DDG",
            "LSD",
            "LCS"
        ],
        "preferencePriority": "Homeport"
    },
    {
        "id": "gearyshaunm_13",
        "rank": "CDR",
        "name": "GEARY SHAUN M",
        "designator": "1110",
        "currentCommand": "CG 67 SHILOH",
        "prd": "2026-07-01",
        "preferences": [],
        "status": "Defer",
        "notes": "",
        "yearGroup": 20100,
        "billet": "XO AFLOAT",
        "csr": "7AGAZ",
        "assignedSlate": "3rd Look CO Afloat",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null
    },
    {
        "id": "knapprobertm_14",
        "rank": "CDR",
        "name": "KNAPP ROBERT M",
        "designator": "1110",
        "currentCommand": "CCSG 2",
        "prd": "2029-05-01",
        "preferences": [],
        "status": "Ready FF",
        "notes": "",
        "yearGroup": 20100,
        "csr": "7AGAZ",
        "assignedSlate": "3rd Look CO Afloat",
        "preferredLocations": [
            "NF",
            "SD",
            "MP",
            "EV",
            "PH"
        ],
        "preferredPlatforms": [
            "DDG",
            "LCS",
            "LSD"
        ],
        "preferencePriority": "Homeport"
    },
    {
        "id": "lairtravisalton_17",
        "rank": "CDR",
        "name": "LAIR TRAVIS ALTON",
        "designator": "1110",
        "currentCommand": "DDG 125 J LUCAS",
        "prd": "2026-07-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20100,
        "billet": "XO AFLOAT",
        "csr": "7AGAZ",
        "assignedSlate": "3rd Look CO Afloat",
        "preferredLocations": [
            "SD",
            "PH",
            "RS",
            "MP",
            "EV"
        ],
        "preferredPlatforms": [
            "DDG",
            "LCS",
            "LSD"
        ],
        "preferencePriority": "Homeport"
    },
    {
        "id": "shafferdavidgipson_20",
        "rank": "CDR",
        "name": "SHAFFER DAVID GIPSON",
        "designator": "1110",
        "currentCommand": "LPD 27 PORTLAND",
        "prd": "2026-05-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20100,
        "billet": "XO AFLOAT",
        "csr": "7AGAZ",
        "assignedSlate": "3rd Look CO Afloat",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null
    },
    {
        "id": "violanteangelinarose_22",
        "rank": "CDR",
        "name": "VIOLANTE ANGELINA ROSE",
        "designator": "1110",
        "currentCommand": "SMWDC",
        "prd": "2028-10-01",
        "preferences": [],
        "status": "Family Planning",
        "notes": "",
        "yearGroup": 20100,
        "billet": "STF REDI GEN",
        "csr": "7AGAZ",
        "assignedSlate": "3rd Look CO Afloat",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null
    },
    {
        "id": "andrewsryannicholas_21",
        "rank": "CDR",
        "name": "ANDREWS RYAN NICHOLAS",
        "designator": "1110",
        "currentCommand": "S NWARCOL NPT RI",
        "prd": "2027-03-01",
        "preferences": [],
        "status": "War College",
        "notes": "",
        "yearGroup": 20090,
        "billet": "STUDENT",
        "csr": "7AGAZ",
        "assignedSlate": "3rd Look CO Afloat",
        "preferredLocations": [
            "EV",
            "MP",
            "RS",
            "PH",
            "SD"
        ],
        "preferredPlatforms": [
            "DDG",
            "LSD",
            "LCS"
        ],
        "preferencePriority": "Homeport"
    },
    {
        "id": "ashinhurstnathand_19",
        "rank": "LCDR",
        "name": "ASHINHURST NATHAN D",
        "designator": "1110",
        "currentCommand": "AFLTRGRLT EATQ",
        "prd": "2026-10-01",
        "preferences": [],
        "status": "Slated",
        "notes": "",
        "yearGroup": 20110,
        "billet": "CDR ENG ASSESS",
        "csr": "6AGAZ",
        "assignedSlate": "FY26 2nd Look ",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "Slated",
        "tentativeSlate": "USS BELOIT (LCS 29)"
    },
    {
        "id": "blankenshipnicholass_22",
        "rank": "CDR",
        "name": "BLANKENSHIP NICHOLAS S",
        "designator": "1110",
        "currentCommand": "J7 DJTFD SUFFOLK",
        "prd": "2026-07-01",
        "preferences": [],
        "status": "Slated",
        "notes": "",
        "yearGroup": 20110,
        "billet": "OPS/EXEC ASSISTANT",
        "csr": "5AGAZ",
        "assignedSlate": "FY25 1st Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "Slated",
        "tentativeSlate": "USS PORTER (DDG 78)"
    },
    {
        "id": "boilyjustinallen_18",
        "rank": "LCDR",
        "name": "BOILY JUSTIN ALLEN",
        "designator": "1110",
        "currentCommand": "STU MARCORP U",
        "prd": "2025-11-01",
        "preferences": [],
        "status": "Slated",
        "notes": "",
        "yearGroup": 20110,
        "csr": "6AGAZ",
        "assignedSlate": "FY26 2nd Look ",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "Slated",
        "tentativeSlate": "USS CHAFEE (DDG 90)"
    },
    {
        "id": "dresserthomasm_16",
        "rank": "CDR",
        "name": "DRESSER THOMAS M",
        "designator": "1117",
        "currentCommand": "MCM 6 DEVASTATOR",
        "prd": "2025-09-01",
        "preferences": [],
        "status": "Slated",
        "notes": "",
        "yearGroup": 20110,
        "billet": "CO AFLOAT LCDR",
        "csr": "5AGAZ",
        "assignedSlate": "FY25 1st Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "Slated",
        "tentativeSlate": "USS KINGSVILLE (LCS 36)"
    },
    {
        "id": "fieldsericr_13",
        "rank": "LCDR",
        "name": "FIELDS ERIC R",
        "designator": "1110",
        "currentCommand": "OPNAV",
        "prd": "2025-10-01",
        "preferences": [],
        "status": "Slated",
        "notes": "",
        "yearGroup": 20110,
        "billet": "AIDE/N09A1 NAVAL AIDE TO VCNO",
        "csr": "6AGAZ",
        "assignedSlate": "FY26 2nd Look ",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "Slated",
        "tentativeSlate": "USS HARVEY C. BARNUM (DDG 124)"
    },
    {
        "id": "hartmanndavidr_16",
        "rank": "LCDR",
        "name": "HARTMANN DAVID R",
        "designator": "1110",
        "currentCommand": "S NWARCOL NPT RI",
        "prd": "2026-06-01",
        "preferences": [],
        "status": "Slated",
        "notes": "",
        "yearGroup": 20100,
        "billet": "OPS ANAL/N522 IRREGULAR WARFARE AO",
        "csr": "5AGAZ",
        "assignedSlate": "FY26 2nd Look ",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "Slated",
        "tentativeSlate": "USS CANBERRA (LCS 30)"
    },
    {
        "id": "hornejohnharrison_19",
        "rank": "LCDR",
        "name": "HORNE JOHN HARRISON",
        "designator": "1110",
        "currentCommand": "ASN FMC",
        "prd": "2024-09-01",
        "preferences": [],
        "status": "Slated",
        "notes": "",
        "yearGroup": 20110,
        "billet": "INTRAGOVTINQ/ASST (SURF WF)",
        "csr": "5AGAZ",
        "assignedSlate": "FY25 1st Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "Slated",
        "tentativeSlate": "USS RALPH JOHNSON (DDG 114)"
    },
    {
        "id": "jaindlrobertjohniii_22",
        "rank": "LCDR",
        "name": "JAINDL ROBERT JOHN III",
        "designator": "1110",
        "currentCommand": "CNAP NPMTT TM",
        "prd": "2024-07-01",
        "preferences": [],
        "status": "Slated",
        "notes": "",
        "yearGroup": 20100,
        "billet": "OIC SHR ACT/SHP ENG NUCGEN",
        "csr": "5AGAZ",
        "assignedSlate": "FY25 2nd Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "Slated",
        "tentativeSlate": "USS CLEVELAND (LCS 31)"
    },
    {
        "id": "kimhyungik_12",
        "rank": "LCDR",
        "name": "KIM HYUNG IK",
        "designator": "1110",
        "currentCommand": "OPNAV",
        "prd": "2024-08-01",
        "preferences": [],
        "status": "Slated",
        "notes": "",
        "yearGroup": 20100,
        "billet": "STF PLN/ASST FOR STRAT ACTIONS GRP",
        "csr": "3AGAZ",
        "assignedSlate": "FY23 1st Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "Slated",
        "tentativeSlate": "USS KIDD (DDG 100)"
    },
    {
        "id": "lavoiepaulryan_16",
        "rank": "LCDR",
        "name": "LAVOIE PAUL RYAN",
        "designator": "1110",
        "currentCommand": "OPNAV",
        "prd": "2024-04-01",
        "preferences": [],
        "status": "Slated",
        "notes": "",
        "yearGroup": 20090,
        "billet": "STF OPS&PLN/N301 EXER SUP",
        "csr": "4AGAZ",
        "assignedSlate": "FY24 2nd Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "Slated",
        "tentativeSlate": "USS HOWARD (DDG 83)"
    },
    {
        "id": "mahermyronjameskelliii_26",
        "rank": "LCDR",
        "name": "MAHER MYRON JAMES KELL III",
        "designator": "1110",
        "currentCommand": "COMNAVSURFLANT",
        "prd": "2025-02-01",
        "preferences": [],
        "status": "Slated",
        "notes": "",
        "yearGroup": 20100,
        "billet": "CDR ENG ASSESS",
        "csr": "5AGAZ",
        "assignedSlate": "FY25 2nd Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "Slated",
        "tentativeSlate": "USS MAHAN (DDG 72)"
    },
    {
        "id": "millsjoshual_14",
        "rank": "LCDR",
        "name": "MILLS JOSHUA L",
        "designator": "1110",
        "currentCommand": "OPNAV",
        "prd": "2024-10-01",
        "preferences": [],
        "status": "Slated",
        "notes": "",
        "yearGroup": 20100,
        "billet": "STF PLN/DCIP/FLEET I&I TD/EKMS/N9IX3",
        "csr": "4AGAZ",
        "assignedSlate": "FY24 1st Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "Slated",
        "tentativeSlate": "USS MOMSEN (DDG 92)"
    },
    {
        "id": "moorecolcorddaniels_21",
        "rank": "LCDR",
        "name": "MOORE COLCORD DANIELS",
        "designator": "1110",
        "currentCommand": "COMSIXTHFLT",
        "prd": "2026-07-01",
        "preferences": [],
        "status": "Slated",
        "notes": "",
        "yearGroup": 20110,
        "billet": "STF TSC OFF",
        "csr": "5AGAZ",
        "assignedSlate": "FY25 1st Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "Slated",
        "tentativeSlate": "USS SULLIVANS (DDG 68)"
    },
    {
        "id": "sandersraymondalanjr_23",
        "rank": "LCDR",
        "name": "SANDERS RAYMOND ALAN JR",
        "designator": "1110",
        "currentCommand": "CNAVPERSCOM MILL",
        "prd": "2024-08-01",
        "preferences": [],
        "status": "Slated",
        "notes": "",
        "yearGroup": 20110,
        "billet": "PERS DIST OFF/BR HD/SURF SHIP PLCMT",
        "csr": "5AGAZ",
        "assignedSlate": "FY25 1st Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "Slated",
        "tentativeSlate": "USS TORTUGA (LSD 46)"
    },
    {
        "id": "smithbrianconley_18",
        "rank": "LCDR",
        "name": "SMITH BRIAN CONLEY",
        "designator": "1117",
        "currentCommand": "NRC PHARBOR HI",
        "prd": "2024-12-01",
        "preferences": [],
        "status": "Slated",
        "notes": "",
        "yearGroup": 20060,
        "billet": "XO SHR ACT",
        "csr": "4AGAZ",
        "assignedSlate": "FY24 2nd Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "Slated",
        "tentativeSlate": "USS MICHAEL MURPHY (DDG 112)"
    },
    {
        "id": "carballocarlosalberto_23",
        "rank": "CDR",
        "name": "CARBALLO CARLOS ALBERTO",
        "designator": "1110",
        "currentCommand": "SCSTC SAN DIEGO",
        "prd": "2028-11-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20090,
        "billet": "XO SHR ACT",
        "csr": "4AGAZ",
        "assignedSlate": "FY24 2nd Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "",
        "tentativeSlate": "26-2"
    },
    {
        "id": "vansicekara_12",
        "rank": "LCDR",
        "name": "VANSICE KARA",
        "designator": "1110",
        "currentCommand": "CNAVPERSCOM MILL",
        "prd": "2027-03-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20120,
        "billet": "PERS DIST OFF/NUC DTLR",
        "csr": "6AGAZ",
        "assignedSlate": "FY26 1st Look",
        "preferredLocations": [
            "NF",
            "PH",
            "SD",
            "MP",
            "EV"
        ],
        "preferredPlatforms": [
            "DDG",
            "LCS",
            "LSD"
        ],
        "preferencePriority": "Homeport",
        "listShift": "",
        "tentativeSlate": "26-2"
    },
    {
        "id": "stopchickandrewmichael_24",
        "rank": "LCDR",
        "name": "STOPCHICK ANDREW MICHAEL",
        "designator": "1110",
        "currentCommand": "S NWARCOL NPT RI",
        "prd": "2027-02-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20110,
        "billet": "STUDENT",
        "csr": "5AGAZ",
        "assignedSlate": "FY25 1st Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "",
        "tentativeSlate": "26-2"
    },
    {
        "id": "eddygarym_11",
        "rank": "LCDR",
        "name": "EDDY GARY M",
        "designator": "1110",
        "currentCommand": "SMWDC DET LCRK",
        "prd": "2027-01-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20110,
        "billet": "STF OPS&PLN/IAMD LEAD WTI",
        "csr": "5AGAZ",
        "assignedSlate": "FY25 1st Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "",
        "tentativeSlate": "26-2"
    },
    {
        "id": "englishjayc_13",
        "rank": "CDR",
        "name": "ENGLISH JAY C",
        "designator": "1110",
        "currentCommand": "SMWDC",
        "prd": "2028-05-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20100,
        "billet": "STF REDI TAC/N5 DEPUTY",
        "csr": "6AGAZ",
        "assignedSlate": "FY26 2nd Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "",
        "tentativeSlate": "26-2"
    },
    {
        "id": "tyeandrewj_12",
        "rank": "CDR",
        "name": "TYE ANDREW J",
        "designator": "1110",
        "currentCommand": "S NWARCOL NPT RI",
        "prd": "2026-09-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20110,
        "billet": "STUDENT",
        "csr": "6AGAZ",
        "assignedSlate": "FY26 2nd Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "",
        "tentativeSlate": "26-2"
    },
    {
        "id": "geddesemilyelizabeth_22",
        "rank": "CDR",
        "name": "GEDDES EMILY ELIZABETH",
        "designator": "1110",
        "currentCommand": "ATG NORFOLK",
        "prd": "2026-07-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20080,
        "billet": "XO SHR ACT",
        "csr": "2AGAZ",
        "assignedSlate": "FY22 1st Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "",
        "tentativeSlate": "26-2"
    },
    {
        "id": "kowatchjustinedward_21",
        "rank": "LCDR",
        "name": "KOWATCH JUSTIN EDWARD",
        "designator": "1110",
        "currentCommand": "ACU 5 SHORE COMP",
        "prd": "2028-06-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20100,
        "billet": "OPS AFLOAT GEN",
        "csr": "6AGAZ",
        "assignedSlate": "FY26 2nd Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "",
        "tentativeSlate": "26-2"
    },
    {
        "id": "strifflerbriangarret_22",
        "rank": "LCDR",
        "name": "STRIFFLER BRIAN GARRET",
        "designator": "1110",
        "currentCommand": "OPNAV",
        "prd": "2026-07-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20110,
        "billet": "STF OPS & PLN/N721 ANALYTICS",
        "csr": "6AGAZ",
        "assignedSlate": "FY26 2nd Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "",
        "tentativeSlate": "26-2"
    },
    {
        "id": "withrowgraigallen_19",
        "rank": "LCDR",
        "name": "WITHROW GRAIG ALLEN",
        "designator": "1110",
        "currentCommand": "CNSG MIDLANT",
        "prd": "2028-09-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20110,
        "billet": "PERS DIST GEN",
        "csr": "6AGAZ",
        "assignedSlate": "FY26 2nd Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "",
        "tentativeSlate": "26-2"
    },
    {
        "id": "tanalegajohnfrancis_21",
        "rank": "LCDR",
        "name": "TANALEGA JOHN FRANCIS",
        "designator": "1110",
        "currentCommand": "OSD",
        "prd": "2026-09-01",
        "preferences": [],
        "status": "Joint Lock",
        "notes": "",
        "yearGroup": 20110,
        "billet": "DEFENSE ACQ PROG ANALYST/03018217",
        "csr": "5AGAZ",
        "assignedSlate": "FY25 1st Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "",
        "tentativeSlate": "26-2"
    },
    {
        "id": "gubanchamiltonr_17",
        "rank": "LCDR",
        "name": "GUBANC HAMILTON R",
        "designator": "1110",
        "currentCommand": "JS J7 HAMPTON RD",
        "prd": "2026-08-01",
        "preferences": [],
        "status": "Joint Lock",
        "notes": "",
        "yearGroup": 20110,
        "billet": "JOINT INFO SHARING O/T",
        "csr": "5AGAZ",
        "assignedSlate": "FY25 1st Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "",
        "tentativeSlate": "26-2"
    },
    {
        "id": "tenagliamichaeljoseph_23",
        "rank": "CDR",
        "name": "TENAGLIA MICHAEL JOSEPH",
        "designator": "1110",
        "currentCommand": "MSTCLANT NORF VA",
        "prd": "2028-05-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20110,
        "billet": "INST TECH/INST A MARINER SKILLS",
        "csr": "5AGAZ",
        "assignedSlate": "FY25 1st Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "",
        "tentativeSlate": "26-2"
    },
    {
        "id": "smithcodyt_12",
        "rank": "LCDR",
        "name": "SMITH CODY T",
        "designator": "1110",
        "currentCommand": "COMNAVSURFPAC",
        "prd": "2026-04-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20110,
        "billet": "STF REDI GEN/LCS TRNG & REDI",
        "csr": "6AGAZ",
        "assignedSlate": "FY26 2nd Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "",
        "tentativeSlate": "26-2"
    },
    {
        "id": "vandecastlethomasedward_25",
        "rank": "CDR",
        "name": "VANDECASTLE THOMAS EDWARD",
        "designator": "1110",
        "currentCommand": "JS J7 HAMPTON RD",
        "prd": "2026-07-01",
        "preferences": [],
        "status": "Joint Lock",
        "notes": "",
        "yearGroup": 20100,
        "billet": "JOINT COMMS STRAT",
        "csr": "5AGAZ",
        "assignedSlate": "FY25 2nd Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "",
        "tentativeSlate": "26-2"
    },
    {
        "id": "stensonfosterparris_21",
        "rank": "CDR",
        "name": "STENSON FOSTER PARRIS",
        "designator": "1110",
        "currentCommand": "JS J7 HAMPTON RD",
        "prd": "2026-07-01",
        "preferences": [],
        "status": "Joint Lock",
        "notes": "",
        "yearGroup": 20100,
        "billet": "OPERATIONS STAFF/STF OPS&PLN00074018",
        "csr": "4AGAZ",
        "assignedSlate": "FY24 1st Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "",
        "tentativeSlate": "26-2"
    },
    {
        "id": "collinstravisanthony_22",
        "rank": "CDR",
        "name": "COLLINS TRAVIS ANTHONY",
        "designator": "1110",
        "currentCommand": "CNSG WP YOKO",
        "prd": "2027-03-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20110,
        "billet": "STF OPS & PLN",
        "csr": "5AGAZ",
        "assignedSlate": "FY25 1st Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "",
        "tentativeSlate": "26-2"
    },
    {
        "id": "whitmerandrewrobert_21",
        "rank": "LCDR",
        "name": "WHITMER ANDREW ROBERT",
        "designator": "1110",
        "currentCommand": "SCSTC SAN DIEGO",
        "prd": "2027-07-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20110,
        "billet": "SCHL ADMIN/TRNG OPS SUPV/ADOT",
        "csr": "6AGAZ",
        "assignedSlate": "FY26 2nd Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "",
        "tentativeSlate": "26-2"
    },
    {
        "id": "kammwilliamg_14",
        "rank": "CDR",
        "name": "KAMM WILLIAM G",
        "designator": "1110",
        "currentCommand": "JCS WASH DC",
        "prd": "2026-11-01",
        "preferences": [],
        "status": "Joint Lock",
        "notes": "",
        "yearGroup": 20110,
        "billet": "CAPABILITIES BH CHF/WPN MTL GEN/0000966",
        "csr": "5AGAZ",
        "assignedSlate": "FY25 1st Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "",
        "tentativeSlate": "26-2"
    },
    {
        "id": "ballantynebryanjeffrey_24",
        "rank": "LCDR",
        "name": "BALLANTYNE BRYAN JEFFREY",
        "designator": "1110",
        "currentCommand": "TRANSCOM HD",
        "prd": "2026-11-01",
        "preferences": [],
        "status": "Hold",
        "notes": "Turning down Command",
        "yearGroup": 20110,
        "billet": "NCAGS SCT/JT TRANS PLANS OFF/00005863",
        "csr": "6AGAZ",
        "assignedSlate": "FY26 2nd Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "",
        "tentativeSlate": "26-2"
    },
    {
        "id": "piresmichaeljoseph_20",
        "rank": "LCDR",
        "name": "PIRES MICHAEL JOSEPH",
        "designator": "1110",
        "currentCommand": "CENTCOM HQ",
        "prd": "2026-09-01",
        "preferences": [],
        "status": "Joint Lock",
        "notes": "",
        "yearGroup": 20110,
        "billet": "OPERATIONS OFFICER/00011084/",
        "csr": "6AGAZ",
        "assignedSlate": "FY26 2nd Look ",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "",
        "tentativeSlate": "26-2"
    },
    {
        "id": "geerrichardgreyson_20",
        "rank": "CDR",
        "name": "GEER RICHARD GREYSON",
        "designator": "1110",
        "currentCommand": "SWSC NEWPORT RI",
        "prd": "2024-07-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20100,
        "billet": "INST TECH/INST C SOSMRC DIR",
        "csr": "5AGAZ",
        "assignedSlate": "",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "",
        "tentativeSlate": "26-2"
    },
    {
        "id": "brinsonsamuelfelton_21",
        "rank": "LCDR",
        "name": "BRINSON SAMUEL FELTON",
        "designator": "1110",
        "currentCommand": "MSTCLANT NORF VA",
        "prd": "2028-02-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20100,
        "billet": "INST TECH/INST A BDOC MARITIME",
        "csr": "6AGAZ",
        "assignedSlate": "FY26 1st Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "",
        "tentativeSlate": "26-2"
    },
    {
        "id": "faltsusanlois_15",
        "rank": "LCDR",
        "name": "FALT SUSAN LOIS",
        "designator": "1110",
        "currentCommand": "JCS WASH DC",
        "prd": "2027-04-01",
        "preferences": [],
        "status": "Joint Lock",
        "notes": "",
        "yearGroup": 20110,
        "billet": "POL-MIL PLNR/00001146",
        "csr": "6AGAZ",
        "assignedSlate": "FY26 2nd Look",
        "preferredLocations": [
            "NF",
            "MP",
            "SD",
            "RS",
            "EV"
        ],
        "preferredPlatforms": [
            "LSD",
            "LCS",
            "DDG"
        ],
        "preferencePriority": "Homeport",
        "listShift": "",
        "tentativeSlate": "26-3"
    },
    {
        "id": "kellydanielpatrick_20",
        "rank": "CDR",
        "name": "KELLY DANIEL PATRICK",
        "designator": "1110",
        "currentCommand": "CYBR NTL MSN FCE",
        "prd": "2027-03-01",
        "preferences": [],
        "status": "Joint Lock",
        "notes": "",
        "yearGroup": 20110,
        "billet": "STF OPS&PLN/DPTY DIR J5/00135919",
        "csr": "6AGAZ",
        "assignedSlate": "FY26 2nd Look",
        "preferredLocations": [
            "NF",
            "MP",
            "SD",
            "RS",
            "EV"
        ],
        "preferredPlatforms": [
            "DDG",
            "LCS",
            "LSD"
        ],
        "preferencePriority": "Homeport",
        "listShift": "",
        "tentativeSlate": "26-3"
    },
    {
        "id": "lazottraymondt_16",
        "rank": "CDR",
        "name": "LAZOTT RAYMOND T",
        "designator": "1110",
        "currentCommand": "S LEGIS FEL PRG",
        "prd": "2026-11-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20120,
        "billet": "",
        "csr": "6AGAZ",
        "assignedSlate": "FY26 1st Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "",
        "tentativeSlate": "26-3"
    },
    {
        "id": "turnertravismichael_21",
        "rank": "CDR",
        "name": "TURNER TRAVIS MICHAEL",
        "designator": "1110",
        "currentCommand": "CNAVPERSCOM MILL",
        "prd": "2027-07-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20110,
        "billet": "PERS DIST ENL/HD SHORE ALLOC/PLCMT",
        "csr": "6AGAZ",
        "assignedSlate": "FY26 1st Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "",
        "tentativeSlate": "26-3"
    },
    {
        "id": "eudyclairesmith_17",
        "rank": "LCDR",
        "name": "EUDY CLAIRE SMITH",
        "designator": "1110",
        "currentCommand": "SOUTHCM MIAMI FL",
        "prd": "2027-03-01",
        "preferences": [],
        "status": "Joint Lock",
        "notes": "",
        "yearGroup": 20110,
        "billet": "CURRENT OPS OFF (MARITIME)/00006316",
        "csr": "5AGAZ",
        "assignedSlate": "FY25 1st Look",
        "preferredLocations": [
            "SD",
            "NF",
            "MP",
            "EV",
            "RS"
        ],
        "preferredPlatforms": [
            "LSD",
            "DDG",
            "LCS"
        ],
        "preferencePriority": "Homeport",
        "listShift": "",
        "tentativeSlate": "26-3"
    },
    {
        "id": "poundersmichaelryan_21",
        "rank": "CDR",
        "name": "POUNDERS MICHAEL RYAN",
        "designator": "1110",
        "currentCommand": "CNAVPERSCOM MILL",
        "prd": "2025-12-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20110,
        "billet": "PERS DIST OFF/SURF CDR/LCDR DIST",
        "csr": "6AGAZ",
        "assignedSlate": "FY26 1st Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "",
        "tentativeSlate": "26-3"
    },
    {
        "id": "bakertimothyp_15",
        "rank": "CDR",
        "name": "BAKER TIMOTHY P",
        "designator": "1110",
        "currentCommand": "COMSEVENTHFLT",
        "prd": "2026-09-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20100,
        "billet": "STF OPS&PLN",
        "csr": "4AGAZ",
        "assignedSlate": "FY24 1st Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "",
        "tentativeSlate": "26-3"
    },
    {
        "id": "mcfarlandweixinmatsuoka_25",
        "rank": "CDR",
        "name": "MCFARLAND WEIXIN MATSUOKA",
        "designator": "1110",
        "currentCommand": "USINDOPACOM",
        "prd": "2027-01-01",
        "preferences": [],
        "status": "Joint Lock",
        "notes": "",
        "yearGroup": 20100,
        "billet": "CH, THEATHER EXERCISES BR/00041546/",
        "csr": "5AGAZ",
        "assignedSlate": "FY25 2nd Look",
        "preferredLocations": [
            "PH",
            "SD",
            "YJ",
            "MP",
            "NF"
        ],
        "preferredPlatforms": [
            "DDG",
            "LCS",
            "LSD"
        ],
        "preferencePriority": "Homeport",
        "listShift": "",
        "tentativeSlate": "26-3"
    },
    {
        "id": "haywoodanthonyjiii_21",
        "rank": "CDR",
        "name": "HAYWOOD ANTHONY J III",
        "designator": "1110",
        "currentCommand": "USINDOPACOM",
        "prd": "2027-02-01",
        "preferences": [],
        "status": "Joint Lock",
        "notes": "",
        "yearGroup": 20110,
        "billet": "COUNTRY DESK OFCR(CDO)/00007903/",
        "csr": "6AGAZ",
        "assignedSlate": "FY26 2nd Look",
        "preferredLocations": [
            "PH",
            "YJ",
            "SD",
            "RS",
            "EV"
        ],
        "preferredPlatforms": [
            "DDG",
            "LCS",
            "LSD"
        ],
        "preferencePriority": "Homeport",
        "listShift": "",
        "tentativeSlate": "26-3"
    },
    {
        "id": "rooneysierragrace_19",
        "rank": "LCDR",
        "name": "ROONEY SIERRA GRACE",
        "designator": "1110",
        "currentCommand": "JCS WASH DC",
        "prd": "2027-01-01",
        "preferences": [],
        "status": "Retire",
        "notes": "Submitting Retirement",
        "yearGroup": 20110,
        "billet": "POL-MIL PLANNER/00001079",
        "csr": "6AGAZ",
        "assignedSlate": "FY26 2nd Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "",
        "tentativeSlate": "26-3"
    },
    {
        "id": "bukowskycliftonrayii_23",
        "rank": "LCDR",
        "name": "BUKOWSKY CLIFTON RAY II",
        "designator": "1110",
        "currentCommand": "SMWDC DET LCRK",
        "prd": "2025-11-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20110,
        "billet": "STF REDI TAC/BRANCH HD (N5)",
        "csr": "6AGAZ",
        "assignedSlate": "FY26 2nd Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "",
        "tentativeSlate": "26-3"
    },
    {
        "id": "blalockwilliamcarson_22",
        "rank": "LCDR",
        "name": "BLALOCK WILLIAM CARSON",
        "designator": "1110",
        "currentCommand": "CNAVPERSCOM MILL",
        "prd": "2028-10-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20110,
        "billet": "PERS PLN/ACTION OFFICER",
        "csr": "6AGAZ",
        "assignedSlate": "FY26 2nd Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "",
        "tentativeSlate": "26-3"
    },
    {
        "id": "bowenbradleyj_15",
        "rank": "LCDR",
        "name": "BOWEN BRADLEY J",
        "designator": "1110",
        "currentCommand": "COMNAVSURFPAC",
        "prd": "2028-04-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20110,
        "billet": "FLAG LT",
        "csr": "6AGAZ",
        "assignedSlate": "FY26 2nd Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "",
        "tentativeSlate": "26-3"
    },
    {
        "id": "dennellytimothyr_18",
        "rank": "LCDR",
        "name": "DENNELLY TIMOTHY R",
        "designator": "1110",
        "currentCommand": "AFLTRAGRUMP P H",
        "prd": "2028-11-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20110,
        "billet": "STF REDI WEP",
        "csr": "6AGAZ",
        "assignedSlate": "FY26 2nd Look",
        "preferredLocations": [
            "MP ",
            "SD",
            "EV",
            "PH",
            "NF"
        ],
        "preferredPlatforms": [
            "LCS",
            "DDG",
            "LSD"
        ],
        "preferencePriority": "Homeport",
        "listShift": "",
        "tentativeSlate": "26-3"
    },
    {
        "id": "hettebergtimothyj_19",
        "rank": "LCDR",
        "name": "HETTEBERG TIMOTHY J",
        "designator": "1110",
        "currentCommand": "COMNAVSURFLANT",
        "prd": "2028-06-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20110,
        "billet": "STF OPS&PLN/CURRENT OPS",
        "csr": "6AGAZ",
        "assignedSlate": "FY26 2nd Look",
        "preferredLocations": [
            "NF",
            "YJ",
            "EV",
            "RS",
            "PH"
        ],
        "preferredPlatforms": [
            "DDG",
            "LCS",
            "LSD"
        ],
        "preferencePriority": "Platform",
        "listShift": "",
        "tentativeSlate": "26-3"
    },
    {
        "id": "stewartjoshuajames_20",
        "rank": "LCDR",
        "name": "STEWART JOSHUA JAMES",
        "designator": "1110",
        "currentCommand": "SCSTC HAMPTON RD",
        "prd": "2028-06-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20110,
        "billet": "INST TECH/INST F CRU MSL",
        "csr": "6AGAZ",
        "assignedSlate": "FY26 2nd Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "",
        "tentativeSlate": "26-3"
    },
    {
        "id": "snellingmartharow_20",
        "rank": "LCDR",
        "name": "SNELLING, MARTHA ROW",
        "designator": "1110",
        "currentCommand": "MOC FLT FORCES",
        "prd": "2026-03-01",
        "preferences": [],
        "status": "Hold",
        "notes": "No JPME I Plan...",
        "yearGroup": 20090,
        "billet": "STFOPSCMDCENWO/MOC BWC",
        "csr": "6AGAZ",
        "assignedSlate": "FY26 2nd Look ",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "",
        "tentativeSlate": "26-3"
    },
    {
        "id": "allendavidmichael_19",
        "rank": "LCDR",
        "name": "ALLEN DAVID MICHAEL",
        "designator": "1110",
        "currentCommand": "USNORTHCOM",
        "prd": "2026-09-01",
        "preferences": [],
        "status": "Hold",
        "notes": "Going through a divorce that may force him to list shift.  Wife is becoming a cop in CO and they have a child.",
        "yearGroup": 20110,
        "billet": "PROGRAM ANALYST",
        "csr": "5AGAZ",
        "assignedSlate": "",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "",
        "tentativeSlate": "26-4"
    },
    {
        "id": "hansberrymarkroque_20",
        "rank": "CDR",
        "name": "HANSBERRY MARK ROQUE",
        "designator": "1110",
        "currentCommand": "CNAVPERSCOM MILL",
        "prd": "2027-05-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20110,
        "billet": "PERS DIST OFF/CRUDES PAC PLCMT",
        "csr": "6AGAZ",
        "assignedSlate": "FY26 2nd Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "",
        "tentativeSlate": "26-4"
    },
    {
        "id": "spangenbergelizabethj_23",
        "rank": "CDR",
        "name": "SPANGENBERG ELIZABETH J",
        "designator": "1110",
        "currentCommand": "OSD",
        "prd": "2026-06-01",
        "preferences": [],
        "status": "Family Planning",
        "notes": "",
        "yearGroup": 20090,
        "billet": "CHIEF STAFF OFFICER /03018196",
        "csr": "4AGAZ",
        "assignedSlate": "",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "",
        "tentativeSlate": "26-4"
    },
    {
        "id": "olivasbenjaminlucas_21",
        "rank": "LCDR",
        "name": "OLIVAS BENJAMIN LUCAS",
        "designator": "1110",
        "currentCommand": "OPNAV",
        "prd": "2028-05-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20110,
        "billet": "STF PLN/N96F BMD RO",
        "csr": "6AGAZ",
        "assignedSlate": "",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "",
        "tentativeSlate": "26-4"
    },
    {
        "id": "garciaericmichael_19",
        "rank": "LCDR",
        "name": "GARCIA ERIC MICHAEL",
        "designator": "1110",
        "currentCommand": "DIU DET NAVY SOC",
        "prd": "2028-07-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20110,
        "billet": "SURFACE WARFARE PROJECT OFFICER",
        "csr": "5AGAZ",
        "assignedSlate": "",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "",
        "tentativeSlate": "26-4"
    },
    {
        "id": "traversjosephbryanii_23",
        "rank": "LCDR",
        "name": "TRAVERS JOSEPH BRYAN II",
        "designator": "1110",
        "currentCommand": "STATE DEPT DC",
        "prd": "2028-06-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20110,
        "billet": "",
        "csr": "5AGAZ",
        "assignedSlate": "",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "",
        "tentativeSlate": "26-4"
    },
    {
        "id": "vanwinterroberteugene_24",
        "rank": "LCDR",
        "name": "VANWINTER ROBERT EUGENE ",
        "designator": "1110",
        "currentCommand": "CNAVPERSCOM MILL",
        "prd": "2026-12-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20130,
        "billet": "PERS DIST OFF/ASST SURF CAPT DIST",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 1st Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "",
        "tentativeSlate": "26-4"
    },
    {
        "id": "miyamasukatherinem_20",
        "rank": "LCDR",
        "name": "MIYAMASU KATHERINE M",
        "designator": "1110",
        "currentCommand": "OPNAV",
        "prd": "2028-11-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20110,
        "billet": "STF PLN/FLEET ARCHITECTURE AO/N9IX1",
        "csr": "6AGAZ",
        "assignedSlate": "FY26 2nd Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "",
        "tentativeSlate": "26-4"
    },
    {
        "id": "mullenryandavid_17",
        "rank": "LCDR",
        "name": "MULLEN RYAN DAVID",
        "designator": "1110",
        "currentCommand": "SOCPAC TSOC",
        "prd": "2027-04-01",
        "preferences": [],
        "status": "Joint Lock",
        "notes": "",
        "yearGroup": 20110,
        "billet": "CMBT SYS/MARITIME REQTS OFF/00129503",
        "csr": "6AGAZ",
        "assignedSlate": "FY26 2nd Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "",
        "tentativeSlate": "26-4"
    },
    {
        "id": "smithjonathanmark_19",
        "rank": "LCDR",
        "name": "SMITH JONATHAN MARK",
        "designator": "1110",
        "currentCommand": "PEO IWS",
        "prd": "2028-07-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20110,
        "billet": "MGR DPJ FE/IWSTD DEP TECH DIR",
        "csr": "6AGAZ",
        "assignedSlate": "FY26 2nd Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "",
        "tentativeSlate": "26-4"
    },
    {
        "id": "motenelizabethcatherine_25",
        "rank": "LCDR",
        "name": "MOTEN ELIZABETH CATHERINE",
        "designator": "1110",
        "currentCommand": "JCS WASH DC",
        "prd": "2027-05-01",
        "preferences": [],
        "status": "Joint Lock",
        "notes": "",
        "yearGroup": 20120,
        "billet": "BUDGET/DEFENSE RESOURCE MGR/00001657",
        "csr": "6AGAZ",
        "assignedSlate": "",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "",
        "tentativeSlate": "27-1"
    },
    {
        "id": "raystephenallen_17",
        "rank": "LCDR",
        "name": "RAY STEPHEN ALLEN",
        "designator": "1110",
        "currentCommand": "SCSTC ATRC DAHLG",
        "prd": "2028-07-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20120,
        "billet": "XO SHR ACT",
        "csr": "6AGAZ",
        "assignedSlate": "",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "",
        "tentativeSlate": "27-1"
    },
    {
        "id": "granatamarioanthony_21",
        "rank": "LCDR",
        "name": "GRANATA MARIO ANTHONY",
        "designator": "1110",
        "currentCommand": "S NWARCOL NPT RI",
        "prd": "2027-02-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20120,
        "billet": "STUDENT",
        "csr": "6AGAZ",
        "assignedSlate": "",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "",
        "tentativeSlate": "27-1"
    },
    {
        "id": "dinglasanjrvelayo_19",
        "rank": "LCDR",
        "name": "DINGLASAN JR VELAYO",
        "designator": "1110",
        "currentCommand": "SMWDC DET SAWS",
        "prd": "2026-09-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20110,
        "billet": "STF REDI TAC/IAMD WTI COI LEAD",
        "csr": "5AGAZ",
        "assignedSlate": "",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "",
        "tentativeSlate": "27-1"
    },
    {
        "id": "mielnikelysefrances_21",
        "rank": "LCDR",
        "name": "MIELNIK ELYSE FRANCES",
        "designator": "1110",
        "currentCommand": "OCSO USSF",
        "prd": "2027-07-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20110,
        "billet": "SLE FACULTY ADV C&S INST",
        "csr": "6AGAZ",
        "assignedSlate": "",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "",
        "tentativeSlate": "27-1"
    },
    {
        "id": "hardingchasee_15",
        "rank": "CDR",
        "name": "HARDING CHASE E",
        "designator": "1110",
        "currentCommand": "COMUSJAPAN",
        "prd": "2027-06-01",
        "preferences": [],
        "status": "Joint Lock",
        "notes": "",
        "yearGroup": 20100,
        "billet": "STRATEGIC PLANS OFFICER/00007527/",
        "csr": "6AGAZ",
        "assignedSlate": "",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "",
        "tentativeSlate": "27-1"
    },
    {
        "id": "lewiskelliannwoods_21",
        "rank": "LCDR",
        "name": "LEWIS KELLI ANN WOODS",
        "designator": "1110",
        "currentCommand": "MSTCPAC SAN DIEG",
        "prd": "2028-07-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20110,
        "billet": "XO SHR ACT",
        "csr": "5AGAZ",
        "assignedSlate": "",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "",
        "tentativeSlate": "27-1"
    },
    {
        "id": "flanaganjoshuaalexander_25",
        "rank": "LCDR",
        "name": "FLANAGAN JOSHUA ALEXANDER",
        "designator": "1110",
        "currentCommand": "SWSC NEWPORT RI",
        "prd": "2028-10-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20120,
        "billet": "INST TECH/INST C USW SUPV",
        "csr": "6AGAZ",
        "assignedSlate": "",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "",
        "tentativeSlate": "27-1"
    },
    {
        "id": "leeheatheri_13",
        "rank": "LCDR",
        "name": "LEE HEATHER I",
        "designator": "1110",
        "currentCommand": "USCINCPAC JIATFW",
        "prd": "2027-07-01",
        "preferences": [],
        "status": "Joint Lock",
        "notes": "",
        "yearGroup": 20110,
        "billet": "ASSISTANT COS FOR OPERATIONS/00007357/",
        "csr": "6AGAZ",
        "assignedSlate": "FY26 2nd Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "",
        "tentativeSlate": "27-1"
    },
    {
        "id": "kozlowskibenjaminward_23",
        "rank": "LCDR",
        "name": "KOZLOWSKI BENJAMIN WARD",
        "designator": "1110",
        "currentCommand": "CNAVPERSCOM MILL",
        "prd": "2028-02-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20130,
        "billet": "PERS DIST OFF/SURF CDR/LCDR DIST",
        "csr": "6AGAZ",
        "assignedSlate": "FY26 1st Look",
        "preferredLocations": [
            "NF",
            "RS",
            "MP",
            "PH",
            "SD"
        ],
        "preferredPlatforms": [
            "DDG",
            "LCS",
            "LSD"
        ],
        "preferencePriority": "Platform",
        "listShift": "",
        "tentativeSlate": "27-2"
    },
    {
        "id": "braymancourtneykieta_22",
        "rank": "LCDR",
        "name": "BRAYMAN COURTNEY KIETA",
        "designator": "1110",
        "currentCommand": "HQ MARCOM",
        "prd": "2027-08-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20110,
        "billet": "SECTION HEAD (EXERCISES)",
        "csr": "6AGAZ",
        "assignedSlate": "",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "",
        "tentativeSlate": "27-2"
    },
    {
        "id": "gilmoremclarenk_17",
        "rank": "LCDR",
        "name": "GILMORE MCLAREN K",
        "designator": "1110",
        "currentCommand": "JCS WASH DC",
        "prd": "2027-09-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20110,
        "billet": "STF OPS&PLN/OIE PLANNER/00009186",
        "csr": "6AGAZ",
        "assignedSlate": "FY26 2nd Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "",
        "tentativeSlate": "27-2"
    },
    {
        "id": "stockercraigallanjr_22",
        "rank": "LCDR",
        "name": "STOCKER CRAIG ALLAN JR",
        "designator": "1110",
        "currentCommand": "OPNAV",
        "prd": "2025-12-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20120,
        "billet": "STF PLN/N96F BMD RO",
        "csr": "6AGAZ",
        "assignedSlate": "",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "",
        "tentativeSlate": "27-3"
    },
    {
        "id": "mcgeebrandondsean_19",
        "rank": "LCDR",
        "name": "MCGEE BRANDON DSEAN",
        "designator": "1110",
        "currentCommand": "EUCOM HQ",
        "prd": "2027-10-01",
        "preferences": [],
        "status": "Joint Lock",
        "notes": "",
        "yearGroup": 20120,
        "billet": "JOINT OPERATIONS PLANNER/00129317",
        "csr": "6AGAZ",
        "assignedSlate": "FY26 1st Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "",
        "tentativeSlate": "27-3"
    },
    {
        "id": "bankslatoyal_14",
        "rank": "LCDR",
        "name": "BANKS LATOYA L",
        "designator": "1110",
        "currentCommand": "JCS WASH DC",
        "prd": "2028-01-01",
        "preferences": [],
        "status": "Joint Lock",
        "notes": "",
        "yearGroup": 20120,
        "billet": "CHIEF, NMCS OPS BR/JNT ST",
        "csr": "6AGAZ",
        "assignedSlate": "FY26 1st Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "",
        "tentativeSlate": "27-3"
    },
    {
        "id": "hendricksfredarthuriii_25",
        "rank": "LCDR",
        "name": "HENDRICKS FRED ARTHUR III",
        "designator": "1110",
        "currentCommand": "HQ JFC NAPLES",
        "prd": "2027-11-01",
        "preferences": [],
        "status": "Joint Lock",
        "notes": "",
        "yearGroup": 20120,
        "billet": "SO (OP ASSESMENT MARITIME)",
        "csr": "5AGAZ",
        "assignedSlate": "1",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "",
        "tentativeSlate": "27-3"
    },
    {
        "id": "mcdermottkevincharles_23",
        "rank": "LCDR",
        "name": "MCDERMOTT KEVIN CHARLES",
        "designator": "1110",
        "currentCommand": "OSD",
        "prd": "2028-01-01",
        "preferences": [],
        "status": "Joint Lock",
        "notes": "",
        "yearGroup": 20120,
        "billet": "OPS RESEARCH/SYSTEMS ANAL",
        "csr": "6AGAZ",
        "assignedSlate": "27-2 Possible",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "",
        "tentativeSlate": "27-3"
    },
    {
        "id": "guagliardoianm_16",
        "rank": "LCDR",
        "name": "GUAGLIARDO IAN M",
        "designator": "1110",
        "currentCommand": "US STRATCOM",
        "prd": "2028-02-01",
        "preferences": [],
        "status": "Joint Lock",
        "notes": "",
        "yearGroup": 20120,
        "billet": "TACDEC PLN/MISSILE DEF OF",
        "csr": "6AGAZ",
        "assignedSlate": "27-2",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "",
        "tentativeSlate": "27-3"
    },
    {
        "id": "georgekatelynmarie_20",
        "rank": "LCDR",
        "name": "GEORGE KATELYN MARIE",
        "designator": "1110",
        "currentCommand": "JCS WASH DC",
        "prd": "2027-12-01",
        "preferences": [],
        "status": "Joint Lock",
        "notes": "",
        "yearGroup": 20120,
        "billet": "STRATEGIC PLANNER/00011401",
        "csr": "6AGAZ",
        "assignedSlate": "FY26 1st Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "",
        "tentativeSlate": "27-3"
    },
    {
        "id": "hirnergeorgelloydjr_22",
        "rank": "LCDR",
        "name": "HIRNER GEORGE LLOYD JR",
        "designator": "1110",
        "currentCommand": "JCS WASH DC",
        "prd": "2028-01-01",
        "preferences": [],
        "status": "Joint Lock",
        "notes": "",
        "yearGroup": 20120,
        "billet": "MARITIME OPS&EX/STF OPS&P",
        "csr": "6AGAZ",
        "assignedSlate": "FY26 1st Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "",
        "tentativeSlate": "27-3"
    },
    {
        "id": "ragusamichaelrobert_21",
        "rank": "LCDR",
        "name": "RAGUSA MICHAEL ROBERT",
        "designator": "1110",
        "currentCommand": "SWSC NEWPORT RI",
        "prd": "2025-11-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20120,
        "billet": "INST TECH/INST C SOSMRC COORD",
        "csr": "6AGAZ",
        "assignedSlate": "FY26 1st Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "",
        "tentativeSlate": "27-3"
    },
    {
        "id": "macaulaywhitneytravis_23",
        "rank": "LCDR",
        "name": "MACAULAY WHITNEY TRAVIS",
        "designator": "1110",
        "currentCommand": "JCS WASH DC",
        "prd": "2027-03-01",
        "preferences": [],
        "status": "Joint Lock",
        "notes": "",
        "yearGroup": 20120,
        "billet": "JNT STRAT P&P/AVIATION REQUIREMENTS",
        "csr": "6AGAZ",
        "assignedSlate": "FY26 1st Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "",
        "tentativeSlate": "27-4"
    },
    {
        "id": "saguichristinp_17",
        "rank": "LCDR",
        "name": "SAGUI CHRISTIN P ",
        "designator": "1110",
        "currentCommand": "OPNAV",
        "prd": "2026-12-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20130,
        "billet": "INTRAGOVT INQ/N96 CONG LIAISON",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 1st Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "",
        "tentativeSlate": "27-4"
    },
    {
        "id": "feenstrazacharya_18",
        "rank": "LCDR",
        "name": "FEENSTRA ZACHARY A",
        "designator": "1110",
        "currentCommand": "MSTCLANT NORF VA",
        "prd": "2028-03-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20110,
        "billet": "INST TECH/INST A MARINER",
        "csr": "5AGAZ",
        "assignedSlate": "FY25 1st Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "",
        "tentativeSlate": "27-4"
    },
    {
        "id": "barksdalejamesedwardjr_25",
        "rank": "LCDR",
        "name": "BARKSDALE JAMES EDWARD JR",
        "designator": "1110",
        "currentCommand": "COMNAVSURFLANT",
        "prd": "2026-07-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20130,
        "billet": "AIDE",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 1st Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "",
        "tentativeSlate": "28-1"
    },
    {
        "id": "deskinrachaelmarie_20",
        "rank": "LCDR",
        "name": "DESKIN RACHAEL MARIE",
        "designator": "1110",
        "currentCommand": "COMUSNAVCENT",
        "prd": "2027-03-01",
        "preferences": [],
        "status": "List Shift",
        "notes": "",
        "yearGroup": 20110,
        "billet": "DEP EXEC ASST",
        "csr": "5AGAZ",
        "assignedSlate": "LIST SHIFT ROUTED",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": ""
    },
    {
        "id": "leggettjamesmichael_21",
        "rank": "CDR",
        "name": "LEGGETT JAMES MICHAEL",
        "designator": "1110",
        "currentCommand": "S AIR U MAXW AFB",
        "prd": "2026-06-01",
        "preferences": [],
        "status": "List Shift",
        "notes": "",
        "yearGroup": 20090,
        "billet": "STUDENT",
        "csr": "3AGAZ",
        "assignedSlate": "LIST SHIFT ROUTED",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": ""
    },
    {
        "id": "hallwilliamjames_18",
        "rank": "LCDR",
        "name": "HALL WILLIAM JAMES",
        "designator": "1110",
        "currentCommand": "SURFDEVGRU ONE",
        "prd": "2028-09-01",
        "preferences": [],
        "status": "List Shift",
        "notes": "",
        "yearGroup": 20110,
        "billet": "STF OPS&PLN/N3",
        "csr": "6AGAZ",
        "assignedSlate": "LIST SHIFT ROUTED",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": ""
    },
    {
        "id": "dillardcalvinw_16",
        "rank": "CDR",
        "name": "DILLARD CALVIN W",
        "designator": "1110",
        "currentCommand": "CNSG NW",
        "prd": "2028-11-01",
        "preferences": [],
        "status": "List Shift",
        "notes": "",
        "yearGroup": 20080,
        "billet": "",
        "csr": "3AGAZ",
        "assignedSlate": "LIST SHIFT ROUTED",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": ""
    },
    {
        "id": "allisonashleye_16",
        "rank": "LCDR",
        "name": "ALLISON ASHLEY E",
        "designator": "1110",
        "currentCommand": "CNAVPERSCOM MILL",
        "prd": "2027-10-01",
        "preferences": [],
        "status": "List Shift",
        "notes": "",
        "yearGroup": 20110,
        "billet": "PERS DIST ENL/HD SEA ALLOC/PLCMT",
        "csr": "6AGAZ",
        "assignedSlate": "LIST SHIFT I/P",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": ""
    },
    {
        "id": "fuehrercharlesd_17",
        "rank": "LCDR",
        "name": "FUEHRER CHARLES D",
        "designator": "1110",
        "currentCommand": "NWARCOL NPT RI",
        "prd": "2028-07-01",
        "preferences": [],
        "status": "Family Planning",
        "notes": "",
        "yearGroup": 20100,
        "billet": "OPS ANAL/ MARSEC STAFF OFF",
        "csr": "4AGAZ",
        "assignedSlate": "HOLD (FAM PLANNING)",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": ""
    },
    {
        "id": "mattrellalisamarie_21",
        "rank": "CDR",
        "name": "MATTRELLA LISA MARIE ",
        "designator": "1110",
        "currentCommand": "NWARCOL NPT RI",
        "prd": "2028-07-01",
        "preferences": [],
        "status": "Family Planning",
        "notes": "",
        "yearGroup": 20100,
        "billet": "STF OPS&PLN/EX TEAM MEMBER/AAT",
        "csr": "6AGAZ",
        "assignedSlate": "FY26 2nd Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": ""
    },
    {
        "id": "rahallannemarie_17",
        "rank": "CDR",
        "name": "RAHALL ANNE MARIE",
        "designator": "1110",
        "currentCommand": "ATG NORFOLK",
        "prd": "2029-01-01",
        "preferences": [],
        "status": "Family Planning",
        "notes": "MATERNITY LEAVE UNTIL SEP 2024.  WANTS TO WAIT UNTIL TWINS ARE OLDER \n",
        "yearGroup": 20090,
        "billet": "XO SHR ACT",
        "csr": "3AGAZ",
        "assignedSlate": "",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "",
        "tentativeSlate": "26-3"
    },
    {
        "id": "vassallokristenjones_22",
        "rank": "CDR",
        "name": "VASSALLO KRISTEN JONES",
        "designator": "1110",
        "currentCommand": "COMNAVSURFPAC",
        "prd": "2028-03-01",
        "preferences": [],
        "status": "Policy",
        "notes": "Transgender",
        "yearGroup": 20080,
        "billet": "STF OPS&PLN/TDO",
        "csr": "3AGAZ",
        "assignedSlate": "",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": ""
    },
    {
        "id": "rosajohnjacob_15",
        "rank": "LCDR",
        "name": "ROSA JOHN JACOB",
        "designator": "1110",
        "currentCommand": "S NWARCOL NPT RI",
        "prd": "2025-11-01",
        "preferences": [],
        "status": "Hold",
        "notes": "LCS OOD Failure - wait for path forward.  ",
        "yearGroup": 20100,
        "billet": "STUDENT",
        "csr": "5AGAZ",
        "assignedSlate": "25-3",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": ""
    },
    {
        "id": "murraywilliamk_16",
        "rank": "LCDR",
        "name": "MURRAY WILLIAM K",
        "designator": "1110",
        "currentCommand": "COMUSFLTFORCOM",
        "prd": "2026-01-01",
        "preferences": [],
        "status": "Hold",
        "notes": "LCS OOD Failure - Wait for the path forward.",
        "yearGroup": 20100,
        "billet": "STF REDI GEN/BMD IAMD CAP OFF",
        "csr": "5AGAZ",
        "assignedSlate": "25-3",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": ""
    },
    {
        "id": "pettitandrewjason_19",
        "rank": "LCDR",
        "name": "PETTIT ANDREW JASON",
        "designator": "1110",
        "currentCommand": "TRANS JPSE",
        "prd": "2028-04-01",
        "preferences": [],
        "status": "Retire",
        "notes": "",
        "yearGroup": 20100,
        "billet": "MGT INFO CEN/MARITIME PLANS CHF/0004730",
        "csr": "5AGAZ",
        "assignedSlate": "Retiring",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "",
        "tentativeSlate": "26-3"
    },
    {
        "id": "pacestevenharrison_20",
        "rank": "LCDR",
        "name": "PACE STEVEN HARRISON",
        "designator": "1110",
        "currentCommand": "EWTGPAC COR CA",
        "prd": "2027-06-01",
        "preferences": [],
        "status": "List Shift",
        "notes": "",
        "yearGroup": 20100,
        "billet": "STF OPS&PLN",
        "csr": "4AGAZ",
        "assignedSlate": "List Shift",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "",
        "tentativeSlate": "26-3"
    },
    {
        "id": "camposcoreyjo_15",
        "rank": "LCDR",
        "name": "CAMPOS COREY JO",
        "designator": "1110",
        "currentCommand": "SMWDC",
        "prd": "2027-03-01",
        "preferences": [],
        "status": "List Shift",
        "notes": "",
        "yearGroup": 20110,
        "billet": "STF REDI GEN",
        "csr": "6AGAZ",
        "assignedSlate": "2 List Shift",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "",
        "tentativeSlate": "26-3"
    },
    {
        "id": "luboschstephanantoine_23",
        "rank": "CDR",
        "name": "LUBOSCH STEPHAN ANTOINE",
        "designator": "1110",
        "currentCommand": "SACT JWC",
        "prd": "2026-08-01",
        "preferences": [],
        "status": "Hold",
        "notes": "Going through divorce with Norway Foreign national and they have a child.  ",
        "yearGroup": 20080,
        "billet": "SO (SCENARIO MANAGEMENT)",
        "csr": "2AGAZ",
        "assignedSlate": "",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": ""
    },
    {
        "id": "vanourneykennamarie_21",
        "rank": "LCDR",
        "name": "VANOURNEY KENNA MARIE",
        "designator": "1110",
        "currentCommand": "SCSTC MAYPORT",
        "prd": "2028-03-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20110,
        "billet": "XO SHR ACT",
        "csr": "5AGAZ",
        "assignedSlate": "FY25 1st Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": ""
    },
    {
        "id": "yupatrickzuoxi_17",
        "rank": "LCDR",
        "name": "YU PATRICK ZUO XI",
        "designator": "1110",
        "currentCommand": "SECNAV CORB",
        "prd": "2026-08-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20120,
        "billet": "PERS PERF GEN/PEB",
        "csr": "6AGAZ",
        "assignedSlate": "FY26 1st Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": ""
    },
    {
        "id": "danleybrianj_14",
        "rank": "LCDR",
        "name": "DANLEY BRIAN J",
        "designator": "1110",
        "currentCommand": "CHNPERSUP WASHDC",
        "prd": "2026-06-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20120,
        "billet": "PERS P&P CHIEF/N133C ASST SRF NUC OF PRG",
        "csr": "6AGAZ",
        "assignedSlate": "FY26 1st Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": ""
    },
    {
        "id": "daywilliamp_13",
        "rank": "LCDR",
        "name": "DAY WILLIAM P",
        "designator": "1110",
        "currentCommand": "NAVWAR PMO",
        "prd": "2025-12-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20120,
        "billet": "MGR DPJ FE/ APM",
        "csr": "6AGAZ",
        "assignedSlate": "FY26 1st Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": ""
    },
    {
        "id": "deighanjosephtimothy_22",
        "rank": "LCDR",
        "name": "DEIGHAN JOSEPH TIMOTHY",
        "designator": "1110",
        "currentCommand": "LHA LHD LPD REDI",
        "prd": "2026-06-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20120,
        "billet": "STF REDI ENG/AFLOAT REDI & ASSESS LEAD",
        "csr": "6AGAZ",
        "assignedSlate": "FY26 1st Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": ""
    },
    {
        "id": "hammondabigailrorapaugh_25",
        "rank": "LCDR",
        "name": "HAMMOND ABIGAIL RORAPAUGH",
        "designator": "1110",
        "currentCommand": "COM10THFLT",
        "prd": "2027-06-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20120,
        "billet": "",
        "csr": "6AGAZ",
        "assignedSlate": "FY26 1st Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": ""
    },
    {
        "id": "hilljonathanmichael_21",
        "rank": "LCDR",
        "name": "HILL JONATHAN MICHAEL",
        "designator": "1110",
        "currentCommand": "DC PP&O HQMC",
        "prd": "2028-09-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20120,
        "billet": "STF PLN/AMPHIB LN OFFICER",
        "csr": "6AGAZ",
        "assignedSlate": "FY26 1st Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": ""
    },
    {
        "id": "horstjohnm_12",
        "rank": "LCDR",
        "name": "HORST JOHN M",
        "designator": "1110",
        "currentCommand": "SMWDC DET LCRK",
        "prd": "2027-04-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20120,
        "billet": "STF OPS&PLN/AMW LEAD WTI",
        "csr": "6AGAZ",
        "assignedSlate": "FY26 1st Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": ""
    },
    {
        "id": "johnsonandrewstafford_23",
        "rank": "LCDR",
        "name": "JOHNSON ANDREW STAFFORD",
        "designator": "1110",
        "currentCommand": "DIRDIVOFNREACDOE",
        "prd": "2026-09-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20130,
        "billet": "COMMANDER'S ACTION GROUP (CAG)",
        "csr": "6AGAZ",
        "assignedSlate": "FY26 1st Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": ""
    },
    {
        "id": "lawlorseanp_13",
        "rank": "LCDR",
        "name": "LAWLOR SEAN P",
        "designator": "1110",
        "currentCommand": "JCS WASH DC",
        "prd": "2027-11-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20130,
        "billet": "JT WARFIGHTING CAPABIL ANALYST/00001730",
        "csr": "6AGAZ",
        "assignedSlate": "FY26 1st Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": ""
    },
    {
        "id": "leggmarissakaye_17",
        "rank": "LCDR",
        "name": "LEGG MARISSA KAYE",
        "designator": "1110",
        "currentCommand": "COMNAVSURFPAC",
        "prd": "2026-03-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20120,
        "billet": "STF OPS&PLN/ACGPM-SAP",
        "csr": "6AGAZ",
        "assignedSlate": "FY26 1st Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": ""
    },
    {
        "id": "ludovicivincentdominick_25",
        "rank": "LCDR",
        "name": "LUDOVICI VINCENT DOMINICK",
        "designator": "1110",
        "currentCommand": "NAVCEN DET TAMPA",
        "prd": "2028-10-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20130,
        "billet": "CHIEF OF STF",
        "csr": "6AGAZ",
        "assignedSlate": "FY26 1st Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": ""
    },
    {
        "id": "oquinnwilliamj_16",
        "rank": "LCDR",
        "name": "OQUINN WILLIAM J",
        "designator": "1110",
        "currentCommand": "CENTCOM HQ",
        "prd": "2028-06-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20120,
        "billet": "STO PLANS OFFICER/0001106",
        "csr": "6AGAZ",
        "assignedSlate": "FY26 1st Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": ""
    },
    {
        "id": "pedersensequoia_16",
        "rank": "LCDR",
        "name": "PEDERSEN SEQUOIA",
        "designator": "1110",
        "currentCommand": "S SNTWI DELOITTE",
        "prd": "2026-08-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20120,
        "billet": "SNTWI",
        "csr": "6AGAZ",
        "assignedSlate": "FY26 1st Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": ""
    },
    {
        "id": "rosenbergmorgina_18",
        "rank": "LCDR",
        "name": "ROSENBERG MOR GINA",
        "designator": "1110",
        "currentCommand": "OSD",
        "prd": "2027-11-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20120,
        "billet": "RESOURCING/REQ/03018249",
        "csr": "6AGAZ",
        "assignedSlate": "FY26 1st Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": ""
    },
    {
        "id": "smithdevereuxbrackett_23",
        "rank": "LCDR",
        "name": "SMITH DEVEREUX BRACKETT",
        "designator": "1110",
        "currentCommand": "JCS WASH DC",
        "prd": "2027-06-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20120,
        "billet": "JNT STRAT P&P/STRAT ENG PLNR00000020",
        "csr": "6AGAZ",
        "assignedSlate": "FY26 1st Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": ""
    },
    {
        "id": "squiresrobertj_16",
        "rank": "LCDR",
        "name": "SQUIRES ROBERT J",
        "designator": "1110",
        "currentCommand": "CCSG 12",
        "prd": "2026-03-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20120,
        "billet": "STF MTL",
        "csr": "6AGAZ",
        "assignedSlate": "FY26 1st Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": ""
    },
    {
        "id": "vucarolyne_11",
        "rank": "LCDR",
        "name": "VU CAROLYNE",
        "designator": "1110",
        "currentCommand": "CNAVPERSCOM MILL",
        "prd": "2025-05-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20120,
        "billet": "PERS DIST OFF/METRICS",
        "csr": "6AGAZ",
        "assignedSlate": "FY26 1st Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": ""
    },
    {
        "id": "avidanomelissarenee_22",
        "rank": "LCDR",
        "name": "AVIDANO MELISSA RENEE ",
        "designator": "1110",
        "currentCommand": "MSTCLANT NORF VA",
        "prd": "2027-01-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20130,
        "billet": "XO SHR ACT",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 1st Look",
        "preferredLocations": [
            "NF",
            "MP",
            "SD",
            "EV",
            "RS"
        ],
        "preferredPlatforms": [
            "DDG",
            "LSD",
            "LCS"
        ],
        "preferencePriority": "Homeport",
        "listShift": ""
    },
    {
        "id": "beatricelesliechristine_25",
        "rank": "LCDR",
        "name": "BEATRICE LESLIE CHRISTINE",
        "designator": "1110",
        "currentCommand": "SMWDC",
        "prd": "2027-07-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20130,
        "billet": "STF REDI GEN/WIP ANALYSIS LEAD",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 1st Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": ""
    },
    {
        "id": "behnkemarkj_14",
        "rank": "LCDR",
        "name": "BEHNKE MARK J ",
        "designator": "1110",
        "currentCommand": "CNSG MIDLANT",
        "prd": "2028-09-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20130,
        "billet": "OPS SUP OFF/RPD",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 1st Look",
        "preferredLocations": [
            "NF",
            "MP",
            "RS",
            "EV",
            "SD"
        ],
        "preferredPlatforms": [
            "DDG",
            "LSD",
            "LCS"
        ],
        "preferencePriority": "Homeport",
        "listShift": ""
    },
    {
        "id": "bekemeiercalebjoseph_23",
        "rank": "LCDR",
        "name": "BEKEMEIER CALEB JOSEPH ",
        "designator": "1110",
        "currentCommand": "PEO IWS",
        "prd": "2028-06-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20130,
        "billet": "MGR DPJ FE/FLEET LIAISON",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 1st Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": ""
    },
    {
        "id": "bergstromandrewjames_23",
        "rank": "LCDR",
        "name": "BERGSTROM ANDREW JAMES ",
        "designator": "1110",
        "currentCommand": "COMNAVSURFPAC",
        "prd": "2028-02-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20140,
        "billet": "STF OPS&PLN/CURRENT OPS",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 1st Look",
        "preferredLocations": [
            "SD",
            "MP",
            "RS",
            "NF",
            "EV"
        ],
        "preferredPlatforms": [
            "DDG",
            "LCS",
            "LSD"
        ],
        "preferencePriority": "Platform",
        "listShift": ""
    },
    {
        "id": "bonsallnicholasandrew_24",
        "rank": "LCDR",
        "name": "BONSALL NICHOLAS ANDREW ",
        "designator": "1110",
        "currentCommand": "CNAVPERSCOM MILL",
        "prd": "2027-03-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20130,
        "billet": "PERS DIST OFF/DH DIST",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 1st Look",
        "preferredLocations": [
            "RS",
            "PH",
            "NF",
            "EV",
            "MP"
        ],
        "preferredPlatforms": [
            "DDG",
            "LSD",
            "LCS"
        ],
        "preferencePriority": "Homeport",
        "listShift": ""
    },
    {
        "id": "brutoncolinmiles_19",
        "rank": "LCDR",
        "name": "BRUTON COLIN MILES ",
        "designator": "1110",
        "currentCommand": "CNAVPERSCOM MILL",
        "prd": "2026-07-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20130,
        "billet": "PERS DIST OFF/METRICS",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 1st Look",
        "preferredLocations": [
            "RS",
            "EV",
            "YJ",
            "PH",
            "NF"
        ],
        "preferredPlatforms": [
            "DDG",
            "LSD",
            "LCS"
        ],
        "preferencePriority": "Homeport",
        "listShift": ""
    },
    {
        "id": "camposandrewjoseph_21",
        "rank": "LCDR",
        "name": "CAMPOS ANDREW JOSEPH ",
        "designator": "1110",
        "currentCommand": "COMNAVSURFPAC",
        "prd": "2027-03-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20130,
        "billet": "STF OPS&PLN/ACGPM-SAP",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 1st Look",
        "preferredLocations": [
            "SD",
            "PH",
            "EV",
            "MP",
            "RS"
        ],
        "preferredPlatforms": [
            "DDG",
            "LSD",
            "LCS"
        ],
        "preferencePriority": "Homeport",
        "listShift": ""
    },
    {
        "id": "clarkmatthewscott_20",
        "rank": "LCDR",
        "name": "CLARK MATTHEW SCOTT ",
        "designator": "1110",
        "currentCommand": "CNAVPERSCOM MILL",
        "prd": "2028-10-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20130,
        "billet": "PERS DIST OFF/CRUDES LANT PLCMT",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 1st Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": ""
    },
    {
        "id": "crespoelizabethmarie_23",
        "rank": "LCDR",
        "name": "CRESPO ELIZABETH MARIE ",
        "designator": "1110",
        "currentCommand": "MOC FLT FORCES",
        "prd": "2027-02-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20130,
        "billet": "STF OPS&PLN/MHD PLANNER",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 1st Look",
        "preferredLocations": [
            "NF",
            "MP",
            "RS",
            "EV",
            "PH"
        ],
        "preferredPlatforms": [
            "DDG",
            "LCS",
            "LSD"
        ],
        "preferencePriority": "Homeport",
        "listShift": ""
    },
    {
        "id": "cruzheriberton_17",
        "rank": "LCDR",
        "name": "CRUZ HERIBERTO N ",
        "designator": "1110",
        "currentCommand": "CNAVPERSCOM MILL",
        "prd": "2028-07-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20140,
        "billet": "PERS DIST OFF/SURF CDR/LCDR DIST",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 1st Look",
        "preferredLocations": [
            "NF",
            "MP",
            "PH",
            "RS",
            "EV"
        ],
        "preferredPlatforms": [
            "DDG",
            "LSD",
            "LCS"
        ],
        "preferencePriority": "Homeport",
        "listShift": ""
    },
    {
        "id": "dasdyuti_10",
        "rank": "LCDR",
        "name": "DAS DYUTI ",
        "designator": "1110",
        "currentCommand": "CNAVPERSCOM MILL",
        "prd": "2027-03-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20130,
        "billet": "PERS DIST OFF/NUC DTLR",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 1st Look",
        "preferredLocations": [
            "PH",
            "RS",
            "YJ",
            "EV",
            "SD"
        ],
        "preferredPlatforms": [
            "LCS",
            "DDG",
            "LSD"
        ],
        "preferencePriority": "Homeport",
        "listShift": ""
    },
    {
        "id": "eberhardttysonsamuel_23",
        "rank": "LCDR",
        "name": "EBERHARDT TYSON SAMUEL ",
        "designator": "1110",
        "currentCommand": "OPNAV",
        "prd": "2026-08-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20130,
        "billet": "EXEC ASST/N96 EXEC ASST",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 1st Look",
        "preferredLocations": [
            "EV",
            "SD",
            "HI",
            "MP",
            "NF"
        ],
        "preferredPlatforms": [
            "DDG",
            "LCS",
            "LSD"
        ],
        "preferencePriority": "Homeport",
        "listShift": ""
    },
    {
        "id": "englishamandaabelon_22",
        "rank": "LCDR",
        "name": "ENGLISH AMANDA ABELON ",
        "designator": "1110",
        "currentCommand": "SCSTC SAN DIEGO",
        "prd": "2026-11-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20130,
        "billet": "",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 1st Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": ""
    },
    {
        "id": "fontanavincentmatthew_24",
        "rank": "LCDR",
        "name": "FONTANA VINCENT MATTHEW ",
        "designator": "1110",
        "currentCommand": "CNAVPERSCOM MILL",
        "prd": "2026-07-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20130,
        "billet": "PERS DIST OFF/BR HD/SURF SHIP PLCMT",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 1st Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": ""
    },
    {
        "id": "gasbarresamuelrichard_24",
        "rank": "LCDR",
        "name": "GASBARRE SAMUEL RICHARD ",
        "designator": "1110",
        "currentCommand": "CCSG 12",
        "prd": "2026-09-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20130,
        "billet": "STRKWRF MISSYS",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 1st Look",
        "preferredLocations": [
            "MP",
            "NF",
            "SD",
            "RS",
            "EV"
        ],
        "preferredPlatforms": [
            "LCS",
            "DDG",
            "LSD"
        ],
        "preferencePriority": "Homeport",
        "listShift": ""
    },
    {
        "id": "gutierreznicholasa_21",
        "rank": "LCDR",
        "name": "GUTIERREZ NICHOLAS A ",
        "designator": "1110",
        "currentCommand": "SWSC NEWPORT RI",
        "prd": "2027-04-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20130,
        "billet": "INST TECH/INST C SUW SUPV",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 1st Look",
        "preferredLocations": [
            "NF",
            "MP",
            "SD",
            "EV",
            "PH"
        ],
        "preferredPlatforms": [
            "DDG",
            "LCS",
            "LSD"
        ],
        "preferencePriority": "Homeport",
        "listShift": ""
    },
    {
        "id": "harrelljonathanearl_22",
        "rank": "LCDR",
        "name": "HARRELL JONATHAN EARL ",
        "designator": "1110",
        "currentCommand": "COMDESRON 2",
        "prd": "2025-12-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20130,
        "billet": "STF ASW",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 1st Look",
        "preferredLocations": [
            "PH",
            "EV",
            "NF",
            "MP",
            "SD"
        ],
        "preferredPlatforms": [
            "DDG",
            "LCS",
            "LSD"
        ],
        "preferencePriority": "Platform",
        "listShift": ""
    },
    {
        "id": "hastpauld_12",
        "rank": "LCDR",
        "name": "HAST PAUL D ",
        "designator": "1110",
        "currentCommand": "COMUSFLTFORCOM",
        "prd": "2029-03-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20130,
        "billet": "",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 1st Look",
        "preferredLocations": [
            "NF",
            "MP",
            "SD",
            "EV",
            "PH"
        ],
        "preferredPlatforms": [
            "LSD",
            "LCS",
            "DDG"
        ],
        "preferencePriority": "Homeport",
        "listShift": ""
    },
    {
        "id": "hendersonkaitlynirene_24",
        "rank": "LCDR",
        "name": "HENDERSON KAITLYN IRENE ",
        "designator": "1110",
        "currentCommand": "OPNAV",
        "prd": "2027-03-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20120,
        "billet": "STF PLN/N96F WARFIGHTING INTEGRATION RO",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 1st Look",
        "preferredLocations": [
            "NF",
            "MP",
            "EV",
            "SD",
            "RS"
        ],
        "preferredPlatforms": [
            "DDG",
            "LCS",
            "LSD"
        ],
        "preferencePriority": "Homeport",
        "listShift": ""
    },
    {
        "id": "heussjacobpeter_18",
        "rank": "LCDR",
        "name": "HEUSS JACOB PETER ",
        "designator": "1110",
        "currentCommand": "NPTU CHASN BOS",
        "prd": "2028-10-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20130,
        "billet": "PERS PLN/DIR STUDENT AFFAIRS",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 1st Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": ""
    },
    {
        "id": "jonescraignathaniel_21",
        "rank": "LCDR",
        "name": "JONES CRAIG NATHANIEL",
        "designator": "1110",
        "currentCommand": "COMDESRON 60",
        "prd": "2028-05-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20140,
        "billet": "STF ASW",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 1st Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": ""
    },
    {
        "id": "jonesmatthewp_16",
        "rank": "LCDR",
        "name": "JONES MATTHEW P ",
        "designator": "1110",
        "currentCommand": "COMSEVENTHFLT",
        "prd": "2026-08-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20130,
        "billet": "FLAG SEC",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 1st Look",
        "preferredLocations": [
            "YJ",
            "SD",
            "PH",
            "EV",
            "RS"
        ],
        "preferredPlatforms": [
            "DDG",
            "LCS",
            "LSD"
        ],
        "preferencePriority": "Homeport",
        "listShift": ""
    },
    {
        "id": "kentonchadanthonyhopet_25",
        "rank": "LCDR",
        "name": "KENTON CHAD ANTHONY HOPET",
        "designator": "1110",
        "currentCommand": "CNAVPERSCOM MILL",
        "prd": "2028-06-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20130,
        "billet": "PERS DIST OFF/ASST DIR",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 1st Look",
        "preferredLocations": [
            "MP",
            "EV",
            "NF",
            "SD",
            "PH"
        ],
        "preferredPlatforms": [
            "DDG",
            "LCS",
            "LSD"
        ],
        "preferencePriority": "Homeport",
        "listShift": ""
    },
    {
        "id": "kirbydeanrobertjr_21",
        "rank": "LCDR",
        "name": "KIRBY DEAN ROBERT JR ",
        "designator": "1110",
        "currentCommand": "MCM 7 PATRIOT",
        "prd": "2026-12-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20130,
        "billet": "CO AFLOAT LCDR",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 1st Look",
        "preferredLocations": [
            "SD",
            "RS",
            "PH",
            "EV",
            "MP"
        ],
        "preferredPlatforms": [
            "DDG",
            "LCS",
            "LSD"
        ],
        "preferencePriority": "Homeport",
        "listShift": ""
    },
    {
        "id": "larsonkennethr_17",
        "rank": "LCDR",
        "name": "LARSON KENNETH R ",
        "designator": "1110",
        "currentCommand": "CNAVPERSCOM MILL",
        "prd": "2028-02-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20130,
        "billet": "PERS DIST ENL/ASST MAJOR STAFF PLCMT",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 1st Look",
        "preferredLocations": [
            "SD",
            "EV",
            "PH",
            "MP",
            "NF"
        ],
        "preferredPlatforms": [
            "LSD",
            "DDG",
            "LCS"
        ],
        "preferencePriority": "Homeport",
        "listShift": ""
    },
    {
        "id": "liebersamuelj_16",
        "rank": "LCDR",
        "name": "LIEBER SAMUEL J ",
        "designator": "1110",
        "currentCommand": "OPNAV",
        "prd": "2026-10-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20130,
        "billet": "EXEC ASST/DEP EA/N95A",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 1st Look",
        "preferredLocations": [
            "SD",
            "PH",
            "NF",
            "MP",
            "EV"
        ],
        "preferredPlatforms": [
            "LSD",
            "LCS",
            "DDG"
        ],
        "preferencePriority": "Homeport",
        "listShift": ""
    },
    {
        "id": "maksymicztylera_18",
        "rank": "LCDR",
        "name": "MAKSYMICZ TYLER A ",
        "designator": "1110",
        "currentCommand": "COMNAVSURFLANT",
        "prd": "2027-01-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20130,
        "billet": "STF OPS&PLN/MOBILE TRNG TEM",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 1st Look",
        "preferredLocations": [
            "NF",
            "SD",
            "EV",
            "MP",
            "PH"
        ],
        "preferredPlatforms": [
            "DDG",
            "LSD",
            "LCS"
        ],
        "preferencePriority": "Homeport",
        "listShift": ""
    },
    {
        "id": "mccormickvananh_17",
        "rank": "LCDR",
        "name": "MCCORMICK VANANH ",
        "designator": "1110",
        "currentCommand": "TPU SD TRANS OTH",
        "prd": "*",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20130,
        "billet": "",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 1st Look",
        "preferredLocations": [
            "NF",
            "MP",
            "PH",
            "EV",
            "SD"
        ],
        "preferredPlatforms": [
            "DDG",
            "LCS",
            "LSD"
        ],
        "preferencePriority": "Homeport",
        "listShift": ""
    },
    {
        "id": "miccoanthonyn_16",
        "rank": "LCDR",
        "name": "MICCO ANTHONY N ",
        "designator": "1110",
        "currentCommand": "CNSG MIDLANT",
        "prd": "2027-04-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20130,
        "billet": "STF REDI PHIB",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 1st Look",
        "preferredLocations": [
            "MP",
            "NF",
            "PH",
            "YJ",
            "RS"
        ],
        "preferredPlatforms": [
            "DDG",
            "LCS",
            "LSD"
        ],
        "preferencePriority": "Homeport",
        "listShift": ""
    },
    {
        "id": "michelliaudrey_16",
        "rank": "LCDR",
        "name": "MICHELLI AUDREY ",
        "designator": "1110",
        "currentCommand": "CNAVPERSCOM MILL",
        "prd": "2028-11-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20130,
        "billet": "PERS PLAN/ASST SURF NUC PWR COMM MGMT",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 1st Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": ""
    },
    {
        "id": "northcuttzacharyd_20",
        "rank": "LCDR",
        "name": "NORTHCUTT ZACHARY D ",
        "designator": "1110",
        "currentCommand": "S LEGIS FEL PRG",
        "prd": "2025-10-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20130,
        "billet": "",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 1st Look",
        "preferredLocations": [
            "YJ",
            "RS",
            "EV",
            "PH",
            "SJ"
        ],
        "preferredPlatforms": [
            "DDG",
            "LSD",
            "LCS"
        ],
        "preferencePriority": "Homeport",
        "listShift": ""
    },
    {
        "id": "olshenskechelseyberkhei_25",
        "rank": "LCDR",
        "name": "OLSHENSKE CHELSEY BERKHEI",
        "designator": "1110",
        "currentCommand": "SMWDC",
        "prd": "2027-01-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20130,
        "billet": "STF REDI TAC",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 1st Look",
        "preferredLocations": [
            "SD",
            "PH",
            "EV",
            "MP",
            "RS"
        ],
        "preferredPlatforms": [
            "DDG",
            "LCS",
            "LSD"
        ],
        "preferencePriority": "Homeport",
        "listShift": ""
    },
    {
        "id": "posillicoanthonyjoseph_25",
        "rank": "LCDR",
        "name": "POSILLICO ANTHONY JOSEPH ",
        "designator": "1110",
        "currentCommand": "S NWARCOL NPT RI",
        "prd": "2025-10-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20130,
        "billet": "",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 1st Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": ""
    },
    {
        "id": "sanchezdaniel_15",
        "rank": "LCDR",
        "name": "SANCHEZ DANIEL ",
        "designator": "1110",
        "currentCommand": "COMDESRON 26",
        "prd": "2028-03-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20130,
        "billet": "",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 1st Look",
        "preferredLocations": [
            "NF",
            "MP",
            "SD",
            "RS",
            "PH"
        ],
        "preferredPlatforms": [
            "LCS",
            "LSD",
            "DDG"
        ],
        "preferencePriority": "Homeport",
        "listShift": ""
    },
    {
        "id": "senoyuitmarychristine_24",
        "rank": "LCDR",
        "name": "SENOYUIT MARY CHRISTINE ",
        "designator": "1110",
        "currentCommand": "MCM 10 WARRIOR",
        "prd": "2027-02-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20130,
        "billet": "CO AFLOAT LCDR",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 1st Look",
        "preferredLocations": [
            "YJ",
            "RS",
            "SJ",
            "PH",
            "EV"
        ],
        "preferredPlatforms": [
            "DDG",
            "LSD",
            "LCS"
        ],
        "preferencePriority": "Homeport",
        "listShift": ""
    },
    {
        "id": "shofnermichaelg_18",
        "rank": "LCDR",
        "name": "SHOFNER MICHAEL G ",
        "designator": "1110",
        "currentCommand": "OPNAV",
        "prd": "2026-07-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20130,
        "billet": "STF PLN/N96E LCS MISSION PACKAGE RO",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 1st Look",
        "preferredLocations": [
            "SD",
            "MP",
            "EV",
            "PH",
            "NF"
        ],
        "preferredPlatforms": [
            "DDG",
            "LCS",
            "LSD"
        ],
        "preferencePriority": "Homeport",
        "listShift": ""
    },
    {
        "id": "stultzlandonjoel_19",
        "rank": "LCDR",
        "name": "STULTZ LANDON JOEL ",
        "designator": "1110",
        "currentCommand": "LHA LHD LPD REDI",
        "prd": "2028-11-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20130,
        "billet": "STF REDI GEN/AFLOAT REDI & ASSESS LEAD",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 1st Look",
        "preferredLocations": [
            "NF",
            "MP",
            "RS",
            "PH",
            "SD"
        ],
        "preferredPlatforms": [
            "DDG",
            "LSD",
            "LCS"
        ],
        "preferencePriority": "Homeport",
        "listShift": ""
    },
    {
        "id": "tadlockcarleym_17",
        "rank": "LCDR",
        "name": "TADLOCK CARLEY M ",
        "designator": "1110",
        "currentCommand": "COMEXSTRKGRU 2",
        "prd": "2027-04-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20130,
        "billet": "FLAG SEC",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 1st Look",
        "preferredLocations": [
            "NF",
            "SD",
            "PH",
            "EV",
            "MP"
        ],
        "preferredPlatforms": [
            "LSD",
            "DDG",
            "LCS"
        ],
        "preferencePriority": "Homeport",
        "listShift": ""
    },
    {
        "id": "vanmetrebrianc_17",
        "rank": "LCDR",
        "name": "VANMETRE BRIAN C ",
        "designator": "1110",
        "currentCommand": "OPNAV",
        "prd": "2027-07-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20130,
        "billet": "STF PLN/N96C IAMD WEAPONS RO",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 1st Look",
        "preferredLocations": [
            "MP",
            "NF",
            "SD",
            "EV",
            "PH"
        ],
        "preferredPlatforms": [
            "DDG",
            "LCS",
            "LSD"
        ],
        "preferencePriority": "Platform",
        "listShift": ""
    },
    {
        "id": "wallsandersonlee_19",
        "rank": "LCDR",
        "name": "WALLS ANDERSON LEE ",
        "designator": "1110",
        "currentCommand": "CPFLT NPEB",
        "prd": "2028-08-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20130,
        "billet": "STF REDI ENG/SHP ENG NUCGEN/EXMR",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 1st Look",
        "preferredLocations": [
            "RS",
            "PH",
            "MP",
            "NF",
            "SD"
        ],
        "preferredPlatforms": [
            "DDG",
            "LSD",
            "LCS"
        ],
        "preferencePriority": "Platform",
        "listShift": ""
    },
    {
        "id": "whitejasonalan_16",
        "rank": "LCDR",
        "name": "WHITE JASON ALAN",
        "designator": "1110",
        "currentCommand": "OPNAV",
        "prd": "2027-08-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20140,
        "billet": "STF PLN/N96F AEGIS RO",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 1st Look",
        "preferredLocations": [
            "SD",
            "PH",
            "EV",
            "NF",
            "MP"
        ],
        "preferredPlatforms": [
            "DDG",
            "LCS",
            "LSD"
        ],
        "preferencePriority": "Homeport",
        "listShift": ""
    },
    {
        "id": "balistrerimichaelandrew_25",
        "rank": "LCDR",
        "name": "BALISTRERI MICHAEL ANDREW",
        "designator": "1110",
        "currentCommand": "JCS WASH DC",
        "prd": "2026-12-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20120,
        "billet": "DEP LEGIS ASST TO CJCS 00000095",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 2nd Look",
        "preferredLocations": [
            "MP",
            "NF",
            "SD",
            "RS",
            "PH"
        ],
        "preferredPlatforms": [
            "DDG",
            "LCS",
            "LSD"
        ],
        "preferencePriority": "Homeport",
        "listShift": ""
    },
    {
        "id": "bankusaaronbradley_21",
        "rank": "LCDR",
        "name": "BANKUS AARON BRADLEY ",
        "designator": "1110",
        "currentCommand": "SMWDC DET PLOMA",
        "prd": "2026-08-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20120,
        "billet": "STF MINE WRF/SWATT TEAM LEAD",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 2nd Look",
        "preferredLocations": [
            "SD",
            "PH",
            "EV",
            "MP",
            "NF"
        ],
        "preferredPlatforms": [
            "LCS",
            "DDG",
            "LSD"
        ],
        "preferencePriority": "Homeport",
        "listShift": ""
    },
    {
        "id": "brayisabelramona_19",
        "rank": "LCDR",
        "name": "BRAY ISABEL RAMONA ",
        "designator": "1110",
        "currentCommand": "SWSC NEWPORT RI",
        "prd": "2026-03-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20120,
        "billet": "INST TECH/INST C PXO COORD",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 2nd Look",
        "preferredLocations": [
            "SD",
            "MP",
            "SJ",
            "NF",
            "PH"
        ],
        "preferredPlatforms": [
            "LSD",
            "LCS",
            "DDG"
        ],
        "preferencePriority": "Platform",
        "listShift": ""
    },
    {
        "id": "brotmanaaronr_16",
        "rank": "LCDR",
        "name": "BROTMAN AARON R ",
        "designator": "1110",
        "currentCommand": "OPNAV",
        "prd": "2026-09-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20120,
        "billet": "STF PLN/I&I DEP FRC STRC & CONCPTS/N9IZ2",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 2nd Look",
        "preferredLocations": [
            "EV",
            "YJ",
            "SD",
            "SJ",
            "PH"
        ],
        "preferredPlatforms": [
            "DDG",
            "LCS",
            "LSD"
        ],
        "preferencePriority": "Platform",
        "listShift": ""
    },
    {
        "id": "brownmichaeld_16",
        "rank": "LCDR",
        "name": "BROWN MICHAEL D ",
        "designator": "1110",
        "currentCommand": "COMPACFLT MOC",
        "prd": "2026-01-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20120,
        "billet": "STF PLN/OCEANIA",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 2nd Look",
        "preferredLocations": [
            "PH",
            "SD",
            "EV",
            "RS",
            "MP"
        ],
        "preferredPlatforms": [
            "DDG",
            "LSD",
            "LCS"
        ],
        "preferencePriority": "Homeport",
        "listShift": ""
    },
    {
        "id": "caseymatthewjoseph_21",
        "rank": "LCDR",
        "name": "CASEY MATTHEW JOSEPH ",
        "designator": "1110",
        "currentCommand": "SMWDC DET LCRK",
        "prd": "2026-09-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20120,
        "billet": "STF REDI TAC/AMW WTI (N5 DEPUTY)",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 2nd Look",
        "preferredLocations": [
            "NF\t\t\t",
            "MP",
            "EV",
            "SD",
            "PH"
        ],
        "preferredPlatforms": [
            "LSD",
            "LCS",
            "DDG"
        ],
        "preferencePriority": "Homeport",
        "listShift": ""
    },
    {
        "id": "ceballosronalde_18",
        "rank": "LCDR",
        "name": "CEBALLOS RONALD E ",
        "designator": "1110",
        "currentCommand": "MOC C7F",
        "prd": "2026-04-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20120,
        "billet": "STF PLN",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 2nd Look",
        "preferredLocations": [
            "SD",
            "MP",
            "SJ",
            "YJ",
            "PH"
        ],
        "preferredPlatforms": [
            "LCS",
            "LSD",
            "DDG"
        ],
        "preferencePriority": "Homeport",
        "listShift": ""
    },
    {
        "id": "charltontravismatthew_24",
        "rank": "LCDR",
        "name": "CHARLTON TRAVIS MATTHEW ",
        "designator": "1110",
        "currentCommand": "NPS CHASN BOS",
        "prd": "2026-12-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20120,
        "billet": "SHP ENG NUCGEN",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 2nd Look",
        "preferredLocations": [
            "MP",
            "NF",
            "SD",
            "EV",
            "PH"
        ],
        "preferredPlatforms": [
            "DDG",
            "LCS",
            "LSD"
        ],
        "preferencePriority": "Homeport",
        "listShift": ""
    },
    {
        "id": "chilmanscottdavid_20",
        "rank": "LCDR",
        "name": "CHILMAN SCOTT DAVID ",
        "designator": "1110",
        "currentCommand": "SMWDC",
        "prd": "2027-05-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20120,
        "billet": "STF REDI TAC/ASW/SUW WTI",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 2nd Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": ""
    },
    {
        "id": "crawfordmichaelanthony_25",
        "rank": "LCDR",
        "name": "CRAWFORD MICHAEL ANTHONY ",
        "designator": "1110",
        "currentCommand": "MOC SECONDFLT",
        "prd": "2028-07-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20130,
        "billet": "STF OPS&PLN",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 2nd Look",
        "preferredLocations": [
            "NF",
            "MP",
            "PH",
            "EV",
            "RS"
        ],
        "preferredPlatforms": [
            "DDG",
            "LSD",
            "LCS"
        ],
        "preferencePriority": "Homeport",
        "listShift": ""
    },
    {
        "id": "cumpstonkainoa_16",
        "rank": "LCDR",
        "name": "CUMPSTON KAINOA ",
        "designator": "1110",
        "currentCommand": "S LEGIS FEL PRG",
        "prd": "2026-11-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20120,
        "billet": "",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 2nd Look",
        "preferredLocations": [
            "MP",
            "RS",
            "YJ",
            "EV",
            "PH"
        ],
        "preferredPlatforms": [
            "LCS",
            "DDG",
            "LSD"
        ],
        "preferencePriority": "Homeport",
        "listShift": ""
    },
    {
        "id": "danaichristinaann_20",
        "rank": "LCDR",
        "name": "DANAI CHRISTINA ANN ",
        "designator": "1110",
        "currentCommand": "COMNAVSURFPAC",
        "prd": "2027-01-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20120,
        "billet": "",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 2nd Look",
        "preferredLocations": [
            "SD",
            "PH",
            "MP",
            "YJ",
            "RS"
        ],
        "preferredPlatforms": [
            "LCS",
            "LSD",
            "DDG"
        ],
        "preferencePriority": "Homeport",
        "listShift": ""
    },
    {
        "id": "denherdermatthewc_20",
        "rank": "LCDR",
        "name": "DENHERDER MATTHEW C ",
        "designator": "1110",
        "currentCommand": "MOC C7F",
        "prd": "2027-09-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20120,
        "billet": "STF OPS&PLN",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 2nd Look",
        "preferredLocations": [
            "YJ",
            "RS",
            "MY",
            "EV",
            "SD"
        ],
        "preferredPlatforms": [
            "DDG",
            "LCS",
            "LSD"
        ],
        "preferencePriority": "Platform",
        "listShift": ""
    },
    {
        "id": "dircksjeroemylewis_20",
        "rank": "LCDR",
        "name": "DIRCKS JEROEMY LEWIS",
        "designator": "1110",
        "currentCommand": "COMNAVSURFPAC",
        "prd": "2027-01-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20130,
        "billet": "OPS SUP OFF/RPD",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 2nd Look",
        "preferredLocations": [
            "PH",
            "MP",
            "YJ",
            "RS",
            "NF"
        ],
        "preferredPlatforms": [
            "DDG",
            "LCS",
            "LSD"
        ],
        "preferencePriority": "Platform",
        "listShift": ""
    },
    {
        "id": "drydenzacharyjohn_20",
        "rank": "LCDR",
        "name": "DRYDEN ZACHARY JOHN ",
        "designator": "1110",
        "currentCommand": "OPNAV",
        "prd": "2026-03-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20120,
        "billet": "STF PLN/FLEET ARCHITECTURE AO/N9IX1",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 2nd Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": ""
    },
    {
        "id": "elzeftawyannajehan_21",
        "rank": "LCDR",
        "name": "ELZEFTAWY ANNA JEHAN ",
        "designator": "1110",
        "currentCommand": "AFLTRGRPAC EATQ",
        "prd": "2026-03-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20120,
        "billet": "CDR ENG ASSESS",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 2nd Look",
        "preferredLocations": [
            "PH",
            "EV",
            "MP",
            "RS",
            "YJ"
        ],
        "preferredPlatforms": [
            "DDG",
            "LCS",
            "LSD"
        ],
        "preferencePriority": "Homeport",
        "listShift": ""
    },
    {
        "id": "fullerjerritrussell_22",
        "rank": "LCDR",
        "name": "FULLER JERRIT RUSSELL ",
        "designator": "1110",
        "currentCommand": "COMDESRON 60",
        "prd": "2026-06-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20130,
        "billet": "STF ASW",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 2nd Look",
        "preferredLocations": [
            "MP",
            "NF",
            "EV",
            "PH",
            "SD"
        ],
        "preferredPlatforms": [
            "LCS",
            "LSD",
            "DDG"
        ],
        "preferencePriority": "Homeport",
        "listShift": ""
    },
    {
        "id": "lopezdavidaaron_18",
        "rank": "LCDR",
        "name": "LOPEZ DAVID AARON ",
        "designator": "1110",
        "currentCommand": "OPNAV",
        "prd": "2026-02-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20120,
        "billet": "STF PLN/N96E DDG-1000 RO",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 2nd Look",
        "preferredLocations": [
            "SD",
            "EV",
            "MP",
            "PH",
            "YJ"
        ],
        "preferredPlatforms": [
            "DDG",
            "LSD",
            "LCS"
        ],
        "preferencePriority": "Platform",
        "listShift": ""
    },
    {
        "id": "margolissamanthafromme_25",
        "rank": "LCDR",
        "name": "MARGOLIS SAMANTHA FROMME ",
        "designator": "1110",
        "currentCommand": "MSTCPAC SAN DIEG",
        "prd": "2027-10-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20120,
        "billet": "INST TECH/INST A MARINER SKILLS",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 2nd Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": ""
    },
    {
        "id": "mcgowenderrektyler_21",
        "rank": "LCDR",
        "name": "MCGOWEN DERREK TYLER ",
        "designator": "1110",
        "currentCommand": "MOC FIFTHFLT",
        "prd": "2026-08-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20120,
        "billet": "STF PLN/MARITIME PLNR",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 2nd Look",
        "preferredLocations": [
            "SD",
            "MP",
            "PH",
            "SJ",
            "YJ"
        ],
        "preferredPlatforms": [
            "LCS",
            "LSD",
            "DDG"
        ],
        "preferencePriority": "Platform",
        "listShift": ""
    },
    {
        "id": "mimssimonem_14",
        "rank": "LCDR",
        "name": "MIMS SIMONE M ",
        "designator": "1110",
        "currentCommand": "COMEXSTRKGRU 7",
        "prd": "*",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20120,
        "billet": "",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 2nd Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": ""
    },
    {
        "id": "minnichjosephhoward_22",
        "rank": "LCDR",
        "name": "MINNICH JOSEPH HOWARD ",
        "designator": "1110",
        "currentCommand": "SPACE PAT FL",
        "prd": "2028-10-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20120,
        "billet": "STF LIAISON/SPACE LNO TO KSC/00143828",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 2nd Look",
        "preferredLocations": [
            "MP",
            "NF",
            "RS",
            "PH",
            "SD"
        ],
        "preferredPlatforms": [
            "DDG",
            "LSD",
            "LCS"
        ],
        "preferencePriority": "Homeport",
        "listShift": ""
    },
    {
        "id": "minterdanieljeremiahay_25",
        "rank": "LCDR",
        "name": "MINTER DANIEL JEREMIAH AY",
        "designator": "1110",
        "currentCommand": "CCSG 5",
        "prd": "2026-05-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20120,
        "billet": "STRKWRF MISSYS",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 2nd Look",
        "preferredLocations": [
            "RS",
            "PH",
            "MP",
            "SD",
            "NF"
        ],
        "preferredPlatforms": [
            "DDG",
            "LCS",
            "LSD"
        ],
        "preferencePriority": "Homeport",
        "listShift": ""
    },
    {
        "id": "mitchellbriannaleigh_23",
        "rank": "LCDR",
        "name": "MITCHELL BRIANNA LEIGH ",
        "designator": "1110",
        "currentCommand": "COMNAVSURFLANT",
        "prd": "2026-11-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20120,
        "billet": "STF REDI GEN/AMPHIB PROGRAM ANALYST",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 2nd Look",
        "preferredLocations": [
            "NF",
            "MP",
            "SD",
            "RS",
            "PH"
        ],
        "preferredPlatforms": [
            "LSD",
            "DDG",
            "LCS"
        ],
        "preferencePriority": "Homeport",
        "listShift": ""
    },
    {
        "id": "morganjohnrobertiii_23",
        "rank": "LCDR",
        "name": "MORGAN JOHN ROBERT III ",
        "designator": "1110",
        "currentCommand": "OPNAV CMD CTR DC",
        "prd": "2026-06-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20120,
        "billet": "STF OPS CMD CEN WO/N301 ABWC",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 2nd Look",
        "preferredLocations": [
            "SD",
            "EV",
            "PH",
            "MP",
            "RS"
        ],
        "preferredPlatforms": [
            "DDG",
            "LCS",
            "LSD"
        ],
        "preferencePriority": "Homeport",
        "listShift": ""
    },
    {
        "id": "murphmansfieldchristian_25",
        "rank": "LCDR",
        "name": "MURPH MANSFIELD CHRISTIAN",
        "designator": "1110",
        "currentCommand": "OPNAV",
        "prd": "2027-05-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20120,
        "billet": "EXEC ASST/DEA TO DIR /N9I FLAG OFFICER",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 2nd Look",
        "preferredLocations": [
            "MP",
            "NF",
            "SD",
            "EV",
            "RS"
        ],
        "preferredPlatforms": [
            "DDG",
            "LCS",
            "LSD"
        ],
        "preferencePriority": "Platform",
        "listShift": ""
    },
    {
        "id": "penaandrew_12",
        "rank": "LCDR",
        "name": "PENA ANDREW ",
        "designator": "1110",
        "currentCommand": "AEGIS TECH REP",
        "prd": "2026-11-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20120,
        "billet": "XO SHR ACT/CSEDS MANAGER",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 2nd Look",
        "preferredLocations": [
            "SD",
            "MP",
            "EV",
            "PH",
            "YJ"
        ],
        "preferredPlatforms": [
            "DDG",
            "LCS",
            "LSD"
        ],
        "preferencePriority": "Homeport",
        "listShift": ""
    },
    {
        "id": "pianaraymondvelayo_21",
        "rank": "LCDR",
        "name": "PIANA RAYMOND VELAYO ",
        "designator": "1110",
        "currentCommand": "MCMGRU 7",
        "prd": "2028-09-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20110,
        "billet": "STF MINE WRF",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 2nd Look",
        "preferredLocations": [
            "SJ",
            "YJ",
            "PH",
            "SD",
            "MP"
        ],
        "preferredPlatforms": [
            "LSD",
            "LCS",
            "DDG"
        ],
        "preferencePriority": "Homeport",
        "listShift": "",
        "tentativeSlate": "26-3"
    },
    {
        "id": "richardsonemmanueljosep_25",
        "rank": "LCDR",
        "name": "RICHARDSON EMMANUEL JOSEP",
        "designator": "1110",
        "currentCommand": "COMDESRON 15",
        "prd": "2026-03-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20120,
        "billet": "STF OPS&PLN/N5",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 2nd Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": ""
    },
    {
        "id": "richardsonvictoriaphuon_25",
        "rank": "LCDR",
        "name": "RICHARDSON VICTORIA PHUON",
        "designator": "1110",
        "currentCommand": "ATG NORFOLK",
        "prd": "2026-08-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20120,
        "billet": "STF OPS&PLN/BRMW",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 2nd Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": ""
    },
    {
        "id": "roachmarkallen_17",
        "rank": "LCDR",
        "name": "ROACH MARK ALLEN ",
        "designator": "1110",
        "currentCommand": "SMWDC DET SAWS",
        "prd": "2026-07-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20120,
        "billet": "STF REDI TAC/AMW TTP MANAGER",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 2nd Look",
        "preferredLocations": [
            "SD",
            "YJ",
            "SJ",
            "MP",
            "RS"
        ],
        "preferredPlatforms": [
            "DDG",
            "LCS",
            "LSD"
        ],
        "preferencePriority": "Homeport",
        "listShift": ""
    },
    {
        "id": "robinsfarrell_15",
        "rank": "LCDR",
        "name": "ROBINS FARRELL ",
        "designator": "1110",
        "currentCommand": "SMWDC",
        "prd": "2026-03-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20120,
        "billet": "STF REDI TAC/SWTS",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 2nd Look",
        "preferredLocations": [
            "SD",
            "PH",
            "EV",
            "MP",
            "NF"
        ],
        "preferredPlatforms": [
            "DDG",
            "LCS",
            "LSD"
        ],
        "preferencePriority": "Homeport",
        "listShift": ""
    },
    {
        "id": "rochemarcov_14",
        "rank": "LCDR",
        "name": "ROCHE MARCO V ",
        "designator": "1110",
        "currentCommand": "COMNAVSURFLANT",
        "prd": "2026-12-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20120,
        "billet": "STF REDI SNSHP/FORCE NAVIGATOR",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 2nd Look",
        "preferredLocations": [
            "NF",
            "MP",
            "EV",
            "RS",
            "SD"
        ],
        "preferredPlatforms": [
            "DDG",
            "LSD",
            "LCS"
        ],
        "preferencePriority": "Homeport",
        "listShift": ""
    },
    {
        "id": "settledarrenvincent_22",
        "rank": "LCDR",
        "name": "SETTLE DARREN VINCENT ",
        "designator": "1110",
        "currentCommand": "CNAVPERSCOM MILL",
        "prd": "2025-11-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20120,
        "billet": "PERS DIST OFF/CRUDES LANT PLCMT",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 2nd Look",
        "preferredLocations": [
            "SD",
            "PH",
            "EV",
            "MP",
            "NF"
        ],
        "preferredPlatforms": [
            "DDG",
            "LSD",
            "LCS"
        ],
        "preferencePriority": "Homeport",
        "listShift": ""
    },
    {
        "id": "singletarygabrielm_21",
        "rank": "LCDR",
        "name": "SINGLETARY GABRIEL M ",
        "designator": "1110",
        "currentCommand": "OPNAV",
        "prd": "2026-05-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20120,
        "billet": "N4 DEPUTY EXECUTIVE ASSISTANT",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 2nd Look",
        "preferredLocations": [
            "SD",
            "MP",
            "NF",
            "SJ",
            "PH"
        ],
        "preferredPlatforms": [
            "LCS ",
            "LSD ",
            "DDG"
        ],
        "preferencePriority": "Homeport",
        "listShift": ""
    },
    {
        "id": "smithcarltonoharoldii_25",
        "rank": "LCDR",
        "name": "SMITH CARLTON OHAROLD II ",
        "designator": "1110",
        "currentCommand": "SMWDC DET LCRK",
        "prd": "2026-12-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20120,
        "billet": "STF REDI TAC/AMW WTI CURR MANAGER",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 2nd Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": ""
    },
    {
        "id": "turneralexandercharles_25",
        "rank": "LCDR",
        "name": "TURNER ALEXANDER CHARLES ",
        "designator": "1110",
        "currentCommand": "AFTGWESTPAC YOKO",
        "prd": "2028-10-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20110,
        "billet": "XO SHR ACT",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 2nd Look",
        "preferredLocations": [
            "YJ",
            "PH",
            "RS",
            "SD",
            "MP"
        ],
        "preferredPlatforms": [
            "DDG",
            "LSD",
            "LCS"
        ],
        "preferencePriority": "Homeport",
        "listShift": "",
        "tentativeSlate": "26-3"
    },
    {
        "id": "vanderzwetjonm_17",
        "rank": "LCDR",
        "name": "VANDERZWET JON M ",
        "designator": "1110",
        "currentCommand": "CNE CNA",
        "prd": "2028-11-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20120,
        "billet": "STF PLN/STF MARITIME PLNR",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 2nd Look",
        "preferredLocations": [
            "YJ",
            "PH",
            "SD",
            "EV",
            "SJ"
        ],
        "preferredPlatforms": [
            "DDG",
            "LCS",
            "LSD"
        ],
        "preferencePriority": "Homeport",
        "listShift": ""
    },
    {
        "id": "vigilantematthewa_20",
        "rank": "LCDR",
        "name": "VIGILANTE MATTHEW A ",
        "designator": "1110",
        "currentCommand": "CCSG 5",
        "prd": "2026-04-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20120,
        "billet": "STF OPS&PLN",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 2nd Look",
        "preferredLocations": [
            "YJ",
            "RS",
            "EV",
            "PH",
            "SD"
        ],
        "preferredPlatforms": [
            "DDG",
            "LCS",
            "LSD"
        ],
        "preferencePriority": "Homeport",
        "listShift": ""
    },
    {
        "id": "wallacejeremyaaron_21",
        "rank": "LCDR",
        "name": "WALLACE JEREMY AARON ",
        "designator": "1110",
        "currentCommand": "OPNAV",
        "prd": "2026-02-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20120,
        "billet": "STF PLN/N96C ASW & SSTD RO",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 2nd Look",
        "preferredLocations": [
            "MP",
            "NF",
            "SD",
            "EV",
            "RS"
        ],
        "preferredPlatforms": [
            "DDG",
            "LCS",
            "LSD"
        ],
        "preferencePriority": "Platform",
        "listShift": ""
    },
    {
        "id": "wallacemichaelperry_22",
        "rank": "LCDR",
        "name": "WALLACE MICHAEL PERRY ",
        "designator": "1110",
        "currentCommand": "MSTCLANT NORF VA",
        "prd": "2027-01-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20110,
        "billet": "INST TECH/INST A MARINER SKILLS",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 2nd Look",
        "preferredLocations": [
            "NF",
            "MP",
            "SD",
            "EV",
            "PH"
        ],
        "preferredPlatforms": [
            "DDG",
            "LSD",
            "LCS"
        ],
        "preferencePriority": "Homeport",
        "listShift": "",
        "tentativeSlate": "26-3"
    },
    {
        "id": "weiseimirmatthew_19",
        "rank": "LCDR",
        "name": "WEISE IMIR MATTHEW ",
        "designator": "1110",
        "currentCommand": "SMWDC DET SAWS",
        "prd": "2026-05-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20120,
        "billet": "STF REDI TAC/ASW/SUW WTI COI INSTRUCTOR",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 2nd Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": ""
    },
    {
        "id": "wilsonarronjames_19",
        "rank": "LCDR",
        "name": "WILSON ARRON JAMES ",
        "designator": "1110",
        "currentCommand": "LHA LHD LPD REDI",
        "prd": "2026-12-01",
        "preferences": [],
        "status": "Verify PD2",
        "notes": "",
        "yearGroup": 20120,
        "billet": "STF OPS&PLN/OPS ADMIN",
        "csr": "7AGAZ",
        "assignedSlate": "FY27 2nd Look",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": ""
    },
    {
        "id": "pcc-1771877067961",
        "name": "Ringo, Brett",
        "rank": "CDR",
        "designator": "1110",
        "currentCommand": "PCC (Post-Command)",
        "prd": "N/A",
        "preferences": [],
        "status": "PCC",
        "notes": "CMD Tour: USS WICHITA",
        "yearGroup": 0
    },
    {
        "id": "rothcrystalnicole_19",
        "rank": "LCDR",
        "name": "ROTH CRYSTAL NICOLE",
        "designator": "1110",
        "currentCommand": "OPNAV",
        "prd": "2024-12-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20110,
        "billet": "P&P DIR/N95Z BR HD EXPED ASSESSMENTS",
        "csr": "5AGAZ",
        "assignedSlate": "LIST SHIFT APPROVED",
        "cosmPreferences": [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
        ],
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "CO-SM"
    },
    {
        "id": "whitejoshuat_14",
        "rank": "LCDR",
        "name": "WHITE JOSHUA T",
        "designator": "1110",
        "currentCommand": "SMWDC",
        "prd": "2025-05-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20100,
        "billet": "STF REDI TAC/IAMD LEAD",
        "csr": "4AGAO",
        "assignedSlate": "LIST SHIFT APPROVED",
        "cosmPreferences": [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
        ],
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "CO-SM"
    },
    {
        "id": "yihans_8",
        "rank": "LCDR",
        "name": "YI HAN S",
        "designator": "1110",
        "currentCommand": "OPNAV",
        "prd": "2025-05-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20110,
        "billet": "STF PLN/N96C GUNNERY/DIRECTED ENERGY RO",
        "csr": "6AGAZ",
        "assignedSlate": "",
        "cosmPreferences": [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
        ],
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "CO-SM"
    },
    {
        "id": "rognliealeronb_16",
        "rank": "CDR",
        "name": "ROGNLIE ALERON B",
        "designator": "1110",
        "currentCommand": "MTG DET YOKOSUKA",
        "prd": "2027-08-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20040,
        "billet": "OIC SHR ACT/SHP ENG NUCGEN",
        "csr": "1AGAO",
        "assignedSlate": "",
        "cosmPreferences": [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
        ],
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "CO-SM"
    },
    {
        "id": "davisseanf_12",
        "rank": "CDR",
        "name": "DAVIS SEAN F",
        "designator": "1110",
        "currentCommand": "NROTCU HAWAII",
        "prd": "2028-08-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20050,
        "billet": "SCH ADMIN/INST/XO",
        "csr": "4AGAO",
        "assignedSlate": "",
        "cosmPreferences": [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
        ],
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "CO-SM"
    },
    {
        "id": "gulledgejosephg_17",
        "rank": "CDR",
        "name": "GULLEDGE JOSEPH G",
        "designator": "1117",
        "currentCommand": "NRC OKLAHOMA OK",
        "prd": "2028-06-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20080,
        "billet": "CDR/CO SHR ACT",
        "csr": "6AGAO",
        "assignedSlate": "",
        "cosmPreferences": [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
        ],
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "CO-SM"
    },
    {
        "id": "isaakkevinmarcelo_19",
        "rank": "CDR",
        "name": "ISAAK KEVIN MARCELO",
        "designator": "1110",
        "currentCommand": "CVN 75 H TRUMAN",
        "prd": "2028-11-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20080,
        "billet": "SHP REACT",
        "csr": "6AGAO",
        "assignedSlate": "",
        "cosmPreferences": [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
        ],
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "CO-SM"
    },
    {
        "id": "ahrensnathanlee_17",
        "rank": "LCDR",
        "name": "AHRENS NATHAN LEE",
        "designator": "1110",
        "currentCommand": "NSWCD CRANE NWCF",
        "prd": "2027-09-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20080,
        "billet": "XO SHR ACT",
        "csr": "6AGAO",
        "assignedSlate": "",
        "cosmPreferences": [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
        ],
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "CO-SM"
    },
    {
        "id": "deutschdanieljoseph_21",
        "rank": "CDR",
        "name": "DEUTSCH DANIEL JOSEPH",
        "designator": "1110",
        "currentCommand": "ESB 5 BLUE MILCR",
        "prd": "2026-08-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20090,
        "billet": "XO AFLOAT",
        "csr": "7AGAO",
        "assignedSlate": "SWO 3rd Look COSM",
        "cosmPreferences": [
            "MSRONs",
            "BMUs",
            "ACUs",
            "ATG PNW (CO Only)",
            "USS CONSTITUTION",
            "AEGIS Ashore (Poland)",
            "NBU 7",
            "AEGIS Ashore (Romania)",
            "CFA CHINHAE",
            "MSCO Korea",
            "NAVSUPACT CRANE",
            "Naval Support Activitys",
            "MSFSC SSU GUAM",
            "Navy Recruiting Districts/NTAG",
            "Brigs"
        ],
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "CO-SM"
    },
    {
        "id": "ephraimroberts_16",
        "rank": "CDR",
        "name": "EPHRAIM ROBERT S",
        "designator": "1110",
        "currentCommand": "LHD 3 KEARSARGE",
        "prd": "2025-12-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20090,
        "billet": "INFO SYS",
        "csr": "7AGAO",
        "assignedSlate": "SWO 3rd Look COSM",
        "cosmPreferences": [
            "ACUs",
            "BMUs",
            "MSRONs",
            "AEGIS Ashore (Romania)",
            "AEGIS Ashore (Poland)",
            "Naval Support Activitys",
            "Navy Recruiting Districts/NTAG",
            "USS CONSTITUTION",
            "ATG PNW (CO Only)",
            "NBU 7",
            "NAVSUPACT CRANE",
            "Brigs",
            "MSCO Korea",
            "CFA CHINHAE",
            "MSFSC SSU GUAM"
        ],
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "CO-SM"
    },
    {
        "id": "griffithryanpatrick_21",
        "rank": "CDR",
        "name": "GRIFFITH RYAN PATRICK",
        "designator": "1110",
        "currentCommand": "LCS CREW 227",
        "prd": "2026-04-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20090,
        "billet": "XO AFLOAT",
        "csr": "7AGAO",
        "assignedSlate": "SWO 3rd Look COSM",
        "cosmPreferences": [
            "ACUs",
            "BMUs",
            "MSRONs",
            "USS CONSTITUTION",
            "Navy Recruiting Districts/NTAG",
            "Brigs",
            "ATG PNW (CO Only)",
            "Naval Support Activitys",
            "NAVSUPACT CRANE",
            "AEGIS Ashore (Poland)",
            "AEGIS Ashore (Romania)",
            "NBU 7",
            "MSCO Korea",
            "CFA CHINHAE",
            "MSFSC SSU GUAM"
        ],
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "CO-SM"
    },
    {
        "id": "lewmankevinm_14",
        "rank": "CDR",
        "name": "LEWMAN KEVIN M",
        "designator": "1110",
        "currentCommand": "LPD 26 JP MURTHA",
        "prd": "2026-08-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20090,
        "billet": "XO AFLOAT",
        "csr": "7AGAO",
        "assignedSlate": "SWO 3rd Look COSM",
        "cosmPreferences": [
            "ACUs",
            "BMUs",
            "MSRONs",
            "USS CONSTITUTION",
            "ATG PNW (CO Only)",
            "Naval Support Activitys",
            "NBU 7",
            "Navy Recruiting Districts/NTAG",
            "CFA CHINHAE",
            "MSFSC SSU GUAM",
            "MSCO Korea",
            "NAVSUPACT CRANE",
            "Brigs",
            "AEGIS Ashore (Romania)",
            "AEGIS Ashore (Poland)"
        ],
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "CO-SM"
    },
    {
        "id": "maliximaynardc_16",
        "rank": "CDR",
        "name": "MALIXI MAYNARD C",
        "designator": "1110",
        "currentCommand": "S NWARCOL NPT RI",
        "prd": "*",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20090,
        "billet": "",
        "csr": "7AGAO",
        "assignedSlate": "SWO 3rd Look COSM",
        "cosmPreferences": [
            "BMUs",
            "ACUs",
            "MSRONs",
            "Brigs",
            "ATG PNW (CO Only)",
            "Navy Recruiting Districts/NTAG",
            "Naval Support Activitys",
            "USS CONSTITUTION",
            "NAVSUPACT CRANE",
            "AEGIS Ashore (Romania)",
            "AEGIS Ashore (Poland)",
            "NBU 7",
            "MSCO Korea",
            "CFA CHINHAE",
            "MSFSC SSU GUAM"
        ],
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "CO-SM"
    },
    {
        "id": "reschmeierwernerrudolph_25",
        "rank": "CDR",
        "name": "RESCHMEIER WERNER RUDOLPH",
        "designator": "1110",
        "currentCommand": "LPD 23 ANCHO",
        "prd": "2026-11-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20090,
        "billet": "XO AFLOAT",
        "csr": "7AGAO",
        "assignedSlate": "SWO 3rd Look COSM",
        "cosmPreferences": [
            "BMUs",
            "ACUs",
            "NBU 7",
            "MSRONs",
            "Naval Support Activitys",
            "CFA CHINHAE",
            "MSCO Korea",
            "NAVSUPACT CRANE",
            "ATG PNW (CO Only)",
            "AEGIS Ashore (Romania)",
            "AEGIS Ashore (Poland)",
            "MSFSC SSU GUAM",
            "USS CONSTITUTION",
            "Brigs",
            "Navy Recruiting Districts/NTAG"
        ],
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "CO-SM",
        "tentativeSlate": "26-2"
    },
    {
        "id": "zicarellidavidlee_19",
        "rank": "CDR",
        "name": "ZICARELLI DAVID LEE",
        "designator": "1110",
        "currentCommand": "ATG NORFOLK",
        "prd": "2027-05-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20090,
        "billet": "STF REDI GEN",
        "csr": "4AGAO",
        "assignedSlate": "",
        "cosmPreferences": [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
        ],
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "CO-SM"
    },
    {
        "id": "benjamincolleenmarie_22",
        "rank": "CDR",
        "name": "BENJAMIN COLLEEN MARIE",
        "designator": "1110",
        "currentCommand": "ESB 5 GOLD MILCR",
        "prd": "2026-10-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20100,
        "billet": "XO AFLOAT",
        "csr": "7AGAO",
        "assignedSlate": "SWO 3rd Look COSM",
        "cosmPreferences": [
            "USS CONSTITUTION",
            "Navy Recruiting Districts/NTAG",
            "ACUs",
            "BMUs",
            "MSRONs",
            "Naval Support Activitys",
            "ATG PNW (CO Only)",
            "NBU 7",
            "MSFSC SSU GUAM",
            "NAVSUPACT CRANE",
            "MSCO Korea",
            "CFA CHINHAE",
            "AEGIS Ashore (Poland)",
            "AEGIS Ashore (Romania)",
            "Brigs"
        ],
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "CO-SM"
    },
    {
        "id": "cullenmichaelj_16",
        "rank": "CDR",
        "name": "CULLEN MICHAEL J",
        "designator": "1110",
        "currentCommand": "ESB 7 BLUE MILCR",
        "prd": "2026-10-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20100,
        "billet": "XO AFLOAT",
        "csr": "7AGAO",
        "assignedSlate": "SWO 3rd Look COSM",
        "cosmPreferences": [
            "ACUs",
            "BMUs",
            "MSRONs",
            "USS CONSTITUTION",
            "NBU 7",
            "CFA CHINHAE",
            "MSCO Korea",
            "NAVSUPACT CRANE",
            "AEGIS Ashore (Poland)",
            "AEGIS Ashore (Romania)",
            "Naval Support Activities",
            "ATG PNW (CO Only)",
            "MSFSC SSU GUAM",
            "Navy Recruiting Districts/NTAG",
            "Brigs"
        ],
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "CO-SM"
    },
    {
        "id": "endrelunasadamkarl_20",
        "rank": "LCDR",
        "name": "ENDRELUNAS ADAM KARL",
        "designator": "1110",
        "currentCommand": "LCS CREW 233",
        "prd": "2026-08-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20100,
        "billet": "",
        "csr": "7AGAO",
        "assignedSlate": "SWO 3rd Look COSM",
        "cosmPreferences": [
            "MSRON (San Diego)",
            "BMU (San Diego)",
            "ACU (San Diego)",
            "NSA (San Diego)",
            "Brig (San Diego/Miramar)",
            "USS CONSTITUTION",
            "ATG PNW",
            "NBU 7",
            "CFA CHINHAE",
            "MSCO Korea",
            "AEGIS Ashore (Poland)",
            "AEGIS Ashore (Romania)",
            "Navy Recruiting (Excepting San Diego)",
            "NAVSUPACT Crane",
            "MSFSC SSU Guam"
        ],
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "CO-SM"
    },
    {
        "id": "farishnathancampbell_22",
        "rank": "CDR",
        "name": "FARISH NATHAN CAMPBELL",
        "designator": "1110",
        "currentCommand": "DDG 1000 ZUMWALT",
        "prd": "2026-05-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20100,
        "billet": "XO AFLOAT",
        "csr": "7AGAO",
        "assignedSlate": "SWO 3rd Look COSM",
        "cosmPreferences": [
            "USVRONs",
            "MSRONs",
            "ACUs",
            "BMUs",
            "ATG PNW (CO Only)",
            "Navy Recruiting Districts/NTAG",
            "Naval Support Activitys",
            "Brigs",
            "USS CONSTITUTION",
            "NAVSUPACT CRANE",
            "AEGIS Ashore (Romania)",
            "AEGIS Ashore (Poland)",
            "NBU 7",
            "CFA CHINHAE",
            "MSCO Korea"
        ],
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "CO-SM"
    },
    {
        "id": "mcclintonmuzikmandrell_24",
        "rank": "CDR",
        "name": "MCCLINTON MUZIK MANDRELL",
        "designator": "1110",
        "currentCommand": "ESB 6 BLUE MILCR",
        "prd": "2026-11-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20100,
        "billet": "XO AFLOAT",
        "csr": "7AGAO",
        "assignedSlate": "SWO 3rd Look COSM",
        "cosmPreferences": [
            "ACUs",
            "BMUs",
            "MSRONs",
            "Navy Recruiting Districts/NTAG",
            "USS CONSTITUTION",
            "Naval Support Activities",
            "Brigs",
            "ATG PNW (CO Only)",
            "MSFSC SSU GUAM",
            "CFA CHINHAE",
            "NBU 7",
            "MSCO Korea",
            "NAVSUPACT CRANE",
            "AEGIS Ashore (Romania)",
            "AEGIS Ashore (Poland)"
        ],
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "CO-SM"
    },
    {
        "id": "mutaikevinkiprop_18",
        "rank": "CDR",
        "name": "MUTAI KEVIN KIPROP",
        "designator": "1110",
        "currentCommand": "LPD 25 SOMERSET",
        "prd": "2026-09-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20100,
        "billet": "XO AFLOAT",
        "csr": "7AGAO",
        "assignedSlate": "SWO 3rd Look COSM",
        "cosmPreferences": [
            "USVRON",
            "BMUs",
            "MSRONs",
            "ACUs",
            "Naval Support Activitys",
            "Brigs",
            "Navy Recruiting Districts/NTAG",
            "CFA CHINHAE",
            "MSCO Korea",
            "NBU 7",
            "MSFSC SSU GUAM",
            "NAVSUPACT CRANE",
            "AEGIS Ashore (Romania)",
            "AEGIS Ashore (Poland)",
            "USS CONSTITUTION"
        ],
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "CO-SM"
    },
    {
        "id": "oldfielddustine_17",
        "rank": "CDR",
        "name": "OLDFIELD DUSTIN E",
        "designator": "1110",
        "currentCommand": "ESB 4 BLUE MILCR",
        "prd": "2026-07-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20100,
        "billet": "XO AFLOAT",
        "csr": "7AGAO",
        "assignedSlate": "SWO 3rd Look COSM",
        "cosmPreferences": [
            "MSRONs",
            "ACUs",
            "BMUs",
            "Brigs",
            "NTAG (Atlanta)",
            "USS CONSTITUTION",
            "Naval Support Activitys",
            "AEGIS Ashore (Romania)",
            "AEGIS Ashore (Poland)",
            "ATG PNW (CO Only)",
            "CFA CHINHAE",
            "NBU 7",
            "MSFSC SSU GUAM",
            "MSCO Korea",
            "NAVSUPACT CRANE"
        ],
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "CO-SM"
    },
    {
        "id": "elsenbeckdavidandrew_22",
        "rank": "LCDR",
        "name": "ELSENBECK DAVID ANDREW",
        "designator": "1110",
        "currentCommand": "SWSC NEWPORT RI",
        "prd": "2027-11-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20100,
        "billet": "INST TECH/INST C CA COORD",
        "csr": "5AGAZ",
        "assignedSlate": "LIST SHIFT APPROVED",
        "cosmPreferences": [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
        ],
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "CO-SM"
    },
    {
        "id": "buffinwhitneyanne_19",
        "rank": "LCDR",
        "name": "BUFFIN WHITNEY ANNE",
        "designator": "1110",
        "currentCommand": "JCS WASH DC",
        "prd": "2026-06-01",
        "preferences": [],
        "status": "Declined",
        "notes": "",
        "yearGroup": 20090,
        "billet": "POL MIL PLANNER/JNT STRAT P&P/00001095",
        "csr": "4AGAO",
        "assignedSlate": "LIST SHIFT APPROVED",
        "cosmPreferences": [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
        ],
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "CO-SM"
    },
    {
        "id": "dematteodanielrobert_22",
        "rank": "LCDR",
        "name": "DEMATTEO DANIEL ROBERT",
        "designator": "1110",
        "currentCommand": "COMPACFLT MOC",
        "prd": "2027-05-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20100,
        "billet": "STF OPS&PLN/BMD OFF",
        "csr": "5AGAO",
        "assignedSlate": "LIST SHIFT APPROVED",
        "cosmPreferences": [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
        ],
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "CO-SM"
    },
    {
        "id": "tribbledrewanthony_20",
        "rank": "LCDR",
        "name": "TRIBBLE DREW ANTHONY",
        "designator": "1110",
        "currentCommand": "COMNAVAIRLANT",
        "prd": "2026-12-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20120,
        "billet": "SHP ENG NUCGEN/FRTA",
        "csr": "6AGAO",
        "assignedSlate": "APPROVED",
        "cosmPreferences": [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
        ],
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "CO-SM",
        "tentativeSlate": "26-2"
    },
    {
        "id": "dietzelmorganmichelle_23",
        "rank": "CDR",
        "name": "DIETZEL MORGAN MICHELLE",
        "designator": "1110",
        "currentCommand": "CVN 69 EISENHOWE",
        "prd": "2026-05-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20060,
        "billet": "SHP REACT",
        "csr": "6AGAO",
        "assignedSlate": "SWO 3rd Look COSM",
        "cosmPreferences": [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
        ],
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "CO-SM",
        "tentativeSlate": "26-2"
    },
    {
        "id": "schimpfrandallgerard_22",
        "rank": "CDR",
        "name": "SCHIMPF RANDALL GERARD",
        "designator": "1110",
        "currentCommand": "NORTHCOM JTF-CS",
        "prd": "2027-01-01",
        "preferences": [],
        "status": "No Opportunity",
        "notes": "",
        "yearGroup": 20050,
        "billet": "CHIEF, JOINT EXERCISE BRANCH",
        "csr": "4AGAO",
        "assignedSlate": "",
        "cosmPreferences": [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
        ],
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "CO-SM"
    },
    {
        "id": "catalanomichael_16",
        "rank": "CDR",
        "name": "CATALANO MICHAEL",
        "designator": "1110",
        "currentCommand": "CENSECFOR DET CH",
        "prd": "2027-11-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20070,
        "billet": "OIC SHR ACT",
        "csr": "6AGAO",
        "assignedSlate": "SWO 3rd Look COSM",
        "cosmPreferences": [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
        ],
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "CO-SM",
        "tentativeSlate": "26-2"
    },
    {
        "id": "samardzicsrdan_15",
        "rank": "LCDR",
        "name": "SAMARDZIC SRDAN",
        "designator": "1110",
        "currentCommand": "SURFDEVGRU ONE",
        "prd": "2028-08-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20110,
        "billet": "STF ENG",
        "csr": "4AGAO",
        "assignedSlate": "LIST SHIFT APPROVED",
        "cosmPreferences": [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
        ],
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "CO-SM",
        "tentativeSlate": "26-2"
    },
    {
        "id": "wilkinsdouglasc_17",
        "rank": "CDR",
        "name": "WILKINS DOUGLAS C",
        "designator": "1110",
        "currentCommand": "SCSTC DAHLGREN",
        "prd": "2026-08-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20100,
        "billet": "XO SHR ACT",
        "csr": "7AGAO",
        "assignedSlate": "SWO 3rd Look COSM",
        "cosmPreferences": [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
        ],
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "CO-SM",
        "tentativeSlate": "26-2"
    },
    {
        "id": "eastonryanj_13",
        "rank": "CDR",
        "name": "EASTON RYAN J",
        "designator": "1110",
        "currentCommand": "PEP BELGIUM-OOST",
        "prd": "2027-07-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20080,
        "billet": "MINE WARFARE INST/PEP FM 53201/80160",
        "csr": "6AGAO",
        "assignedSlate": "",
        "cosmPreferences": [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
        ],
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "CO-SM",
        "tentativeSlate": "26-2"
    },
    {
        "id": "shinegogregorymichael_23",
        "rank": "CDR",
        "name": "SHINEGO GREGORY MICHAEL",
        "designator": "1110",
        "currentCommand": "ESB 3 BLUE MILCR",
        "prd": "2026-06-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20090,
        "billet": "XO AFLOAT",
        "csr": "7AGAO",
        "assignedSlate": "SWO 3rd Look COSM",
        "cosmPreferences": [
            "Navy Recruiting Districts/NTAG",
            "USS CONSTITUTION",
            "ACUs",
            "BMUs",
            "Brigs",
            "ATG PNW (CO Only)",
            "NAVSUPACT CRANE",
            "MSRONs",
            "Naval Support Activitys",
            "AEGIS Ashore (Romania)",
            "AEGIS Ashore (Poland)",
            "MSFSC SSU GUAM",
            "NBU 7",
            "MSCO Korea",
            "CFA CHINHAE"
        ],
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "CO-SM",
        "tentativeSlate": "26-2"
    },
    {
        "id": "johnsonrobertojose_20",
        "rank": "CDR",
        "name": "JOHNSON ROBERTO JOSE",
        "designator": "1110",
        "currentCommand": "ESB 4 GOLD MILCR",
        "prd": "2026-10-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20100,
        "billet": "XO AFLOAT",
        "csr": "7AGAO",
        "assignedSlate": "SWO 3rd Look COSM",
        "cosmPreferences": [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
        ],
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "CO-SM",
        "tentativeSlate": "26-2"
    },
    {
        "id": "harneyseanmichael_19",
        "rank": "CDR",
        "name": "HARNEY SEAN MICHAEL",
        "designator": "1117",
        "currentCommand": "CNRFC NORVA",
        "prd": "2028-10-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20100,
        "billet": "STF LIAISON/TRAVEL ORDERS DH",
        "csr": "7AGAO",
        "assignedSlate": "SWO 3rd Look COSM",
        "cosmPreferences": [
            "MSRON",
            "Navy Recruiting",
            "BMUs",
            "ACUs",
            "Brigs",
            "AEGIS Ashore Romania",
            "AEGIS Ashore Poland",
            "NAVSUPACT CRANE",
            "Naval Support Activities",
            "USS Constitution",
            "NBU 7",
            "MSCO Korea",
            "CFA CHINHAE",
            "MSFSC SSU GUAM",
            "ATG PNW"
        ],
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "CO-SM",
        "tentativeSlate": "26-2"
    },
    {
        "id": "steppnathant_14",
        "rank": "LCDR",
        "name": "STEPP NATHAN T",
        "designator": "1110",
        "currentCommand": "EUCOM HQ",
        "prd": "2026-11-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20100,
        "billet": "JOINT TARGETING OFFICER/00010211",
        "csr": "5AGAO",
        "assignedSlate": "LIST SHIFT APPROVED",
        "cosmPreferences": [
            "Navy Recruiting Districts/NTAG",
            "Naval Support Activitys",
            "ATG PNW (CO Only)",
            "NAVSUPACT CRANE",
            "USS CONSTITUTION",
            "AEGIS Ashore (Poland)",
            "ACUs",
            "BMUs",
            "MSRONs",
            "Brigs",
            "AEGIS Ashore (Romania)",
            "MSFSC SSU GUAM",
            "NBU 7",
            "CFA CHINHAE",
            "MSCO Korea"
        ],
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "CO-SM",
        "tentativeSlate": "26-2"
    },
    {
        "id": "swoggerloganmatthew_21",
        "rank": "CDR",
        "name": "SWOGGER LOGAN MATTHEW",
        "designator": "1117",
        "currentCommand": "COMNAVSURFLANT",
        "prd": "2028-05-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20080,
        "billet": "STF OPS&PLN/MOB&SEL/RESERVE PGM DIR",
        "csr": "6AGAO",
        "assignedSlate": "",
        "cosmPreferences": [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
        ],
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "CO-SM"
    },
    {
        "id": "kachmanricharda_17",
        "rank": "CDR",
        "name": "KACHMAN RICHARD A",
        "designator": "1110",
        "currentCommand": "DDG 121 PETERSEN",
        "prd": "2026-09-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20090,
        "billet": "XO AFLOAT",
        "csr": "7AGAO",
        "assignedSlate": "SWO 3rd Look COSM",
        "cosmPreferences": [
            "ACUs",
            "BMUs",
            "MSRONs",
            "ATG PNW (CO Only)",
            "Naval Support Activitys",
            "USS CONSTITUTION",
            "AEGIS Ashore (Poland)",
            "AEGIS Ashore (Romania)",
            "NBU 7",
            "Navy Recruiting Districts/NTAG",
            "NAVSUPACT CRANE",
            "Brigs",
            "MSCO Korea",
            "CFA CHINHAE",
            "MSFSC SSU GUAM"
        ],
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "CO-SM",
        "tentativeSlate": "26-2"
    },
    {
        "id": "rossichristopherdavid_23",
        "rank": "CDR",
        "name": "ROSSI CHRISTOPHER DAVID",
        "designator": "1110",
        "currentCommand": "ATG NORFOLK",
        "prd": "2028-03-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20080,
        "billet": "STF OPS&PLN/BRMW",
        "csr": "6AGAO",
        "assignedSlate": "",
        "cosmPreferences": [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
        ],
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "CO-SM"
    },
    {
        "id": "warneckematthewpalmer_23",
        "rank": "CDR",
        "name": "WARNECKE MATTHEW PALMER",
        "designator": "1110",
        "currentCommand": "TRAINING/TRNG OPS",
        "prd": "2028-03-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20070,
        "billet": "SCSTC LTF PAC",
        "csr": "6AGAO",
        "assignedSlate": "",
        "cosmPreferences": [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
        ],
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "CO-SM"
    },
    {
        "id": "giarnellaraffaeleandrew_25",
        "rank": "CDR",
        "name": "GIARNELLA RAFFAELE ANDREW",
        "designator": "1110",
        "currentCommand": "MOC FLT FORCES",
        "prd": "2028-05-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20080,
        "billet": "STF OPS&PLN/DSCA PLANS/MOC FPLANSOL",
        "csr": "6AGAO",
        "assignedSlate": "",
        "cosmPreferences": [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
        ],
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "CO-SM"
    },
    {
        "id": "stokesisaiaht_15",
        "rank": "CDR",
        "name": "STOKES ISAIAH T",
        "designator": "1110",
        "currentCommand": "DDG 85 MCCAMPBL",
        "prd": "2026-02-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20090,
        "billet": "XO AFLOAT",
        "csr": "7AGAO",
        "assignedSlate": "SWO 3rd Look COSM",
        "cosmPreferences": [
            "NBU 7",
            "ACUs",
            "BMUs",
            "AEGIS Ashore (Poland)",
            "AEGIS Ashore (Romania)",
            "MSRONs",
            "Navy Recruiting Districts/NTAG",
            "Naval Support Activitys",
            "CFA CHINHAE",
            "USS CONSTITUTION",
            "ATG PNW (CO Only)",
            "NAVSUPACT CRANE",
            "MSFSC SSU GUAM",
            "MSCO Korea",
            "Brigs"
        ],
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "CO-SM"
    },
    {
        "id": "woodsdanielmccarthy_21",
        "rank": "CDR",
        "name": "WOODS DANIEL MCCARTHY",
        "designator": "1110",
        "currentCommand": "LCC 19 B RIDGE",
        "prd": "2026-06-01",
        "preferences": [],
        "status": "Available",
        "notes": "",
        "yearGroup": 20090,
        "billet": "XO AFLOAT",
        "csr": "7AGAO",
        "assignedSlate": "SWO 3rd Look COSM",
        "cosmPreferences": [
            "USS CONSTITUTION",
            "NBU 7",
            "BMUs",
            "ACUs",
            "ATG PNW (CO Only)",
            "CFA CHINHAE",
            "MSCO Korea",
            "MSFSC SSU GUAM",
            "Navy Recruiting Districts/NTAG",
            "Naval Support Activitys",
            "NAVSUPACT CRANE",
            "Brigs",
            "AEGIS Poland",
            "AEGIS Romania",
            "MSRONs"
        ],
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null,
        "listShift": "CO-SM",
        "tentativeSlate": "26-2"
    },
    {
        "id": "pcc-1772152854204",
        "name": "Johnson, Lauren",
        "rank": "CDR",
        "designator": "1110",
        "currentCommand": "PCC (Post-Command)",
        "prd": "N/A",
        "preferences": [],
        "status": "PCC",
        "notes": "CMD Tour: USS STOCKDALE",
        "yearGroup": 0
    },
    {
        "id": "pcc-1772155557695",
        "name": "Wang, Nellie (CHS single crew CO)(COC NOV24)",
        "rank": "CDR",
        "designator": "1110",
        "currentCommand": "PCC (Post-Command)",
        "prd": "N/A",
        "preferences": [],
        "status": "PCC",
        "notes": "CMD Tour: USS CHARLESTON",
        "yearGroup": 0
    },
    {
        "id": "pcc-1772155655815",
        "name": "Robertson, Jeremy",
        "rank": "CDR",
        "designator": "1110",
        "currentCommand": "PCC (Post-Command)",
        "prd": "N/A",
        "preferences": [],
        "status": "PCC",
        "notes": "CMD Tour: USS CARNEY",
        "yearGroup": 0
    },
    {
        "id": "pcc-1772158452646",
        "name": "Neff, Justin (CO) (COC NOV 24)",
        "rank": "CDR",
        "designator": "1110",
        "currentCommand": "PCC (Post-Command)",
        "prd": "N/A",
        "preferences": [],
        "status": "PCC",
        "notes": "CMD Tour: USS MINNEAPOLIS SAINT PAUL",
        "yearGroup": 0
    },
    {
        "id": "pcc-1772158609754",
        "name": "Kemmitz, Bryan (XO-A)",
        "rank": "CDR",
        "designator": "1110",
        "currentCommand": "PCC (Post-Command)",
        "prd": "N/A",
        "preferences": [],
        "status": "PCC",
        "notes": "CMD Tour: USS MINNEAPOLIS SAINT PAUL",
        "yearGroup": 0
    }
]

export const billets = []

export const oracleData: OracleCommand[] = [
    {
        "id": "cmd_1",
        "name": "USS CHARLESTON",
        "uic": "20156",
        "location": "Manama, BH",
        "currentCO": {
            "name": "GRAY MEGHAN",
            "prd": "2024-05-22",
            "timelineData": {
                "i": "2024-04-22",
                "k": "2024-06-22",
                "m": "2024-11-24",
                "q": "2026-05-26"
            }
        },
        "currentXO": {
            "name": "HOOGE DANIEL",
            "prd": "TBD",
            "timelineData": {
                "i": "2026-02-24",
                "k": "2026-04-24",
                "m": "2026-05-24",
                "q": "2027-11-24"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "29-4",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2022-11-24",
            "xoTurnover": "2024-05-22",
            "coc": "2024-06-01",
            "coTurnover": "2025-12-01"
        },
        "platform": "LCS",
        "slatedXO": {
            "name": "26-2",
            "reportDate": "2028-06-27",
            "timelineData": {
                "i": "2028-06-27",
                "k": "2028-07-27",
                "m": "2028-08-27",
                "q": "2030-02-27"
            }
        },
        "prospectiveCO": {
            "name": "VACANT",
            "prd": "TBD"
        }
    },
    {
        "id": "cmd_2",
        "name": "USS TULSA  BLUE (CREW 215)",
        "uic": "41061",
        "location": "Manama, BH",
        "currentCO": {
            "name": "Greenlees, Drew",
            "prd": "2022-08-22",
            "timelineData": {
                "i": "2022-07-22",
                "k": "2022-08-22",
                "m": "2022-09-22",
                "q": "2024-03-24"
            }
        },
        "currentXO": {
            "name": "Moyer, Kyle (XO/CO)",
            "prd": "2025-06-24",
            "timelineData": {
                "i": "2025-05-24",
                "k": "2025-07-24",
                "m": "2025-05-25",
                "q": "2026-12-26"
            }
        },
        "inboundXO": {
            "name": "Zarow, Zachary (24-3)",
            "reportDate": "2027-02-25",
            "timelineData": {
                "i": "2027-02-25",
                "k": "2027-04-25",
                "m": "2027-05-25",
                "q": "2028-11-25"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "29-4",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2023-12-24",
            "xoTurnover": "2025-06-24",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "LCS",
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "AUG28",
            "timelineData": {
                "i": "AUG28",
                "k": "FEB30",
                "m": "APR30",
                "q": "OCT31"
            }
        }
    },
    {
        "id": "cmd_3",
        "name": "USS TULSA  GOLD (CREW 217)",
        "platform": "LCS",
        "location": "San Diego, CA",
        "uic": "23114",
        "currentCO": {
            "name": "Wanier, Blake (XO/CO)",
            "prd": "2025-09-23",
            "timelineData": {
                "i": "2025-08-23",
                "k": "2025-10-23",
                "m": "2025-11-23",
                "q": "2027-06-23"
            }
        },
        "currentXO": {
            "name": "Bradford, Jordan (24-2)",
            "prd": "2027-02-25",
            "timelineData": {
                "i": "2027-01-25",
                "k": "2027-03-25",
                "m": "2027-04-25",
                "q": "2028-10-25"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "26-4",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2025-08-25",
            "xoTurnover": "2027-02-25",
            "coc": "2027-03-01",
            "coTurnover": "2028-09-01"
        },
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "",
            "timelineData": {
                "i": "",
                "k": "",
                "m": "",
                "q": ""
            }
        }
    },
    {
        "id": "cmd_4",
        "name": "USS OMAHA",
        "uic": "20141",
        "location": "Manama, BH",
        "currentCO": {
            "name": "Doyle, Ryan (COC DEC 24 / EARLY JAN 2025)",
            "prd": "2024-11-23",
            "timelineData": {
                "i": "2024-10-23",
                "k": "2024-12-23",
                "m": "2024-10-24",
                "q": "2026-04-23"
            }
        },
        "currentXO": {
            "name": "Nottberg, Adam (24-2)(D.I.T.) (2412)",
            "prd": "2026-02-24",
            "timelineData": {
                "i": "2026-01-24",
                "k": "2026-03-24",
                "m": "2026-04-24",
                "q": "2027-11-24"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "30-2",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "LCS",
        "slatedXO": {
            "name": "27-2",
            "reportDate": "2029-01-26",
            "timelineData": {
                "i": "2029-01-26",
                "k": "2029-03-26",
                "m": "2029-04-26",
                "q": "2030-11-26"
            }
        }
    },
    {
        "id": "cmd_5",
        "name": "USS PIERRE",
        "uic": "20267",
        "location": "Manama, BH",
        "currentCO": {
            "name": "Guernsey, Justin (CO) (OIC)",
            "prd": "Unknown",
            "timelineData": {
                "i": null,
                "k": null,
                "m": null,
                "q": "2026-06-26"
            }
        },
        "currentXO": {
            "name": "Munji, Audrey (24-2)",
            "prd": "2026-04-24",
            "timelineData": {
                "i": "2026-03-24",
                "k": "2026-05-24",
                "m": "2026-06-24",
                "q": "2027-12-24"
            }
        },
        "inboundXO": {
            "name": "Crockett, Vatrako (25-3)",
            "reportDate": "2027-12-26",
            "timelineData": {
                "i": "2027-12-26",
                "k": "2028-02-26",
                "m": "2028-03-26",
                "q": "2029-09-26"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "30-2",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "LCS",
        "slatedXO": {
            "name": "27-1",
            "reportDate": "2029-01-26",
            "timelineData": {
                "i": "2029-01-26",
                "k": "2029-03-26",
                "m": "2029-04-26",
                "q": "2030-10-26"
            }
        }
    },
    {
        "id": "cmd_6",
        "name": "USS BARRY",
        "uic": "21660",
        "location": "Everett, WA",
        "currentCO": {
            "name": "YOUNG ROGER LEE",
            "prd": "2024-08-01",
            "timelineData": {
                "i": "2023-01-01",
                "k": "2024-09-01",
                "m": "2024-11-01",
                "q": "JUN26"
            }
        },
        "currentXO": {
            "name": "SULLIVAN KYLE A",
            "prd": "2026-02-01",
            "timelineData": {
                "i": "2024-09-01",
                "k": "MAY26",
                "m": "JUN26",
                "q": "JAN29"
            }
        },
        "inboundXO": {
            "name": "ARNOLD STEPHEN L",
            "reportDate": "MAY26",
            "timelineData": {
                "i": "2026-05-01",
                "k": "2027-11-01",
                "m": "2028-01-01",
                "q": "2029-07-01"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "29-1",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "DDG",
        "fleetUpProgress": {
            "isic": false,
            "tycom": false,
            "pco": true,
            "orders": false,
            "coc": false
        },
        "slatedXO": {
            "name": "26-3",
            "reportDate": "2027-11-01",
            "timelineData": {
                "i": "2027-11-01",
                "k": "2029-05-01",
                "m": "2029-07-01",
                "q": "2031-01-01"
            }
        }
    },
    {
        "id": "cmd_7",
        "name": "USS JOHN PAUL JONES",
        "uic": "21313",
        "location": "Everett, WA",
        "currentCO": {
            "name": "VIRGADAMO JOSHUA RYAN",
            "prd": "2025-03-01",
            "timelineData": {
                "i": "2024-01-01",
                "k": "2025-04-01",
                "m": "2025-06-01",
                "q": "2027-01-01"
            }
        },
        "currentXO": {
            "name": "LOCK KODI M",
            "prd": "2026-11-24",
            "timelineData": {
                "i": "2025-02-24",
                "k": "2026-12-24",
                "m": "2027-01-24",
                "q": "2028-07-24"
            }
        },
        "inboundXO": {
            "name": "CRAWFORD NIKI YSABEL",
            "reportDate": "2026-11-26",
            "timelineData": {
                "i": "2026-11-26",
                "k": "2028-05-26",
                "m": "2028-07-26",
                "q": "2030-01-26"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "29-3",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "DDG",
        "slatedXO": {
            "name": "27-2",
            "reportDate": "2028-05-01",
            "timelineData": {
                "i": "2028-05-01",
                "k": "2029-11-01",
                "m": "2030-01-01",
                "q": "2031-07-01"
            }
        }
    },
    {
        "id": "cmd_8",
        "name": "USS JOHN S MCAIN",
        "uic": "21686",
        "location": "Everett, WA",
        "currentCO": {
            "name": "INGEL DAVID",
            "prd": "2025-09-23",
            "timelineData": {
                "i": "2024-04-23",
                "k": "2025-10-23",
                "m": "2025-12-23",
                "q": "2027-02-23"
            }
        },
        "currentXO": {
            "name": "MEARS JEREMY RYAN",
            "prd": "2026-11-25",
            "timelineData": {
                "i": "2025-03-25",
                "k": "2026-12-25",
                "m": "2027-02-25",
                "q": "2028-08-25"
            }
        },
        "inboundXO": {
            "name": "KLINKHAMMER EDWIN KYLE",
            "reportDate": "2026-11-01",
            "timelineData": {
                "i": "2026-11-01",
                "k": "2028-05-01",
                "m": "2028-07-01",
                "q": "2030-01-01"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "29-3",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "DDG",
        "slatedXO": {
            "name": "27-2",
            "reportDate": "2028-05-01",
            "timelineData": {
                "i": "2028-05-01",
                "k": "2029-11-01",
                "m": "2030-01-01",
                "q": "2031-07-01"
            }
        }
    },
    {
        "id": "cmd_9",
        "name": "USS BENFOLD",
        "uic": "21940",
        "location": "Everett, WA",
        "currentCO": {
            "name": "MAYER RICHARD ANDREW",
            "prd": "2024-03-01",
            "timelineData": {
                "i": "2022-08-01",
                "k": "2024-04-01",
                "m": "2024-10-24",
                "q": "2026-05-24"
            }
        },
        "currentXO": {
            "name": "CONTIVOCK REBECCA M",
            "prd": "2025-12-24",
            "timelineData": {
                "i": "2024-06-24",
                "k": "2026-01-24",
                "m": "2026-05-24",
                "q": "2027-11-24"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "28-4",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "DDG",
        "prospectiveCO": {
            "name": "",
            "prd": ""
        },
        "inboundXO": {
            "name": "SHRADER JARED ALLEN",
            "reportDate": "JAN26",
            "timelineData": {
                "i": "2026-01-25",
                "k": "2027-09-25",
                "m": "2027-11-25",
                "q": "2029-05-25"
            }
        },
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "JUL27",
            "timelineData": {
                "i": "JUL27",
                "k": "JAN29",
                "m": "MAR29",
                "q": "SEP30"
            }
        }
    },
    {
        "id": "cmd_10",
        "name": "USS KIDD",
        "uic": "23152",
        "location": "Everett, WA",
        "currentCO": {
            "name": "GANS CHRISTOPHER TONY",
            "prd": "2025-07-01",
            "timelineData": {
                "i": "2024-06-01",
                "k": "2025-08-01",
                "m": "2025-10-01",
                "q": "2027-05-01"
            }
        },
        "currentXO": {
            "name": "MERRITT EMILY S",
            "prd": "2027-02-25",
            "timelineData": {
                "i": "2025-08-25",
                "k": "2027-03-25",
                "m": "2027-05-25",
                "q": "2028-11-25"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "30-1",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "DDG",
        "inboundXO": {
            "name": "KIM HYUNG IK",
            "reportDate": "MAR27"
        },
        "slatedXO": {
            "name": "27-2",
            "reportDate": "2028-09-25",
            "timelineData": {
                "i": "2028-09-25",
                "k": "2030-03-25",
                "m": "2030-05-25",
                "q": "2031-11-25"
            }
        }
    },
    {
        "id": "cmd_11",
        "name": "USS GRIDLEY",
        "uic": "23151",
        "location": "Everett, WA",
        "currentCO": {
            "name": "KEEL MAGDALENA MARCE",
            "prd": "2025-08-01",
            "timelineData": {
                "i": "2024-01-01",
                "k": "2025-09-01",
                "m": "2025-11-01",
                "q": "2027-05-01"
            }
        },
        "currentXO": {
            "name": "JESTRAB MAREK C",
            "prd": "2027-02-25",
            "timelineData": {
                "i": "2025-06-25",
                "k": "2027-03-25",
                "m": "2027-05-25",
                "q": "2028-12-25"
            }
        },
        "inboundXO": {
            "name": "CASSELS MARLEY EMILIA",
            "reportDate": "2027-03-01",
            "timelineData": {
                "i": "2027-03-01",
                "k": "2028-10-01",
                "m": "2028-12-01",
                "q": "2030-06-01"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "30-1",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "DDG",
        "slatedXO": {
            "name": "27-3",
            "reportDate": "2028-10-01",
            "timelineData": {
                "i": "2028-10-01",
                "k": "2030-04-01",
                "m": "2030-06-01",
                "q": "2031-12-01"
            }
        }
    },
    {
        "id": "cmd_12",
        "name": "USS SAMPSON",
        "uic": "23161",
        "location": "Everett, WA",
        "currentCO": {
            "name": "LONG CATHERINE SUSAN",
            "prd": "SEP26",
            "timelineData": {
                "i": "2023-08-01",
                "k": "2024-10-01",
                "m": "2024-12-01",
                "q": "2026-09-01"
            }
        },
        "currentXO": {
            "name": "MORGAN ALEXIA LYNN",
            "prd": "JULY26",
            "timelineData": {
                "i": "2025-05-25",
                "k": "2026-08-25",
                "m": "2026-10-25",
                "q": "2028-04-25"
            }
        },
        "inboundXO": {
            "name": "GETTY AARON TIMOTHY",
            "reportDate": "JULY26",
            "timelineData": {
                "i": "2026-07-26",
                "k": "2028-01-26",
                "m": "2028-03-26",
                "q": "2029-09-26"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "29-2",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "DDG",
        "prospectiveCO": {
            "name": "KARLO BRIAN J",
            "prd": "SEP26"
        },
        "slatedXO": {
            "name": "27-1",
            "reportDate": "2028-01-01",
            "timelineData": {
                "i": "2028-01-01",
                "k": "2029-07-01",
                "m": "2029-09-01",
                "q": "2031-03-01"
            }
        }
    },
    {
        "id": "cmd_13",
        "name": "USS RAMAGE",
        "uic": "21823",
        "location": "Mayport, FL",
        "currentCO": {
            "name": "MCNEAL RONALD ALLEN III",
            "prd": "2025-07-01",
            "timelineData": {
                "i": "2025-05-01",
                "k": "2025-08-01",
                "m": "2025-09-01",
                "q": "2027-05-01"
            }
        },
        "currentXO": {
            "name": "STAYTON DANIEL FRANKLIN",
            "prd": "2027-02-25",
            "timelineData": {
                "i": "2025-09-25",
                "k": "2027-03-25",
                "m": "2027-05-25",
                "q": "2028-11-25"
            }
        },
        "inboundXO": {
            "name": "SZAKAL JOSHUA E",
            "reportDate": "2027-01-27",
            "timelineData": {
                "i": "2027-01-27",
                "k": "2028-09-27",
                "m": "2028-11-27",
                "q": "2030-05-27"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "29-4",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "DDG",
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "JUL28",
            "timelineData": {
                "i": "JUL28",
                "k": "JAN30",
                "m": "MAR30",
                "q": "SEP31"
            }
        }
    },
    {
        "id": "cmd_14",
        "name": "USS CARNEY",
        "uic": "21923",
        "location": "Mayport, FL",
        "currentCO": {
            "name": "LIND MYRON E",
            "prd": "2024-06-23",
            "timelineData": {
                "i": "2023-03-23",
                "k": "2024-07-23",
                "m": "2024-09-23",
                "q": "2026-05-23"
            }
        },
        "currentXO": {
            "name": "MAKARENKO MEAGAN B",
            "prd": "TBD",
            "timelineData": {
                "i": "2024-08-24",
                "k": "2026-04-24",
                "m": "2026-05-24",
                "q": "2027-11-24"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "29-1",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "DDG",
        "slatedXO": {
            "name": "26-3",
            "reportDate": "2027-09-01",
            "timelineData": {
                "i": "2027-09-01",
                "k": "2029-03-01",
                "m": "2029-05-01",
                "q": "2030-11-01"
            }
        },
        "prospectiveCO": {
            "name": "VACANT",
            "prd": "TBD"
        }
    },
    {
        "id": "cmd_15",
        "name": "USS THE SULLIVANS",
        "uic": "21942",
        "location": "Mayport, FL",
        "currentCO": {
            "name": "HANKS LAWRENCE RYLAND",
            "prd": "2025-09-24",
            "timelineData": {
                "i": "2024-04-24",
                "k": "2025-10-24",
                "m": "2025-12-24",
                "q": "2027-06-24"
            }
        },
        "currentXO": {
            "name": "PATTERSON ANN KATHRYN",
            "prd": "2027-03-25",
            "timelineData": {
                "i": "2025-10-25",
                "k": "2027-04-25",
                "m": "2027-06-25",
                "q": "2028-12-25"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "30-1",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "DDG",
        "inboundXO": {
            "name": "MOORE COLCORD DANIELS",
            "reportDate": "APR27"
        },
        "slatedXO": {
            "name": "27-3",
            "reportDate": "2028-10-27",
            "timelineData": {
                "i": "2028-10-27",
                "k": "2030-04-27",
                "m": "2030-06-27",
                "q": "2031-12-27"
            }
        }
    },
    {
        "id": "cmd_16",
        "name": "USS DONALD COOK",
        "uic": "21949",
        "location": "Mayport, FL",
        "currentCO": {
            "name": "HANLEY SEAN W",
            "prd": "Unknown",
            "timelineData": {
                "i": "APR24",
                "k": "MAY25",
                "m": "2025-07-24",
                "q": "2026-10-24"
            }
        },
        "currentXO": {
            "name": "CORDREY ANDREW DUNCAN",
            "prd": "TBD",
            "timelineData": {
                "i": "2025-02-25",
                "k": "2026-09-25",
                "m": "2026-10-25",
                "q": "MAR28"
            }
        },
        "inboundXO": {
            "name": "HENRY SHAWN MICHAEL SPRING",
            "reportDate": "",
            "timelineData": {
                "i": "JUL26",
                "k": "JAN28",
                "m": "MAR28",
                "q": "AUG29"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "29-2",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "DDG",
        "slatedXO": {
            "name": "HANSBERRY MARK",
            "reportDate": "2028-01-01",
            "timelineData": {
                "i": "2028-01-01",
                "k": "2029-07-01",
                "m": "2029-08-01",
                "q": "2029-11-01"
            }
        },
        "prospectiveCO": {
            "name": "VACANT",
            "prd": "TBD"
        }
    },
    {
        "id": "cmd_17",
        "name": "USS FARRAGUT",
        "uic": "23150",
        "location": "Mayport, FL",
        "currentCO": {
            "name": "TIMPNER ANDREW E",
            "prd": "2024-09-23",
            "timelineData": {
                "i": "2023-09-23",
                "k": "2024-10-23",
                "m": "2024-11-23",
                "q": "2026-02-23"
            }
        },
        "currentXO": {
            "name": "MARSH ANDREW G",
            "prd": "2026-01-24",
            "timelineData": {
                "i": "2025-02-24",
                "k": "2026-02-24",
                "m": "2026-03-24",
                "q": "2028-03-24"
            }
        },
        "inboundXO": {
            "name": "COWART JOSHUA J",
            "reportDate": "2024-07-24",
            "timelineData": {
                "i": "2024-07-24",
                "k": "2025-12-24",
                "m": "2026-02-24",
                "q": "2028-02-24"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "29-1",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "DDG",
        "slatedXO": {
            "name": "26-3",
            "reportDate": "2027-09-27",
            "timelineData": {
                "i": "2027-09-27",
                "k": "2029-03-27",
                "m": "2029-04-27",
                "q": "2029-07-27"
            }
        }
    },
    {
        "id": "cmd_18",
        "name": "USS JASON DUNHAM",
        "uic": "55685",
        "location": "Mayport, FL",
        "currentCO": {
            "name": "JEFFERSON AARON III",
            "prd": "2024-03-01",
            "timelineData": {
                "i": "2023-03-01",
                "k": "2024-04-01",
                "m": "2024-05-01",
                "q": "2026-03-01"
            }
        },
        "currentXO": {
            "name": "MARSH ANDREW G",
            "prd": "2026-01-24",
            "timelineData": {
                "i": "2025-02-24",
                "k": "2026-02-24",
                "m": "2026-03-24",
                "q": "2028-03-24"
            }
        },
        "inboundXO": {
            "name": "BLANCO ANDREW ANTONIO",
            "reportDate": "2025-12-25",
            "timelineData": {
                "i": "2025-12-25",
                "k": "2027-06-25",
                "m": "2027-08-25",
                "q": "2029-02-25"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "28-4",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "DDG",
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "JUN27",
            "timelineData": {
                "i": "JUN27",
                "k": "DEC28",
                "m": "FEB29",
                "q": "AUG30"
            }
        }
    },
    {
        "id": "cmd_19",
        "name": "USS THOMAS HUDNER",
        "uic": "50137",
        "location": "Mayport, FL",
        "currentCO": {
            "name": "COOK DAVID A",
            "prd": "2025-05-01",
            "timelineData": {
                "i": "2023-09-01",
                "k": "2025-06-01",
                "m": "2025-07-01",
                "q": "2026-12-01"
            }
        },
        "currentXO": {
            "name": "WOMACK JOSHUA JAMES",
            "prd": "2026-08-01",
            "timelineData": {
                "i": "2025-03-01",
                "k": "2026-09-01",
                "m": "2026-12-01",
                "q": "2028-06-01"
            }
        },
        "inboundXO": {
            "name": "BEJA JAMES WINSTON",
            "reportDate": "2026-07-01",
            "timelineData": {
                "i": "2026-07-01",
                "k": "2028-01-01",
                "m": "2028-02-01",
                "q": "2029-08-01"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "29-2",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "DDG",
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "JAN28",
            "timelineData": {
                "i": "JAN28",
                "k": "JUL29",
                "m": "SEP29",
                "q": "MAR31"
            }
        }
    },
    {
        "id": "cmd_20",
        "name": "USS DELBERT D BLACK",
        "uic": "50400",
        "location": "Mayport, FL",
        "currentCO": {
            "name": "HATCH EZRA TIMOTHY",
            "prd": "2025-03-24",
            "timelineData": {
                "i": "2024-03-24",
                "k": "2025-04-24",
                "m": "2025-05-24",
                "q": "OCT26"
            }
        },
        "currentXO": {
            "name": "CRABB JUSTIN GLENN",
            "prd": "TBD",
            "timelineData": {
                "i": "APR25",
                "m": "OCT26",
                "k": "OCT26",
                "q": "APR28"
            }
        },
        "inboundXO": {
            "name": "TYNDALL CHRISTINE LOUISE",
            "reportDate": "",
            "timelineData": {
                "i": "AUG26",
                "m": "APR28",
                "k": "FEB28",
                "q": "OCT29"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "TBD",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "DDG",
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "",
            "timelineData": {
                "i": "FEB28",
                "k": "AUG29",
                "m": "OCT29",
                "q": "AUG31"
            }
        },
        "prospectiveCO": {
            "name": "VACANT",
            "prd": "TBD"
        }
    },
    {
        "id": "cmd_21",
        "name": "USS LASSEN",
        "uic": "21956",
        "location": "Mayport, FL",
        "currentCO": {
            "name": "Walter, Kevin",
            "prd": "Unknown",
            "timelineData": {
                "i": null,
                "k": null,
                "m": null,
                "q": "2026-06-01"
            }
        },
        "currentXO": {
            "name": "XO Afloat",
            "prd": "Unknown"
        },
        "nextSlateParams": {
            "targetBoardDate": "TBD",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "DDG",
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "",
            "timelineData": {
                "i": "",
                "k": "",
                "m": "",
                "q": ""
            }
        },
        "inboundXO": {
            "name": "NO FILL - MAJCOM",
            "reportDate": ""
        }
    },
    {
        "id": "cmd_22",
        "name": "USS WICHITA",
        "uic": "20142",
        "location": "Mayport, FL",
        "currentCO": {
            "name": "SNOVER TRAVIS MICHAEL",
            "prd": "2025-01-23",
            "timelineData": {
                "i": "2023-08-23",
                "k": "2025-02-23",
                "m": "2025-05-23",
                "q": "2026-11-23"
            }
        },
        "currentXO": {
            "name": "DUNN RICHARD THOMAS",
            "prd": "TBD",
            "timelineData": {
                "i": "2025-03-25",
                "k": "2026-08-25",
                "m": "2026-10-25",
                "q": "2028-04-25"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "29-1",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "LCS",
        "slatedXO": {
            "name": "26-4",
            "reportDate": "2027-11-01",
            "timelineData": {
                "i": "2027-11-01",
                "k": "2029-04-01",
                "m": "2029-06-01",
                "q": "2030-12-01"
            }
        },
        "prospectiveCO": {
            "name": "VACANT",
            "prd": "TBD"
        },
        "fleetUpProgress": {
            "isic": false,
            "tycom": false,
            "pco": true,
            "orders": false,
            "coc": false
        },
        "inboundXO": {
            "name": "CROCKETT MATRAKO FASHAUN",
            "reportDate": "JUN26"
        }
    },
    {
        "id": "cmd_23",
        "name": "USS BILLINGS",
        "uic": "20096",
        "location": "Mayport, FL",
        "currentCO": {
            "name": "LEMENE FRANKLIN",
            "prd": "2025-01-23",
            "timelineData": {
                "i": "2023-05-23",
                "k": "2025-02-23",
                "m": "2025-05-23",
                "q": "2026-11-23"
            }
        },
        "currentXO": {
            "name": "BURNS JOHN A",
            "prd": "2026-08-25",
            "timelineData": {
                "i": "2025-03-25",
                "k": "2026-09-25",
                "m": "2026-11-25",
                "q": "2028-05-25"
            }
        },
        "inboundXO": {
            "name": "",
            "reportDate": "",
            "timelineData": {
                "i": "2026-09-23",
                "k": "2028-03-23",
                "m": "2028-05-23",
                "q": "2029-11-23"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "29-2",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "LCS",
        "slatedXO": {
            "name": "26-2",
            "reportDate": "2028-02-01",
            "timelineData": {
                "i": "2028-02-01",
                "k": "2029-08-01",
                "m": "2029-10-01",
                "q": "2031-04-01"
            }
        }
    },
    {
        "id": "cmd_24",
        "name": "USS INDIANAPOLIS",
        "uic": "20155",
        "location": "Mayport, FL",
        "currentCO": {
            "name": "ORTH TIMOTHY JOSEPH",
            "prd": "2024-06-24",
            "timelineData": {
                "i": "2022-12-22",
                "k": "2024-07-24",
                "m": "2024-09-24",
                "q": "2026-08-24"
            }
        },
        "currentXO": {
            "name": "FOSTER MICHAEL DOUGLAS",
            "prd": "2026-05-25",
            "timelineData": {
                "i": "2024-12-25",
                "k": "2026-06-25",
                "m": "2026-08-25",
                "q": "2028-02-25"
            }
        },
        "inboundXO": {
            "name": "GUIREMAND ERIK M",
            "reportDate": "2026-06-26",
            "timelineData": {
                "i": "2026-06-26",
                "k": "2027-12-26",
                "m": "2028-02-26",
                "q": "2029-08-26"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "29-2",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "LCS",
        "slatedXO": {
            "name": "27-1",
            "reportDate": "2027-12-26",
            "timelineData": {
                "i": "2027-12-26",
                "k": "2029-06-26",
                "m": "2029-08-26",
                "q": "2031-02-26"
            }
        }
    },
    {
        "id": "cmd_25",
        "name": "USS ST LOUIS",
        "uic": "20157",
        "location": "Mayport, FL",
        "currentCO": {
            "name": "SHEWMAKE LESTER LEE III",
            "prd": "2025-06-24",
            "timelineData": {
                "i": "2024-02-24",
                "k": "2025-07-24",
                "m": "2025-08-25",
                "q": "2026-08-26"
            }
        },
        "currentXO": {
            "name": "LOVE PATRICK THOMAS",
            "prd": "2026-06-25",
            "timelineData": {
                "i": "2025-08-25",
                "k": "2026-07-25",
                "m": "2026-08-25",
                "q": "2028-02-25"
            }
        },
        "inboundXO": {
            "name": "DETWEILER NICHOLAS JAMES",
            "reportDate": "2026-06-01",
            "timelineData": {
                "i": "2026-06-01",
                "k": "2027-12-01",
                "m": "2028-02-01",
                "q": "2029-08-01"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "29-2",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "LCS",
        "slatedXO": {
            "name": "26-4",
            "reportDate": "2027-12-01",
            "timelineData": {
                "i": "2027-12-01",
                "k": "2029-06-01",
                "m": "2029-08-01",
                "q": "2031-02-01"
            }
        }
    },
    {
        "id": "cmd_26",
        "name": "USS MINNEAPOLIS SAINT PAUL",
        "uic": "20159",
        "location": "Mayport, FL",
        "currentCO": {
            "name": "VACANT",
            "prd": "TBD"
        },
        "currentXO": {
            "name": "BOND ARTHUR J",
            "prd": "TBD"
        },
        "inboundXO": {
            "name": "ELLIS FRANK LANE",
            "reportDate": "APR26"
        },
        "nextSlateParams": {
            "targetBoardDate": "29-1",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "LCS",
        "slatedXO": {
            "name": "26-3",
            "reportDate": "2027-10-26",
            "timelineData": {
                "i": "2027-10-26",
                "k": "2029-04-26",
                "m": "2029-06-26",
                "q": "2030-12-26"
            }
        },
        "prospectiveCO": {
            "name": "FRESSE STEVEN",
            "prd": "TBD"
        }
    },
    {
        "id": "cmd_27",
        "name": "USS COOPERSTOWN",
        "uic": "20161",
        "location": "Mayport, FL",
        "currentCO": {
            "name": "DUPARC JESSE MATTHEW",
            "prd": "2025-05-23",
            "timelineData": {
                "i": "2023-09-23",
                "k": "2025-06-23",
                "m": "2025-11-23",
                "q": "2027-04-23"
            }
        },
        "currentXO": {
            "name": "HEILIGER NICHOLAS SEAN",
            "prd": "2026-11-25",
            "timelineData": {
                "i": "2025-06-25",
                "k": "2026-12-25",
                "m": "2027-04-25",
                "q": "2028-09-25"
            }
        },
        "inboundXO": {
            "name": "",
            "reportDate": "",
            "timelineData": {
                "i": "2026-09-26",
                "k": "2028-07-26",
                "m": "2028-09-26",
                "q": "2030-03-26"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "29-4",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "LCS",
        "slatedXO": {
            "name": "",
            "reportDate": "2028-07-04",
            "timelineData": {
                "i": "2028-07-04",
                "k": "2030-01-04",
                "m": "2030-03-04",
                "q": "2031-09-04"
            }
        }
    },
    {
        "id": "cmd_28",
        "name": "USS MARINETTE",
        "uic": "20169",
        "location": "Mayport, FL",
        "currentCO": {
            "name": "MILLER RYAN Q",
            "prd": "2024-05-23",
            "timelineData": {
                "i": "2022-12-23",
                "k": "2024-06-23",
                "m": "2024-08-23",
                "q": "2027-01-23"
            }
        },
        "currentXO": {
            "name": "SIMS BRIAN L",
            "prd": "2026-10-25",
            "timelineData": {
                "i": "2025-05-25",
                "k": "2026-11-25",
                "m": "2027-01-25",
                "q": "2028-07-25"
            }
        },
        "inboundXO": {
            "name": "LOERA WILLIAM ADAM",
            "reportDate": "2026-11-26",
            "timelineData": {
                "i": "2026-11-26",
                "k": "2028-06-26",
                "m": "2028-08-26",
                "q": "2030-02-26"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "29-4",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "LCS",
        "slatedXO": {
            "name": "27-2",
            "reportDate": "2028-06-26",
            "timelineData": {
                "i": "2028-06-26",
                "k": "2029-12-26",
                "m": "2030-02-26",
                "q": "2031-08-26"
            }
        }
    },
    {
        "id": "cmd_29",
        "name": "USS NANTUCKET",
        "uic": "20171",
        "location": "Mayport, FL",
        "currentCO": {
            "name": "GREEN WILLIAM STEVEN",
            "prd": "2024-11-01",
            "timelineData": {
                "i": "2022-09-01",
                "k": "2024-12-01",
                "m": "2025-02-01",
                "q": "2026-05-01"
            }
        },
        "currentXO": {
            "name": "BELL TIMOTHY LEE",
            "prd": "2026-02-24",
            "timelineData": {
                "i": "2024-11-24",
                "k": "2026-03-24",
                "m": "2026-05-24",
                "q": "2027-11-24"
            }
        },
        "inboundXO": {
            "name": "Dejesus, Jason",
            "reportDate": "2024-06-24",
            "timelineData": {
                "i": "2024-06-24",
                "k": "2025-12-24",
                "m": "2026-02-24",
                "q": "2027-08-24"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "28-4",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "LCS",
        "slatedXO": {
            "name": "26-3",
            "reportDate": "2027-08-25",
            "timelineData": {
                "i": "2027-08-25",
                "k": "2029-01-25",
                "m": "2029-03-25",
                "q": "2030-09-25"
            }
        }
    },
    {
        "id": "cmd_30",
        "name": "USS BELOIT",
        "uic": "20173",
        "location": "Mayport, FL",
        "currentCO": {
            "name": "BICKEL GARY JOE",
            "prd": "2024-08-31",
            "timelineData": {
                "i": "2023-07-31",
                "k": "2024-10-01",
                "m": "2025-01-01",
                "q": "2026-06-01"
            }
        },
        "currentXO": {
            "name": "DEJESUS JASON CORREA",
            "prd": "2026-02-25",
            "timelineData": {
                "i": "2024-09-25",
                "k": "2026-03-25",
                "m": "2026-06-25",
                "q": "2027-12-25"
            }
        },
        "inboundXO": {
            "name": "SULLIVAN NAOMI C",
            "reportDate": "JAN26",
            "timelineData": {
                "i": "2024-09-24",
                "k": "2026-03-24",
                "m": "2026-05-24",
                "q": "2027-11-24"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "28-4",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "LCS",
        "slatedXO": {
            "name": "ASHINHURST NATHAN D",
            "reportDate": "2027-07-01",
            "timelineData": {
                "i": "2027-07-01",
                "k": "2029-01-01",
                "m": "2029-03-01",
                "q": "2030-09-01"
            }
        }
    },
    {
        "id": "cmd_31",
        "name": "USS CLEVELAND",
        "uic": "21415",
        "platform": "LCS",
        "location": "Mayport, FL",
        "currentCO": {
            "name": "HALLETT BRUCE DAVID",
            "prd": "2023-09-25",
            "timelineData": {
                "i": "2022-04-25",
                "k": "2023-10-25",
                "m": "2023-12-25",
                "q": "2025-06-25"
            }
        },
        "currentXO": {
            "name": "CLINE ADAM ROBERT",
            "prd": "2027-02-25",
            "timelineData": {
                "i": "2025-09-25",
                "k": "2027-03-25",
                "m": "2027-05-25",
                "q": "2028-11-25"
            }
        },
        "inboundXO": {
            "name": "Eickelmann, Angela (TEMP XO)",
            "reportDate": "2025-10-25",
            "timelineData": {
                "i": "2025-10-25",
                "k": "2027-04-25",
                "m": "2027-06-25",
                "q": "2028-12-25"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "28-3",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "slatedXO": {
            "name": "26-1  jaindl robert john iii",
            "reportDate": "2027-03-27",
            "timelineData": {
                "i": "2027-03-27",
                "k": "2028-09-27",
                "m": "2028-11-27",
                "q": "2030-05-27"
            }
        }
    },
    {
        "id": "cmd_36",
        "name": "USS STOUT",
        "uic": "21685",
        "location": "Norfolk, VA",
        "currentCO": {
            "name": "TAYLOR KEVIN F",
            "prd": "2025-03-24",
            "timelineData": {
                "i": "2024-06-24",
                "k": "2025-04-24",
                "m": "2025-06-24",
                "q": "2027-01-24"
            }
        },
        "currentXO": {
            "name": "WASHINGTON KAREEM ABDUL",
            "prd": "2026-10-25",
            "timelineData": {
                "i": "2025-05-25",
                "k": "2026-11-25",
                "m": "2027-01-25",
                "q": "2028-06-25"
            }
        },
        "inboundXO": {
            "name": "SPILSBURY ANDREW",
            "reportDate": "2026-09-26",
            "timelineData": {
                "i": "2026-09-26",
                "k": "2028-02-26",
                "m": "2028-06-26",
                "q": "2029-12-26"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "29-3",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "DDG",
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "MAR28",
            "timelineData": {
                "i": "MAR28",
                "k": "SEP29",
                "m": "NOV29",
                "q": "MAY31"
            }
        }
    },
    {
        "id": "cmd_37",
        "name": "USS MITSCHER",
        "uic": "21687",
        "location": "Norfolk, VA",
        "currentCO": {
            "name": "PRUGH STEPHEN CLAYTON",
            "prd": "2025-03-01",
            "timelineData": {
                "i": "2023-12-01",
                "k": "2025-04-01",
                "m": "2025-05-01",
                "q": "2026-11-01"
            }
        },
        "currentXO": {
            "name": "SMIROS STEPHANIE A",
            "prd": "2026-08-25",
            "timelineData": {
                "i": "2025-03-25",
                "k": "2026-09-25",
                "m": "2026-11-25",
                "q": "2028-05-25"
            }
        },
        "inboundXO": {
            "name": "BUITRAGO WALTER SCOTT JR",
            "reportDate": "2026-08-26",
            "timelineData": {
                "i": "2026-08-26",
                "k": "2028-02-26",
                "m": "2028-04-26",
                "q": "2029-10-26"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "29-2",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "DDG",
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "FEB28",
            "timelineData": {
                "i": "FEB28",
                "k": "AUG29",
                "m": "OCT29",
                "q": "APR31"
            }
        }
    },
    {
        "id": "cmd_38",
        "name": "USS LABOON",
        "uic": "N/A21820",
        "location": "Norfolk, VA",
        "currentCO": {
            "name": "DORE FRANCIS KENNETH",
            "prd": "2025-01-01",
            "timelineData": {
                "i": "2023-11-01",
                "k": "2025-02-01",
                "m": "2025-03-01",
                "q": "2026-12-01"
            }
        },
        "currentXO": {
            "name": "SWITZER ERIC MICHAEL",
            "prd": "2026-09-01",
            "timelineData": {
                "i": "2025-03-01",
                "k": "2026-10-01",
                "m": "2026-12-01",
                "q": "2028-06-01"
            }
        },
        "inboundXO": {
            "name": "ASCH JEFFREY J",
            "reportDate": "2026-08-26",
            "timelineData": {
                "i": "2026-08-26",
                "k": "2028-02-26",
                "m": "2028-04-26",
                "q": "2029-10-26"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "29-2",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "DDG",
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "FEB28",
            "timelineData": {
                "i": "FEB28",
                "k": "AUG29",
                "m": "OCT29",
                "q": "APR31"
            }
        }
    },
    {
        "id": "cmd_39",
        "name": "USS GONZALEZ",
        "uic": "21833",
        "location": "Norfolk, VA",
        "currentCO": {
            "name": "SCHENK MICHAEL ANDREW",
            "prd": "2024-04-01",
            "timelineData": {
                "i": "2022-11-01",
                "k": "2024-05-01",
                "m": "2025-07-01",
                "q": "2027-01-01"
            }
        },
        "currentXO": {
            "name": "SMITH ALEXANDER PARKER",
            "prd": "2025-03-23",
            "timelineData": {
                "i": "MAR25",
                "k": "SEP26",
                "m": "JAN27",
                "q": "JULK28"
            }
        },
        "inboundXO": {
            "name": "KLINGSEIS STEPHEN JAMES",
            "reportDate": "SEP26",
            "timelineData": {
                "i": "SEP26",
                "k": "MAY28",
                "m": "JUL28",
                "q": "JAN30"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "29-3",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "DDG",
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "MAR28",
            "timelineData": {
                "i": "MAR28",
                "k": "SEP29",
                "m": "NOV29",
                "q": "MAY31"
            }
        }
    },
    {
        "id": "cmd_40",
        "name": "USS COLE",
        "uic": "21941",
        "location": "Norfolk, VA",
        "currentCO": {
            "name": "FAULKENBERRY MATTHEW EUGEN",
            "prd": "2024-06-23",
            "timelineData": {
                "i": "2023-05-23",
                "k": "2024-07-23",
                "m": "2024-09-23",
                "q": "2026-04-23"
            }
        },
        "currentXO": {
            "name": "GOSTEL CHRISTOPHER RANSOMA",
            "prd": "2026-01-24",
            "timelineData": {
                "i": "2024-11-24",
                "k": "2026-02-24",
                "m": "2026-04-24",
                "q": "2027-10-24"
            }
        },
        "inboundXO": {
            "name": "ZAROW ZACHARY R",
            "reportDate": "2026-03-26",
            "timelineData": {
                "i": "2026-03-26",
                "k": "2027-09-26",
                "m": "2027-11-26",
                "q": "2029-05-26"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "29-1",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "DDG",
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "SEP27",
            "timelineData": {
                "i": "SEP27",
                "k": "MAR29",
                "m": "MAY29",
                "q": "NOV30"
            }
        }
    },
    {
        "id": "cmd_41",
        "name": "USS ROSS",
        "uic": "21945",
        "location": "Norfolk, VA",
        "currentCO": {
            "name": "CHAPMAN PIA MARTINA",
            "prd": "2025-06-01",
            "timelineData": {
                "i": "2024-03-01",
                "k": "2025-07-01",
                "m": "2025-08-01",
                "q": "2027-02-01"
            }
        },
        "currentXO": {
            "name": "GUDKNECHT BRIAN MICHAEL",
            "prd": "2026-11-25",
            "timelineData": {
                "i": "2025-06-25",
                "k": "2026-12-25",
                "m": "2027-02-25",
                "q": "2028-08-25"
            }
        },
        "inboundXO": {
            "name": "WHITE SHUN TERRELL",
            "reportDate": "2026-10-01",
            "timelineData": {
                "i": "2026-10-01",
                "k": "2028-04-01",
                "m": "2028-06-01",
                "q": "2029-12-01"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "29-3",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "DDG",
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "APR28",
            "timelineData": {
                "i": "APR28",
                "k": "OCT29",
                "m": "DEC29",
                "q": "JUN31"
            }
        }
    },
    {
        "id": "cmd_42",
        "name": "USS MAHAN",
        "uic": "21946",
        "location": "Norfolk, VA",
        "currentCO": {
            "name": "MATTES BENJAMIN ALEXANDER",
            "prd": "2024-06-01",
            "timelineData": {
                "i": "2023-03-01",
                "k": "2024-07-01",
                "m": "2024-09-01",
                "q": "2026-03-01"
            }
        },
        "currentXO": {
            "name": "WOODSIDE JAMES C",
            "prd": "2025-11-01",
            "timelineData": {
                "i": "2024-07-01",
                "k": "2025-12-01",
                "m": "2026-03-01",
                "q": "2027-09-01"
            }
        },
        "inboundXO": {
            "name": "BABCOCK DONALD S",
            "reportDate": "2025-11-25",
            "timelineData": {
                "i": "2025-11-25",
                "k": "2027-03-25",
                "m": "2027-05-25",
                "q": "2028-11-25"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "28-3",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "DDG",
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "MAY27",
            "timelineData": {
                "i": "MAY27",
                "k": "NOV28",
                "m": "JAN29",
                "q": "JUL30"
            }
        }
    },
    {
        "id": "cmd_43",
        "name": "USS MCFAUL",
        "uic": "21948",
        "location": "Norfolk, VA",
        "currentCO": {
            "name": "SAMSON ADAM J",
            "prd": "2025-05-01",
            "timelineData": {
                "i": "2025-05-01",
                "k": "2025-06-01",
                "m": "2025-07-01",
                "q": "2027-01-01"
            }
        },
        "currentXO": {
            "name": "HURST JONATHAN STUMP",
            "prd": "2026-05-01",
            "timelineData": {
                "i": "2025-01-01",
                "k": "2026-06-01",
                "m": "2026-08-01",
                "q": "2028-02-01"
            }
        },
        "inboundXO": {
            "name": "STRONG TODD DONALD",
            "reportDate": "2026-04-26",
            "timelineData": {
                "i": "2026-04-26",
                "k": "2027-10-26",
                "m": "2027-12-26",
                "q": "2029-06-26"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "29-1",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "DDG",
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "OCT27",
            "timelineData": {
                "i": "OCT27",
                "k": "APR29",
                "m": "JUN29",
                "q": "DEC30"
            }
        }
    },
    {
        "id": "cmd_44",
        "name": "USS PORTER",
        "uic": "21952",
        "location": "Norfolk, VA",
        "currentCO": {
            "name": "DIETZEL ANDREW JOSEPH",
            "prd": "2025-10-01",
            "timelineData": {
                "i": "2025-10-01",
                "k": "2025-11-01",
                "m": "2025-12-01",
                "q": "2027-07-01"
            }
        },
        "currentXO": {
            "name": "HOLT PRESTON TRAVIS",
            "prd": "2025-11-24",
            "timelineData": {
                "i": "NOV25",
                "k": "MAY27",
                "m": "JUL27",
                "q": "JAN29"
            }
        },
        "inboundXO": {
            "name": "BLANKENSHIP NICHOLAS S",
            "reportDate": "MAY27",
            "timelineData": {
                "i": "MAY27",
                "k": "OCT28",
                "m": "JAN29",
                "q": "JUL30"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "30-1",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "DDG",
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "NOV28",
            "timelineData": {
                "i": "NOV28",
                "k": "MAY30",
                "m": "JUL30",
                "q": "JAN32"
            }
        }
    },
    {
        "id": "cmd_45",
        "name": "USS NITZE",
        "uic": "23147",
        "location": "Norfolk, VA",
        "currentCO": {
            "name": "GRUSICH ANTHONY MICHAEL",
            "prd": "2025-08-01",
            "timelineData": {
                "i": "2024-03-01",
                "k": "2025-09-01",
                "m": "2025-10-01",
                "q": "2027-04-01"
            }
        },
        "currentXO": {
            "name": "GEORGE PATRICK LEE",
            "prd": "2027-01-25",
            "timelineData": {
                "i": "2025-08-25",
                "k": "2027-02-25",
                "m": "2027-04-25",
                "q": "2028-10-25"
            }
        },
        "inboundXO": {
            "name": "MOCKEL WADE DEREK",
            "reportDate": "2027-02-26",
            "timelineData": {
                "i": "2027-02-26",
                "k": "2028-08-26",
                "m": "2028-10-26",
                "q": "2030-04-26"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "29-4",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "DDG",
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "AUG28",
            "timelineData": {
                "i": "AUG28",
                "k": "FEB30",
                "m": "APR30",
                "q": "OCT31"
            }
        }
    },
    {
        "id": "cmd_46",
        "name": "USS JAMES E WILLIAMS",
        "uic": "23148",
        "location": "Norfolk, VA",
        "currentCO": {
            "name": "MATTHEWS MICHELLE ASHLEY",
            "prd": "2025-09-01",
            "timelineData": {
                "i": "2023-11-01",
                "k": "2025-10-01",
                "m": "2025-11-01",
                "q": "2027-05-01"
            }
        },
        "currentXO": {
            "name": "ROTKLEIN ELAN JEFFREY SIMO",
            "prd": "2027-02-01",
            "timelineData": {
                "i": "2025-09-01",
                "k": "2027-03-01",
                "m": "2027-05-01",
                "q": "2028-11-01"
            }
        },
        "inboundXO": {
            "name": "TERRELL AARON DODDS",
            "reportDate": "2027-03-26",
            "timelineData": {
                "i": "2027-03-26",
                "k": "2028-09-26",
                "m": "2028-11-26",
                "q": "2030-05-26"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "30-1",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "DDG",
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "SEP28",
            "timelineData": {
                "i": "SEP28",
                "k": "MAR30",
                "m": "MAY30",
                "q": "NOV31"
            }
        }
    },
    {
        "id": "cmd_47",
        "name": "USS BAINBRIDGE",
        "uic": "23153",
        "location": "Norfolk, VA",
        "currentCO": {
            "name": "MILLER RAYMOND WILLIAM IV",
            "prd": "2024-09-24",
            "timelineData": {
                "i": "2023-05-23",
                "k": "2024-10-24",
                "m": "2024-10-24",
                "q": "2026-05-24"
            }
        },
        "currentXO": {
            "name": "JONES MARVIN JONATHAN",
            "prd": "2026-03-24",
            "timelineData": {
                "i": "2024-09-24",
                "k": "2026-04-24",
                "m": "2026-05-24",
                "q": "2027-09-24"
            }
        },
        "inboundXO": {
            "name": "PETERS SAVANNAH JUNE",
            "reportDate": "2026-01-26",
            "timelineData": {
                "i": "2026-01-26",
                "k": "2027-07-26",
                "m": "2027-09-26",
                "q": "2029-03-26"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "28-4",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "DDG",
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "JUL27",
            "timelineData": {
                "i": "JUL27",
                "k": "JAN29",
                "m": "MAR29",
                "q": "SEP30"
            }
        }
    },
    {
        "id": "cmd_48",
        "name": "USS FORREST SHERMAN",
        "uic": "23149",
        "location": "Norfolk, VA",
        "currentCO": {
            "name": "DARJANY ANDREW C",
            "prd": "2025-01-24",
            "timelineData": {
                "i": "2024-08-24",
                "k": "2025-02-24",
                "m": "2025-03-24",
                "q": "2026-11-24"
            }
        },
        "currentXO": {
            "name": "BARTHOLOMEAUX ANDREW T",
            "prd": "2026-08-25",
            "timelineData": {
                "i": "2025-03-25",
                "k": "2026-09-25",
                "m": "2026-11-25",
                "q": "2028-05-25"
            }
        },
        "inboundXO": {
            "name": "OSBORNE CHRISTOPHER PAUL",
            "reportDate": "2026-08-01",
            "timelineData": {
                "i": "2026-08-01",
                "k": "2028-03-01",
                "m": "2028-05-01",
                "q": "2029-11-01"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "29-2",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "DDG",
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "FEB28",
            "timelineData": {
                "i": "FEB28",
                "k": "AUG29",
                "m": "OCT29",
                "q": "APR31"
            }
        }
    },
    {
        "id": "cmd_49",
        "name": "USS TRUXTUN",
        "uic": "23165",
        "location": "Norfolk, VA",
        "currentCO": {
            "name": "AUCLAIR TAYLOR RANDALL",
            "prd": "2024-10-01",
            "timelineData": {
                "i": "2023-11-01",
                "k": "2024-11-01",
                "m": "FEB26",
                "q": "FEB28"
            }
        },
        "currentXO": {
            "name": "SHOWANES JAMES BERNARD",
            "prd": "2026-02-25",
            "timelineData": {
                "i": "2025-01-25",
                "k": "2026-03-25",
                "m": "2026-04-25",
                "q": "2027-10-25"
            }
        },
        "inboundXO": {
            "name": "MEREDITH IAN CHRISTOPHER",
            "reportDate": "MAR26",
            "timelineData": {
                "i": "MAR26",
                "k": "DEC27",
                "m": "FEB28",
                "q": "AUG29"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "29-2",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "DDG",
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "DEC27",
            "timelineData": {
                "i": "DEC27",
                "k": "JUN29",
                "m": "AUG29",
                "q": "FEB31"
            }
        },
        "tourLength": 24,
        "notes": "Pilot Program Ship with GRAVLEY"
    },
    {
        "id": "cmd_50",
        "name": "USS GRAVELY",
        "uic": "23164",
        "platform": "DDG",
        "location": "Norfolk, VA",
        "currentCO": {
            "name": "PIORUN GREGORY JOSEPH JR",
            "prd": "2024-11-23",
            "timelineData": {
                "i": "2023-06-23",
                "k": "2024-12-23",
                "m": "2025-01-23",
                "q": "2026-06-23"
            }
        },
        "currentXO": {
            "name": "SHOWANES JAMES BERNARD",
            "prd": "2026-03-24",
            "timelineData": {
                "i": "2024-12-24",
                "k": "2026-04-24",
                "m": "2026-05-24",
                "q": "2028-05-24"
            }
        },
        "inboundXO": {
            "name": "TORNAMBE GREGORY",
            "reportDate": "2025-01-25",
            "timelineData": {
                "i": "2025-01-25",
                "k": "2026-03-25",
                "m": "2026-04-25",
                "q": "2027-10-25"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "27-4",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "JUL26",
            "timelineData": {
                "i": "JUL26",
                "k": "JAN28",
                "m": "MAR28",
                "q": "SEP29"
            }
        }
    },
    {
        "id": "cmd_51",
        "name": "USS HARVEY C. BARNUM JR",
        "uic": "50405",
        "location": "Norfolk, VA",
        "currentCO": {
            "name": "CANTU BENJAMIN R",
            "prd": "Unknown",
            "timelineData": {
                "i": null,
                "k": null,
                "m": null,
                "q": "APR26"
            }
        },
        "currentXO": {
            "name": "MCGUINNIS ELIZABETH ANNE",
            "prd": "2025-11-13",
            "timelineData": {
                "i": "2024-11-13",
                "k": "JAN26",
                "m": "2026-04-13",
                "q": "2027-09-13"
            }
        },
        "inboundXO": {
            "name": "MILLS JOSEPH ROBERT",
            "reportDate": "2026-01-25",
            "timelineData": {
                "i": "2026-01-25",
                "k": "JUL27",
                "m": "2027-09-25",
                "q": "2029-03-25"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "27-2",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "DDG",
        "slatedXO": {
            "name": "FIELDS ERIC R",
            "reportDate": "",
            "timelineData": {
                "i": "JUL27",
                "k": "JAN29",
                "m": "APR29",
                "q": "OCT30"
            }
        }
    },
    {
        "id": "cmd_52",
        "name": "USS PATRICK GALLAGHER",
        "uic": "51092",
        "location": "Norfolk, VA",
        "currentCO": {
            "name": "DRYDEN MATTHEW ERNEST",
            "prd": "Unknown",
            "timelineData": {
                "i": null,
                "k": null,
                "m": null,
                "q": "2024-08-23"
            }
        },
        "currentXO": {
            "name": "HOLLIDAY ZACHARY S",
            "prd": "2027-01-25",
            "timelineData": {
                "i": "2025-08-25",
                "k": "2027-02-25",
                "m": "2027-04-25",
                "q": "2028-10-25"
            }
        },
        "inboundXO": {
            "name": "HULSE DAVID T",
            "reportDate": "2027-01-26",
            "timelineData": {
                "i": "2027-01-26",
                "k": "2028-06-26",
                "m": "2028-08-26",
                "q": "2030-02-26"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "29-4",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "PCD",
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "JUL28",
            "timelineData": {
                "i": "JUL28",
                "k": "JAN30",
                "m": "MAR30",
                "q": "SEP31"
            }
        }
    },
    {
        "id": "cmd_53",
        "name": "USS GUNSTON HALL",
        "uic": "21422",
        "location": "Norfolk, VA",
        "currentCO": {
            "name": "PETERSEN CHRISTOPHER A",
            "prd": "Unknown",
            "timelineData": {
                "i": null,
                "k": null,
                "m": null,
                "q": "2027-04-25"
            }
        },
        "currentXO": {
            "name": "DAVEY TIMOTHY STEVEN",
            "prd": "2027-01-01",
            "timelineData": {
                "i": "2025-10-01",
                "k": "2027-02-01",
                "m": "2027-04-01",
                "q": "2028-10-01"
            }
        },
        "inboundXO": {
            "name": "BUE PETER J",
            "reportDate": "2027-02-27",
            "timelineData": {
                "i": "2027-02-27",
                "k": "2028-08-27",
                "m": "2028-10-27",
                "q": "2030-04-27"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "29-4",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "LSD",
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "AUG28",
            "timelineData": {
                "i": "AUG28",
                "k": "FEB30",
                "m": "APR30",
                "q": "OCT31"
            }
        }
    },
    {
        "id": "cmd_54",
        "name": "USS TORTUGA",
        "uic": "21562",
        "location": "Norfolk, VA",
        "currentCO": {
            "name": "BROZNAK VALERIE KAYFRANCES",
            "prd": "Unknown",
            "timelineData": {
                "i": null,
                "k": null,
                "m": null,
                "q": "2026-04-26"
            }
        },
        "currentXO": {
            "name": "PAGAN DAVID SALVADOR",
            "prd": "2026-01-24",
            "timelineData": {
                "i": "2024-06-24",
                "k": "2026-02-24",
                "m": "2026-04-24",
                "q": "2027-10-24"
            }
        },
        "inboundXO": {
            "name": "HEBENSTREIT KRISTA RAE",
            "reportDate": "2026-01-25",
            "timelineData": {
                "i": "2026-01-25",
                "k": "2027-08-25",
                "m": "2027-10-25",
                "q": "2029-04-25"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "28-4",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "LSD",
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "JUL27",
            "timelineData": {
                "i": "JUL27",
                "k": "JAN29",
                "m": "MAR29",
                "q": "SEP30"
            }
        }
    },
    {
        "id": "cmd_55",
        "name": "USS CARTER HALL",
        "uic": "21880",
        "location": "Norfolk, VA",
        "currentCO": {
            "name": "LYNN BRITTANY NICOLE",
            "prd": "2025-07-23",
            "timelineData": {
                "i": "2024-01-23",
                "k": "2025-08-23",
                "m": "2025-10-23",
                "q": "2027-04-23"
            }
        },
        "currentXO": {
            "name": "WISE PHILIP ELIJAH",
            "prd": "2027-02-25",
            "timelineData": {
                "i": "2025-09-25",
                "k": "2027-03-25",
                "m": "2027-05-25",
                "q": "2028-09-25"
            }
        },
        "inboundXO": {
            "name": "SCHNEIDER ALEX DAVID",
            "reportDate": "2027-01-26",
            "timelineData": {
                "i": "2027-01-26",
                "k": "2028-07-26",
                "m": "2028-09-26",
                "q": "2030-03-26"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "29-4",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "LSD",
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "JUL28",
            "timelineData": {
                "i": "JUL28",
                "k": "JAN30",
                "m": "MAR30",
                "q": "SEP31"
            }
        }
    },
    {
        "id": "cmd_56",
        "name": "USS OAK HILL",
        "uic": "21958",
        "location": "Norfolk, VA",
        "currentCO": {
            "name": "OLUFOKUNBI MATUWO ISEOLUWA",
            "prd": "2024-11-01",
            "timelineData": {
                "i": "2023-06-01",
                "k": "2024-12-01",
                "m": "2025-01-01",
                "q": "2026-05-01"
            }
        },
        "currentXO": {
            "name": "MARTIN BETHANN CLARE",
            "prd": "2026-01-24",
            "timelineData": {
                "i": "2024-08-24",
                "k": "2026-02-24",
                "m": "2026-05-24",
                "q": "2027-11-24"
            }
        },
        "inboundXO": {
            "name": "KIRBY MATTHEW DAVID",
            "reportDate": "2026-01-26",
            "timelineData": {
                "i": "2026-01-26",
                "k": "2027-07-26",
                "m": "2027-09-26",
                "q": "2029-03-26"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "28-4",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "LSD",
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "JUL27",
            "timelineData": {
                "i": "JUL27",
                "k": "JAN29",
                "m": "MAR29",
                "q": "SEP30"
            }
        }
    },
    {
        "id": "cmd_57",
        "name": "USS HOPPER",
        "uic": "21944",
        "location": "Pearl Harbor, HI",
        "currentCO": {
            "name": "BENVENUTO ANDREA L",
            "prd": "2025-03-23",
            "timelineData": {
                "i": "2023-11-23",
                "k": "2025-04-23",
                "m": "2025-06-23",
                "q": "2026-12-23"
            }
        },
        "currentXO": {
            "name": "CAMPBELL RYAN P",
            "prd": "2026-09-25",
            "timelineData": {
                "i": "2025-04-25",
                "k": "2026-10-25",
                "m": "2026-12-25",
                "q": "2028-06-25"
            }
        },
        "inboundXO": {
            "name": "GOODYEAR WILLIAM DAVID",
            "reportDate": "2026-09-26",
            "timelineData": {
                "i": "2026-09-26",
                "k": "2028-03-26",
                "m": "2028-05-26",
                "q": "2029-11-26"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "29-3",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "DDG",
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "MAR28",
            "timelineData": {
                "i": "MAR28",
                "k": "SEP29",
                "m": "NOV29",
                "q": "MAY31"
            }
        }
    },
    {
        "id": "cmd_58",
        "name": "USS DECATUR",
        "uic": "21947",
        "location": "Pearl Harbor, HI",
        "currentCO": {
            "name": "HUSCHER DAVID PAUL",
            "prd": "2024-07-01",
            "timelineData": {
                "i": "2023-04-01",
                "k": "2024-08-01",
                "m": "2024-10-01",
                "q": "2026-04-01"
            }
        },
        "currentXO": {
            "name": "CREWS ARLENE VALENZUELA",
            "prd": "TBD",
            "timelineData": {
                "i": "2024-11-24",
                "k": "2026-03-24",
                "m": "2026-05-24",
                "q": "2027-11-24"
            }
        },
        "inboundXO": {
            "name": "FRANCISCO GABRIELLE MARIE",
            "reportDate": "MAR26",
            "timelineData": {
                "i": "MAR26",
                "m": "NOV27",
                "q": "MAY29",
                "k": "SEP27"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "29-1",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "DDG",
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "SEP27",
            "timelineData": {
                "i": "SEP27",
                "k": "MAR29",
                "m": "MAY29",
                "q": "NOV30"
            }
        },
        "prospectiveCO": {
            "name": "VACANT",
            "prd": "TBD"
        }
    },
    {
        "id": "cmd_59",
        "name": "USS WAYNE E MEYER",
        "uic": "55684",
        "location": "Pearl Harbor, HI",
        "currentCO": {
            "name": "MAUER GERARD MAJELLA III",
            "prd": "2024-08-01",
            "timelineData": {
                "i": "2023-06-01",
                "k": "2024-09-01",
                "m": "2024-11-01",
                "q": "2026-05-01"
            }
        },
        "currentXO": {
            "name": "FELTON MATTHEW RAY",
            "prd": "TBD",
            "timelineData": {
                "i": "2024-12-24",
                "k": "2026-06-24",
                "m": "2026-08-24",
                "q": "2028-02-24"
            }
        },
        "inboundXO": {
            "name": "FILLMORE MATTHEW L",
            "reportDate": "MAY26",
            "timelineData": {
                "i": "MAY26",
                "k": "NOV27",
                "m": "JAN28",
                "q": "JUL29"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "29-1",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "DDG",
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "NOV27",
            "timelineData": {
                "i": "NOV27",
                "k": "MAY29",
                "m": "JUL29",
                "q": "JAN31"
            }
        },
        "prospectiveCO": {
            "name": "VACANT",
            "prd": "TBD"
        }
    },
    {
        "id": "cmd_60",
        "name": "USS WILLIAM P LAWRENCE",
        "uic": "55686",
        "location": "Pearl Harbor, HI",
        "currentCO": {
            "name": "STAFFORD ANDREW THOMAS",
            "prd": "2025-08-26",
            "timelineData": {
                "i": "2024-04-26",
                "k": "2025-09-26",
                "m": "2025-11-26",
                "q": "2027-07-26"
            }
        },
        "currentXO": {
            "name": "HARRIS ROBERT NELSON III",
            "prd": "2027-04-05",
            "timelineData": {
                "i": "2025-11-05",
                "k": "2027-05-05",
                "m": "2027-07-05",
                "q": "2029-02-05"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "27-1",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "DDG",
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "",
            "timelineData": {
                "i": "",
                "k": "",
                "m": "",
                "q": ""
            }
        }
    },
    {
        "id": "cmd_61",
        "name": "USS MICHAEL MURPHY",
        "uic": "55688",
        "location": "Pearl Harbor, HI",
        "currentCO": {
            "name": "CUNNINGHAM CAITLIN E",
            "prd": "2025-07-24",
            "timelineData": {
                "i": "2024-03-24",
                "k": "2025-08-24",
                "m": "2025-10-24",
                "q": "2027-05-24"
            }
        },
        "currentXO": {
            "name": "MARINO DAREK",
            "prd": "2027-01-25",
            "timelineData": {
                "i": "2025-08-25",
                "k": "2027-02-25",
                "m": "2027-04-25",
                "q": "2028-10-25"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "29-4",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "DDG",
        "inboundXO": {
            "name": "SMITH BRIAN CONLEY",
            "reportDate": "FEB27",
            "timelineData": {
                "i": "FEB27",
                "k": "AUG28",
                "m": "OCT28",
                "q": "APR30"
            }
        },
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "AUG28",
            "timelineData": {
                "i": "AUG28",
                "k": "FEB30",
                "m": "APR30",
                "q": "OCT31"
            }
        }
    },
    {
        "id": "cmd_62",
        "name": "USS CARL M LEVIN",
        "uic": "50401",
        "location": "Pearl Harbor, HI",
        "currentCO": {
            "name": "HOLLOWAY BRENT JOSEPH",
            "prd": "2024-07-23",
            "timelineData": {
                "i": "2023-08-23",
                "k": "2024-08-23",
                "m": "2024-10-23",
                "q": "2026-05-23"
            }
        },
        "currentXO": {
            "name": "BOND BENJAMIN W",
            "prd": "2026-02-24",
            "timelineData": {
                "i": "2024-12-24",
                "k": "2026-03-24",
                "m": "2026-05-24",
                "q": "2027-11-24"
            }
        },
        "inboundXO": {
            "name": "HOUGH JAMES T",
            "reportDate": "2026-03-26",
            "timelineData": {
                "i": "2026-03-26",
                "k": "2027-09-26",
                "m": "2027-11-26",
                "q": "2029-05-26"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "29-1",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "DDG",
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "SEP27",
            "timelineData": {
                "i": "SEP27",
                "k": "MAR29",
                "m": "MAY29",
                "q": "NOV30"
            }
        }
    },
    {
        "id": "cmd_63",
        "name": "USS DANIEL INOUYE",
        "uic": "50187",
        "location": "Pearl Harbor, HI",
        "currentCO": {
            "name": "KELLY RYAN",
            "prd": "2024-08-23",
            "timelineData": {
                "i": "2023-02-23",
                "k": "2024-09-23",
                "m": "2024-11-23",
                "q": "2026-05-23"
            }
        },
        "currentXO": {
            "name": "GARDNER ERIK",
            "prd": "2026-02-01",
            "timelineData": {
                "i": "2024-08-01",
                "k": "2026-03-01",
                "m": "2026-05-01",
                "q": "2027-11-01"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "25-4",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "DDG",
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "",
            "timelineData": {
                "i": "",
                "k": "",
                "m": "",
                "q": ""
            }
        },
        "inboundXO": {
            "name": "NO FILL - MAJCOM",
            "reportDate": ""
        }
    },
    {
        "id": "cmd_64",
        "name": "USS ARLEIGH BURKE",
        "uic": "21487",
        "location": "Rota, SP",
        "currentCO": {
            "name": "REBER ETHAN ANDREW",
            "prd": "2024-10-01",
            "timelineData": {
                "i": "2023-07-01",
                "k": "2024-11-01",
                "m": "2024-12-01",
                "q": "2026-09-01"
            }
        },
        "currentXO": {
            "name": "JORDAN JAMIE LEE",
            "prd": "2026-06-24",
            "timelineData": {
                "i": "2024-11-24",
                "k": "2026-07-24",
                "m": "2026-09-24",
                "q": "2028-05-24"
            }
        },
        "inboundXO": {
            "name": "GARDNER VINCENT DEMETRIS",
            "reportDate": "2026-07-26",
            "timelineData": {
                "i": "2026-07-26",
                "k": "2028-02-26",
                "m": "MAY28",
                "q": "2029-10-26"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "29-2",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "DDG",
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "JAN28",
            "timelineData": {
                "i": "JAN28",
                "k": "JUL29",
                "m": "SEP29",
                "q": "MAR31"
            }
        },
        "fleetUpProgress": {
            "isic": true,
            "tycom": true,
            "pco": true,
            "orders": true,
            "coc": true
        }
    },
    {
        "id": "cmd_65",
        "name": "USS ROOSEVELT",
        "uic": "21954",
        "location": "Rota, SP",
        "currentCO": {
            "name": "CARLSON JARED L",
            "prd": "2024-10-24",
            "timelineData": {
                "i": "JAN24",
                "k": "OCT24",
                "m": "NOV24",
                "q": "MAY26"
            }
        },
        "currentXO": {
            "name": "DAPRATO RICHARD J",
            "prd": "TBD",
            "timelineData": {
                "i": "sEP24",
                "k": "MAR26",
                "m": "MAY26",
                "q": "NOV27"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "29-1",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "DDG",
        "slatedXO": {
            "name": "26-3",
            "reportDate": "2027-09-26",
            "timelineData": {
                "i": "2027-09-26",
                "k": "2029-03-26",
                "m": "2029-05-26",
                "q": "2030-11-26"
            }
        },
        "prospectiveCO": {
            "name": "VACANT",
            "prd": "TBD"
        },
        "inboundXO": {
            "name": "HAMMERER ROSS FITZGEREL",
            "reportDate": "MAR26",
            "timelineData": {
                "i": "MAR26",
                "m": "NOV27",
                "k": "SEP27",
                "q": "MAY29"
            }
        }
    },
    {
        "id": "cmd_66",
        "name": "USS BULKELEY",
        "uic": "22992",
        "location": "Rota, SP",
        "currentCO": {
            "name": "SCHELCHER MICHAEL RAYMONDA",
            "prd": "2025-05-28",
            "timelineData": {
                "i": "2024-01-28",
                "k": "2025-06-28",
                "m": "2025-08-28",
                "q": "2027-02-28"
            }
        },
        "currentXO": {
            "name": "LAVOPA ANTHONY R",
            "prd": "TBD",
            "timelineData": {
                "i": "2025-06-25",
                "k": "2026-12-25",
                "m": "2027-02-25",
                "q": "2028-08-25"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "29-3",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "DDG",
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "MAY28",
            "timelineData": {
                "i": "MAY28",
                "k": "NOV29",
                "m": "JAN30",
                "q": "JUL31"
            }
        },
        "prospectiveCO": {
            "name": "VACANT",
            "prd": "TBD"
        },
        "inboundXO": {
            "name": "MCCADDEN DANIEL J",
            "reportDate": "NOV26",
            "timelineData": {
                "i": "NOV26",
                "m": "AUG28",
                "q": "FEB30",
                "k": "JUN28"
            }
        }
    },
    {
        "id": "cmd_67",
        "name": "USS PAUL IGNATIUS",
        "uic": "N/A",
        "location": "Rota, SP",
        "currentCO": {
            "name": "BURKE WILLIAM HENRY",
            "prd": "TBD",
            "timelineData": {
                "i": "JUN24",
                "m": "DEC25",
                "q": "JUN27",
                "k": "OCT25"
            }
        },
        "currentXO": {
            "name": "SISLER RYAN J",
            "prd": "TBD",
            "timelineData": {
                "i": "AUG25",
                "m": "JUN27",
                "q": "DEC28",
                "k": "APR27"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "TBD",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "DDG",
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "",
            "timelineData": {
                "i": "APR27",
                "k": "OCT28",
                "m": "DEC28",
                "q": "JUN30"
            }
        },
        "prospectiveCO": {
            "name": "BURKE WILLIAM HENRY",
            "prd": "TBD"
        }
    },
    {
        "id": "cmd_68",
        "name": "USS OSCAR AUSTIN",
        "uic": "21953",
        "location": "Rota, SP",
        "currentCO": {
            "name": "NICOLAS DAVID PETER",
            "prd": "2025-02-01",
            "timelineData": {
                "i": "2023-09-01",
                "k": "2025-03-01",
                "m": "2025-04-01",
                "q": "2026-09-01"
            }
        },
        "currentXO": {
            "name": "SELLARS GERALD CHARLES",
            "prd": "2026-06-25",
            "timelineData": {
                "i": "2025-02-25",
                "k": "2026-07-25",
                "m": "2026-09-25",
                "q": "2028-03-25"
            }
        },
        "inboundXO": {
            "name": "URBAS IAN CHRISTOPHER",
            "reportDate": "2026-07-26",
            "timelineData": {
                "i": "2026-07-26",
                "k": "2028-02-26",
                "m": "2028-04-26",
                "q": "2029-11-26"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "29-2",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "DDG",
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "JAN28",
            "timelineData": {
                "i": "JAN28",
                "k": "JUL29",
                "m": "SEP29",
                "q": "MAR31"
            }
        }
    },
    {
        "id": "cmd_69",
        "name": "USS JOHN BASILONE",
        "uic": "50403",
        "location": "Rota, SP",
        "currentCO": {
            "name": "BROOKS MATTHEW SETH",
            "prd": "2024-12-24",
            "timelineData": {
                "i": "2023-01-23",
                "k": "2024-12-24",
                "m": "2025-02-24",
                "q": "2026-08-24"
            }
        },
        "currentXO": {
            "name": "MURPHY TERENCE MAXWELL",
            "prd": "2026-06-25",
            "timelineData": {
                "i": "2025-02-25",
                "k": "2026-07-25",
                "m": "2026-08-25",
                "q": "2028-02-25"
            }
        },
        "inboundXO": {
            "name": "JEAN AARON ANTHONY",
            "reportDate": "2026-06-26",
            "timelineData": {
                "i": "2026-06-26",
                "k": "2027-12-26",
                "m": "2028-02-26",
                "q": "2029-08-26"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "29-2",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "DDG",
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "DEC27",
            "timelineData": {
                "i": "DEC27",
                "k": "JUN29",
                "m": "AUG29",
                "q": "FEB31"
            }
        }
    },
    {
        "id": "cmd_70",
        "name": "USS CURTUS D WILBUR ",
        "uic": "21640",
        "location": "San Diego, CA",
        "currentCO": {
            "name": "BONTON BRANDON ELLIS",
            "prd": "2025-08-01",
            "timelineData": {
                "i": "2024-02-01",
                "k": "2025-09-01",
                "m": "2025-10-01",
                "q": "2027-04-01"
            }
        },
        "currentXO": {
            "name": "ZENAN KYLA MARIE",
            "prd": "2027-01-25",
            "timelineData": {
                "i": "2025-08-25",
                "k": "2027-02-25",
                "m": "2027-04-25",
                "q": "2028-10-25"
            }
        },
        "inboundXO": {
            "name": "KALICK ERIC R",
            "reportDate": "2026-02-01",
            "timelineData": {
                "i": "2026-02-01",
                "k": "2027-08-01",
                "m": "2027-10-01",
                "q": "2029-04-01"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "28-4",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "DDG",
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "AUG27",
            "timelineData": {
                "i": "AUG27",
                "k": "FEB29",
                "m": "APR29",
                "q": "OCT30"
            }
        }
    },
    {
        "id": "cmd_71",
        "name": "USS RUSSELL",
        "uic": "21821",
        "location": "San Diego, CA",
        "currentCO": {
            "name": "SNYDER KAILEY M",
            "prd": "2024-11-01",
            "timelineData": {
                "i": "2023-10-01",
                "k": "2024-12-01",
                "m": "2025-01-01",
                "q": "2026-08-01"
            }
        },
        "currentXO": {
            "name": "HARDY CORWIN J",
            "prd": "2026-05-25",
            "timelineData": {
                "i": "2024-12-25",
                "k": "2026-06-25",
                "m": "2026-08-25",
                "q": "2028-02-25"
            }
        },
        "inboundXO": {
            "name": "COLE ALEX ROBERT",
            "reportDate": "2026-04-26",
            "timelineData": {
                "i": "2026-04-26",
                "k": "2027-10-26",
                "m": "2027-12-26",
                "q": "2029-06-26"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "29-1",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "DDG",
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "OCT27",
            "timelineData": {
                "i": "OCT27",
                "k": "APR29",
                "m": "JUN29",
                "q": "DEC30"
            }
        }
    },
    {
        "id": "cmd_72",
        "name": "USS PAUL HAMILTON",
        "uic": "21815",
        "platform": "DDG",
        "location": "San Diego, CA",
        "currentCO": {
            "name": "HUGHES MICHAEL C",
            "prd": "2025-02-25",
            "timelineData": {
                "i": "2024-12-25",
                "k": "2025-03-25",
                "m": "2025-05-25",
                "q": "2026-07-25"
            }
        },
        "currentXO": {
            "name": "BIGGERSTAFF MATTHEW CONWAY",
            "prd": "2026-04-24",
            "timelineData": {
                "i": "2024-10-24",
                "k": "2026-04-24",
                "m": "2026-06-24",
                "q": "2027-12-24"
            }
        },
        "inboundXO": {
            "name": "INTOCCIA MATTHEW JAMES",
            "reportDate": "2025-04-25",
            "timelineData": {
                "i": "2025-04-25",
                "k": "2026-05-25",
                "m": "2026-07-25",
                "q": "2028-07-25"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "28-1",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "OCT26",
            "timelineData": {
                "i": "OCT26",
                "k": "APR28",
                "m": "JUN28",
                "q": "DEC29"
            }
        }
    },
    {
        "id": "cmd_73",
        "name": "USS FITZGERALD",
        "uic": "21824",
        "location": "San Diego, CA",
        "currentCO": {
            "name": "RICHARDSON PAUL F III",
            "prd": "2024-08-24",
            "timelineData": {
                "i": "2022-05-24",
                "k": "2024-09-24",
                "m": "2024-11-24",
                "q": "2026-06-24"
            }
        },
        "currentXO": {
            "name": "INTOCCIA MATTHEW JAMES",
            "prd": "2026-04-25",
            "timelineData": {
                "i": "2025-04-25",
                "k": "2026-05-25",
                "m": "2026-07-25",
                "q": "2028-07-25"
            }
        },
        "inboundXO": {
            "name": "BIGGERSTAFF MATTHEW CONWAY",
            "reportDate": "2024-10-24",
            "timelineData": {
                "i": "2024-10-24",
                "k": "2026-04-24",
                "m": "2026-06-24",
                "q": "2027-12-24"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "27-3",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "DDG",
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "APR26",
            "timelineData": {
                "i": "APR26",
                "k": "OCT27",
                "m": "DEC27",
                "q": "JUN29"
            }
        }
    },
    {
        "id": "cmd_74",
        "name": "USS STETHEM",
        "uic": "21825",
        "location": "San Diego, CA",
        "currentCO": {
            "name": "SLEDGE MICHAEL D",
            "prd": "2024-08-23",
            "timelineData": {
                "i": "2023-06-23",
                "k": "2024-09-23",
                "m": "2024-11-23",
                "q": "2026-02-23"
            }
        },
        "currentXO": {
            "name": "WALKER MICHAEL A JR",
            "prd": "TBD",
            "timelineData": {
                "i": "2024-12-24",
                "k": "2026-01-24",
                "m": "2026-02-24",
                "q": "OCT27"
            }
        },
        "inboundXO": {
            "name": "LEWIS JOSEPH C",
            "reportDate": "FEB26",
            "timelineData": {
                "i": "FEB26",
                "m": "OCT27",
                "k": "AUG27",
                "q": "APR29"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "28-4",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "DDG",
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "AUG27",
            "timelineData": {
                "i": "AUG27",
                "k": "FEB29",
                "m": "APR29",
                "q": "OCT30"
            }
        },
        "prospectiveCO": {
            "name": "VACANT",
            "prd": "TBD"
        }
    },
    {
        "id": "cmd_75",
        "name": "USS OKANE",
        "uic": "21951",
        "location": "San Diego, CA",
        "currentCO": {
            "name": "KALUSCAK BRITTANY B",
            "prd": "2025-01-01",
            "timelineData": {
                "i": "2023-08-01",
                "k": "2025-02-01",
                "m": "2025-04-01",
                "q": "2026-12-01"
            }
        },
        "currentXO": {
            "name": "SHARP CURTIS WILLIAM",
            "prd": "2026-09-25",
            "timelineData": {
                "i": "2025-03-25",
                "k": "2026-10-25",
                "m": "2026-12-25",
                "q": "2028-06-25"
            }
        },
        "inboundXO": {
            "name": "MARGOLIS SCOTT H",
            "reportDate": "2026-10-26",
            "timelineData": {
                "i": "2026-10-26",
                "k": "2028-04-26",
                "m": "2028-06-26",
                "q": "2029-12-26"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "29-3",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "DDG",
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "APR28",
            "timelineData": {
                "i": "APR28",
                "k": "OCT29",
                "m": "DEC29",
                "q": "JUN31"
            }
        }
    },
    {
        "id": "cmd_76",
        "name": "USS CHAFEE",
        "uic": "23155",
        "location": "San Diego, CA",
        "currentCO": {
            "name": "APPLEMAN RYAN PATRICK",
            "prd": "2025-11-01",
            "timelineData": {
                "i": "2024-10-01",
                "k": "2025-12-01",
                "m": "2026-01-01",
                "q": "2027-07-01"
            }
        },
        "currentXO": {
            "name": "ZEBIAN CORY",
            "prd": "NOV25",
            "timelineData": {
                "i": "2025-11-25",
                "k": "2027-05-25",
                "m": "2027-07-25",
                "q": "2029-01-25"
            }
        },
        "inboundXO": {
            "name": "BOILY JUSTIN ALLEN",
            "reportDate": "MAY27"
        },
        "nextSlateParams": {
            "targetBoardDate": "30-1",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "DDG",
        "prospectiveCO": {
            "name": "VACANT",
            "prd": "TBD"
        },
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "NOV28",
            "timelineData": {
                "i": "NOV28",
                "k": "MAY30",
                "m": "JUL30",
                "q": "JAN32"
            }
        }
    },
    {
        "id": "cmd_77",
        "name": "USS PINCKNEY",
        "uic": "23170",
        "platform": "DDG",
        "location": "San Diego, CA",
        "currentCO": {
            "name": "DEVALL TIMOTHY JAMES",
            "prd": "2025-02-23",
            "timelineData": {
                "i": "2023-11-23",
                "k": "2025-03-23",
                "m": "2025-04-23",
                "q": "2026-07-23"
            }
        },
        "currentXO": {
            "name": "NORTHRUP DONALD STEVEN",
            "prd": "2026-04-24",
            "timelineData": {
                "i": "2024-11-24",
                "k": "2026-06-24",
                "m": "2026-08-24",
                "q": "2028-02-24"
            }
        },
        "inboundXO": {
            "name": "RAGSDALE CHRISTOPHER THOMA",
            "reportDate": "2025-03-25",
            "timelineData": {
                "i": "2025-03-25",
                "k": "2026-04-25",
                "m": "2026-06-25",
                "q": "2028-06-25"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "28-1",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "SEP26",
            "timelineData": {
                "i": "SEP26",
                "k": "MAR28",
                "m": "MAY28",
                "q": "NOV29"
            }
        }
    },
    {
        "id": "cmd_78",
        "name": "USS MOMSEN",
        "uic": "23160",
        "location": "San Diego, CA",
        "currentCO": {
            "name": "KROUCHICK KEITH R",
            "prd": "2025-09-24",
            "timelineData": {
                "i": "2024-04-24",
                "k": "2025-10-24",
                "m": "2025-12-24",
                "q": "2027-06-24"
            }
        },
        "currentXO": {
            "name": "LASHOMB DAVID ROBERT",
            "prd": "2027-03-25",
            "timelineData": {
                "i": "2025-10-25",
                "k": "2027-04-25",
                "m": "2027-06-25",
                "q": "2028-12-25"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "30-1",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "DDG",
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "OCT28",
            "timelineData": {
                "i": "OCT28",
                "k": "APR30",
                "m": "JUN30",
                "q": "DEC31"
            }
        },
        "inboundXO": {
            "name": "MILLS JOSHUA L",
            "reportDate": "APR27",
            "timelineData": {
                "i": "APR27",
                "m": "DEC28",
                "k": "OCT28",
                "q": "JUN30"
            }
        }
    },
    {
        "id": "cmd_79",
        "name": "USS CHUNG HOON",
        "uic": "23146",
        "location": "San Diego, CA",
        "currentCO": {
            "name": "LOBECKER NICOLE LYNN",
            "prd": "2025-09-24",
            "timelineData": {
                "i": "2024-04-24",
                "k": "2025-10-24",
                "m": "2025-12-24",
                "q": "2027-06-24"
            }
        },
        "currentXO": {
            "name": "KAIJANKOSKI ERIC ANDREW",
            "prd": "2027-02-25",
            "timelineData": {
                "i": "2025-09-25",
                "k": "2027-03-25",
                "m": "2027-05-25",
                "q": "2028-11-25"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "29-4",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "DDG",
        "inboundXO": {
            "name": "ROAF JOSHUA MICHAEL",
            "reportDate": "FEB27",
            "timelineData": {
                "i": "2027-02-01",
                "k": "2028-08-01",
                "m": "2028-10-01",
                "q": "2030-04-01"
            }
        },
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "AUG28",
            "timelineData": {
                "i": "AUG28",
                "k": "FEB30",
                "m": "APR30",
                "q": "OCT31"
            }
        }
    },
    {
        "id": "cmd_81",
        "name": "USS HALSEY",
        "uic": "23154",
        "location": "San Diego, CA",
        "currentCO": {
            "name": "LAWTON MOLLY LUCILE",
            "prd": "2025-06-24",
            "timelineData": {
                "i": "2024-02-24",
                "k": "2025-07-24",
                "m": "2025-09-24",
                "q": "2027-01-24"
            }
        },
        "currentXO": {
            "name": "BOTE MARK L",
            "prd": "2026-10-25",
            "timelineData": {
                "i": "2025-08-25",
                "k": "2026-11-25",
                "m": "2027-01-25",
                "q": "2028-06-25"
            }
        },
        "inboundXO": {
            "name": "JOCHIMSEN AARON ANDREW",
            "reportDate": "2026-12-26",
            "timelineData": {
                "i": "2026-12-26",
                "k": "2028-05-26",
                "m": "2028-07-26",
                "q": "2030-01-26"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "29-4",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "DDG",
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "JUN28",
            "timelineData": {
                "i": "JUN28",
                "k": "DEC29",
                "m": "FEB30",
                "q": "AUG31"
            }
        }
    },
    {
        "id": "cmd_82",
        "name": "USS STERETT",
        "uic": "23166",
        "location": "San Diego, CA",
        "currentCO": {
            "name": "MOODY BRANDON L",
            "prd": "2025-10-24",
            "timelineData": {
                "i": "2024-06-24",
                "k": "2025-11-24",
                "m": "2026-01-24",
                "q": "2027-08-24"
            }
        },
        "currentXO": {
            "name": "MARTENS ZACHARY BURTON",
            "prd": "2026-10-25",
            "timelineData": {
                "i": "2025-09-25",
                "k": "2026-11-25",
                "m": "2027-01-25",
                "q": "2028-06-25"
            }
        },
        "inboundXO": {
            "name": "PEACH JOHN JAMES III",
            "reportDate": "2026-10-26",
            "timelineData": {
                "i": "2026-10-26",
                "k": "2028-04-26",
                "m": "2028-06-26",
                "q": "2029-12-26"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "29-3",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "DDG",
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "APR28",
            "timelineData": {
                "i": "APR28",
                "k": "OCT29",
                "m": "DEC29",
                "q": "JUN31"
            }
        }
    },
    {
        "id": "cmd_83",
        "name": "USS STOCKDALE",
        "uic": "23163",
        "location": "San Diego, CA",
        "currentCO": {
            "name": "BECKELHYMER JACOB TITUS",
            "prd": "2024-11-01",
            "timelineData": {
                "i": "2023-06-01",
                "k": "2024-12-01",
                "m": "2025-02-01",
                "q": "2026-07-01"
            }
        },
        "currentXO": {
            "name": "MOORE CARISSA DANIELLE",
            "prd": "TBD",
            "timelineData": {
                "i": "2024-12-24",
                "k": "2026-05-24",
                "m": "2026-07-24",
                "q": "2028-01-24"
            }
        },
        "inboundXO": {
            "name": "SCHAEFER VICTOR CHARLES",
            "reportDate": "MAY26"
        },
        "nextSlateParams": {
            "targetBoardDate": "27-4",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "DDG",
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "JUN26",
            "timelineData": {
                "i": "JUN26",
                "k": "DEC27",
                "m": "FEB28",
                "q": "AUG29"
            }
        },
        "prospectiveCO": {
            "name": "VACANT",
            "prd": "TBD"
        }
    },
    {
        "id": "cmd_84",
        "name": "USS SPRUANCE",
        "uic": "55687",
        "location": "San Diego, CA",
        "currentCO": {
            "name": "TATE LEIGH RICHARD",
            "prd": "2025-05-24",
            "timelineData": {
                "i": "2024-04-24",
                "k": "2025-06-24",
                "m": "2025-07-24",
                "q": "2027-03-24"
            }
        },
        "currentXO": {
            "name": "YORK JEFFREY EDWARD",
            "prd": "TBD",
            "timelineData": {
                "i": "2025-07-25",
                "k": "2027-01-25",
                "m": "2027-03-25",
                "q": "2028-09-25"
            }
        },
        "inboundXO": {
            "name": "BOLTON KYLE W",
            "reportDate": "JAN27",
            "timelineData": {
                "i": "JAN27",
                "k": "JUL28",
                "m": "SEP28",
                "q": "MAR30"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "29-4",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "DDG",
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "JUL28",
            "timelineData": {
                "i": "JUL28",
                "k": "JAN30",
                "m": "MAR30",
                "q": "SEP31"
            }
        },
        "prospectiveCO": {
            "name": "VACANT",
            "prd": "TBD"
        }
    },
    {
        "id": "cmd_85",
        "name": "USS LENAH H SUTCLIFFE HIGBEE",
        "uic": "50404",
        "location": "San Diego, CA",
        "currentCO": {
            "name": "SKAHEN STEPHEN JOHN JR",
            "prd": "2024-11-01",
            "timelineData": {
                "i": "2023-09-01",
                "k": "2024-12-01",
                "m": "2025-01-01",
                "q": "2026-06-01"
            }
        },
        "currentXO": {
            "name": "RAGSDALE CHRISTOPHER THOMA",
            "prd": "2026-03-25",
            "timelineData": {
                "i": "2025-03-25",
                "k": "2026-04-25",
                "m": "2026-06-25",
                "q": "2028-06-25"
            }
        },
        "inboundXO": {
            "name": "NORTHRUP DONALD STEVEN",
            "reportDate": "2024-11-24",
            "timelineData": {
                "i": "2024-11-24",
                "k": "2026-06-24",
                "m": "2026-08-24",
                "q": "2028-02-24"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "27-3",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "DDG",
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "MAY26",
            "timelineData": {
                "i": "MAY26",
                "k": "NOV27",
                "m": "JAN28",
                "q": "JUL29"
            }
        }
    },
    {
        "id": "cmd_86",
        "name": "USS COMSTOCK",
        "uic": "21865",
        "platform": "LSD",
        "location": "Sasebo, Japan",
        "currentCO": {
            "name": "BALL RAYMOND THOMAS JR",
            "prd": "2025-03-01",
            "timelineData": {
                "i": "2022-12-01",
                "k": "2025-04-01",
                "m": "2025-06-01",
                "q": "2027-04-01"
            }
        },
        "currentXO": {
            "name": "Henderson, Jason (XO-A)",
            "prd": "2025-03-01",
            "timelineData": {
                "i": "2023-10-01",
                "k": "2025-04-01",
                "m": "2025-06-01",
                "q": "2025-01-25"
            }
        },
        "inboundXO": {
            "name": "HODGEMAN JESSICA LYN",
            "reportDate": "2025-08-25",
            "timelineData": {
                "i": "2025-08-25",
                "k": "2027-02-25",
                "m": "2027-04-25",
                "q": "2028-10-25"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "28-2",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "FEB27",
            "timelineData": {
                "i": "FEB27",
                "k": "AUG28",
                "m": "OCT28",
                "q": "APR30"
            }
        }
    },
    {
        "id": "cmd_87",
        "name": "USS GERMANTOWN",
        "uic": "21639",
        "location": "San Diego, CA",
        "currentCO": {
            "name": "PEARLSWIG BENJAMIN C",
            "prd": "Unknown",
            "timelineData": {
                "i": null,
                "k": null,
                "m": "2025-06-25",
                "q": "2026-09-25"
            }
        },
        "currentXO": {
            "name": "ELLISON LAUREN J",
            "prd": "2027-01-25",
            "timelineData": {
                "i": "2025-08-25",
                "k": "2027-02-25",
                "m": "2027-04-25",
                "q": "2028-11-25"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "26-4",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "LSD",
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "",
            "timelineData": {
                "i": "",
                "k": "",
                "m": "",
                "q": ""
            }
        }
    },
    {
        "id": "cmd_88",
        "name": "USS ASHLAND",
        "uic": "21531",
        "location": "San Diego, CA",
        "currentCO": {
            "name": "PEEPLES JOSHUA ADAM",
            "prd": "2024-10-25",
            "timelineData": {
                "i": "2023-04-25",
                "k": "2024-11-25",
                "m": "2025-06-25",
                "q": "2027-05-25"
            }
        },
        "currentXO": {
            "name": "Cranford, Marcus (XO-A)",
            "prd": "2025-07-24",
            "timelineData": {
                "i": "2024-02-24",
                "k": "2025-08-24",
                "m": null,
                "q": null
            }
        },
        "inboundXO": {
            "name": "Hollins, Renaldo (XO-A)",
            "reportDate": "2024-10-25",
            "timelineData": {
                "i": "2024-10-25",
                "k": "2026-04-25",
                "m": "2026-06-25",
                "q": "2028-02-25"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "27-3",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "LSD",
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "APR26",
            "timelineData": {
                "i": "APR26",
                "k": "OCT27",
                "m": "DEC27",
                "q": "JUN29"
            }
        }
    },
    {
        "id": "cmd_89",
        "name": "USS HARPER'S FERRY",
        "uic": "21852",
        "location": "San Diego, CA",
        "currentCO": {
            "name": "MCQUIDDY FRANK KIRBY",
            "prd": "Unknown",
            "timelineData": {
                "i": null,
                "k": null,
                "m": "2024-11-24",
                "q": "2026-02-26"
            }
        },
        "currentXO": {
            "name": "RICHARDS SCOTT KENNETH JR",
            "prd": "TBD",
            "timelineData": {
                "i": "2025-01-25",
                "k": "2026-01-25",
                "m": "2026-02-25",
                "q": "2027-08-25"
            }
        },
        "inboundXO": {
            "name": "CHALLBURG MARIBEL",
            "reportDate": "FEB26",
            "timelineData": {
                "i": "FEB26",
                "m": "AUG27",
                "k": "JUN27",
                "q": "FEB28"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "28-4",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "LSD",
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "JUN27",
            "timelineData": {
                "i": "JUN27",
                "k": "DEC28",
                "m": "FEB29",
                "q": "AUG30"
            }
        },
        "prospectiveCO": {
            "name": "VACANT",
            "prd": "TBD"
        }
    },
    {
        "id": "cmd_90",
        "name": "USS PEARL HARBOR",
        "uic": "21959",
        "location": "San Diego, CA",
        "currentCO": {
            "name": "DERVISHI ALBAN",
            "prd": "2025-04-24",
            "timelineData": {
                "i": "2024-03-24",
                "k": "2025-05-24",
                "m": "2025-06-24",
                "q": "2027-02-24"
            }
        },
        "currentXO": {
            "name": "REED DANIEL K",
            "prd": "2026-11-25",
            "timelineData": {
                "i": "2025-06-25",
                "k": "2026-12-25",
                "m": "2027-02-25",
                "q": "2028-09-25"
            }
        },
        "inboundXO": {
            "name": "PARRISH KAYRON MONTELL",
            "reportDate": "2026-11-26",
            "timelineData": {
                "i": "2026-11-26",
                "k": "2028-05-26",
                "m": "2028-07-26",
                "q": "2030-01-26"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "29-3",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "LSD",
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "MAY28",
            "timelineData": {
                "i": "MAY28",
                "k": "NOV29",
                "m": "JAN30",
                "q": "JUL31"
            }
        }
    },
    {
        "id": "cmd_91",
        "name": "USS WICHITA  BLUE (CREW 101) - 40511 Training Ship",
        "uic": "N/A",
        "location": "San Diego, CA",
        "currentCO": {
            "name": "Austin, Spencer",
            "prd": "2016-11-01",
            "timelineData": {
                "i": "2016-10-01",
                "k": "2016-12-01",
                "m": "2017-01-01",
                "q": "2018-07-01"
            }
        },
        "currentXO": {
            "name": "PCC",
            "prd": "1900-01-31",
            "timelineData": {
                "i": null,
                "k": "1900-03-31",
                "m": "2018-07-01",
                "q": "2019-12-01"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "-1-4",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "LCS",
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "",
            "timelineData": {
                "i": "",
                "k": "",
                "m": "",
                "q": ""
            }
        }
    },
    {
        "id": "cmd_92",
        "name": "USS JACKSON",
        "uic": "20135",
        "location": "San Diego, CA",
        "currentCO": {
            "name": "Winslow, Michael",
            "prd": "2022-04-01",
            "timelineData": {
                "i": "2022-03-01",
                "k": "2022-04-01",
                "m": "2022-04-22",
                "q": "2023-11-24"
            }
        },
        "currentXO": {
            "name": "Vanwagoner, John (Nick) (CO-A)",
            "prd": "Unknown",
            "timelineData": {
                "i": null,
                "k": null,
                "m": "2024-07-24",
                "q": null
            }
        },
        "inboundXO": {
            "name": "Recame, Andrew (OAK XO) 2407 - direct input",
            "reportDate": "Unknown",
            "timelineData": {
                "i": null,
                "k": null,
                "m": "2024-07-24",
                "q": "2026-03-26"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "30-3",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "LCS",
        "slatedXO": {
            "name": "26-4",
            "reportDate": "2029-04-01",
            "timelineData": {
                "i": "2029-04-01",
                "k": "2029-06-01",
                "m": "2029-07-01",
                "q": "2031-01-01"
            }
        }
    },
    {
        "id": "cmd_93",
        "name": "USS MONTGOMERY  (CREW 212)",
        "uic": "41057",
        "location": "San Diego, CA",
        "currentCO": {
            "name": "Edison, Rush (CO-SEQ) (COC DEC 2024)",
            "prd": "Unknown",
            "timelineData": {
                "i": null,
                "k": null,
                "m": null,
                "q": "2024-10-24"
            }
        },
        "currentXO": {
            "name": "Reppert, Catherine",
            "prd": "Unknown",
            "timelineData": {
                "i": null,
                "k": null,
                "m": null,
                "q": "2026-11-26"
            }
        },
        "inboundXO": {
            "name": "HAUGAN NATHAN DANIEL (XO/CO)",
            "reportDate": "2027-04-22",
            "timelineData": {
                "i": "2027-04-22",
                "k": "2027-05-22",
                "m": "2027-06-22",
                "q": "2028-12-22"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "30-1",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "LCS",
        "slatedXO": {
            "name": "26-2",
            "reportDate": "2028-10-01",
            "timelineData": {
                "i": "2028-10-01",
                "k": "2028-12-01",
                "m": "2029-01-01",
                "q": "2030-07-01"
            }
        }
    },
    {
        "id": "cmd_96",
        "name": "USS GIFFORDS  GOLD (CREW 202)",
        "uic": "40495",
        "location": "San Diego, CA",
        "currentCO": {
            "name": "Meehan, Kevin",
            "prd": "2017-01-01",
            "timelineData": {
                "i": "2016-12-01",
                "k": "2017-03-01",
                "m": "2017-04-01",
                "q": "2018-08-01"
            }
        },
        "currentXO": {
            "name": "Lehmann Matt",
            "prd": "2018-06-01",
            "timelineData": {
                "i": "2018-05-01",
                "k": "2018-07-01",
                "m": "2018-08-01",
                "q": "2019-12-01"
            }
        },
        "inboundXO": {
            "name": "Boice, Phil",
            "reportDate": "2019-08-01",
            "timelineData": {
                "i": "2019-08-01",
                "k": "2019-11-01",
                "m": "2019-12-01",
                "q": "2021-04-01"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "22-2",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "LCS",
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "FEB21",
            "timelineData": {
                "i": "FEB21",
                "k": "AUG22",
                "m": "OCT22",
                "q": "APR24"
            }
        }
    },
    {
        "id": "cmd_98",
        "name": "USS KANSAS CITY",
        "uic": "20160",
        "location": "San Diego, CA",
        "currentCO": {
            "name": "Mann, Ludwig (CO-A)",
            "prd": "Unknown",
            "timelineData": {
                "i": null,
                "k": null,
                "m": "2023-11-23",
                "q": "2025-04-01"
            }
        },
        "currentXO": {
            "name": "Reppert, Catherine (CO-A) - SHIFT TO ANOTHER PLATFORM",
            "prd": "Unknown",
            "timelineData": {
                "i": null,
                "k": null,
                "m": null,
                "q": "2026-11-26"
            }
        },
        "inboundXO": {
            "name": "Hoffman, Thomas (CO-A)",
            "reportDate": "Unknown",
            "timelineData": {
                "i": null,
                "k": null,
                "m": null,
                "q": "2026-04-24"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "TBD",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "LCS",
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "",
            "timelineData": {
                "i": "",
                "k": "",
                "m": "",
                "q": ""
            }
        }
    },
    {
        "id": "cmd_99",
        "name": "USS FORT WORTH",
        "uic": "20130",
        "location": "San Diego, CA",
        "currentCO": {
            "name": "White, Alfonza",
            "prd": "Unknown",
            "timelineData": {
                "i": null,
                "k": null,
                "m": null,
                "q": "2024-06-24"
            }
        },
        "currentXO": {
            "name": "Canby, Dana (CO-A) Extending to 2610",
            "prd": "Unknown",
            "timelineData": {
                "i": null,
                "k": null,
                "m": "2024-06-24",
                "q": "2025-11-24"
            }
        },
        "inboundXO": {
            "name": "Lewis, James (XO-A) (2508)",
            "reportDate": "2027-01-22",
            "timelineData": {
                "i": "2027-01-22",
                "k": "2027-02-22",
                "m": "2027-03-22",
                "q": "2027-05-22"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "29-4",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "LCS",
        "slatedXO": {
            "name": "26-2",
            "reportDate": "2028-06-23",
            "timelineData": {
                "i": "2028-06-23",
                "k": "2028-07-23",
                "m": "2028-08-23",
                "q": "2028-10-23"
            }
        }
    },
    {
        "id": "cmd_100",
        "name": "USS GIFFORDS  - 20139 SEATTLE, WA",
        "uic": "N/A",
        "location": "San Diego, CA",
        "currentCO": {
            "name": "Herndl, Phil (retirement 2406)",
            "prd": "2022-06-01",
            "timelineData": {
                "i": "2022-05-01",
                "k": "2022-07-01",
                "m": "2022-08-01",
                "q": "2024-06-24"
            }
        },
        "currentXO": {
            "name": "Toohig, Rob (XO/CO) (GOLD CO)",
            "prd": "2024-06-22",
            "timelineData": {
                "i": "2024-05-22",
                "k": "2024-07-22",
                "m": "2024-08-22",
                "q": "2026-02-22"
            }
        },
        "inboundXO": {
            "name": "Fullerton, Kyle (Direct Input)",
            "reportDate": "Unknown",
            "timelineData": {
                "i": null,
                "k": null,
                "m": "2026-01-26",
                "q": "2027-06-27"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "TBD",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "LCS",
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "",
            "timelineData": {
                "i": "",
                "k": "",
                "m": "",
                "q": ""
            }
        }
    },
    {
        "id": "cmd_101",
        "name": "USS CINCINATTI  BLUE (CREW 205)",
        "uic": "42699",
        "location": "San Diego, CA",
        "currentCO": {
            "name": "Davenport, James",
            "prd": "2025-10-28",
            "timelineData": {
                "i": "2025-09-28",
                "k": "2025-10-28",
                "m": "2025-11-28",
                "q": "2027-08-28"
            }
        },
        "currentXO": {
            "name": "Wuthier, Stacy",
            "prd": "2027-03-01",
            "timelineData": {
                "i": "2027-01-29",
                "k": "2027-05-01",
                "m": "2027-06-01",
                "q": "2028-11-01"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "27-1",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "LCS",
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "",
            "timelineData": {
                "i": "",
                "k": "",
                "m": "",
                "q": ""
            }
        }
    },
    {
        "id": "cmd_102",
        "name": "USS MONTGOMERY  BLUE (CREW 208)",
        "uic": "42688",
        "location": "San Diego, CA",
        "currentCO": {
            "name": "Liebold, Wayne",
            "prd": "2026-10-07",
            "timelineData": {
                "i": "2026-09-07",
                "k": "2026-12-07",
                "m": "2027-01-07",
                "q": "2028-06-07"
            }
        },
        "currentXO": {
            "name": "Rosso, Ed",
            "prd": "2027-03-08",
            "timelineData": {
                "i": "2027-02-08",
                "k": "2027-05-08",
                "m": "2027-06-08",
                "q": "2028-11-08"
            }
        },
        "inboundXO": {
            "name": "Duff, Austin",
            "reportDate": "2027-02-09",
            "timelineData": {
                "i": "2027-02-09",
                "k": "2027-05-09",
                "m": "2027-06-09",
                "q": "2028-11-09"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "29-4",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "LCS",
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "AUG28",
            "timelineData": {
                "i": "AUG28",
                "k": "FEB30",
                "m": "APR30",
                "q": "OCT31"
            }
        }
    },
    {
        "id": "cmd_103",
        "name": "USS MONTGOMERY  GOLD (CREW 209)",
        "uic": "42689",
        "location": "San Diego, CA",
        "currentCO": {
            "name": "Stefanik, Mark",
            "prd": "2025-11-16",
            "timelineData": {
                "i": "2025-10-16",
                "k": "2025-11-16",
                "m": "2025-12-16",
                "q": "2026-02-16"
            }
        },
        "currentXO": {
            "name": "Landry, Ken",
            "prd": "2026-07-17",
            "timelineData": {
                "i": "2026-06-17",
                "k": "2026-09-17",
                "m": "2026-10-17",
                "q": "2028-03-17"
            }
        },
        "inboundXO": {
            "name": "Richter, Matt",
            "reportDate": "2027-01-18",
            "timelineData": {
                "i": "2027-01-18",
                "k": "2027-03-18",
                "m": "2027-04-18",
                "q": "2028-08-18"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "29-4",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "LCS",
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "JUL28",
            "timelineData": {
                "i": "JUL28",
                "k": "JAN30",
                "m": "MAR30",
                "q": "SEP31"
            }
        }
    },
    {
        "id": "cmd_104",
        "name": "USS GIFFORDS  BLUE (CREW 210)",
        "uic": "41055",
        "location": "San Diego, CA",
        "currentCO": {
            "name": "Woodley, Keith",
            "prd": "2025-11-25",
            "timelineData": {
                "i": "2025-10-25",
                "k": "2025-11-25",
                "m": "2025-12-25",
                "q": "2027-05-25"
            }
        },
        "currentXO": {
            "name": "Cowan, Shawn",
            "prd": "2027-02-26",
            "timelineData": {
                "i": "2027-01-26",
                "k": "2027-01-26",
                "m": "2027-02-26",
                "q": "2028-08-26"
            }
        },
        "inboundXO": {
            "name": "Lonero, Dustin",
            "reportDate": "2027-01-27",
            "timelineData": {
                "i": "2027-01-27",
                "k": "2027-03-27",
                "m": "2027-04-27",
                "q": "2028-08-27"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "29-4",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "LCS",
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "JUL28",
            "timelineData": {
                "i": "JUL28",
                "k": "JAN30",
                "m": "MAR30",
                "q": "SEP31"
            }
        }
    },
    {
        "id": "cmd_105",
        "name": "USS JACKSON  (CREW 212) - 41057 Training Ship",
        "uic": "N/A",
        "location": "San Diego, CA",
        "currentCO": {
            "name": "Keller, Pat",
            "prd": "2027-03-03",
            "timelineData": {
                "i": "2027-02-03",
                "k": "2027-05-03",
                "m": "2027-06-03",
                "q": "2028-11-03"
            }
        },
        "currentXO": {
            "name": "Walton, David",
            "prd": "2027-04-04",
            "timelineData": {
                "i": "2027-03-04",
                "k": "2027-06-04",
                "m": "2027-07-04",
                "q": "2028-11-04"
            }
        },
        "inboundXO": {
            "name": "Coleman, Terence",
            "reportDate": "2027-01-05",
            "timelineData": {
                "i": "2027-01-05",
                "k": "2027-04-05",
                "m": "2027-05-05",
                "q": "2028-09-05"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "30-3",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "LCS",
        "slatedXO": {
            "name": "26-4",
            "reportDate": "2029-04-01",
            "timelineData": {
                "i": "2029-04-01",
                "k": "2029-06-01",
                "m": "2029-07-01",
                "q": "2031-01-01"
            }
        }
    },
    {
        "id": "cmd_106",
        "name": "USS OMAHA  GOLD (CREW 213)",
        "uic": "41063",
        "location": "San Diego, CA",
        "currentCO": {
            "name": "Toth, Michael",
            "prd": "2025-12-12",
            "timelineData": {
                "i": "2025-11-12",
                "k": "2025-12-12",
                "m": "2026-01-12",
                "q": "2027-06-12"
            }
        },
        "currentXO": {
            "name": "Barrientos, John",
            "prd": "2026-12-13",
            "timelineData": {
                "i": "2026-11-13",
                "k": "2027-02-13",
                "m": "2027-03-13",
                "q": "2028-07-13"
            }
        },
        "inboundXO": {
            "name": "Luebbert, Brian",
            "reportDate": "2027-02-14",
            "timelineData": {
                "i": "2027-02-14",
                "k": "2027-05-14",
                "m": "2027-06-14",
                "q": "2028-10-14"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "29-4",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "LCS",
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "AUG28",
            "timelineData": {
                "i": "AUG28",
                "k": "FEB30",
                "m": "APR30",
                "q": "OCT31"
            }
        }
    },
    {
        "id": "cmd_107",
        "name": "USS TULSA  GOLD (CREW 214)",
        "uic": "41060",
        "location": "San Diego, CA",
        "currentCO": {
            "name": "Bassett, Emily",
            "prd": "2025-12-21",
            "timelineData": {
                "i": "2025-11-21",
                "k": "2025-12-21",
                "m": "2026-01-21",
                "q": "2027-06-21"
            }
        },
        "currentXO": {
            "name": "Braeckel, Kurt",
            "prd": "2027-09-22",
            "timelineData": {
                "i": "2027-08-22",
                "k": "2027-10-22",
                "m": "2027-11-22",
                "q": "2029-04-22"
            }
        },
        "inboundXO": {
            "name": "Kloppel, Jed",
            "reportDate": "2027-02-23",
            "timelineData": {
                "i": "2027-02-23",
                "k": "2027-05-23",
                "m": "2027-06-23",
                "q": "2028-10-23"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "29-4",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "LCS",
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "AUG28",
            "timelineData": {
                "i": "AUG28",
                "k": "FEB30",
                "m": "APR30",
                "q": "OCT31"
            }
        }
    },
    {
        "id": "cmd_108",
        "name": "USS MANCHESTER",
        "uic": "20095",
        "location": "San Diego, CA",
        "currentCO": {
            "name": "Callihan, Shawn (COC 2410 --> 2602)",
            "prd": "2024-06-24",
            "timelineData": {
                "i": "1901-12-01",
                "k": "2024-07-24",
                "m": "2024-10-24",
                "q": "2026-03-26"
            }
        },
        "currentXO": {
            "name": "Ricker, Megan (XO/CO) (coc 2510/2511)",
            "prd": "2025-10-24",
            "timelineData": {
                "i": "2025-09-24",
                "k": "2025-11-24",
                "m": "2026-03-26",
                "q": "2027-06-24"
            }
        },
        "inboundXO": {
            "name": "Thurman, Jeremy (25-1) XO/CO",
            "reportDate": "2027-03-25",
            "timelineData": {
                "i": "2027-03-25",
                "k": "2027-05-25",
                "m": "2027-06-25",
                "q": "2028-12-25"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "29-4",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "LCS",
        "slatedXO": {
            "name": "26-2",
            "reportDate": "2028-08-25",
            "timelineData": {
                "i": "2028-08-25",
                "k": "2028-10-25",
                "m": "2028-11-25",
                "q": "2030-06-25"
            }
        }
    },
    {
        "id": "cmd_109",
        "name": "USS CINCINNATI  GOLD (CREW 219)",
        "uic": "61223",
        "location": "San Diego, CA",
        "currentCO": {
            "name": "VACANT",
            "prd": "1900-01-31"
        },
        "currentXO": {
            "name": "VACANT",
            "prd": "1900-01-31"
        },
        "nextSlateParams": {
            "targetBoardDate": "-1-4",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "LCS",
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "",
            "timelineData": {
                "i": "",
                "k": "",
                "m": "",
                "q": ""
            }
        }
    },
    {
        "id": "cmd_110",
        "name": "USS CINCINNATI",
        "uic": "20158",
        "location": "San Diego, CA",
        "currentCO": {
            "name": "Moore, Colleen (CO)",
            "prd": "Unknown",
            "timelineData": {
                "i": null,
                "k": null,
                "m": "2024-02-24",
                "q": "2025-08-25"
            }
        },
        "currentXO": {
            "name": "Burke, Robert",
            "prd": "Unknown",
            "timelineData": {
                "i": null,
                "k": null,
                "m": "2024-02-24",
                "q": "2024-06-24"
            }
        },
        "inboundXO": {
            "name": "Knuth, Matt",
            "reportDate": "Unknown",
            "timelineData": {
                "i": null,
                "k": null,
                "m": "2024-05-24",
                "q": "2024-07-24"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "TBD",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "LCS",
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "",
            "timelineData": {
                "i": "",
                "k": "",
                "m": "",
                "q": ""
            }
        }
    },
    {
        "id": "cmd_111",
        "name": "USS SAVANNAH",
        "uic": "20172",
        "location": "San Diego, CA",
        "currentCO": {
            "name": "Schmidt, Robert (XO/CO) (COC 2501)",
            "prd": "2024-06-24",
            "timelineData": {
                "i": "2024-03-01",
                "k": "2024-07-24",
                "m": "2025-02-24",
                "q": "2026-08-24"
            }
        },
        "currentXO": {
            "name": "Rivers, William (XO/CO)",
            "prd": "2025-12-24",
            "timelineData": {
                "i": "2025-10-24",
                "k": "2025-12-24",
                "m": "2026-01-24",
                "q": "2027-07-24"
            }
        },
        "inboundXO": {
            "name": "Tajiri, Takeru (XO-A)",
            "reportDate": "2027-06-01",
            "timelineData": {
                "i": "2027-06-01",
                "k": null,
                "m": null,
                "q": null
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "30-1",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "LCS",
        "slatedXO": {
            "name": "26-2",
            "reportDate": "2028-11-01",
            "timelineData": {
                "i": "2028-11-01",
                "k": "2029-01-01",
                "m": "2029-02-01",
                "q": "2030-08-01"
            }
        }
    },
    {
        "id": "cmd_112",
        "name": "USS CANBERRA  BLUE (CREW 227)",
        "uic": "36165",
        "location": "San Diego, CA",
        "currentCO": {
            "name": "Ashley, William",
            "prd": "2023-04-01",
            "timelineData": {
                "i": "2023-03-01",
                "k": "2023-05-01",
                "m": "2023-05-23",
                "q": null
            }
        },
        "currentXO": {
            "name": "MCLAUGHLIN JAMES",
            "prd": "Unknown",
            "timelineData": {
                "i": null,
                "k": null,
                "m": "2025-10-25",
                "q": "2026-07-26"
            }
        },
        "inboundXO": {
            "name": "Edmiston (XO-A)",
            "reportDate": "2026-03-22",
            "timelineData": {
                "i": "2026-03-22",
                "k": "2026-05-22",
                "m": "2026-06-22",
                "q": "2027-12-22"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "29-1",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "LCS",
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "SEP27",
            "timelineData": {
                "i": "SEP27",
                "k": "MAR29",
                "m": "MAY29",
                "q": "NOV30"
            }
        }
    },
    {
        "id": "cmd_113",
        "name": "USS CANBERRA  GOLD (CREW 228)",
        "uic": "36166",
        "location": "San Diego, CA",
        "currentCO": {
            "name": "HOFFMAN, THOMAS (CO) PENDING 24-2 (2410)",
            "prd": "Unknown",
            "timelineData": {
                "i": null,
                "k": null,
                "m": null,
                "q": "2026-04-24"
            }
        },
        "currentXO": {
            "name": "Towles, Courtney (XO/CO)",
            "prd": "2025-05-23",
            "timelineData": {
                "i": "2025-04-23",
                "k": "2025-06-23",
                "m": "2025-07-23",
                "q": "2026-12-23"
            }
        },
        "inboundXO": {
            "name": "Garia, Joseph (24-2) (2507)(D.I.T.)",
            "reportDate": "2026-09-27",
            "timelineData": {
                "i": "2026-09-27",
                "k": "2026-11-27",
                "m": "2026-12-27",
                "q": "2028-03-27"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "29-3",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "LCS",
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "MAR28",
            "timelineData": {
                "i": "MAR28",
                "k": "SEP29",
                "m": "NOV29",
                "q": "MAY31"
            }
        }
    },
    {
        "id": "cmd_114",
        "name": "USS SANTA BARBARA  BLUE (CREW 229)",
        "uic": "36167",
        "location": "San Diego, CA",
        "currentCO": {
            "name": "Ochs, Adam (CO-A) (COC AUG 25) (Relieved)",
            "prd": "Unknown",
            "timelineData": {
                "i": null,
                "k": null,
                "m": null,
                "q": "2025-04-23"
            }
        },
        "currentXO": {
            "name": "Buss, Johnathan (XO/CO)",
            "prd": "2025-08-23",
            "timelineData": {
                "i": "2025-07-23",
                "k": "2025-09-23",
                "m": "2025-10-23",
                "q": "2027-04-23"
            }
        },
        "inboundXO": {
            "name": "Steiner, Jeffrey (24-3)",
            "reportDate": "2026-11-25",
            "timelineData": {
                "i": "2026-11-25",
                "k": "2027-01-25",
                "m": "2027-02-25",
                "q": "2028-08-25"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "29-3",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "LCS",
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "MAY28",
            "timelineData": {
                "i": "MAY28",
                "k": "NOV29",
                "m": "JAN30",
                "q": "JUL31"
            }
        }
    },
    {
        "id": "cmd_115",
        "name": "USS SANTA BARBARA  GOLD (CREW 230)",
        "uic": "36168",
        "location": "San Diego, CA",
        "currentCO": {
            "name": "Gonzalez, Steve CO-A (COC 01NOV24)",
            "prd": "Unknown",
            "timelineData": {
                "i": null,
                "k": null,
                "m": null,
                "q": "2024-11-23"
            }
        },
        "currentXO": {
            "name": "Burtnerabt (XO/CO) (direct input CO) (NOV24)",
            "prd": "2024-10-24",
            "timelineData": {
                "i": "2024-09-24",
                "k": "2024-11-24",
                "m": "2024-12-24",
                "q": "2026-06-24"
            }
        },
        "inboundXO": {
            "name": "Lewis, Linzy (COC NOV 24)",
            "reportDate": "Unknown",
            "timelineData": {
                "i": null,
                "k": null,
                "m": "2024-11-24",
                "q": "2026-04-24"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "TBD",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "LCS",
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "",
            "timelineData": {
                "i": "",
                "k": "",
                "m": "",
                "q": ""
            }
        }
    },
    {
        "id": "cmd_116",
        "name": "USS AUGUSTA",
        "uic": "36222",
        "location": "San Diego, CA",
        "currentCO": {
            "name": "Trager, Joseph (CO-A)(24-3)",
            "prd": "Unknown",
            "timelineData": {
                "i": null,
                "k": null,
                "m": "2024-10-24",
                "q": "2026-03-24"
            }
        },
        "currentXO": {
            "name": "VACANT",
            "prd": "TBD"
        },
        "inboundXO": {
            "name": "Smith Zachary (25-3)(2603)",
            "reportDate": "2025-12-23",
            "timelineData": {
                "i": "2025-12-23",
                "k": "2026-02-23",
                "m": "2026-03-23",
                "q": "2027-11-23"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "30-3",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "LCS",
        "slatedXO": {
            "name": "26-3",
            "reportDate": "2029-03-26",
            "timelineData": {
                "i": "2029-03-26",
                "k": "2029-05-26",
                "m": "2029-06-26",
                "q": "2030-12-26"
            }
        }
    },
    {
        "id": "cmd_117",
        "name": "USS KINGSVILLE",
        "uic": "20265",
        "location": "San Diego, CA",
        "currentCO": {
            "name": "Mann, Ludwig (Lou) (CO)(COC TBD)",
            "prd": "Unknown",
            "timelineData": {
                "i": null,
                "k": null,
                "m": "2023-11-23",
                "q": "2025-04-01"
            }
        },
        "currentXO": {
            "name": "Kavanagh, John (XO/CO)",
            "prd": "2025-04-23",
            "timelineData": {
                "i": "2025-03-23",
                "k": "2025-04-23",
                "m": "2025-05-23",
                "q": "2026-12-23"
            }
        },
        "inboundXO": {
            "name": "Park, Aaron (24-4)",
            "reportDate": "2026-11-25",
            "timelineData": {
                "i": "2026-11-25",
                "k": "2026-12-25",
                "m": "2027-01-25",
                "q": "2028-07-25"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "29-3",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "LCS",
        "slatedXO": {
            "name": "26-1",
            "reportDate": "2028-05-25",
            "timelineData": {
                "i": "2028-05-25",
                "k": "2028-06-25",
                "m": "2028-07-25",
                "q": "2030-01-25"
            }
        }
    },
    {
        "id": "cmd_118",
        "name": "USS RUSHMORE",
        "uic": "21530",
        "location": "Sasebo, JP",
        "currentCO": {
            "name": "DINEEN MARTIN KEVIN JR",
            "prd": "2025-10-25",
            "timelineData": {
                "i": "2024-12-25",
                "k": "2025-11-25",
                "m": "2025-12-25",
                "q": "2027-06-25"
            }
        },
        "currentXO": {
            "name": "YOUNT BRET ALLEN",
            "prd": "2027-09-25",
            "timelineData": {
                "i": "2026-04-25",
                "k": "2027-10-25",
                "m": "2027-12-25",
                "q": "2029-06-25"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "27-3",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "LSD",
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "",
            "timelineData": {
                "i": "",
                "k": "",
                "m": "",
                "q": ""
            }
        }
    },
    {
        "id": "cmd_119",
        "name": "USS OAKLAND",
        "uic": "20168",
        "location": "Sasebo, JP",
        "currentCO": {
            "name": "Laidler, Andrew (SINGLE CREW) (CO JUL24)",
            "prd": "2023-03-01",
            "timelineData": {
                "i": "2023-02-01",
                "k": "2023-04-01",
                "m": "2023-05-01",
                "q": "2024-11-01"
            }
        },
        "currentXO": {
            "name": "Harris, Anthony (XO/CO) (COC OCT 24)",
            "prd": "2024-10-24",
            "timelineData": {
                "i": "2024-09-24",
                "k": "2024-10-24",
                "m": "2024-10-26",
                "q": "2026-07-24"
            }
        },
        "inboundXO": {
            "name": "Hurley, Nicholas (24-2)",
            "reportDate": "2026-04-25",
            "timelineData": {
                "i": "2026-04-25",
                "k": "2026-06-25",
                "m": "2026-07-25",
                "q": "2028-01-25"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "29-1",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "LCS",
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "OCT27",
            "timelineData": {
                "i": "OCT27",
                "k": "APR29",
                "m": "JUN29",
                "q": "DEC30"
            }
        }
    },
    {
        "id": "cmd_120",
        "name": "USS MOBILE",
        "uic": "20170",
        "location": "Sasebo, JP",
        "currentCO": {
            "name": "Shaw, Matt (XO/CO) / Gardner, Dave (hold)",
            "prd": "2023-06-01",
            "timelineData": {
                "i": "2023-05-01",
                "k": "2023-07-01",
                "m": "2023-08-01",
                "q": "2024-11-24"
            }
        },
        "currentXO": {
            "name": "Burtnerabt, Eric (XO/CO)",
            "prd": "2024-11-23",
            "timelineData": {
                "i": "2024-10-23",
                "k": "2024-11-23",
                "m": "2024-12-23",
                "q": "2026-07-23"
            }
        },
        "inboundXO": {
            "name": "Bingham, Andrew (XO/CO)",
            "reportDate": "2026-04-24",
            "timelineData": {
                "i": "2026-04-24",
                "k": "2026-06-24",
                "m": "2026-07-24",
                "q": "2028-01-24"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "30-3",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "LCS",
        "slatedXO": {
            "name": "26-4",
            "reportDate": "2029-03-27",
            "timelineData": {
                "i": "2029-03-27",
                "k": "2029-04-27",
                "m": "2029-05-27",
                "q": "2030-10-27"
            }
        }
    },
    {
        "id": "cmd_121",
        "name": "USS MILIUS",
        "uic": "21943",
        "location": "Yokosuka, JP",
        "currentCO": {
            "name": "TERJESEN STEVEN",
            "prd": "2024-11-01",
            "timelineData": {
                "i": "2023-09-01",
                "k": "2024-12-01",
                "m": "2025-01-01",
                "q": "2026-05-01"
            }
        },
        "currentXO": {
            "name": "VANHOOK GORDAN GRAHAM",
            "prd": "2025-12-24",
            "timelineData": {
                "i": "2024-07-24",
                "k": "2026-01-24",
                "m": "2026-05-24",
                "q": "2027-08-24"
            }
        },
        "inboundXO": {
            "name": "MARTIN PHILLIP DEJUAN",
            "reportDate": "2025-12-25",
            "timelineData": {
                "i": "2025-12-25",
                "k": "2027-06-25",
                "m": "2027-08-25",
                "q": "2029-02-25"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "28-4",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "DDG",
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "JUN27",
            "timelineData": {
                "i": "JUN27",
                "k": "DEC28",
                "m": "FEB29",
                "q": "AUG30"
            }
        }
    },
    {
        "id": "cmd_122",
        "name": "USS HIGGINS",
        "uic": "21950",
        "location": "Yokosuka, JP",
        "currentCO": {
            "name": "WHITE JORDAN RICHARD",
            "prd": "2025-07-23",
            "timelineData": {
                "i": "2024-07-23",
                "k": "2025-08-23",
                "m": "2025-09-23",
                "q": "2026-10-23"
            }
        },
        "currentXO": {
            "name": "BILLINGS JAMES CLINTON III",
            "prd": "2026-05-25",
            "timelineData": {
                "i": "2024-12-25",
                "k": "2026-06-25",
                "m": "2026-10-25",
                "q": "2028-03-25"
            }
        },
        "inboundXO": {
            "name": "HUNTLEY JACOB R",
            "reportDate": "2026-05-26",
            "timelineData": {
                "i": "2026-05-26",
                "k": "2028-01-26",
                "m": "2028-03-26",
                "q": "2029-09-26"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "29-1",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "DDG",
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "NOV27",
            "timelineData": {
                "i": "NOV27",
                "k": "MAY29",
                "m": "JUL29",
                "q": "JAN31"
            }
        }
    },
    {
        "id": "cmd_123",
        "name": "USS HOWARD",
        "uic": "22999",
        "location": "Yokosuka, JP",
        "currentCO": {
            "name": "HAYES CHRISTOPHER R",
            "prd": "Unknown",
            "timelineData": {
                "i": null,
                "k": null,
                "m": "2025-10-23",
                "q": "2027-01-25"
            }
        },
        "currentXO": {
            "name": "PARK JONATHAN",
            "prd": "2027-01-25",
            "timelineData": {
                "i": "2025-08-25",
                "k": "2027-02-25",
                "m": "2027-04-25",
                "q": "2028-10-25"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "29-4",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "DDG",
        "inboundXO": {
            "name": "LAVOIE PAUL RYAN",
            "reportDate": "FEB27"
        },
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "AUG28",
            "timelineData": {
                "i": "AUG28",
                "k": "FEB30",
                "m": "APR30",
                "q": "OCT31"
            }
        }
    },
    {
        "id": "cmd_124",
        "name": "USS PREBLE",
        "uic": "22996",
        "location": "Yokosuka, JP",
        "currentCO": {
            "name": "ARCHER PAUL A",
            "prd": "2024-05-27",
            "timelineData": {
                "i": "2023-03-27",
                "k": "2024-06-27",
                "m": "2024-08-27",
                "q": "2026-02-27"
            }
        },
        "currentXO": {
            "name": "VANN ANDREW DIGGS",
            "prd": "2025-10-24",
            "timelineData": {
                "i": "2024-06-24",
                "k": "2025-11-24",
                "m": "2026-02-24",
                "q": "2027-07-24"
            }
        },
        "inboundXO": {
            "name": "FORWARD DOUGLAS THEODORE",
            "reportDate": "2025-11-25",
            "timelineData": {
                "i": "2025-11-25",
                "k": "2027-05-25",
                "m": "2027-07-25",
                "q": "2029-01-25"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "28-3",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "DDG",
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "MAY27",
            "timelineData": {
                "i": "MAY27",
                "k": "NOV28",
                "m": "JAN29",
                "q": "JUL30"
            }
        }
    },
    {
        "id": "cmd_125",
        "name": "USS MUSTIN",
        "uic": "22997",
        "location": "Yokosuka, JP",
        "currentCO": {
            "name": "APPLEMAN CHRISTINA C",
            "prd": "2025-01-28",
            "timelineData": {
                "i": "2023-10-28",
                "k": "2025-02-28",
                "m": "2025-04-28",
                "q": "2026-10-28"
            }
        },
        "currentXO": {
            "name": "GILMAN RHETT NICHOLAS",
            "prd": "2026-08-29",
            "timelineData": {
                "i": "2025-03-29",
                "k": "2026-09-29",
                "m": "2026-11-29",
                "q": "2028-05-29"
            }
        },
        "inboundXO": {
            "name": "PEDROTTY DANIEL JOHN",
            "reportDate": "2026-08-02",
            "timelineData": {
                "i": "2026-08-02",
                "k": "2028-03-02",
                "m": "2028-05-02",
                "q": "2029-11-02"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "29-2",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "DDG",
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "FEB28",
            "timelineData": {
                "i": "FEB28",
                "k": "AUG29",
                "m": "OCT29",
                "q": "APR31"
            }
        }
    },
    {
        "id": "cmd_126",
        "name": "USS DEWEY",
        "uic": "23162",
        "location": "Yokosuka, JP",
        "currentCO": {
            "name": "DOBREV IVAN GEORGIEV",
            "prd": "2024-10-01",
            "timelineData": {
                "i": "2023-02-01",
                "k": "2024-11-01",
                "m": "2025-01-01",
                "q": "2027-01-01"
            }
        },
        "currentXO": {
            "name": "CALCAMUGGIO NATHANIEL CLIN",
            "prd": "2026-10-25",
            "timelineData": {
                "i": "2025-06-25",
                "k": "2026-11-25",
                "m": "2027-01-25",
                "q": "2028-07-25"
            }
        },
        "inboundXO": {
            "name": "SITGRAVES DAMON ARIMAS DUD",
            "reportDate": "2026-12-26",
            "timelineData": {
                "i": "2026-12-26",
                "k": "2028-06-26",
                "m": "2028-08-26",
                "q": "2030-02-26"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "29-4",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "DDG",
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "JUN28",
            "timelineData": {
                "i": "JUN28",
                "k": "DEC29",
                "m": "FEB30",
                "q": "AUG31"
            }
        }
    },
    {
        "id": "cmd_127",
        "name": "USS R JOHNSON",
        "uic": "50125",
        "location": "Yokosuka, JP",
        "currentCO": {
            "name": "CLARKSON ROBERT DONALD",
            "prd": "2025-09-01",
            "timelineData": {
                "i": "2024-05-01",
                "k": "2025-10-01",
                "m": "2025-12-01",
                "q": "2027-06-01"
            }
        },
        "currentXO": {
            "name": "CAMIOLO VERONICA A",
            "prd": "2027-03-25",
            "timelineData": {
                "i": "2025-10-25",
                "k": "2027-04-25",
                "m": "2027-06-25",
                "q": "2028-12-25"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "30-1",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "DDG",
        "inboundXO": {
            "name": "HORNE JOHN HARRISON",
            "reportDate": "APR27"
        },
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "OCT28",
            "timelineData": {
                "i": "OCT28",
                "k": "APR30",
                "m": "JUN30",
                "q": "DEC31"
            }
        }
    },
    {
        "id": "cmd_128",
        "name": "USS R PERALTA",
        "uic": "50126",
        "location": "Yokosuka, JP",
        "currentCO": {
            "name": "MASSEY CAMERON H",
            "prd": "2025-01-01",
            "timelineData": {
                "i": "2023-09-01",
                "k": "2025-02-01",
                "m": "2025-04-01",
                "q": "2026-10-01"
            }
        },
        "currentXO": {
            "name": "MCCULLOCH MEGAN LEA",
            "prd": "2026-07-01",
            "timelineData": {
                "i": "2025-03-01",
                "k": "2026-08-01",
                "m": "2026-10-01",
                "q": "2028-04-01"
            }
        },
        "inboundXO": {
            "name": "BRADLEY CHRISTOPHER P",
            "reportDate": "2026-08-02",
            "timelineData": {
                "i": "2026-08-02",
                "k": "2028-02-02",
                "m": "2028-04-02",
                "q": "2029-10-02"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "29-2",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "DDG",
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "FEB28",
            "timelineData": {
                "i": "FEB28",
                "k": "AUG29",
                "m": "OCT29",
                "q": "APR31"
            }
        }
    },
    {
        "id": "cmd_129",
        "name": "USS JOHN FINN",
        "uic": "20010",
        "location": "Yokosuka, JP",
        "currentCO": {
            "name": "Taylor, Earvin (COC 09DEC24)",
            "prd": "Unknown",
            "timelineData": {
                "i": null,
                "k": null,
                "m": null,
                "q": "2024-12-24"
            }
        },
        "currentXO": {
            "name": "ONEILL DANIEL J",
            "prd": "2024-09-01",
            "timelineData": {
                "i": "2023-09-01",
                "k": "2024-10-01",
                "m": "2024-11-01",
                "q": "2026-06-01"
            }
        },
        "inboundXO": {
            "name": "JOHNSON DRAONNE D",
            "reportDate": "2024-11-24",
            "timelineData": {
                "i": "2024-11-24",
                "k": "2026-04-24",
                "m": "2026-06-24",
                "q": "2027-12-24"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "27-3",
            "requirement": "XO"
        },
        "timeline": {
            "xoReport": "2024-01-01",
            "xoTurnover": "2025-06-01",
            "coc": "2025-07-01",
            "coTurnover": "2026-12-01"
        },
        "platform": "DDG",
        "slatedXO": {
            "name": "Forecast",
            "reportDate": "MAY26",
            "timelineData": {
                "i": "MAY26",
                "k": "NOV27",
                "m": "JAN28",
                "q": "JUL29"
            }
        }
    },
    {
        "id": "constitution_12",
        "name": "CONSTITUTION",
        "uic": "01024",
        "location": "Special Mission",
        "tags": [
            "CO-SM"
        ],
        "platform": "CO-SM",
        "currentCO": {
            "name": "Farrell, BJ",
            "prd": "2024-07-21",
            "timelineData": {
                "i": "2021-12-16",
                "k": "2021-12-16",
                "m": "2021-12-16",
                "q": "2024-07-21"
            }
        },
        "currentXO": {
            "name": "N/A",
            "prd": "N/A",
            "timelineData": {
                "i": "",
                "k": "",
                "m": "",
                "q": ""
            }
        },
        "inboundXO": {
            "name": "N/A",
            "reportDate": "",
            "timelineData": {
                "i": "",
                "k": "",
                "m": "",
                "q": ""
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "24-2",
            "requirement": "CO"
        },
        "timeline": {
            "xoReport": "",
            "xoTurnover": "",
            "coc": "2021-12-16",
            "coTurnover": "2024-07-21"
        },
        "slatedXO": {
            "name": "N/A",
            "reportDate": "",
            "timelineData": {
                "i": "",
                "k": "",
                "m": "",
                "q": ""
            }
        }
    },
    {
        "id": "aamdsromania_13",
        "name": "AAMDS ROMANIA",
        "uic": "50460",
        "location": "Special Mission",
        "tags": [
            "CO-SM"
        ],
        "platform": "CO-SM",
        "currentCO": {
            "name": "Gregory, Carleigh (25-1)",
            "prd": "2026-12-21",
            "timelineData": {
                "i": "2025-11-16",
                "k": "2025-11-16",
                "m": "2025-11-16",
                "q": "2026-12-21"
            }
        },
        "currentXO": {
            "name": "N/A",
            "prd": "N/A",
            "timelineData": {
                "i": "",
                "k": "",
                "m": "",
                "q": ""
            }
        },
        "inboundXO": {
            "name": "N/A",
            "reportDate": "",
            "timelineData": {
                "i": "",
                "k": "",
                "m": "",
                "q": ""
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "26-4",
            "requirement": "CO"
        },
        "timeline": {
            "xoReport": "",
            "xoTurnover": "",
            "coc": "2025-11-16",
            "coTurnover": "2026-12-21"
        },
        "slatedXO": {
            "name": "N/A",
            "reportDate": "",
            "timelineData": {
                "i": "",
                "k": "",
                "m": "",
                "q": ""
            }
        }
    },
    {
        "id": "aamdspoland_12",
        "name": "AAMDS POLAND",
        "uic": "50462",
        "location": "Special Mission",
        "tags": [
            "CO-SM"
        ],
        "platform": "CO-SM",
        "currentCO": {
            "name": "Cleveland, Andre",
            "prd": "2026-07-21",
            "timelineData": {
                "i": "2025-06-16",
                "k": "2025-06-16",
                "m": "2025-06-16",
                "q": "2026-07-21"
            }
        },
        "currentXO": {
            "name": "N/A",
            "prd": "N/A",
            "timelineData": {
                "i": "",
                "k": "",
                "m": "",
                "q": ""
            }
        },
        "inboundXO": {
            "name": "N/A",
            "reportDate": "",
            "timelineData": {
                "i": "",
                "k": "",
                "m": "",
                "q": ""
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "26-2",
            "requirement": "CO"
        },
        "timeline": {
            "xoReport": "",
            "xoTurnover": "",
            "coc": "2025-06-16",
            "coTurnover": "2026-07-21"
        },
        "slatedXO": {
            "name": "N/A",
            "reportDate": "",
            "timelineData": {
                "i": "",
                "k": "",
                "m": "",
                "q": ""
            }
        }
    },
    {
        "id": "atgpnw_7",
        "name": "ATG PNW",
        "uic": "31379",
        "location": "Special Mission",
        "tags": [
            "CO-SM"
        ],
        "platform": "CO-SM",
        "currentCO": {
            "name": "Collins, Ryan - retiring 2309",
            "prd": "2023-01-31",
            "timelineData": {
                "i": "2020-06-30",
                "k": "2020-06-30",
                "m": "2020-06-30",
                "q": "2023-01-31"
            }
        },
        "currentXO": {
            "name": "N/A",
            "prd": "N/A",
            "timelineData": {
                "i": "",
                "k": "",
                "m": "",
                "q": ""
            }
        },
        "inboundXO": {
            "name": "N/A",
            "reportDate": "",
            "timelineData": {
                "i": "",
                "k": "",
                "m": "",
                "q": ""
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "22-4",
            "requirement": "CO"
        },
        "timeline": {
            "xoReport": "",
            "xoTurnover": "",
            "coc": "2020-06-30",
            "coTurnover": "2023-01-31"
        },
        "slatedXO": {
            "name": "N/A",
            "reportDate": "",
            "timelineData": {
                "i": "",
                "k": "",
                "m": "",
                "q": ""
            }
        }
    },
    {
        "id": "cfachinhae_11",
        "name": "CFA CHINHAE",
        "uic": "32778",
        "location": "Special Mission",
        "tags": [
            "CO-SM"
        ],
        "platform": "CO-SM",
        "currentCO": {
            "name": "Rackauskas, Preston",
            "prd": "2023-12-22",
            "timelineData": {
                "i": "2020-02-29",
                "k": "2020-02-29",
                "m": "2020-02-29",
                "q": "2023-12-22"
            }
        },
        "currentXO": {
            "name": "N/A",
            "prd": "N/A",
            "timelineData": {
                "i": "",
                "k": "",
                "m": "",
                "q": ""
            }
        },
        "inboundXO": {
            "name": "N/A",
            "reportDate": "",
            "timelineData": {
                "i": "",
                "k": "",
                "m": "",
                "q": ""
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "23-4",
            "requirement": "CO"
        },
        "timeline": {
            "xoReport": "",
            "xoTurnover": "",
            "coc": "2020-02-29",
            "coTurnover": "2023-12-22"
        },
        "slatedXO": {
            "name": "N/A",
            "reportDate": "",
            "timelineData": {
                "i": "",
                "k": "",
                "m": "",
                "q": ""
            }
        }
    },
    {
        "id": "ssuguam_8",
        "name": "SSU GUAM",
        "uic": "40446",
        "location": "Special Mission",
        "tags": [
            "CO-SM"
        ],
        "platform": "CO-SM",
        "currentCO": {
            "name": "Medina, Gillian",
            "prd": "2022-06-30",
            "timelineData": {
                "i": "2020-06-30",
                "k": "2020-06-30",
                "m": "2020-06-30",
                "q": "2022-06-30"
            }
        },
        "currentXO": {
            "name": "N/A",
            "prd": "N/A",
            "timelineData": {
                "i": "",
                "k": "",
                "m": "",
                "q": ""
            }
        },
        "inboundXO": {
            "name": "N/A",
            "reportDate": "",
            "timelineData": {
                "i": "",
                "k": "",
                "m": "",
                "q": ""
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "22-2",
            "requirement": "CO"
        },
        "timeline": {
            "xoReport": "",
            "xoTurnover": "",
            "coc": "2020-06-30",
            "coTurnover": "2022-06-30"
        },
        "slatedXO": {
            "name": "N/A",
            "reportDate": "",
            "timelineData": {
                "i": "",
                "k": "",
                "m": "",
                "q": ""
            }
        }
    },
    {
        "id": "nbu7_5",
        "name": "NBU 7",
        "uic": "57078",
        "location": "Special Mission",
        "tags": [
            "CO-SM"
        ],
        "platform": "CO-SM",
        "currentCO": {
            "name": "DeLoach, Michael",
            "prd": "2027-02-23",
            "timelineData": {
                "i": "2025-08-23",
                "k": "2025-08-23",
                "m": "2025-08-23",
                "q": "2027-02-23"
            }
        },
        "currentXO": {
            "name": "N/A",
            "prd": "N/A",
            "timelineData": {
                "i": "",
                "k": "",
                "m": "",
                "q": ""
            }
        },
        "inboundXO": {
            "name": "N/A",
            "reportDate": "",
            "timelineData": {
                "i": "",
                "k": "",
                "m": "",
                "q": ""
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "26-4",
            "requirement": "CO"
        },
        "timeline": {
            "xoReport": "",
            "xoTurnover": "",
            "coc": "2025-08-23",
            "coTurnover": "2027-02-23"
        },
        "slatedXO": {
            "name": "N/A",
            "reportDate": "",
            "timelineData": {
                "i": "",
                "k": "",
                "m": "",
                "q": ""
            }
        }
    },
    {
        "id": "acu1_5",
        "name": "ACU 1",
        "uic": "55597",
        "location": "Special Mission",
        "tags": [
            "CO-SM"
        ],
        "platform": "CO-SM",
        "currentCO": {
            "name": "Blomberg, Martin ",
            "prd": "2026-09-22",
            "timelineData": {
                "i": "2025-04-22",
                "k": "2025-04-22",
                "m": "2025-04-22",
                "q": "2026-09-22"
            }
        },
        "currentXO": {
            "name": "N/A",
            "prd": "N/A",
            "timelineData": {
                "i": "",
                "k": "",
                "m": "",
                "q": ""
            }
        },
        "inboundXO": {
            "name": "N/A",
            "reportDate": "",
            "timelineData": {
                "i": "",
                "k": "",
                "m": "",
                "q": ""
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "26-3",
            "requirement": "CO"
        },
        "timeline": {
            "xoReport": "",
            "xoTurnover": "",
            "coc": "2025-04-22",
            "coTurnover": "2026-09-22"
        },
        "slatedXO": {
            "name": "N/A",
            "reportDate": "",
            "timelineData": {
                "i": "",
                "k": "",
                "m": "",
                "q": ""
            }
        }
    },
    {
        "id": "acu2_5",
        "name": "ACU 2",
        "uic": "53210",
        "location": "Special Mission",
        "tags": [
            "CO-SM"
        ],
        "platform": "CO-SM",
        "currentCO": {
            "name": "Reber, Terra",
            "prd": "2027-03-23",
            "timelineData": {
                "i": "2025-09-23",
                "k": "2025-09-23",
                "m": "2025-09-23",
                "q": "2027-03-23"
            }
        },
        "currentXO": {
            "name": "N/A",
            "prd": "N/A",
            "timelineData": {
                "i": "",
                "k": "",
                "m": "",
                "q": ""
            }
        },
        "inboundXO": {
            "name": "N/A",
            "reportDate": "",
            "timelineData": {
                "i": "",
                "k": "",
                "m": "",
                "q": ""
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "27-1",
            "requirement": "CO"
        },
        "timeline": {
            "xoReport": "",
            "xoTurnover": "",
            "coc": "2025-09-23",
            "coTurnover": "2027-03-23"
        },
        "slatedXO": {
            "name": "N/A",
            "reportDate": "",
            "timelineData": {
                "i": "",
                "k": "",
                "m": "",
                "q": ""
            }
        }
    },
    {
        "id": "bmu1_5",
        "name": "BMU 1",
        "uic": "53212",
        "location": "Special Mission",
        "tags": [
            "CO-SM"
        ],
        "platform": "CO-SM",
        "currentCO": {
            "name": "Morgan, Michelle",
            "prd": "1903-01-31",
            "timelineData": {
                "i": "1901-07-31",
                "k": "1901-07-31",
                "m": "1901-07-31",
                "q": "1903-01-31"
            }
        },
        "currentXO": {
            "name": "N/A",
            "prd": "N/A",
            "timelineData": {
                "i": "",
                "k": "",
                "m": "",
                "q": ""
            }
        },
        "inboundXO": {
            "name": "N/A",
            "reportDate": "",
            "timelineData": {
                "i": "",
                "k": "",
                "m": "",
                "q": ""
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "02-4",
            "requirement": "CO"
        },
        "timeline": {
            "xoReport": "",
            "xoTurnover": "",
            "coc": "1901-07-31",
            "coTurnover": "1903-01-31"
        },
        "slatedXO": {
            "name": "N/A",
            "reportDate": "",
            "timelineData": {
                "i": "",
                "k": "",
                "m": "",
                "q": ""
            }
        }
    },
    {
        "id": "bmu2_5",
        "name": "BMU 2",
        "uic": "53211",
        "location": "Special Mission",
        "tags": [
            "CO-SM"
        ],
        "platform": "CO-SM",
        "currentCO": {
            "name": "Atherton, Glenn",
            "prd": "2027-06-23",
            "timelineData": {
                "i": "2025-12-23",
                "k": "2025-12-23",
                "m": "2025-12-23",
                "q": "2027-06-23"
            }
        },
        "currentXO": {
            "name": "N/A",
            "prd": "N/A",
            "timelineData": {
                "i": "",
                "k": "",
                "m": "",
                "q": ""
            }
        },
        "inboundXO": {
            "name": "N/A",
            "reportDate": "",
            "timelineData": {
                "i": "",
                "k": "",
                "m": "",
                "q": ""
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "27-2",
            "requirement": "CO"
        },
        "timeline": {
            "xoReport": "",
            "xoTurnover": "",
            "coc": "2025-12-23",
            "coTurnover": "2027-06-23"
        },
        "slatedXO": {
            "name": "N/A",
            "reportDate": "",
            "timelineData": {
                "i": "",
                "k": "",
                "m": "",
                "q": ""
            }
        }
    },
    {
        "id": "msron2_7",
        "name": "MSRON 2",
        "uic": "3371B",
        "location": "Special Mission",
        "tags": [
            "CO-SM"
        ],
        "platform": "CO-SM",
        "currentCO": {
            "name": "Vitollo, Joey",
            "prd": "2024-11-23",
            "timelineData": {
                "i": "2023-08-22",
                "k": "2023-08-22",
                "m": "2023-08-22",
                "q": "2024-11-23"
            }
        },
        "currentXO": {
            "name": "N/A",
            "prd": "N/A",
            "timelineData": {
                "i": "",
                "k": "",
                "m": "",
                "q": ""
            }
        },
        "inboundXO": {
            "name": "N/A",
            "reportDate": "",
            "timelineData": {
                "i": "",
                "k": "",
                "m": "",
                "q": ""
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "24-3",
            "requirement": "CO"
        },
        "timeline": {
            "xoReport": "",
            "xoTurnover": "",
            "coc": "2023-08-22",
            "coTurnover": "2024-11-23"
        },
        "slatedXO": {
            "name": "N/A",
            "reportDate": "",
            "timelineData": {
                "i": "",
                "k": "",
                "m": "",
                "q": ""
            }
        }
    },
    {
        "id": "msron3_7",
        "name": "MSRON 3",
        "uic": "3349A",
        "location": "Special Mission",
        "tags": [
            "CO-SM"
        ],
        "platform": "CO-SM",
        "currentCO": {
            "name": "Armstrong, Alyssa",
            "prd": "2026-08-31",
            "timelineData": {
                "i": "2025-02-28",
                "k": "2025-02-28",
                "m": "2025-02-28",
                "q": "2026-08-31"
            }
        },
        "currentXO": {
            "name": "N/A",
            "prd": "N/A",
            "timelineData": {
                "i": "",
                "k": "",
                "m": "",
                "q": ""
            }
        },
        "inboundXO": {
            "name": "N/A",
            "reportDate": "",
            "timelineData": {
                "i": "",
                "k": "",
                "m": "",
                "q": ""
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "26-2",
            "requirement": "CO"
        },
        "timeline": {
            "xoReport": "",
            "xoTurnover": "",
            "coc": "2025-02-28",
            "coTurnover": "2026-08-31"
        },
        "slatedXO": {
            "name": "N/A",
            "reportDate": "",
            "timelineData": {
                "i": "",
                "k": "",
                "m": "",
                "q": ""
            }
        }
    },
    {
        "id": "msron4_7",
        "name": "MSRON 4",
        "uic": "30671",
        "location": "Special Mission",
        "tags": [
            "CO-SM"
        ],
        "platform": "CO-SM",
        "currentCO": {
            "name": "Ciullo, Daniel",
            "prd": "2027-01-23",
            "timelineData": {
                "i": "2025-07-23",
                "k": "2025-07-23",
                "m": "2025-07-23",
                "q": "2027-01-23"
            }
        },
        "currentXO": {
            "name": "N/A",
            "prd": "N/A",
            "timelineData": {
                "i": "",
                "k": "",
                "m": "",
                "q": ""
            }
        },
        "inboundXO": {
            "name": "N/A",
            "reportDate": "",
            "timelineData": {
                "i": "",
                "k": "",
                "m": "",
                "q": ""
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "26-4",
            "requirement": "CO"
        },
        "timeline": {
            "xoReport": "",
            "xoTurnover": "",
            "coc": "2025-07-23",
            "coTurnover": "2027-01-23"
        },
        "slatedXO": {
            "name": "N/A",
            "reportDate": "",
            "timelineData": {
                "i": "",
                "k": "",
                "m": "",
                "q": ""
            }
        }
    },
    {
        "id": "usvron1_8",
        "name": "USVRON 1",
        "uic": "0101E XO/CO",
        "location": "Special Mission",
        "tags": [
            "CO-SM"
        ],
        "platform": "CO-SM",
        "currentCO": {
            "name": "Boston, Timothy",
            "prd": "2027-01-22",
            "timelineData": {
                "i": "2025-07-22",
                "k": "2025-07-22",
                "m": "2025-07-22",
                "q": "2027-01-22"
            }
        },
        "currentXO": {
            "name": "N/A",
            "prd": "N/A",
            "timelineData": {
                "i": "",
                "k": "",
                "m": "",
                "q": ""
            }
        },
        "inboundXO": {
            "name": "N/A",
            "reportDate": "",
            "timelineData": {
                "i": "",
                "k": "",
                "m": "",
                "q": ""
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "26-4",
            "requirement": "CO"
        },
        "timeline": {
            "xoReport": "",
            "xoTurnover": "",
            "coc": "2025-07-22",
            "coTurnover": "2027-01-22"
        },
        "slatedXO": {
            "name": "N/A",
            "reportDate": "",
            "timelineData": {
                "i": "",
                "k": "",
                "m": "",
                "q": ""
            }
        }
    },
    {
        "id": "usvron3_8",
        "name": "USVRON 3",
        "uic": "SDGO Sequential Post Afloat Command",
        "location": "Special Mission",
        "tags": [
            "CO-SM"
        ],
        "platform": "CO-SM",
        "currentCO": {
            "name": "Martinez, Matthew G",
            "prd": "2027-06-23",
            "timelineData": {
                "i": "2025-12-23",
                "k": "2025-12-23",
                "m": "2025-12-23",
                "q": "2027-06-23"
            }
        },
        "currentXO": {
            "name": "N/A",
            "prd": "N/A",
            "timelineData": {
                "i": "",
                "k": "",
                "m": "",
                "q": ""
            }
        },
        "inboundXO": {
            "name": "N/A",
            "reportDate": "",
            "timelineData": {
                "i": "",
                "k": "",
                "m": "",
                "q": ""
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "27-2",
            "requirement": "CO"
        },
        "timeline": {
            "xoReport": "",
            "xoTurnover": "",
            "coc": "2025-12-23",
            "coTurnover": "2027-06-23"
        },
        "slatedXO": {
            "name": "N/A",
            "reportDate": "",
            "timelineData": {
                "i": "",
                "k": "",
                "m": "",
                "q": ""
            }
        }
    },
    {
        "id": "usvron7_8",
        "name": "USVRON 7",
        "uic": "SDGO CO",
        "location": "Special Mission",
        "tags": [
            "CO-SM"
        ],
        "platform": "CO-SM",
        "currentCO": {
            "name": "Martinez, Matthew G",
            "prd": "2028-03-23",
            "timelineData": {
                "i": "2026-09-23",
                "k": "2026-09-23",
                "m": "2026-09-23",
                "q": "2028-03-23"
            }
        },
        "currentXO": {
            "name": "N/A",
            "prd": "N/A",
            "timelineData": {
                "i": "",
                "k": "",
                "m": "",
                "q": ""
            }
        },
        "inboundXO": {
            "name": "N/A",
            "reportDate": "",
            "timelineData": {
                "i": "",
                "k": "",
                "m": "",
                "q": ""
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "28-1",
            "requirement": "CO"
        },
        "timeline": {
            "xoReport": "",
            "xoTurnover": "",
            "coc": "2026-09-23",
            "coTurnover": "2028-03-23"
        },
        "slatedXO": {
            "name": "N/A",
            "reportDate": "",
            "timelineData": {
                "i": "",
                "k": "",
                "m": "",
                "q": ""
            }
        }
    },
    {
        "id": "navsupactcrane_15",
        "name": "NAVSUPACT CRANE",
        "uic": "3 YEAR CO ONLY",
        "location": "Special Mission",
        "tags": [
            "CO-SM"
        ],
        "platform": "CO-SM",
        "currentCO": {
            "name": "1320 MARTINEZ, LUIS (RETIRING)",
            "prd": "2026-06-21",
            "timelineData": {
                "i": "2023-05-16",
                "k": "2023-05-16",
                "m": "2023-05-16",
                "q": "2026-06-21"
            }
        },
        "currentXO": {
            "name": "N/A",
            "prd": "N/A",
            "timelineData": {
                "i": "",
                "k": "",
                "m": "",
                "q": ""
            }
        },
        "inboundXO": {
            "name": "N/A",
            "reportDate": "",
            "timelineData": {
                "i": "",
                "k": "",
                "m": "",
                "q": ""
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "26-2",
            "requirement": "CO"
        },
        "timeline": {
            "xoReport": "",
            "xoTurnover": "",
            "coc": "2023-05-16",
            "coTurnover": "2026-06-21"
        },
        "slatedXO": {
            "name": "N/A",
            "reportDate": "",
            "timelineData": {
                "i": "",
                "k": "",
                "m": "",
                "q": ""
            }
        }
    },
    {
        "id": "charlestonbrig_15",
        "name": "Charleston BRIG",
        "uic": "45610",
        "location": "Special Mission",
        "tags": [
            "CO-SM"
        ],
        "platform": "CO-SM",
        "currentCO": {
            "name": "Howard, Kevin (1310)",
            "prd": "2028-07-23",
            "timelineData": {
                "i": "2027-01-23",
                "k": "2027-01-23",
                "m": "2027-01-23",
                "q": "2028-07-23"
            }
        },
        "currentXO": {
            "name": "N/A",
            "prd": "N/A",
            "timelineData": {
                "i": "",
                "k": "",
                "m": "",
                "q": ""
            }
        },
        "inboundXO": {
            "name": "N/A",
            "reportDate": "",
            "timelineData": {
                "i": "",
                "k": "",
                "m": "",
                "q": ""
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "28-2",
            "requirement": "CO"
        },
        "timeline": {
            "xoReport": "",
            "xoTurnover": "",
            "coc": "2027-01-23",
            "coTurnover": "2028-07-23"
        },
        "slatedXO": {
            "name": "N/A",
            "reportDate": "",
            "timelineData": {
                "i": "",
                "k": "",
                "m": "",
                "q": ""
            }
        }
    },
    {
        "id": "scstcwestpac_13",
        "name": "SCSTC WESTPAC",
        "uic": "49017",
        "location": "Special Mission",
        "tags": [
            "CO-SM"
        ],
        "platform": "CO-SM",
        "currentCO": {
            "name": "LEE HUNGCHI (6180)",
            "prd": "2027-04-21",
            "timelineData": {
                "i": "2024-04-16",
                "k": "2024-04-16",
                "m": "2024-04-16",
                "q": "2027-04-21"
            }
        },
        "currentXO": {
            "name": "N/A",
            "prd": "N/A",
            "timelineData": {
                "i": "",
                "k": "",
                "m": "",
                "q": ""
            }
        },
        "inboundXO": {
            "name": "N/A",
            "reportDate": "",
            "timelineData": {
                "i": "",
                "k": "",
                "m": "",
                "q": ""
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "27-1",
            "requirement": "CO"
        },
        "timeline": {
            "xoReport": "",
            "xoTurnover": "",
            "coc": "2024-04-16",
            "coTurnover": "2027-04-21"
        },
        "slatedXO": {
            "name": "N/A",
            "reportDate": "",
            "timelineData": {
                "i": "",
                "k": "",
                "m": "",
                "q": ""
            }
        }
    }
]