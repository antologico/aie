import Crypto from 'crypto'

function getMD5State(element) {
    return Crypto.createHash('md5').update(
        JSON.stringify(
            getBasicStructure(element)
        )
    ).digest("hex")
}

function getBasicStructure(element = []) {
    return element.map(({name, children}) => (
        {
            name,
            children: getBasicStructure(children),
        })
    )
}

function getBasicState(element = []) {
    return element.map(({name, pregnancy, score, children}) => (
        {
            name,
            pregnancy,
            score,
            children: getBasicState(children),
        })
    )
}

function getPregnancyAverage (elements, totalScore) {
    if (totalScore === 0) {
        return 0
    }
    
    const pregnancy = elements.reduce((total, {pregnancy, score}) => (total +(pregnancy*parseFloat(score))), 0)
    return parseFloat((pregnancy/totalScore).toPrecision(12))
}

function getScoresAddition (scores) {
    return scores.reduce((total, score) => total + score, 0);
}

function addStates(elements = []) {
    if (!elements || !elements.length || !elements[0]) {
        return 
    }

    return elements[0].map(({name}, index) => {
        const score = getScoresAddition(elements.map(element => element[index].score))
        const pregnancy = getPregnancyAverage(elements.map(element => element[index]), score)
        const children = addStates(elements.map(element => element[index].children))
        const value =  {
            name,
            pregnancy,
            score,
        }
        children && (value.children = children)
        return value
    })
}

export {
    getBasicState,
    getMD5State,
    addStates,
}