'use strict'

module.exports = class Odm {
  constructor() {
    this._mongo = require('mongoose')
    this._dbUri = require('./dbData.json').uri
    this._connected = false
    this._model
  }

  initializeDb = async () => {
    if(this._connected) return
    console.log('[INFO] Connecting with Database')
    try{
      await this._mongo.connect(this._dbUri,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
    }catch(error){
      console.log('[ERROR] Connection with Database Failed')
      throw error
    }
    this._connected = true
    console.log('[INFO] Sucessfully Connected with Database')
  }

  alreadyHydrated = async () => {
    await this.initializeDb()
    const model = this._model ? this._model : this._createModel()
      const result = await model.findOne({})
    if(!result) return false
    return true
  }

  _createModel = () => {
    try {
      return (this._model = this._mongo.model('Universities'))
    } catch {
      const schema = this._createSchema()
      return (this._model = this._mongo.model('Universities', schema, 'Universities'))
    }
  }

  _createSchema = () => {
    const schema = {
      country: String,
      name: String,
      domains: Array,
      alpha_two_code: String,
      'state-province': 'Mixed',
      web_pages: Array
    }
    const opts = {
      timestamps: true,
      strict: false,
      minimize: false,
    }
    return this._mongo.Schema(schema, opts)
  }

  insertMany = async (data) => {
    await this.initializeDb()
    const model = this._model ? this._model : this._createModel()
    return await model.create(data)
  }

  getModel = () => {
    await this.initializeDb()
    return this._model ? this._model : this._createModel()
  }

}