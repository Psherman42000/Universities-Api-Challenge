'use strict'
module.exports = class Routes {
  constructor() {
    this._express = require('express')
    this._router = this._express.Router()
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
    this._getRoutesToCreations()
    this._getDeleteToDeletions()
    this._getRoutesToUpdates()
    this._getRoutesToSearch()
    this._app.use('/universities', this._router)
  }

  _getRoutesToCreations = () => {
    this._router.post('', async (req, res) => {
          
    })
  }

  _getDeleteToDeletions = () => {
    this._router.delete('', async (req, res) => {
          
    })
  }

  _getRoutesToUpdates = () => {
    this._router.put('', async (req, res) => {
          
    })
  }

  _getRoutesToSearch = () => {
      this._router.get('', async (req, res) => {

      })
  }

  _startServer = () => {
    const serverPort = 3000
    return this._app.listen(serverPort, () => {
      console.log(`[INFO] Server listening on port ${serverPort}!`)
    })
  }
}