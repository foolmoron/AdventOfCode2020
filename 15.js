input = [2,1,10,11,0,6]

function run(initial, upto) {
    const timesSeen1 = {}
    const timesSeen2 = {}
    let step = 0
    let prevNum = 0
    let isNew = false
    while (true) {
        if (step % 1000000 == 0) {
            console.log(step, Object.keys(timesSeen1).length)
        }
        
        let n = 0
        if (step < initial.length) {
            n = initial[step]
        } else {
            const seen1 = timesSeen1[prevNum]
            const seen2 = timesSeen2[prevNum]
            if (seen1 !== undefined && seen2 !== undefined) {
                n = seen1 - seen2
            } else {
                n = 0
            }
        }

        step++
        prevNum = n
        timesSeen2[n] = timesSeen1[n]
        timesSeen1[n] = step

        if (step >= upto) {
            return n
        }
    }
}

// console.log(run([0, 3, 6], 2020))
console.log(run(input, 30000000))