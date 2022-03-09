'use strict'

module.exports = class UniversitiesManager {
  constructor(model) {
    this._model = model
  }

  getUniversitiesFromCountry = async ({ country, allRecords }) => {
    let queryResult
    if(allRecords)
      queryResult = await this._model.find({country})
    else
      queryResult = await this._model.find({country}).limit(20)
    return queryResult.map(university => {
      const dataTransferObject = {
        _id: university._id,
        nome: university.name,
        pais: university.country,
        estado: university['state-province']
      }
      return dataTransferObject
    })
  }

  getUniversities = async () => {
    let queryResult = await this._model.find({}).limit(20)
    return queryResult.map(university => {
      const dataTransferObject = {
        _id: university._id,
        nome: university.name,
        pais: university.country,
        estado: university['state-province']
      }
      return dataTransferObject
    })
  }
}