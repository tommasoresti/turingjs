# Turing Machine JS

Simple Turing Machine that accepts states and interact with a given stream

* `input.txt` contains the stream
* `states.txt` contains the states

A state is defined as a string of 5 characters:

* current state
* element read by pointer
* element to write at pointer
* pointer increment (>, <, _)
* next state to jump to

The stream bounds are indicated by `'#'`

The project comes already with a prefilled `states.txt`
This states are converting 0's to 1's

```
010>0
001>0
0#__!
```
