import { URLController } from './controller/URLController'
import express, { Request, Response } from 'express'
import { MongoConnection } from './database/MongoConnection'

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 5000
const urlController = new URLController()

const api = express()
api.use(express.json())

const database = new MongoConnection()
database.connect()

api.post('/shorten', urlController.shorten)

api.get('/:hash', urlController.redirect)

api.listen(PORT, () => console.log('Express listening'))