import express, { Application, NextFunction, Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import userRouter from './routes/userRoutes'
import balanceRouter from './routes/balanceRoutes'
import transactionRouter from './routes/transactionRoutes'
import errorHandler from './controllers/errorController'
import AppError from './utils/appError'

const app: Application = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/api/v1/users', userRouter)
app.use('/api/v1/balance', balanceRouter)
app.use('/api/v1/transactions', transactionRouter)

app.use(errorHandler)

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Este servidor não tem um endpoint ${req.originalUrl}`, 405))
})


export default app
