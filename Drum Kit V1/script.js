const drumBtns = document.querySelectorAll(".drum");

// assigning buttons to the sound
function makeSound(key) {
  switch (key) {
    case "w":
      let audio1 = new Audio("sounds/tom-4.mp3");
      audio1.play();
      break;
    case "a":
      const audio2 = new Audio("sounds/tom-3.mp3");
      audio2.play();
      break;
    case "s":
      const audio3 = new Audio("sounds/tom-2.mp3");
      audio3.play();
      break;
    case "d":
      const audio4 = new Audio("sounds/tom-1.mp3");
      audio4.play();
      break;
    case "j":
      const audio5 = new Audio("sounds/snare.mp3");
      audio5.play();
      break;
    case "k":
      const audio6 = new Audio("sounds/kick-bass.mp3");
      audio6.play();
      break;
    case "l":
      const audio7 = new Audio("sounds/crash.mp3");
      audio7.play();
      break;
  }
}

// Animate the button upon clicking
function btnAnimation(key) {
  const activeBtn = document.querySelector(`.${key}`);
  activeBtn.classList.add("playing");
  setTimeout(() => {
    activeBtn.classList.remove("playing");
  }, 100);
}

// Play sound on button press
drumBtns.forEach((drum) => {
  drum.addEventListener("click", (e) => {
    const btnText = e.target.innerText;
    makeSound(btnText);
    btnAnimation(btnText);
  });
});

// Play sound on key press
window.addEventListener("keydown", (e) => {
  const btn = document.querySelector(`.${e.key}`);
  makeSound(e.key);
  btnAnimation(e.key);
});
