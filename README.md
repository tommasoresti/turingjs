# Turing Machine JS

Simple Turing Machine that accepts instructions and interact with a given stream

* `stream.txt` contains the stream
* `instructions.txt` contains a list of instructions (one per line)

An *instruction* is defined as a string of *5 characters*:

* current state
* element read by pointer
  * `*` indicate any char is valid
* element to write at pointer
  * `*` indicate skip writing
* pointer increment
  * `<` move left
  * `>` move right
  * `=` do not move
* next state to jump to
  * `!` will terminate the execution

This machine start always from *state* `0`, pointing to *position* `0` in the stream.

The stream *bounds* are indicated by `'#'`

The symbol `'!'` is used as a state jump to *terminate* the execution

## Example case

As an example, the project comes already with a prefilled `instructions.txt`

These instructions are converting 0's to 1's

```
010>0  // On state 0: when 1 is found then write 0. Move pointer right and jump to state 0.
001>0  // On state 0: when 0 is found then write 1. Move pointer right and jump to state 0.
0#*=!  // On state 0: when bound is found ('#') then skip write ('*'). Don't move the pointer ('=') and terminate the execution ('!').
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
