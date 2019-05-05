import Pregancy from '../models/pregnancy'
import { getBasicState, getMD5State, addStates } from '../converters/status'

//Simple version, without validation or sanitation
export default {
    
    get: (req, res) => {
        Pregancy
            .aggregate([
                    { "$match": { 
                        aie: req.params.id,
                        md5estructure: req.params.md5,
                        }
                    },
                    { "$sort": { date: -1 } },
                    { "$group": {
                        _id: "$user",
                        status: { "$first": "$state" },
                        },
                    }
                ],
                function (err, pregnances) {
                    if (err) { console.log(err) }
                    if (pregnances) {
                        res.send(addStates(pregnances.map(({status}) => (status))))
                    } else {
                        res.send([])
                    }
                }
            )
    },

    save: (req, res) => {
        try {
            const pregnancy = new Pregancy({
                event: req.body.event,
                aie: req.body.aie,
                element: req.body.element,
                state: getBasicState(req.body.state),  
                md5estructure: getMD5State(req.body.state),
                user: req.body.userName,
                date: Date.now(),
            })
            pregnancy.save((err) => {
                if (err) {
                    console.log('DB Error', err)
                    res.status(424).send('DB Error')
                    return err
                }
                console.log('Created successfully')
                res.send('Created successfully')
            })
        } catch (exception) {
            res.status(423).send('Unexpected Error!')
            console.log('Unexpected Error', exception)
        }
    }
}