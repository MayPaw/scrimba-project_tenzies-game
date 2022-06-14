# Scrimba Project: Tenzies Game
The repository contains a project from Scrimba's "The Frontend Developer Carrier Path" course - Tenzies Game.<br>

The goal of the project was to create a simple Tenzies Game as a SPA with React.
The design for this application was included with the course materials. Most of the app was done following the videos by Bob Ziroll, the tutor of the React module. This included:
* Game logic
* Die component

## My improvements:
* created GameIntro component, which provides a welcome message with game instructions
* moved the game logic to separate component, GameBoard, which renders all of the <br> dice, roll count and timer
* added useTime hook - function containing the timer logic
* added roll count logic to Gameboard
