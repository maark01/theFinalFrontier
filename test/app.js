// tömb és object összehasonlítás

let apiAgency = [
    {
        id: 1,
        name: "National Aeronautics and Space Administration",
        abbrev: "NASA",
        founding_year: 1958
    },
    {
        id: 2,
        name: "Russian Federal Space Agency (ROSCOSMOS)",
        abbrev: "ROSCOSMOS",
        founding_year: 1992
    },
    {
        id: 3,
        name: "Japan Aerospace Exploration Agency",
        abbrev: "JAXA",
        founding_year: 2001
    }
]

let dbAgency = [
    {
        id: 1,
        name: "National Aeronautics and Space Administration",
        abbrev: "NASA",
        founding_year: 0
    },
    {
        id: 2,
        name: "Russian Federal Space Agency (ROSCOSMOS)",
        abbrev: "ROSCOSMOS",
        founding_year: 0
    },
    {
        id: 3,
        name: "Japan Aerospace Exploration Agency",
        abbrev: "JAXA",
        founding_year: 0
    }
]


dbAgency = dbAgency.map(dbObj => {
    let apiObj = apiAgency.find(apiObj => apiObj.id === dbObj.id)
    if (apiObj) {
        for (let key in dbObj) {
            if ((dbObj[key] === null || dbObj[key] === 0) && apiObj[key] !== undefined) {
                dbObj[key] = apiObj[key]
            }
        }
    }
    return dbObj
})

console.log(dbAgency)

