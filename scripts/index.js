import { radioPlayerInit } from "./radioPlayer.js";
import { musicPlayerInit } from "./musicPlayer.js";
import { videoPlayerInit } from "./videoPlayer.js";

//querySelectorAll получает все объекты с заданым параметром (коллекцию)
const playerBtn = document.querySelectorAll(".player-btn");
const playerBlock = document.querySelectorAll(".player-block");
const temp = document.querySelector(".temp"); //надпись под кнопками

const deactivationPlayer = () => {
  temp.style.display = "none";
  playerBlock.forEach((item) => item.classList.remove("active"));
  playerBtn.forEach((item) => item.classList.remove("active"));
};

playerBtn.forEach((btn, i) =>
  btn.addEventListener("click", () => {
    deactivationPlayer();
    btn.classList.add("active");
    //i - индекс элементов в коллекциях
    playerBlock[i].classList.add("active");
  })
);

// console.log(playerBlock);
// console.log(playerBtn);

radioPlayerInit();
musicPlayerInit();
videoPlayerInit();
