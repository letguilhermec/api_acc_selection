import { Router } from 'express'
import { verifyUsernameAndPassword, createUser, createAccount, login, logout } from '../controllers/userControler'

const router: Router = Router()

router.post('/signup', verifyUsernameAndPassword, createUser, createAccount)
router.post('/signin', login)
router.get('/signout', logout)

export default router
