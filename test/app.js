// tömb és object összehasonlítás

let astronauts = {
    "results": [
        {
            "id": 798,
            "url": "https://ll.thespacedevs.com/2.3.0/astronauts/798/",
            "name": "Jameel Janjua",
            "status": {
                "id": 1,
                "name": "Active"
            },
            "agency": null,
            "image": null,
        },
        , {
            "id": 732,
            "url": "https://ll.thespacedevs.com/2.3.0/astronauts/732/",
            "name": "Andrei Fedyaev",
            "status": {
                "id": 1,
                "name": "Active"
            },
            "agency": {
                "response_mode": "list",
                "id": 63,
                "url": "https://ll.thespacedevs.com/2.3.0/agencies/63/",
                "name": "Russian Federal Space Agency (ROSCOSMOS)",
                "abbrev": "RFSA",
                "type": {
                    "id": 1,
                    "name": "Government"
                }
            },
            "image": {
                "id": 646,
                "name": "[AUTO] Andrei Fedyaev - image",
                "image_url": "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/images/andrei_fedyaev_image_20230207203113.jpg",
                "thumbnail_url": "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/images/255bauto255d__image_thumbnail_20240305190412.jpeg",
                "credit": null,
                "license": {
                    "id": 1,
                    "name": "Unknown",
                    "priority": 9,
                    "link": null
                },
                "single_use": true,
                "variants": []
            }
        }
    ]
}

const astronautList = astronauts.results.filter(e => e.agency !== null).map(astronaut => console.log(astronaut))































/*
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

*/