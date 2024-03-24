const getVideoBtn = document.querySelector(".input-container button");
const downloadBtn = document.querySelector(".download-button");
const getVideoInput = document.querySelector(".input-container input");
const videoTitle = document.querySelector(".video-title");
const videoInfo = document.querySelector(".video-info");
const player = document.querySelector(".players-container iframe");
const playerContainer = document.querySelector(".players-container");
const progressAudio = document.querySelector("#progress-audio .progress-bar-fill");
const progressVideo = document.querySelector("#progress-video .progress-bar-fill");
const finishMsg = document.querySelector(".dl-finish-info");

window.onload = () => {
  getVideoBtn.onclick = () => {
    if(getVideoInput.value && getVideoInput.value !== ''){
      window.electronAPI.getVideo({url: getVideoInput.value, type: 'only-info'})
    }
    else {
      console.log("Please paste url in input.")
    }
  }

  downloadBtn.onclick = () => {
    if(getVideoInput.value && getVideoInput.value !== ''){
      window.electronAPI.getVideo({url: getVideoInput.value, type: 'download-video'})
    }
    else {
      console.log("Please paste url in input.")
    }
  }

  getVideoInput.onchange = () => {
    videoTitle.innerText = "";
    videoInfo.innerText = "";
    finishMsg.style.display = "none";
    playerContainer.style.display = "none";
  }

  window.electronAPI.onMsgToRenderer((data) => {
    if(data.type === "video-info"){
      videoTitle.style.display = "block";
      videoInfo.style.display = "block";
      playerContainer.style.display = "block";
      videoTitle.innerText = data.payload.title;
      videoInfo.innerText = data.payload.details.description;
      player.src = data.payload.details.embed.iframeUrl;
      player.width = data.payload.details.embed.width > 1000 ? data.payload.details.embed.width/2 : data.payload.details.embed.width;
      player.height = data.payload.details.embed.width > 1000 ? data.payload.details.embed.height/2 : data.payload.details.embed.height;
      player.title = data.payload.details.title;
    }
    else if(data.type === "video-dl-progress"){
      console.log(data.payload)
      progressAudio.style.width = `${data.payload.progress.audio}%`
      progressVideo.style.width = `${data.payload.progress.video}%`
    }
    else if(data.type === "video-dl-finish"){
      finishMsg.style.display = "block";
      finishMsg.innerText = `Download finish, your file is ${data.payload.videoPath}.`
    }
  });
}