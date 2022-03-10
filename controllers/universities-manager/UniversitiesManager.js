'use strict'

module.exports = class UniversitiesManager {
  constructor(model) {
    this._model = model
  }

  getUniversitiesFromCountry = async ({ country, allRecords }) => {
    let queryResult
    if(allRecords)
      queryResult = await this._model.find(this._getInsensitiveQuery(country))
    else
      queryResult = await this._model.find(this._getInsensitiveQuery(country)).limit(20)
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

  getUniversities = async ({ allRecords }) => {
    let queryResult
    if(allRecords)
      queryResult = await this._model.find({})
    else
      queryResult = await this._model.find({}).limit(20)
    return queryResult.map(university => {
      return this._getDataTransferObject(university)
    })
  }

  getUniversitieById = async (id) => {
    const result = await this._model.find({_id: id})
    if(result.length === 0) return {info: '0 Documents finded for this ID'}
    return this._getDataTransferObject(result[0])
  }
}