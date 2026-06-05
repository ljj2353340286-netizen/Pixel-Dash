# ADR 001: Simple Canvas-Based Game Logic

## Status

Accepted

## Context

Pixel Dash must remain within the course technology scope: HTML, CSS, JavaScript, and Git.
External game engines are not allowed, so the project needs a simple approach for player movement,
jumping, gravity, obstacles, and collision detection.

## Decision

We will implement the runner game with the HTML Canvas API and plain JavaScript.
Gravity and jumping are handled with simple variables such as player position and vertical velocity.
Obstacles are stored in an array and moved from right to left each frame.

## Consequences

1. The game follows the project constraints.
2. The logic is easy to explain in the final presentation.
3. The game remains lightweight and browser-friendly.
4. The team must manually manage movement and collision logic, but this is suitable for a simple 2D runner.
