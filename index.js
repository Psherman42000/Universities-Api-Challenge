const UniversitiesPiker = new require('./controllers/universities-piker/UniversitiesPiker')
const Odm = new require('./model/Odm')

const start = async () => {
    await hydrateDbWithApiData()
}

const hydrateDbWithApiData = async () => {
    if(await Odm.alreadyHydrated()) return
    
}