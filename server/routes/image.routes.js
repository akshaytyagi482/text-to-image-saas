import express from 'express'
import { generateImage } from '../controllers/image.controller.js'
import userauth from '../middlewares/auth.js'

const imagerouter = express.Router()

imagerouter.post('/generate',userauth,generateImage)


export default imagerouter