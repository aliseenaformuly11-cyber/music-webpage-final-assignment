const stage = document.querySelector("#animationStage");
const record = document.querySelector("#record");
const pauseButton = document.querySelector("#pauseButton");
const restartButton = document.querySelector("#restartButton");
const directionButton = document.querySelector("#directionButton");
const animationStatus = document.querySelector("#animationStatus");

let position = 0;
let rotation = 0;
let direction = 1;
let isPlaying = true;
let previousTime = 0;

function updateRecord(timestamp) {
  const elapsed = previousTime ? Math.min(timestamp - previousTime, 32) : 0;
  previousTime = timestamp;

  if (isPlaying) {
    const maximumPosition = Math.max(stage.clientWidth - record.offsetWidth, 0);
    position += direction * elapsed * 0.16;
    rotation += direction * elapsed * 0.18;

    if (position >= maximumPosition) {
      position = maximumPosition;
      direction = -1;
    } else if (position <= 0) {
      position = 0;
      direction = 1;
    }

    const bounce = Math.sin(timestamp / 210) * 17;
    record.style.transform = `translate(${position}px, ${bounce}px) rotate(${rotation}deg)`;
  }

  window.requestAnimationFrame(updateRecord);
}

pauseButton.addEventListener("click", () => {
  isPlaying = !isPlaying;
  pauseButton.textContent = isPlaying ? "Pause" : "Play";
  animationStatus.textContent = isPlaying
    ? "Animation is playing."
    : "Animation is paused.";
});

restartButton.addEventListener("click", () => {
  position = 0;
  rotation = 0;
  direction = 1;
  isPlaying = true;
  pauseButton.textContent = "Pause";
  animationStatus.textContent = "Animation restarted from the beginning.";
});

directionButton.addEventListener("click", () => {
  direction *= -1;
  animationStatus.textContent = "The record changed direction.";
});

document.querySelector("#year").textContent = new Date().getFullYear();
window.requestAnimationFrame(updateRecord);
