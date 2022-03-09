'use strict'
module.exports = class Routes {
  constructor() {
    this._UniversitiesManeger = require('../controllers/universities-manager/UniversitiesManager')
    this._express = require('express')
    this._router = this._express.Router()
    this._app
  }

  initializeServer = (model) => {
    this._UniversitiesManeger = new this._UniversitiesManeger(model)
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
    this._loadRoutesToCreations()
    this._loadDeleteToDeletions()
    this._loadRoutesToUpdates()
    this._loadRoutesToSearch()
    this._app.use('/universities', this._router)
  }

  _loadRoutesToCreations = () => {
    this._router.post('', async (req, res) => {
      
    })
  }

  _loadDeleteToDeletions = () => {
    this._router.delete('', async (req, res) => {
      
    })
  }

  _loadRoutesToUpdates = () => {
    this._router.put('', async (req, res) => {
          
    })
  }

  _loadRoutesToSearch = () => {
    this._router.get('', async (req, res) => {
      if(req.query === {}) {
        res.send({todas: '...'})
      }
      res.send(await this.getUniversitiesFromCountry(req.query.country))
    })
  }

  _startServer = () => {
    const serverPort = 3002
    return this._app.listen(serverPort, () => {
      console.log(`[INFO] Server listening on port ${serverPort}!`)
    })
  }
}