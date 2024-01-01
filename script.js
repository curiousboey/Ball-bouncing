document.addEventListener("DOMContentLoaded", function () {
    const box = document.querySelector(".box");
    const hitSound = document.getElementById("hitSound");
    const pauseResumeButton = document.getElementById("pauseResumeButton");
    const restartButton = document.getElementById("restartButton");
    const addBallButton = document.getElementById("addBallButton");
    const speedUpButton = document.getElementById("speedUpButton");
    const slowDownButton = document.getElementById("slowDownButton");
    const ballSpeedElement = document.getElementById("ballSpeed");
    const numBallsElement = document.getElementById("numBalls");
    const hitsCountElement = document.getElementById("hitsCount");

    let animationId;
    let balls = [];
    let ballSpeed = { x: 7, y: 5 };
    let hitsCount = 0;

    function createBall() {
        const newBall = document.createElement("div");
        newBall.classList.add("ball");
        box.appendChild(newBall);

        newBall.style.backgroundImage = "url('football-texture.jpg')";

        balls.push({ element: newBall, posX: 9, posY: 0, speed: { x: ballSpeed.x, y: ballSpeed.y } });
        updateNumBalls();
    }

    function updateBallPosition(ball) {
        ball.posX += ball.speed.x;
        ball.posY += ball.speed.y;

        if (ball.posX < 0 || ball.posX > box.clientWidth - ball.element.clientWidth) {
            ball.speed.x = -ball.speed.x;
            playHitSound();
            updateHitsCount();
        }

        if (ball.posY < 0 || ball.posY > box.clientHeight - ball.element.clientHeight) {
            ball.speed.y = -ball.speed.y;
            playHitSound();
            updateHitsCount();
        }

        ball.element.style.transform = `translate(${ball.posX}px, ${ball.posY}px)`;
    }

    function playHitSound() {
        hitSound.currentTime = 0;
        hitSound.play();
    }

    function animate() {
        balls.forEach((ball) => {
            updateBallPosition(ball);
        });

        updateBallSpeedDisplay();

        animationId = requestAnimationFrame(animate);
    }

    function toggleAnimation() {
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = undefined;
            pauseResumeButton.innerText = "Resume";
        } else {
            animate();
            pauseResumeButton.innerText = "Pause";
        }
    }

    function restart() {
        balls.forEach((ball) => {
            box.removeChild(ball.element);
        });
        ballSpeed = { x: 7, y: 5 };
        balls = [];
        hitsCount = 0;
        updateNumBalls();
        createBall(); // Initial ball
        if (animationId === undefined) {
            animate();
        }
        pauseResumeButton.innerText = "Pause";
    }

    function addBall() {
        createBall();
    }

    function speedUp() {
        ballSpeed.x += 1;
        ballSpeed.y += 1;
        updateBallSpeedDisplay();
        updateBallSpeed();
    }

    function slowDown() {
        if (ballSpeed.x > 1 && ballSpeed.y > 1) {
            ballSpeed.x -= 1;
            ballSpeed.y -= 1;
            updateBallSpeedDisplay();
            updateBallSpeed();
        }
    }

    function updateBallSpeedDisplay() {
        ballSpeedElement.innerText = `(${ballSpeed.x}, ${ballSpeed.y})`;
    }

    function updateBallSpeed() {
        balls.forEach((ball) => {
            ball.speed.x = ballSpeed.x;
            ball.speed.y = ballSpeed.y;
        });
    }

    function updateNumBalls() {
        numBallsElement.innerText = balls.length;
    }

    function updateHitsCount() {
        hitsCount++;
        hitsCountElement.innerText = hitsCount;
    }

    pauseResumeButton.addEventListener("click", toggleAnimation);
    restartButton.addEventListener("click", restart);
    addBallButton.addEventListener("click", addBall);
    speedUpButton.addEventListener("click", speedUp);
    slowDownButton.addEventListener("click", slowDown);

    // Initial ball
    createBall();
    animate();
});
