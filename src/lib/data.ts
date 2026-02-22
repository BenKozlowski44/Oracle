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
                "status": "Draft"
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
        "id": "harringtonbrianmichael_24",
        "rank": "CDR",
        "name": "HARRINGTON BRIAN MICHAEL",
        "designator": "1110",
        "currentCommand": "MOC FLT FORCES",
        "prd": "2024-11-01",
        "preferences": [],
        "status": "FF (EAST COAST)",
        "notes": "",
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
        "status": "Hold",
        "notes": "",
        "yearGroup": 20090,
        "billet": "STF REDI GEN",
        "csr": "6AGAZ",
        "assignedSlate": "3rd Look CO Afloat",
        "preferredLocations": [],
        "preferredPlatforms": [],
        "preferencePriority": null
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
        "status": "Ready FF",
        "notes": "",
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
        "status": "Ready FF",
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
        "status": "Ready FF",
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
        "status": "Ready FF",
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
        "status": "FF (SDGO/Pearl/YOKO/ROTA)",
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
        "status": "FF (YOKO)",
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
        "status": "Ready FF",
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
        "status": "Ready FF",
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
        "status": "Ready FF",
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
        "status": "FF (NORFOLK DDG)",
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
        "status": "Ready FF",
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
        "status": "FF (SDGO over another)",
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
        "status": "Ready FF",
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
        "status": "FF (Everett)",
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
            "name": "Wang, Nellie (CHS single crew CO)(COC NOV24)",
            "prd": "2022-12-01",
            "timelineData": {
                "i": "2022-11-01",
                "k": "2023-01-01",
                "m": "2023-02-23",
                "q": "2024-11-24"
            }
        },
        "currentXO": {
            "name": "Gray, Meghan (XO/CO) (CHS single crew XO/CO)",
            "prd": "2024-05-22",
            "timelineData": {
                "i": "2024-04-22",
                "k": "2024-06-22",
                "m": "2024-11-24",
                "q": "2026-05-26"
            }
        },
        "inboundXO": {
            "name": "Hooge, Daniel (XO/CO) (CHS single crew PXO)(SEP24)",
            "reportDate": "2026-02-24",
            "timelineData": {
                "i": "2026-02-24",
                "k": "2026-04-24",
                "m": "2026-05-24",
                "q": "2027-11-24"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "26-2",
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
            "targetBoardDate": "26-2",
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
            "targetBoardDate": "26-1 Don't need",
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
            "targetBoardDate": "27-2",
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
                "q": "JUL26"
            }
        },
        "currentXO": {
            "name": "SULLIVAN KYLE A",
            "prd": "2026-02-01",
            "timelineData": {
                "i": "2024-09-01",
                "k": "MAY26",
                "m": "JUL26",
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
            "targetBoardDate": "26-3",
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
            "pco": false,
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
            "targetBoardDate": "26-3",
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
            "name": "Robertson, Jeremy",
            "prd": "Unknown",
            "timelineData": {
                "i": null,
                "k": null,
                "m": "2023-02-23",
                "q": "2024-09-24"
            }
        },
        "currentXO": {
            "name": "LIND MYRON E",
            "prd": "2024-06-23",
            "timelineData": {
                "i": "2023-03-23",
                "k": "2024-07-23",
                "m": "2024-09-23",
                "q": "2026-05-23"
            }
        },
        "inboundXO": {
            "name": "MAKARENKO MEAGAN B",
            "reportDate": "2024-08-24",
            "timelineData": {
                "i": "2024-08-24",
                "k": "2026-04-24",
                "m": "2026-05-24",
                "q": "2027-11-24"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "26-3",
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
            "targetBoardDate": "26-4 (Hansberry, Mark)",
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
            "targetBoardDate": "26-3",
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
            "targetBoardDate": "26-1",
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
            "targetBoardDate": "28-2 (BARKSDALE JAMES EDWARD JR)",
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
            "targetBoardDate": "26-4 (Van Winter, Robert)",
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
            "name": "Ringo, Brett",
            "prd": "Unknown",
            "timelineData": {
                "i": null,
                "k": null,
                "m": null,
                "q": "2024-05-24"
            }
        },
        "currentXO": {
            "name": "SNOVER TRAVIS MICHAEL",
            "prd": "2025-01-23",
            "timelineData": {
                "i": "2023-08-23",
                "k": "2025-02-23",
                "m": "2025-05-23",
                "q": "2026-11-23"
            }
        },
        "inboundXO": {
            "name": "DUNN RICHARD THOMAS",
            "reportDate": "2025-03-25",
            "timelineData": {
                "i": "2025-03-25",
                "k": "2026-08-25",
                "m": "2026-10-25",
                "q": "2028-04-25"
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
            "name": "MURRAY WILLIAM K",
            "reportDate": "2026-09-23",
            "timelineData": {
                "i": "2026-09-23",
                "k": "2028-03-23",
                "m": "2028-05-23",
                "q": "2029-11-23"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "26-2",
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
            "targetBoardDate": "26-4",
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
            "name": "Neff, Justin (CO) (COC NOV 24)",
            "prd": "Unknown",
            "timelineData": {
                "i": null,
                "k": null,
                "m": "2023-04-23",
                "q": "2024-11-23"
            }
        },
        "currentXO": {
            "name": "Kemmitz, Bryan (XO-A)",
            "prd": "2023-09-01",
            "timelineData": {
                "i": "2022-04-01",
                "k": "2023-10-01",
                "m": "2023-12-01",
                "q": "2025-06-01"
            }
        },
        "inboundXO": {
            "name": "FRESSE STEVEN",
            "reportDate": "2023-04-23",
            "timelineData": {
                "i": "2023-04-23",
                "k": "2024-10-23",
                "m": "2024-11-23",
                "q": "2026-04-23"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "26-3",
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
            "targetBoardDate": "26-2",
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
            "targetBoardDate": "27-2",
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
            "targetBoardDate": "26-3",
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
            "name": "Bell, Timothy",
            "reportDate": "2024-09-24",
            "timelineData": {
                "i": "2024-09-24",
                "k": "2026-03-24",
                "m": "2026-05-24",
                "q": "2027-11-24"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "26-1",
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
            "targetBoardDate": "25-3",
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
            "targetBoardDate": "26-4",
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
            "targetBoardDate": "26-4",
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
            "targetBoardDate": "26-3",
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
            "targetBoardDate": "26-3",
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
            "targetBoardDate": "26-2  VANSICE KARA",
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
            "targetBoardDate": "27-1 (MOTEN ELIZABETH CATHERINE)",
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
            "name": "KOFFI JAMESROBERT CABRAL",
            "prd": "2024-10-01",
            "timelineData": {
                "i": "2023-11-01",
                "k": "2024-11-01",
                "m": "2024-12-01",
                "q": "2026-05-01"
            }
        },
        "currentXO": {
            "name": "TORNAMBE GREGORY",
            "prd": "2026-02-25",
            "timelineData": {
                "i": "2025-01-25",
                "k": "2026-03-25",
                "m": "2026-04-25",
                "q": "2027-10-25"
            }
        },
        "inboundXO": {
            "name": "SHOWANES JAMES BERNARD",
            "reportDate": "2024-12-24",
            "timelineData": {
                "i": "2024-12-24",
                "k": "2026-04-24",
                "m": "2026-05-24",
                "q": "2028-05-24"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "26-3",
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
        }
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
            "targetBoardDate": "27-1 (KOZLOWSKI BENJAMIN WARD)",
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
            "targetBoardDate": "28-3 (Fontana, Vince)",
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
            "targetBoardDate": "25-4",
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
            "targetBoardDate": "27-2",
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
            "targetBoardDate": "26-2",
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
            "targetBoardDate": "26-3",
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
            "targetBoardDate": "26-3",
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
            "targetBoardDate": "26-2",
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
            "targetBoardDate": "",
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
            "targetBoardDate": "28-1",
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
            "targetBoardDate": "XO-A",
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
            "targetBoardDate": "26-4",
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
            "targetBoardDate": "26-3",
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
            "targetBoardDate": "27-2 (Bonsall, Nick)",
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
            "targetBoardDate": "26-2",
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
            "targetBoardDate": "26-3 (Pounders, Ryan)",
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
            "targetBoardDate": "26-3",
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
            "targetBoardDate": "26-4",
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
            "targetBoardDate": "26-3",
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
            "targetBoardDate": "26-2",
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
            "targetBoardDate": "26-4",
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
            "targetBoardDate": "26-3",
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
            "name": "Johnson, Lauren",
            "prd": "2023-05-01",
            "timelineData": {
                "i": "2021-11-01",
                "k": "2023-06-01",
                "m": "2023-08-01",
                "q": "2025-02-01"
            }
        },
        "currentXO": {
            "name": "BECKELHYMER JACOB TITUS",
            "prd": "2024-11-01",
            "timelineData": {
                "i": "2023-06-01",
                "k": "2024-12-01",
                "m": "2025-02-01",
                "q": "2026-07-01"
            }
        },
        "inboundXO": {
            "name": "MOORE CARISSA DANIELLE",
            "reportDate": "2024-12-24",
            "timelineData": {
                "i": "2024-12-24",
                "k": "2026-05-24",
                "m": "2026-07-24",
                "q": "2028-01-24"
            }
        },
        "nextSlateParams": {
            "targetBoardDate": "28-1 (Settle, Darren)",
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
            "targetBoardDate": "27-2 (Clark, Matthew)",
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
            "targetBoardDate": "26-3",
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
            "targetBoardDate": "27-2",
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
            "targetBoardDate": "26-2",
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
            "targetBoardDate": "26-2",
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
            "targetBoardDate": "26-2",
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
            "targetBoardDate": "27-1",
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
            "targetBoardDate": "26-4",
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
            "targetBoardDate": "26-2",
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
            "targetBoardDate": "26-2",
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
            "targetBoardDate": "26-2",
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
            "targetBoardDate": "26-2",
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
            "targetBoardDate": "27-2",
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
            "targetBoardDate": "26-2",
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
            "targetBoardDate": "26-3",
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
            "targetBoardDate": "26-1",
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
            "targetBoardDate": "26-3",
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
            "targetBoardDate": "26-4",
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
            "targetBoardDate": "26-2",
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
            "targetBoardDate": "26-4",
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
            "targetBoardDate": "26-2",
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
            "targetBoardDate": "26-3 (Turner, Travis)",
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
            "targetBoardDate": "TBD",
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
            "targetBoardDate": "TBD",
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
            "targetBoardDate": "TBD",
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
            "targetBoardDate": "TBD",
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
            "targetBoardDate": "TBD",
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
            "targetBoardDate": "TBD",
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
            "targetBoardDate": "TBD",
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
            "targetBoardDate": "TBD",
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
            "targetBoardDate": "TBD",
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
            "targetBoardDate": "TBD",
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
            "targetBoardDate": "TBD",
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
            "targetBoardDate": "TBD",
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
            "targetBoardDate": "TBD",
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
            "targetBoardDate": "TBD",
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
            "targetBoardDate": "TBD",
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
            "targetBoardDate": "TBD",
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
            "targetBoardDate": "TBD",
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
            "targetBoardDate": "TBD",
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
            "targetBoardDate": "TBD",
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
            "targetBoardDate": "TBD",
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