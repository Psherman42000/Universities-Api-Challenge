'use strict'

module.exports = class Odm {
  constructor() {
    this._mongo = require('mongoose')
    this.connect = this._api().connect
    this.connection = this._api().connection
    this.disconnect = this._api().disconnect
    this.model = this._api().model
    this.Schema = this._api().Schema
  }

}