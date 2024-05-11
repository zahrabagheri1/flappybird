# tic-tac-toe (XO)

- It is a game for two players.
- It is usually played on a 3x3 board, but it can be wider.
- The player who started first fills in the empty squares by typing ‘X’ and the other player ‘O’.
- A player wins the game when they X-X-X or O-O-O in rows, columns, or diagonals.

![alt text](XO.png)

- If all squares filled and were provided one from the above conditions be the game is tied.

![alt text](XOTIED.png)

# the number of win mode

- If we want to take a row, the numbers must be consecutive
- If we want to check a column, the numbers must be together up to a distance of 3
- If we want to diagonal check, the numbers must be even

| Win mode   | The number of win mode |
| ---------- | ---------------------- |
| A Row      | XXX - OOO 3 mode       |
| A Column   | XXX - OOO 3 mode       |
| A Diagonal | XXX - OOO 2 mode       |

# Board of XO 
- A Row win => 0-1-2 OR 3-4-5 OR 7-8-9
- A Column win => 0-3-6 OR 1-4-7 OR 2-5-8
- A Diagonal win => 0-4-8 OR 2-4-6

| 0 | 1 | 2 |
| - | - | - |
| 3 | 4 | 5 |
| 6 | 7 | 8 |
