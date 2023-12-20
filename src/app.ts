import express, { Application, Request, Response } from 'express'
const app:Application = express()
import cors from 'cors' 
import { userRouters } from './models/users/users.route'

app.use(cors())
app.use(express.json()) 

//Application Router 
app.use('/api/users',userRouters)

app.get('/', (req:Request, res:Response) => { 
  res.send('Hello World!')
})
 

export default app;