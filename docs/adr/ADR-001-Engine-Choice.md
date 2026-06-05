# ADR 001: Use Plain HTML, CSS, and JavaScript

## Status

Accepted

## Context

The course project must use only the technologies taught in class: HTML, CSS, JavaScript, and Git.
External libraries and frameworks such as Phaser, React, Bootstrap, and jQuery are not allowed.

## Decision

Pixel Dash is implemented as a plain web project.
The website pages use HTML and CSS.
The game uses the HTML Canvas API and JavaScript for movement, jumping, obstacle generation, scoring, collision detection, and restart behavior.

## Consequences

* Positive: The project follows the professor's technology constraints.
* Positive: The source code is simple and easy to explain during the final presentation.
* Positive: The team can demonstrate core JavaScript logic without relying on a framework.
* Negative: Advanced game engine features are not available, but they are not required for this simple runner game.
