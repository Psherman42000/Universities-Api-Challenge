'use strict'
module.exports = class Routes {
  constructor() {
    this._universitiesManeger = require('../controllers/universities-manager/UniversitiesManager')
    this._express = require('express')
    this._router = this._express.Router()
    this._app
  }

  initializeServer = (model) => {
    this._universitiesManeger = new this._universitiesManeger(model)
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
      try {
        return res.send(await this._universitiesManeger.createUniversity({desiredObj: req.body}))
      } catch (error) {
        const response = {
          error,
          success: false
        }
        return res.send(response)
      }
    })
  }

  _loadDeleteToDeletions = () => {
    this._router.delete('/:id', async (req, res) => {
      try {
        const id = req.params.id
        return res.send(await this._universitiesManeger.deleteUniversity(id))
      } catch (error) {
        const response = {
          error,
          success: false
        }
        return res.send(response)
      }
    })
  }

  _loadRoutesToUpdates = () => {
    this._router.put('/:id', async (req, res) => {
      try {
        const id = req.params.id 
        return res.send(await this._universitiesManeger.updateUniversity({id, desiredObj: req.body}))
      } catch (error) {
        const response = {
          error,
          success: false
        }
        return res.send(response)
      }
    })
  }

  _loadRoutesToSearch = () => {
    this._loadGetRoute()
    this._loadGetByIdRoute()
  }

  _loadGetRoute = () => {
    this._router.get('', async (req, res) => {
      try{
        const {country, allRecords} = req.query
        if(country) {
          return res.send(await this._universitiesManeger.getUniversitiesFromCountry({ country, allRecords }))
        }
        return res.send(await this._universitiesManeger.getUniversities({ allRecords }))
      } catch (error) {
        const response = {
          error,
          success: false
        }
        return res.send(response)
      }
    })
  }

  _loadGetByIdRoute = () => {
    this._router.get('/:id', async (req, res) => {
      try {
        const id = req.params.id
        return res.send(await this._universitiesManeger.getUniversitieById(id))
      } catch (error) {
        const response = {
          error,
          success: false
        }
        return res.send(response)
      }
    })
  }

  _startServer = () => {
    const serverPort = 3002
    return this._app.listen(serverPort, () => {
      console.log(`[INFO] Server listening on port ${serverPort}!`)
    })
  }
}