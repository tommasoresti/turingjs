fs = require('fs')

let args = process.argv.slice(2);

const updateStream = (stream, position, character) => { switch(character) {
    case '*': return stream
    default: return [
        ...stream.slice(0, position),
        character,
        ...stream.slice(position + 1)
    ]
}}

const moveOperations = {
    ">": n => n + 1,
    "<": n => n - 1,
    "=": n => n
};

const aRunnerWith = (instructions) => ({
    run: current => {
        return ({
            stream: updateStream(current.stream, current.position, instructions[0]),
            position: moveOperations[instructions[1]](current.position),
            state: instructions[2]
        });
    }
});

const toTree = (prevStates, instructions) => {
    if(instructions.length === 3)
        return aRunnerWith(instructions);

    return {
        ...prevStates,
        ...{
            [instructions[0]]: {
                ...prevStates[instructions[0]],
                ...toTree({}, instructions.slice(1))
            }
        }
    };
}

const initialStream = args[1].split("");
const tree = fs.readFileSync(args[0], 'utf8')
    .split("\n")
    .map(line => line.split("//")[0].trim()) // Remove comments
    .filter(line => line)// filter empty lines
    .reduce(toTree, {});

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
        tree[current.state][current.stream[current.position]] ||
        tree[current.state]['*']
    ).run(current)
}

console.log(`\nOut:\t${current.stream}`)
