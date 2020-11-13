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

## Examples

### Convert 0s and 1s

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

### Move 1s to right side

```
// State 0
// Search for 1 starting from current position.
// Delete it when is found and then jump to right side

00*>0 // when find a 0 just do nothing and go ahead
01 =1 // when find a 1 remove it and jump to state 1 (move to right border)
0#*=! // when find the bound terminate

// State 1: Go to right side

1#*<2 // When right border is found jump to state 2
1**>1 // go to right

// State 2: find first 0 from right

201=3 // When 0 is found put 1 and jump to state 3
21*<2 // When 1 is found keep going left
2 1=! // When found empty space means that no zeros were found, so write 1 and terminate.

// Step 3: Move the zero to the empty space

3 0=0 // When empty space is found put a 0 and jump to state 0
3**<3 // Keep going left if the empty space is not found

```
