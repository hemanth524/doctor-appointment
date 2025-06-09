import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectcloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminroute.js'
import doctorRouter from './routes/doctorroute.js'
import userModel from './models/usermodel.js'
import userRouter from './routes/userroute.js'

const app=express()
const port=process.env.PORT || 5000;
connectDB()
connectcloudinary()

app.use(express.json())

app.use(cors())

app.use('/api/admin',adminRouter)

app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter)

app.get('/',(req,res)=>{
    res.send("APi working great  ")
})

app.listen(port,()=>console.log("server started",port))