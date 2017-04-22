
var video;
var player;

var control;
var display;
var upButton;
var downButton;
var backButton;

var lastLocation = window.location.href
var checkVideoLoop = setInterval(checkForVideo, 1000)
var checkHref = setInterval(checkHrefChange, 1000)

// check if href has changed every 1 second
function checkHrefChange() {
  if(lastLocation === window.location.href) return;
  lastLocation = window.location.href
  checkVideoLoop = setInterval(checkForVideo, 1000)
}

// set video
// if video is null, wait 1 second
// set video
function checkForVideo() {
  video = document.querySelector('video')
  if(!video) {
    return
  } else {

    clearInterval(checkVideoLoop)
    buildControls()
  }
}

function buildControls() {

  player = document.querySelector('#player-api')

  control = document.createElement('div')
  display = document.createElement('div')
  upButton = document.createElement('button')
  downButton = document.createElement('button')
  backButton = document.createElement('button')

  control.classList.add('extension-controls')

  display.textContent = video.playbackRate
  display.classList.add('extension-display')

  upButton.textContent = "+"
  upButton.classList.add('extension-button')
  upButton.setAttribute('id', 'up-button')

  downButton.textContent = "-"
  downButton.classList.add('extension-button')
  downButton.setAttribute('id', 'down-button')

  backButton.textContent = "<<"
  backButton.classList.add('extension-button')
  backButton.setAttribute('id', 'back-button')

  upButton.addEventListener('click', increaseSpeed)
  downButton.addEventListener('click', decreaseSpeed)

  backButton.addEventListener('click', previous30)


  control.appendChild(backButton)
  control.appendChild(downButton)
  control.appendChild(display)
  control.appendChild(upButton)

  player.appendChild(control)
}

document.addEventListener('keydown', function(e) {
  if(!e.ctrlKey) {
    return
  }

  if(e.keyCode === 187) {         // 'ctrl' + '='
    increaseSpeed()
  } else if(e.keyCode === 189) {  // 'ctrl' + '-'
    decreaseSpeed()
  } else if(e.keyCode === 48) {   // 'ctrl' + '0'
    previous30()
  } else if(e.keyCode === 72) {   // 'ctrl' + 'h'
    window.location = "/"
  }

})

function increaseSpeed() {
  video.playbackRate += 0.5
  updateDisplay()
  return false;
}

function decreaseSpeed() {
  video.playbackRate -= 0.5
  updateDisplay()
  return false;
}

function previous30() {
  video.currentTime -= 30
  return false;
}

function updateDisplay() {
  display.textContent = video.playbackRate
  return false
}


/*
  Color Palette
   #EAE1DF
   #B79492
   #917C78
   #545E56
   #667761
*/