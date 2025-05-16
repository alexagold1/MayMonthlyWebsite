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
