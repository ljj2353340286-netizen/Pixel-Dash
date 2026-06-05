# Pixel Dash

## Project Overview

Pixel Dash is a simple web-based endless runner game developed for a Software Engineering course.
The project focuses on applying course concepts such as requirements, Agile sprint planning,
documentation, testing, and Git-based collaboration.

## Pages

* `main.html` - home page and project overview
* `team.html` - team members and responsibilities
* `game.html` - playable runner game
* `form.html` - project feedback form
* `index.html` - redirects to `main.html`

## Functions

* Player jump with Space or Up key
* Obstacles appear from the right side
* Collision detection triggers Game Over
* Score and best score display
* Restart after Game Over
* Feedback form submit handling

## Technology Stack

* HTML
* CSS
* JavaScript
* Git and GitHub

No external libraries or frameworks are used. The game is implemented with the HTML Canvas API and plain JavaScript.

## Project Structure

* `assets/` - optional images and resources
* `docs/` - project documentation
* `docs/adr/` - architecture decision records
* `docs/user-story/` - user stories
* `docs/ui/` - UI design documents
* `docs/sprint/` - sprint plans and reports
* `skills/` - reusable development notes
* `test/` - test case documents
* `todo/` - sprint task lists

## How to Run

Open `main.html` in a web browser, then go to the Game page.

For a local server, run one of the following commands from the project folder:

```bash
python -m http.server 8000
```

Then open:

```text
http://127.0.0.1:8000/main.html
```

## Testing

* Collision Detection Test
* Jump Test
* Score Test
* Restart Test
* Page Navigation Test
* Form Submit Test

## Sprint Summary

* Sprint 1 - Player movement
* Sprint 2 - Obstacle generation
* Sprint 3 - Collision detection
* Sprint 4 - Score system
* Sprint 5 - UI, pages, and restart

## Team Members

| Name | Student ID | Responsibility |
| ---- | ---------- | -------------- |
| 유가준 | 20235268 | Game development and JavaScript |
| 박강흠 | 20243054 | CSS design, UI, and presentation |
| 장희예 | 20235312 | Main page and project structure |
