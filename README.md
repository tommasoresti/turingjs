# Turing Machine JS

Simple Turing Machine that accepts instructions and interact with a given stream

* `stream.txt` contains the stream
* `instructions.txt` contains a list of instructions (one per line)

An instruction is defined as a string of 5 characters:

* current state
* element read by pointer
* element to write at pointer
* pointer increment (>, <, _)
* next state to jump to

This machine start always from state `0`

The stream bounds are indicated by `'#'`

The project comes already with a prefilled `instructions.txt`
These instructions are converting 0's to 1's

```
010>0
001>0
0#__!
```

Given buffer:
`111110`

Execution:

```
# 1 1 1 1 1 0 #
# 0 1 1 1 1 0 #
# 0 0 1 1 1 0 #
# 0 0 0 1 1 0 #
# 0 0 0 0 1 0 #
# 0 0 0 0 0 0 #
# 0 0 0 0 0 1 #
```
