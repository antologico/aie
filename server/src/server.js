import Express from 'express'
import BodyParser from 'body-parser'
import initConnection from './initConnection'
import config from './config-local.json'
import pregnancyRoutes  from './routes/pregnancy' 

// initialize our Express app
const app = Express()

initConnection(config)

app.use(Express.json({ type: 'application/x-www-form-urlencoded'}))
app.use(BodyParser.urlencoded({extended: false}))
app.use('/pregnancy', pregnancyRoutes)

let port = 1234

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port)
})  