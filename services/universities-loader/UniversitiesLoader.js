'use strict'

module.exports = class UniversitiesLoader {
  constructor() {
    this._axios = require("axios")
    this._endpoint = 'http://universities.hipolabs.com/search?country=',
    this._countrysData = require('./countrys-data/countrys.json')
  }

  getUniversitiesFromApi = async () => {
    const univertsities = []
    const { countrys } = this._countrysData
    await Promise.all(countrys.map(async (countryName) => {
      const countryUnivertsities = await this._axios.get(`${this._endpoint}${countryName}`)
      return univertsities.push(...countryUnivertsities.data)
    }))
    return univertsities
  } 
}