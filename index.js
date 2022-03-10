let UniversitiesLoader = require('./services/universities-loader/UniversitiesLoader')
let Odm = require('./model/Odm')
let Routes = require('./routes/Routes')

const start = async () => {
    initializeDependencies()
    await hydrateDbWithApiData()
    await initializeServer()
}

const initializeDependencies = () => {
    Odm = new Odm()
    UniversitiesLoader = new UniversitiesLoader()
    Routes = new Routes()
}

const hydrateDbWithApiData = async () => {
    await Odm.initializeDb()
    if(await Odm.alreadyHydrated()) return
    console.log('[INFO] first time runnig server, please await database be hydrated with universities data...')
    try{
        const universities = await UniversitiesLoader.getUniversitiesFromApi()
        await Odm.insertMany(universities)
    }catch(error){
        console.log('[ERROR] Error Ocourred trying hydrate database')
        throw error
    }
    console.log('[INFO] Database hydrated sucessfully')
}

const initializeServer = async () => {
    Routes.initializeServer(await Odm.getModel())
}

start()