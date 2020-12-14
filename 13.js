input = `
1001796
37,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,41,x,x,x,x,x,x,x,x,x,457,x,x,x,x,x,x,x,x,x,x,x,x,13,17,x,x,x,x,x,x,x,x,23,x,x,x,x,x,29,x,431,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,19
`
test = `
939
1789,37,47,1889
`

function parse(buses) {
    const lines = buses.trim().split('\n')
    return {
        start: parseInt(lines[0]),
        ids: lines[1].split(',').filter(v => v != 'x').map(v => parseInt(v))
    }
}

function findEarliest(config) {
    let minDelay = Infinity
    let minId
    for (const id of config.ids) {
        const delay = id - (config.start % id)
        if (delay < minDelay) {
            minDelay = delay
            minId = id
        }
    }
    console.log(minDelay * minId)
    return { minDelay, minId }
}

console.log(findEarliest(parse(input)))



function parse2(buses) {
    const configs = []
    let offset = 0
    const ids = buses.trim().split('\n')[1].split(',')
    for (const id of ids) {
        if (id !== 'x')
            configs.push({id, offset: (id*1000 - offset) % id})
        offset++
    }
    return configs
}

function findCoordinated(configs) {
    const nums = []
    let mult = 1
    let base = 0
    for (let i = 1; i < configs.length; i++) {
        mult *= configs[i-1].id
        const offset = configs[i].offset
        let x = 0
        while ((base + (mult * x)) % configs[i].id !== offset) {
            x++
        }
        base = (base + (mult * x))
        nums.push(x)
    }
    return base
}

console.log(findCoordinated(parse2(input)))