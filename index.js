var video = document.querySelector('video')
var player = document.querySelector('#player-api')

var control = document.createElement('div')
var display = document.createElement('div')
var upButton = document.createElement('button')
var downButton = document.createElement('button')
var backButton = document.createElement('button')

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

document.addEventListener('keydown', function(e) {
  if(!e.ctrlKey) {
    return
  }

  if(e.keyCode === 187) {
    increaseSpeed()
  } else if(e.keyCode === 189) {
    decreaseSpeed()
  } else if(e.keyCode === 48) {
    previous30()
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

control.appendChild(backButton)
control.appendChild(downButton)
control.appendChild(display)
control.appendChild(upButton)

player.appendChild(control)

// #EAE1DF

// #B79492

// #917C78

// #545E56

// #667761
