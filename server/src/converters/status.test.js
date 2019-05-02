import { addStates } from './status'

const result = {
    _id: 1,
    status: [{
        name: 'status1',
        pregnancy: 0,
        score: 0,
        children: [
            {
                name: 'name1',
                pregnancy: 0.1,
                score: 1,
                children: [{
                    name: 'name11',
                    pregnancy: 0.11,
                    score: 11,
                }, {
                    name: 'name12',
                    pregnancy: 0.12,
                    score: 12,
                    children: [{
                        name: 'name121',
                        pregnancy: 0.121,
                        score: 121,
                    }],
                }],
            }, {
                name: 'name2',
                pregnancy: 0.2,
                score: 2,
                children: [{
                    name: 'name21',
                    pregnancy: 0.21,
                    score: 21,
                }, {
                    name: 'name22',
                    pregnancy: 0.12,
                    score: 22,
                }],
            }
        ]
    }]
}

const compare = (value, expected) => expect(JSON.stringify(value)).toBe(JSON.stringify(expected))


it('addStates run properly', () => {
    const value = addStates([result.status, result.status])
    compare(value, [{
        name: 'status1',
        pregnancy: 0,
        score: 0,
        children: [{
            name: 'name1',
            pregnancy: 0.1,
            score: 2,
            children: [{
                name: 'name11',
                pregnancy: 0.11,
                score: 22,
            }, {
                name: 'name12',
                pregnancy: 0.12,
                score: 24,
                children: [{
                    name: 'name121',
                    pregnancy: 0.121,
                    score: 242,
                }],
            }],
        }, {
            name: 'name2',
            pregnancy: 0.2,
            score: 4,
            children: [{
                name: 'name21',
                pregnancy: 0.21,
                score: 42,
            }, {
                name: 'name22',
                pregnancy: 0.12,
                score: 44,
            }],
        }]
    }])
})