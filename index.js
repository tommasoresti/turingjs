fs = require('fs')

let args = process.argv.slice(2);

const newStreamFromState = (state, character) => { switch(character) {
    case '*': return state.stream
    default: return [
        ...state.stream.slice(0, state.position),
        character,
        ...state.stream.slice(state.position + 1)
    ]
}}

const aRunOperation = (line) => ({
    run: s => {
        return ({
            stream: newStreamFromState(s, line[0]),
            position: movePosition[line[1]](s.position),
            state: line[2]
        });
    }
});

const toTree = (prevStates, instruction) => {
    if(instruction.length === 3)
        return aRunOperation(instruction);

    return {
        ...prevStates,
        ...{
            [instruction[0]]: {
                ...prevStates[instruction[0]],
                ...toTree({}, instruction.slice(1))
            }
        }
    };
}

const initialStream = args[1].split("");
const states = fs.readFileSync(args[0], 'utf8')
    .split("\n")
    .map(line => line.split("//")[0].trim()) // Remove comments
    .filter(line => line)// filter empty lines
    .reduce(toTree, {});

const movePosition = {
    ">": n => n + 1,
    "<": n => n - 1,
    "=": n => n
};

let current = {
    state: 0,
    position: 1,
    stream: ['#', ...initialStream, '#']
};

let step = 0;
while(current.state !== '!') {
    console.log(`${step++}:\t${[...current.stream]}`)
    console.log(`   \t${' '.repeat(current.position * 2)}^`)
    current = (
        states[current.state][current.stream[current.position]] ||
        states[current.state]['*']
    ).run(current)
}

console.log(`\nOut:\t${current.stream}`)
