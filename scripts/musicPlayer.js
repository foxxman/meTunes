import { addZero } from "./supScripts.js";

export const musicPlayerInit = () => {
   console.log("Music");
  // audio-cover
  // audio-img
  //   audio-header
  // audio-player
  // audio-navigation
  // audio-button__play
  // audio-time__passed
  // audio-progress
  // audio-progress__timing
  // audio-time__total
  const audio = document.querySelector(".audio");
  // const audioCover = document.querySelector('.audio-cover');
  const audioImg = document.querySelector(".audio-img");
  const audioHeader = document.querySelector(".audio-header");
  const audioPlayer = document.querySelector(".audio-player");
  const audioNavigation = document.querySelector(".audio-navigation");
  const audioButtonPlay = document.querySelector(".audio-button__play");
  const audioTimePassed = document.querySelector(".audio-time__passed");
  const audioProgress = document.querySelector(".audio-progress");
  const audioProgressTiming = document.querySelector(".audio-progress__timing");
  const audioTimeTotal = document.querySelector(".audio-time__total");

  const playlist = ["hello", "flow", "speed"];

  let trackIndex = 0;

  const prevTrack = () => {
    if (trackIndex !== 0) {
      trackIndex--;
    } else {
      trackIndex = playlist.length - 1;
    }
    loadTrack();
  };

  const nextTrack = () => {
    if (trackIndex == playlist.length - 1) {
      trackIndex = 0;
    } else {
      trackIndex++;
    }
    loadTrack();
  };

  const loadTrack = () => {
    const isPlayed = audioPlayer.paused;
    const track = playlist[trackIndex];

    audioImg.src = `./audio/${track}.jpg`;
    audioHeader.textContent = track.toUpperCase();
    audioPlayer.src = `./audio/${track}.mp3`;

    if (isPlayed) {
      audioPlayer.pause();
    } else {
      audioPlayer.play();
    }
  };

  audioNavigation.addEventListener("click", (event) => {
    const target = event.target;
    if (target.classList.contains("audio-button__play")) {
      audio.classList.toggle("play");
      audioButtonPlay.classList.toggle("fa-play");
      audioButtonPlay.classList.toggle("fa-pause");

      if (audioPlayer.paused) {
        audioPlayer.play();
      } else {
        audioPlayer.pause();
      }
    }

    if (target.classList.contains("audio-button__prev")) {
      prevTrack();
    }

    if (target.classList.contains("audio-button__next")) {
      nextTrack();
    }
  });

  audioPlayer.addEventListener("ended", () => {
    nextTrack();
    audioPlayer.play();
  });

  audioPlayer.addEventListener("timeupdate", () => {
    const duration = audioPlayer.duration;
    const currentTime = audioPlayer.currentTime;
    const progress = (currentTime / duration) * 100;

    audioProgressTiming.style.width = progress + "%";

    let minutePassed = Math.floor(currentTime / 60) || "0"; //минуты
    let secondsPassed = Math.floor(currentTime % 60) || "0"; //секунды

    let minuteTotal = Math.floor(duration / 60) || "0";
    let secondsTotal = Math.floor(duration % 60) || "0";

    audioTimePassed.textContent =
      addZero(minutePassed) + ":" + addZero(secondsPassed);
    audioTimeTotal.textContent =
      addZero(minuteTotal) + ":" + addZero(secondsTotal);
  });

  audioProgress.addEventListener("click", (event) => {
    const x = event.offsetX;
    const allWidth = audioProgress.clientWidth;
    const progress = (x / allWidth) * audioPlayer.duration;
    audioPlayer.currentTime = progress;
  });
};
