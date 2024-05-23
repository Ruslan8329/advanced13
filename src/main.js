// import "./style.css";
import Player from "@vimeo/player";

document.addEventListener("DOMContentLoaded", () => {
  const iframe = document.getElementById("vimeo-player");
  const player = new Player(iframe);

  const saveCurrentTime = () => {
    player
      .getCurrentTime()
      .then((seconds) => {
        localStorage.setItem("vimeo-current-time", seconds);
      })
      .catch((error) => {
        console.error("error", error);
      });
  };

  const savedTime = localStorage.getItem("vimeo-current-time");
  if (savedTime !== null) {
    player.setCurrentTime(parseFloat(savedTime)).catch((error) => {
      console.error("error", error);
    });
  }

  setInterval(saveCurrentTime, 3000);

  player.on("pause", saveCurrentTime);
  player.on("ended", saveCurrentTime);
});
