document.addEventListener("DOMContentLoaded", function () {
    const box = document.querySelector(".box");
    const audio = new Audio("hit_sound.mp3"); // Replace with the correct path

    // Create a new element for the ball trail
    const trail = document.createElement("div");
    trail.classList.add("trail");
    box.appendChild(trail);

    const ball = document.getElementById("ball");

    let posX = 5;
    let posY = 0;
    let speedX = 7;
    let speedY = 5;

    function updateBallPosition() {
        posX += speedX;
        posY += speedY;

        if (posX < 0 || posX > box.clientWidth - ball.clientWidth) {
            speedX = -speedX;
            playHitSound(); // Play sound on wall hit
        }

        if (posY < 0 || posY > box.clientHeight - ball.clientHeight) {
            speedY = -speedY;
            playHitSound(); // Play sound on wall hit
        }

        // Update the ball's position
        ball.style.transform = `translate(${posX}px, ${posY}px)`;

        // Update the trail's position
        trail.style.left = `${posX}px`;
        trail.style.top = `${posY}px`;

        // Create a new trail element
        const newTrail = document.createElement("div");
        newTrail.classList.add("trail");
        newTrail.style.left = `${posX}px`;
        newTrail.style.top = `${posY}px`;

        // Append the new trail element to the box
        box.appendChild(newTrail);

        // Remove the oldest trail element
        if (box.children.length > 50) {
            box.removeChild(box.children[0]);
        }
    }

    function playHitSound() {
        audio.currentTime = 0; // Reset the audio to the beginning
        audio.play();
    }

    function animate() {
        updateBallPosition();
        requestAnimationFrame(animate);
    }

    animate();
});
