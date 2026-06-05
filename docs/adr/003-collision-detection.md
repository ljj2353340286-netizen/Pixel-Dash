# ADR 003: Collision Detection

## Status

Accepted

## Context

The runner game needs to detect when the player touches an obstacle.
The project cannot use an external physics engine, so collision detection must be implemented with plain JavaScript.

## Decision

We will use axis-aligned bounding box collision detection.
The player and each obstacle are rectangles.
The game compares their `x`, `y`, `width`, and `height` values every frame.

## Consequences

* Positive: The method is simple and easy to test.
* Positive: It matches the rectangle-based visual design.
* Positive: It can be explained clearly during the final presentation.
* Negative: It is less precise than complex pixel-based collision, but that is acceptable for this game.
