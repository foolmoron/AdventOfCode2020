input = `
#.#####.
#..##...
.##..#..
#.##.###
.#.#.#..
#.##..#.
#####..#
..#.#.##
`

function toA(s) {
    return s.split(',').map(z => parseInt(z))
}

function toS(a) {
    return a.join(',')
}

function parse(grid) {
    const set = new Set()
    const lines = grid.trim().split('\n')
    for (let j = 0; j < lines.length; j++) {
        const chars = lines[j].split('')
        for (let i = 0; i < chars.length; i++) {
            if (chars[i] === '#') {
                set.add(toS([i,j,0,0])) // array equality doesn't work
            }
        }
    }
    return set
}

function convolve(prev) {
    const neighbors = new Set()
    for (const ps of prev) {
        const p = toA(ps)
        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                for (let z = -1; z <= 1; z++) {
                    for (let w = -1; w <= 1; w++) {
                        neighbors.add(toS([p[0] + x, p[1] + y, p[2] + z, p[3] + w]))
                    }
                }
            }   
        }
    }

    const next = new Set()
    for (const ps of neighbors) {
        const p = toA(ps)
        const isActive = prev.has(toS(p))
        let activeNeighbors = 0
        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                for (let z = -1; z <= 1; z++) {
                    for (let w = -1; w <= 1; w++) {
                        if (x != 0 || y != 0 || z != 0 || w != 0) {
                            if (prev.has(toS([p[0] + x, p[1] + y, p[2] + z, p[3] + w]))) {
                                activeNeighbors++
                            }
                        }
                    }
                }
            }   
        }
        if (isActive && (activeNeighbors == 2 || activeNeighbors == 3)) {
            next.add(toS(p))
        } else if (!isActive && activeNeighbors == 3) {
            next.add(toS(p))
        }
    }

    return next
}

function run(initial, cycles) {
    let set = initial
    for (let i = 0; i < cycles; i++) {
        set = convolve(set)
    }
    return set
}

test = `
.#.
..#
###
`

const final = run(parse(input), 6)
console.log(final.size)