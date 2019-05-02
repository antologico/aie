
import Mongoose from 'mongoose'

function initConnection(config) {
    const { protocol } = config
    const devDbUrl = protocol.replace(/\{[^}]+\}/g, (match) => config[match.slice(1, -1)])
    Mongoose.connect(devDbUrl, { useNewUrlParser: true }, function (err, res) {
        if (err) {
            console.log ('ERROR connecting to: ' + devDbUrl + '. ' + err)
        } else {
            console.log ('Succeeded connected to: ' + devDbUrl)
        }
    })
    Mongoose.Promise = global.Promise
}

export default initConnection
