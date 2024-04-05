let popup = document.querySelector(".popup")
let wifiIcon = document.querySelector(".icon i")
let popupTitle = document.querySelector(".popup .title")
let popupDesc = document.querySelector(".desc")
let reconnectBtn = document.querySelector(".reconnect")

let isOnline = true
let intervalId
let timer = 10

const checkConnection = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts")
    isOnline = response.status >= 200 && response.status < 300
  } catch (error) {
    isOnline = false
  }
  clearInterval(intervalId)
  handlePopup(isOnline)
}

const handlePopup = (status) => {
  if (status) {
    wifiIcon.className = "ph ph-wifi-high"
    popupTitle.innerText = "Restored Connection"
    popupDesc.innerHTML = "Your device is now successfully connected to the internet"
    popup.classList.add("online")
    return setTimeout(() => popup.classList.remove("show"), 2000);
  }
  wifiIcon.className = "ph ph-wifi-slash"
  popupTitle.innerText = "Lost Connection"
  popupDesc.innerHTML = "Your network is unavailable. We will attempt to reconnect you in <b>10</b> seconds."
  popup.className = "popup show"

  intervalId = setInterval(() => {
    timer--
    if (timer === 0) {
      timer = 10
      checkConnection()
    }
    popup.querySelector(".desc b").innerText = timer
  }, 1000);
}

setInterval(() => isOnline && checkConnection(), 3000)
reconnectBtn.addEventListener("click", () => {
  checkConnection()
  timer = 10
})
