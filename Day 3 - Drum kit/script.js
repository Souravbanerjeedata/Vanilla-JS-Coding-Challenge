"use strict";

const keys = document.querySelectorAll(".key");

function playSound(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  if (!audio) return; // stop function
  audio.currentTime = "";
  audio.play();
  key.classList.add("playing");
}

function removeTransition(e) {
  if (e.propertyName !== "transform") return; // skip if it's not transform
  this.classList.remove("playing");
}

window.addEventListener("keydown", playSound);

keys.forEach((key) => {
  key.addEventListener("transitionend", removeTransition);
});
