# ADR 001: Technical Stack Transition to Phaser.js

## Status
Accepted

## Context
Initially, the project proposal suggested using Unity and C# for development. However, considering the lightweight nature of web-based deployment, seamless integration with GitHub Pages, and development efficiency within the team, we re-evaluated the technology stack.

## Decision
We decided to switch the game engine from Unity to Phaser.js and use JavaScript for the core game logic.

## Consequences
* Positive: Faster deployment via GitHub Pages for grading and immediate feedback.
* Positive: Lower learning curve for the team compared to C# and Unity web builds.
* Negative: Limited 3D capabilities, but sufficient since our project is a 2D endless runner game.
