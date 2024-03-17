const getVideoBtn = document.querySelector(".input-container button");
const getVideoInput = document.querySelector(".input-container input");
const videoTitle = document.querySelector(".video-title");
const videoInfo = document.querySelector(".video-info");
const player = document.querySelector(".players-container iframe");
const progressAudio = document.querySelector("#progress-audio .progress-bar-fill");
const progressVideo = document.querySelector("#progress-video .progress-bar-fill");
const finishMsg = document.querySelector(".dl-finish-info");

window.onload = () => {
  getVideoBtn.onclick = () => {
    if(getVideoInput.value && getVideoInput.value !== ''){
      window.electronAPI.getVideoUrl(getVideoInput.value)
    }
    else {
      console.log("Please paste url in input.")
    }
  }

  window.electronAPI.onMsgToRenderer((data) => {
    if(data.type === "video-info"){
      videoTitle.innerText = data.payload.title;
      videoInfo.innerText = data.payload.details.description;
      player.src = data.payload.details.embed.iframeUrl;
      player.width = data.payload.details.embed.width;
      player.height = data.payload.details.embed.height;
      player.title = data.payload.details.title;
    }
    else if(data.type === "video-dl-progress"){
      console.log(data.payload)
      progressAudio.style.width = `${data.payload.progress.audio}%`
      progressVideo.style.width = `${data.payload.progress.video}%`
    }
    else if(data.type === "video-dl-finish"){
      finishMsg.innerText = `Download finish, you can find file to ${data.payload.videoPath}.`
    }
  });
}