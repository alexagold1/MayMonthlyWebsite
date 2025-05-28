document.addEventListener("DOMContentLoaded", () => {
  const modal = new bootstrap.Modal(document.getElementById("knicksModal"));
  modal.show();
});
// Play intro song once on the first click anywhere on the page
window.addEventListener(
  "click",
  () => {
    const audio = document.getElementById("introSong");
    audio.play();
  },
  { once: true }
);

// Function to toggle mute/unmute and switch the mute button image
function mute() {
  const audio = document.getElementById("introSong");
  const btnImg = document.getElementById("muteButton");

  if (audio.muted) {
    audio.muted = false;
    btnImg.src = "imgs/soundon.jpg";
  } else {
    audio.muted = true;
    btnImg.src = "imgs/sound off.jpg";
  }
}
document.getElementById("meetTeamBtn").addEventListener("click", function (e) {
  e.preventDefault(); // prevent immediate navigation

  // Create basketball element
  const ball = document.createElement("img");
  ball.src =
    "https://upload.wikimedia.org/wikipedia/commons/7/7a/Basketball.png";
  ball.style.position = "fixed";
  ball.style.width = "100px";
  ball.style.height = "100px";
  ball.style.left = "50%";
  ball.style.top = "50%";
  ball.style.transform = "translate(-50%, -50%) scale(1)";
  ball.style.zIndex = "1050"; // above modal and navbar
  ball.style.transition = "transform 1s ease, opacity 1s ease";

  document.body.appendChild(ball);

  // Trigger animation: grow and come out (scale up and move closer)
  setTimeout(() => {
    ball.style.transform = "translate(-50%, -50%) scale(5)";
    ball.style.opacity = "0";
  }, 50);

  // After animation, redirect
  setTimeout(() => {
    window.location.href = "index.html";
  }, 1050);
});
