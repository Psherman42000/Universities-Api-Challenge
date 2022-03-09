let UniversitiesPiker = require('./controllers/universities-piker/UniversitiesPiker')
let Odm = require('./model/Odm')

const start = async () => {
    initializeDependencies()
    await hydrateDbWithApiData()
}

initializeDependencies = () => {
    Odm = new Odm()
    UniversitiesPiker = new UniversitiesPiker()
}

const hydrateDbWithApiData = async () => {
    await Odm.initializeDb()
    if(await Odm.alreadyHydrated()) return
    console.log('[INFO] first time runnig server, hydrating database with universities data...')
    try{
        const universities = await UniversitiesPiker.getUniversitiesFromApi()
        await Odm.insertMany(universities)
    }catch(error){
        console.log('[ERROR] Error Ocourred trying hydrate database')
        throw error
    }
    console.log('[INFO] Database hydrated sucessfully')
}

start()