import express from 'express'
import { doctorList,loginDoctor ,appointmentsDoctor,appointmentcomplete,appointmentcancel,doctorDashboard} from '../controllers/doctorcontroller.js'
import authDoctor from '../middlewares/authDoctor.js'

const doctorRouter=express.Router()
doctorRouter.get('/list',doctorList)
doctorRouter.post('/login',loginDoctor)
doctorRouter.get('/Appointments',authDoctor,appointmentsDoctor)
doctorRouter.post('/complete-appointment',authDoctor,appointmentcomplete)
doctorRouter.post('/cancel-appointment',authDoctor,appointmentcancel)
doctorRouter.get('/dashboard',authDoctor,doctorDashboard)






export default doctorRouter 
