'use strict'
module.exports = class Routes {
  constructor() {
    this._express = require('express')
    this._app
  }

  initializeServer = (params = {}) => {
    this._app = this._express()
    this._loadMiddlewares()
    this._loadRoutes()
    return this._startServer()
  }

  _loadMiddlewares = () => {
    this._app.use(this._express.json())
    this._app.use(this._express.urlencoded({ extended: true }))
  }

  _loadRoutes = () => {
    this._app.get('/', (_, res) => {
      res.json({
        name: 'Universities API',
        version: 1.0,
      })
    })
    this._loadRestApiRoutes()
  }

  _loadRestApiRoutes = () => {
    this._app.use('/universities', this._getRoutesToCreations())
    this._app.use('/universities', this._payment.getDeleteToDeletions())
    this._app.use('/universities', this._appEngineEntrance.getRoutesToUpdates())
    this._app.use('/universities', this._signatureCanvas.getRoutesToSearch())
  }

  _startServer = () => {
    const serverPort = 3000
    return this._app.listen(serverPort, () => {
      console.log(`[INFO] Server listening on port ${serverPort}!`)
    })
  }
}