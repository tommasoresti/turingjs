fs = require('fs')

let args = process.argv.slice(2);

const aRunOperation = (line) => ({
    run: s => {
        return ({
            stream: [...s.stream.slice(0, s.position), line[0], ...s.stream.slice(s.position + 1)],
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

const initialStream = fs.readFileSync(args[1], 'utf8').split("");
const states = fs.readFileSync(args[0], 'utf8')
    .split("\n")
    .reduce(toTree, {});

const movePosition = {
    '>': n => n + 1,
    '<': n => n - 1,
    '_': n => n
};

let current = {
    state: 0,
    position: 1,
    stream: ['#', ...initialStream, '#']
};

while(current.state !== '!') {
    console.log(...current.stream)
    current = states[current.state][current.stream[current.position]].run(current)
}