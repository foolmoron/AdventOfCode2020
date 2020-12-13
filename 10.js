input = `
71
30
134
33
51
115
122
38
61
103
21
12
44
129
29
89
54
83
96
91
133
102
99
52
144
82
22
68
7
15
93
125
14
92
1
146
67
132
114
59
72
107
34
119
136
60
20
53
8
46
55
26
126
77
65
78
13
108
142
27
75
110
90
35
143
86
116
79
48
113
101
2
123
58
19
76
16
66
135
64
28
9
6
100
124
47
109
23
139
145
5
45
106
41
`

test = `
16
10
15
5
1
11
7
19
6
12
4
`
test2 = `
28
33
18
42
31
14
46
20
48
47
24
23
49
45
19
38
39
11
1
32
25
35
8
17
7
9
4
2
34
10
3
`
test3 = `
1
4
5
6
7
8
11
12
15
16
17
20
`

const parse = (jolts) => {
    const j = jolts.trim().split('\n').map(x=>parseInt(x))
    j.sort((a, b) => a - b)
    return j
}

function getJoltDiffs(jolts) {
    jolts = jolts.concat([0, Math.max(...jolts) + 3])
    jolts.sort((a, b) => a - b)

    const counts = [null, 0, 0, 0]
    for (let i = 1; i < jolts.length; i++) {
        counts[jolts[i] - jolts[i - 1]]++
    }

    return counts
}

const diffs = getJoltDiffs(parse(input))
console.log(diffs, diffs[1]*diffs[3])

// 1, _, _, 4, 5, 6, 7, 8, _, _, 11, 12, _, _, 15, 16, 17, _, _, 20

function trib(n) {
    if (n < 3) {
        return [0, 0, 1][n]
    }
    return trib(n-1) + trib(n-2) + trib(n-3)
}

function getCombos(jolts) {
    jolts.unshift(0)
    jolts.push(jolts[jolts.length - 1] + 3)
    let combos = 1
    let chain = 1
    for (let i = 0; i < jolts.length; i++) {
        if (jolts[i + 1] === jolts[i] + 1) {
            chain++
        } else {
            combos *= trib(chain + 1)
            chain = 1
        }
    }
    return combos
}

// console.log(getCombos(parse(test)))
// console.log(getCombos(parse(test2)))
console.log(getCombos(parse(input)))
