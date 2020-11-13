fs = require('fs')

let args = process.argv.slice(2);

const content = fs.readFileSync(args[0], 'utf8');
const stream = ['#', ...fs.readFileSync(args[1], 'utf8').split(""), '#'];
const commands = content.split("\n");

const toTree = (prevStates, line) => {
    if(!line)
        return undefined

    const firstLetter = line[0]
    return {
        ...prevStates,
        ...{
            [firstLetter]: {
                ...prevStates[firstLetter],
                ...toTree({}, line.slice(1))
            }
        }
    }
}

const states = commands
    .map(line => line.split(" "))
    .reduce((prev, line) => toTree(prev, line[0]), {})

let state = '0';
let pointer = 1;

while(state !== '!') {
    const stateElement = states[state][stream[pointer]];
    const writeElement = Object.keys(stateElement)[0]
    const moveElement = Object.keys(Object.values(stateElement)[0])[0]
    const jumpElement = Object.keys(Object.values(Object.values(stateElement)[0])[0])[0]

    stream[pointer] = writeElement !== '_'
        ? writeElement
        : stream[pointer];

    switch (moveElement) {
        case '>': pointer++; break;
        case '<': pointer--; break;
    }

    state = jumpElement

    console.log(stream)
}