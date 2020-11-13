# Turing Machine JS

Simple Turing Machine that accepts instructions and interact with a given stream

- First argument: is the path to the instructions file
- Second argument: is the stream to work with

Usage: `node index.js path/to/instructions.txt <stream>

The instruction file should contain a list of instructions (one per line)

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

Project comes already with some examples.

Let's start with `examples/toggle_values.txt`

Command: `node index.js examples/toggle_values.txt 111110`

These instructions are converting 0's to 1's

```
// State 0

010>0  // when 1 is found then write 0. Move pointer right and jump to state 0.
001>0  // when 0 is found then write 1. Move pointer right and jump to state 0.
0#*=!  // when bound is found ('#') then skip write ('*'). Don't move the pointer ('=') and terminate the execution ('!').
```

Given buffer:
`101010`

Execution:

```
0:	#,1,0,1,0,1,0,#
   	  ^
1:	#,0,0,1,0,1,0,#
   	    ^
2:	#,0,1,1,0,1,0,#
   	      ^
3:	#,0,1,0,0,1,0,#
   	        ^
4:	#,0,1,0,1,1,0,#
   	          ^
5:	#,0,1,0,1,0,0,#
   	            ^
6:	#,0,1,0,1,0,1,#
   	              ^

Out:	#,0,1,0,1,0,1,#
```

### Move 1s to right side

Instructions inside `examples/move_ones_to_right.txt`:

Command: `node index.js examples/move_ones_to_right.txt 101010`

```
// State 0: Go to right side

0#*<1 // When right border is found jump to state 2
0**>0 // With any other symbol go to right

// State 1
// Search for next 0 on left side starting from current position.

10 <2 // when find a 0 remove it, move left and jump to state 2 (search for a 1)
11*<1 // when find a 1 just continue left
1#*=! // when the bound is found then terminate

// State 2: Search for 1

2#*>4 // When left border is found move right and jump to state 4
210>3 // when 1 is found put 0, move right and jump to state 3 (move 1 to empty space)
20*<2 // When 0 go to left

// State 3: Move the 1 to the empty space

3**>3 // When no empty space is found move right
3 1<1 // When empty space is found put 1, go left and jump to 1 (search next zero)

// Step 4: Restore the removed 0 when no 1 is found

4 0=! // When empty space is found put a 0 and jump to state 0
4**>4 // Keep going left if the empty space is not found

```

Given buffer: `111000`

Executions: 

```
0:	#,1,1,1,0,0,0,#
   	  ^
1:	#,1,1,1,0,0,0,#
   	    ^
2:	#,1,1,1,0,0,0,#
   	      ^
3:	#,1,1,1,0,0,0,#
   	        ^
4:	#,1,1,1,0,0,0,#
   	          ^
5:	#,1,1,1,0,0,0,#
   	            ^
6:	#,1,1,1,0,0,0,#
   	              ^
7:	#,1,1,1,0,0,0,#
   	            ^
8:	#,1,1,1,0,0, ,#
   	          ^
9:	#,1,1,1,0,0, ,#
   	        ^
10:	#,1,1,1,0,0, ,#
   	      ^
11:	#,1,1,0,0,0, ,#
   	        ^
12:	#,1,1,0,0,0, ,#
   	          ^
13:	#,1,1,0,0,0, ,#
   	            ^
14:	#,1,1,0,0,0,1,#
   	          ^
15:	#,1,1,0,0, ,1,#
   	        ^
16:	#,1,1,0,0, ,1,#
   	      ^
17:	#,1,1,0,0, ,1,#
   	    ^
18:	#,1,0,0,0, ,1,#
   	      ^
19:	#,1,0,0,0, ,1,#
   	        ^
20:	#,1,0,0,0, ,1,#
   	          ^
21:	#,1,0,0,0,1,1,#
   	        ^
22:	#,1,0,0, ,1,1,#
   	      ^
23:	#,1,0,0, ,1,1,#
   	    ^
24:	#,1,0,0, ,1,1,#
   	  ^
25:	#,0,0,0, ,1,1,#
   	    ^
26:	#,0,0,0, ,1,1,#
   	      ^
27:	#,0,0,0, ,1,1,#
   	        ^
28:	#,0,0,0,1,1,1,#
   	      ^
29:	#,0,0, ,1,1,1,#
   	    ^
30:	#,0,0, ,1,1,1,#
   	  ^
31:	#,0,0, ,1,1,1,#
   	^
32:	#,0,0, ,1,1,1,#
   	  ^
33:	#,0,0, ,1,1,1,#
   	    ^
34:	#,0,0, ,1,1,1,#
   	      ^

Out:	#,0,0,0,1,1,1,#
```
