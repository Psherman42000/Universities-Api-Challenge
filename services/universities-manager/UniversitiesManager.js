'use strict'

module.exports = class UniversitiesManager {
  constructor(model) {
    this._model = model
  }

  getUniversities = async ({ country, allRegistries, page = 0, registriesPerPage = 20 }) => {
    const {offset, limit} = this._getPaginationParams({page, registriesPerPage, allRegistries})
    if(country) return this._getUniversitiesFromCountry({ country, offset, limit })
    const queryResult = await this._model.find({}).skip(offset).limit(limit)
    return queryResult.map(university => {
      return this._getDataTransferObject(university)
    })
  }
  
  _getPaginationParams = ({page, registriesPerPage, allRegistries}) => {
    let offset
    let limit
    if(allRegistries){
      offset = 0
      limit = 0
    }else{
      offset = Number(page * registriesPerPage)
      limit = Number(registriesPerPage) > 20 ? 20 : Number(registriesPerPage)
    }
    return {offset, limit}
  }

  _getUniversitiesFromCountry = async ({ country, offset, limit }) => {
    const queryResult = await this._model.find(this._getInsensitiveQuery(country)).skip(offset).limit(limit)
    if(result.length === 0) return {info: '0 Documents finded for this country'}
    return queryResult.map(university => {
      return this._getDataTransferObject(university)
    })
  }

  _getInsensitiveQuery = (param) => ({
    country: {
      "$regex": param,
      "$options": "i"
    }
  })

  _getDataTransferObject = (university) => {
    const dataTransferObject = {
      _id: university._id,
      nome: university.name,
      pais: university.country,
      estado: university['state-province']
    }
    return dataTransferObject
  }

  getUniversitieById = async (id) => {
    const result = await this._model.find({_id: id})
    if(result.length === 0) return {info: '0 Documents finded for this ID'}
    return result[0]
  }

  deleteUniversity = async (id) => {
    const result = await this._model.findByIdAndDelete(id)
    return result ? {success: true} : {info: '0 Documents finded for this ID'}
  }

  createUniversity = async ({desiredObj}) => {
    if(await this._universityAlreadyExists(desiredObj)) return {error: 'University already exists'}
    const result = await this._model.create(desiredObj)
    return result ? {success: true} : {Error: 'Error trying create university'}
  }

  _universityAlreadyExists = async (desiredObj) => {
    const result = await this._model.find(this._getMultifieldInsensitiveQuery(desiredObj))
    if(result.length === 0) return false
    return true
  }

  _getMultifieldInsensitiveQuery = (desiredObj) => ({
    name: {
      "$regex": desiredObj.name,
      "$options": "i"
    },
    country: {
      "$regex": desiredObj.country,
      "$options": "i"
    },
    'state-province': desiredObj['state-province'] ? 
    {
      "$regex": desiredObj['state-province'],
      "$options": "i"
    } :
    desiredObj['state-province']
  })

  updateUniversity = async ({id, receivedObj}) => {
    const {web_pages, name, domains} = receivedObj
    const result = await this._model.findByIdAndUpdate(id, {web_pages, name, domains})
    return result ? {success: true} : {info: '0 Documents finded for this ID'}
  }
}