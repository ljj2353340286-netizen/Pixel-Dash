const canvas = document.getElementById('runner-game');
const form = document.getElementById('feedback-form');

if (canvas) {
    const context = canvas.getContext('2d');
    const gameWidth = canvas.width;
    const gameHeight = canvas.height;
    const groundY = 335;
    const gravity = 0.42;
    const jumpStrength = -10.5;
    const playerSprites = {
        run: loadSpriteImages('run', 6),
        jump: loadSpriteImages('jump', 4),
        fall: loadSpriteImages('fall', 3)
    };

    const player = {
        x: 105,
        y: groundY - 76,
        width: 54,
        height: 76,
        velocityY: 0,
        isOnGround: true
    };

    let obstacles = [];
    let clouds = [
        { x: 90, y: 70, speed: 0.25 },
        { x: 320, y: 42, speed: 0.2 },
        { x: 610, y: 82, speed: 0.3 }
    ];
    let keys = {};
    let score = 0;
    let bestScore = Number(localStorage.getItem('pixelDashBestScore')) || 0;
    let isGameOver = false;
    let lastTime = 0;
    let obstacleTimer = 0;
    let nextObstacleDelay = 1300;
    let jumpWasPressed = false;
    let animationFrame = 0;
    let landTimer = 0;

    window.addEventListener('keydown', function(event) {
        if (event.code === 'Space' || event.code === 'ArrowUp') {
            event.preventDefault();
            keys[event.code] = true;
        }
    });

    window.addEventListener('keyup', function(event) {
        if (event.code === 'Space' || event.code === 'ArrowUp') {
            keys[event.code] = false;
        }
    });

    document.getElementById('restart-button').addEventListener('click', restartGame);

    requestAnimationFrame(gameLoop);

    function gameLoop(timeStamp) {
        const deltaTime = Math.min(timeStamp - lastTime, 32);
        lastTime = timeStamp;

        update(deltaTime);
        draw();

        requestAnimationFrame(gameLoop);
    }

    function update(deltaTime) {
        moveClouds(deltaTime);

        const jumpPressed = keys.Space || keys.ArrowUp;

        if (isGameOver) {
            if (jumpPressed && !jumpWasPressed) {
                restartGame();
            }
            jumpWasPressed = jumpPressed;
            return;
        }

        score += deltaTime * 0.04;
        animationFrame += deltaTime * 0.02;
        landTimer = Math.max(0, landTimer - deltaTime);
        updateScorePanel();

        handleJump(jumpPressed);
        updatePlayer(deltaTime);
        updateObstacles(deltaTime);

        jumpWasPressed = jumpPressed;
    }

    function handleJump(jumpPressed) {
        // Jump only starts when the player is standing on the ground.
        if (jumpPressed && !jumpWasPressed && player.isOnGround) {
            player.velocityY = jumpStrength;
            player.isOnGround = false;
            landTimer = 0;
        }
    }

    function updatePlayer(deltaTime) {
        player.velocityY += gravity * (deltaTime / 16);
        player.y += player.velocityY * (deltaTime / 16);

        if (player.y + player.height >= groundY) {
            if (!player.isOnGround && player.velocityY > 0) {
                landTimer = 180;
            }
            player.y = groundY - player.height;
            player.velocityY = 0;
            player.isOnGround = true;
        }
    }

    function updateObstacles(deltaTime) {
        obstacleTimer += deltaTime;

        if (obstacleTimer >= nextObstacleDelay) {
            createObstacle();
            obstacleTimer = 0;
            nextObstacleDelay = randomNumber(1850, 2450);
        }

        obstacles.forEach(function(obstacle) {
            obstacle.x -= obstacle.speed * (deltaTime / 16);
        });

        obstacles = obstacles.filter(function(obstacle) {
            return obstacle.x + obstacle.width > 0;
        });

        obstacles.forEach(function(obstacle) {
            if (isColliding(player, obstacle)) {
                endGame();
            }
        });
    }

    function createObstacle() {
        const height = randomNumber(30, 42);
        const width = randomNumber(34, 46);

        obstacles.push({
            x: gameWidth + width,
            y: groundY - height,
            width: width,
            height: height,
            speed: 3.2,
            type: 'spike'
        });
    }

    function isColliding(first, second) {
        // Axis-aligned collision detection for the player and each obstacle.
        const playerBox = {
            x: first.x + 12,
            y: first.y + 14,
            width: first.width - 20,
            height: first.height - 24
        };

        const obstacleBox = {
            x: second.x + 6,
            y: second.y + 8,
            width: second.width - 12,
            height: second.height - 8
        };

        return playerBox.x < obstacleBox.x + obstacleBox.width &&
            playerBox.x + playerBox.width > obstacleBox.x &&
            playerBox.y < obstacleBox.y + obstacleBox.height &&
            playerBox.y + playerBox.height > obstacleBox.y;
    }

    function endGame() {
        isGameOver = true;
        bestScore = Math.max(bestScore, Math.floor(score));
        localStorage.setItem('pixelDashBestScore', String(bestScore));
        document.getElementById('game-message').textContent = 'Game Over - Press Space or click Restart';
        document.getElementById('restart-button').disabled = false;
        updateScorePanel();
    }

    function restartGame() {
        player.y = groundY - player.height;
        player.velocityY = 0;
        player.isOnGround = true;
        obstacles = [];
        score = 0;
        obstacleTimer = 0;
        nextObstacleDelay = 1300;
        isGameOver = false;
        jumpWasPressed = true;
        landTimer = 0;
        document.getElementById('game-message').textContent = 'Press Space or Up to jump';
        document.getElementById('restart-button').disabled = true;
        updateScorePanel();
    }

    function moveClouds(deltaTime) {
        clouds.forEach(function(cloud) {
            cloud.x -= cloud.speed * (deltaTime / 16);
            if (cloud.x < -90) {
                cloud.x = gameWidth + 90;
            }
        });
    }

    function draw() {
        drawBackground();
        drawClouds();
        drawGround();
        drawPlayer();
        drawObstacles();

        if (isGameOver) {
            drawGameOverPanel();
        }
    }

    function drawBackground() {
        context.fillStyle = '#8fd3ff';
        context.fillRect(0, 0, gameWidth, gameHeight);
    }

    function drawClouds() {
        context.fillStyle = '#ffffff';
        clouds.forEach(function(cloud) {
            context.beginPath();
            context.arc(cloud.x, cloud.y + 16, 18, 0, Math.PI * 2);
            context.arc(cloud.x + 25, cloud.y + 5, 25, 0, Math.PI * 2);
            context.arc(cloud.x + 58, cloud.y + 17, 18, 0, Math.PI * 2);
            context.fill();
        });
    }

    function drawGround() {
        context.fillStyle = '#5f8f3d';
        context.fillRect(0, groundY, gameWidth, gameHeight - groundY);

        context.fillStyle = '#9be56d';
        for (let x = 0; x < gameWidth; x += 36) {
            context.fillRect(x, groundY, 18, 7);
        }
    }

    function drawPlayer() {
        drawSpritePlayer();

        if (isGameOver) {
            context.fillStyle = 'rgba(31, 41, 51, 0.32)';
            context.fillRect(player.x - 4, player.y - 3, player.width + 8, player.height + 6);
        }
    }

    function drawSpritePlayer() {
        const frame = getSpriteFrame();

        if (!frame.complete || frame.naturalWidth === 0) {
            drawFallbackPlayer();
            return;
        }

        const displayHeight = 86;
        const displayWidth = displayHeight * (frame.naturalWidth / frame.naturalHeight);
        const centerX = player.x + player.width / 2;
        const footY = player.y + player.height;
        const runBounce = player.isOnGround && !isGameOver ? Math.sin(animationFrame * Math.PI) * 2 : 0;
        const drawX = centerX - displayWidth / 2;
        const drawY = footY - displayHeight + runBounce;

        drawRunnerShadow(centerX, footY);

        context.drawImage(
            frame,
            drawX,
            drawY,
            displayWidth,
            displayHeight
        );
    }

    function getSpriteFrame() {
        if (isGameOver) {
            return playerSprites.fall[0];
        }

        if (!player.isOnGround) {
            if (player.velocityY < -1) {
                return playerSprites.jump[Math.floor(animationFrame * 0.8) % playerSprites.jump.length];
            }

            return playerSprites.fall[Math.floor(animationFrame * 0.8) % playerSprites.fall.length];
        }

        return playerSprites.run[Math.floor(animationFrame) % playerSprites.run.length];
    }

    function drawRunnerShadow(centerX, footY) {
        context.fillStyle = 'rgba(31, 41, 51, 0.18)';
        context.beginPath();
        context.ellipse(centerX + 2, footY + 5, 28, 6, 0, 0, Math.PI * 2);
        context.fill();
    }

    function drawFallbackPlayer() {
        context.fillStyle = isGameOver ? '#b8b8b8' : '#ffd166';
        context.strokeStyle = '#2d3142';
        context.lineWidth = 4;
        context.fillRect(player.x, player.y, player.width, player.height);
        context.strokeRect(player.x, player.y, player.width, player.height);

        context.fillStyle = '#2d3142';
        context.fillRect(player.x + 14, player.y + 22, 6, 6);
        context.fillRect(player.x + 32, player.y + 22, 6, 6);
    }

    function drawObstacles() {
        obstacles.forEach(function(obstacle) {
            drawSpikeObstacle(obstacle);
        });
    }

    function drawSpikeObstacle(obstacle) {
        const spikeCount = 3;
        const spikeWidth = obstacle.width / spikeCount;

        context.fillStyle = '#4b5563';
        context.strokeStyle = '#1f2933';
        context.lineWidth = 3;

        for (let index = 0; index < spikeCount; index++) {
            const left = obstacle.x + index * spikeWidth;
            const center = left + spikeWidth / 2;
            const right = left + spikeWidth;

            context.beginPath();
            context.moveTo(left, groundY);
            context.lineTo(center, obstacle.y);
            context.lineTo(right, groundY);
            context.closePath();
            context.fill();
            context.stroke();
        }

        context.fillStyle = '#9ca3af';
        context.fillRect(obstacle.x + 4, groundY - 8, obstacle.width - 8, 6);
    }

    function drawGameOverPanel() {
        context.fillStyle = 'rgba(31, 41, 51, 0.88)';
        context.fillRect(170, 115, 460, 165);

        context.fillStyle = '#ffdddd';
        context.font = 'bold 42px Arial';
        context.textAlign = 'center';
        context.fillText('GAME OVER', gameWidth / 2, 178);

        context.fillStyle = '#ffffff';
        context.font = '24px Arial';
        context.fillText('Final Score: ' + Math.floor(score), gameWidth / 2, 224);
        context.fillText('Press Space to Restart', gameWidth / 2, 254);
        context.textAlign = 'left';
    }

    function updateScorePanel() {
        document.getElementById('score-value').textContent = Math.floor(score);
        document.getElementById('best-score-value').textContent = bestScore;
    }

    function randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function loadSpriteImages(action, count) {
        const images = [];

        for (let index = 0; index < count; index++) {
            const image = new Image();
            image.src = 'assets/player_' + action + '_' + index + '.png';
            images.push(image);
        }

        return images;
    }

}

if (form) {
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        document.getElementById('form-result').textContent = 'Thank you. Your feedback has been recorded for the project review.';
        form.reset();
    });
}
