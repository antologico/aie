import Pregancy from '../models/pregnancy'

//Simple version, without validation or sanitation
export default {
    
    get: (req, res) => {
        Pregancy.findById(req.params.id, function (err, pregnancy) {
            if (err) { console.log(err) }
            res.send(pregnancy);
        })
    },

    save: (req, res) => {
        const pregnancy = new Pregancy(
        {
            name: req.body.name,
            price: req.body.price
        })
        pregnancy.save((err) => {
            if (err) {
                return err;
            }
            res.send('Created successfully')
        })
    }
}