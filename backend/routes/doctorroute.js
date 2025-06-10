import express from 'express'
import { doctorList,loginDoctor ,appointmentsDoctor} from '../controllers/doctorcontroller.js'
import authDoctor from '../middlewares/authDoctor.js'

const doctorRouter=express.Router()
doctorRouter.get('/list',doctorList)
doctorRouter.post('/login',loginDoctor)
doctorRouter.get('/Appointments',authDoctor,appointmentsDoctor)

export default doctorRouter 
