const UniversitiesPiker = new require('./controllers/universities-piker/UniversitiesPiker')
const Odm = new require('./model/Odm')

const start = async () => {
    await hydrateDbWithApiData()
}

const hydrateDbWithApiData = async () => {
    if(await Odm.alreadyHydrated()) return
    const universities = await UniversitiesPiker.getUniversitiesFromApi()
    return await Promise.all(universities.map(async (university) => {
        await Odm.crate(university)
    }))
}