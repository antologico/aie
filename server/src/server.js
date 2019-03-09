import Express from 'express'
import BodyParser from 'body-parser'
import Mongoose from 'mongoose'
import config from './config.json'
import pregnancyRoutes  from './routes/pregnancy' 

const devDbUrl = 'mongodb+srv:\/\/' + config.user + ':' +config.password + '@' + config.dbServer + '\/' + config.dbName;
Mongoose.connect(devDbUrl, { useNewUrlParser: true }, function (err, res) {
    if (err) {
        console.log ('ERROR connecting to: ' + devDbUrl + '. ' + err);
    } else {
        console.log ('Succeeded connected to: ' + devDbUrl);
    }
});
Mongoose.Promise = global.Promise;

// initialize our Express app
const app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended: false}));
app.use('/pregnancy', pregnancyRoutes);

let port = 1234;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});