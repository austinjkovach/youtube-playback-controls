var video;
var player;

var control;
var display;
var upButton;
var downButton;
var backButton;

var lastLocation = window.location.href;
var checkVideoLoop = setInterval(checkForVideo, 1000);
var checkHref = setInterval(checkHrefChange, 1000);

// check if href has changed every 1 second
function checkHrefChange() {
  if (lastLocation === window.location.href) return;
  lastLocation = window.location.href;

  cleanup();
  checkVideoLoop = setInterval(checkForVideo, 1000);
}

// set video
// if video is null, wait 1 second
// set video
function checkForVideo() {
  video = document.querySelector('video');
  if (!video) {
    return;
  } else {
    clearInterval(checkVideoLoop);
    buildControls();
  }
}

function cleanup() {
  if (checkVideoLoop) {
    clearInterval(checkVideoLoop);
  }

  if (control && control.parentNode) {
    control.parentNode.removeChild(control);
  }

  if (upButton) {
    upButton.removeEventListener('click', increaseSpeed);
  }
  if (downButton) {
    downButton.removeEventListener('click', decreaseSpeed);
  }
}

function buildControls() {
  cleanup();

  player = document.querySelector('.html5-video-player');

  control = document.createElement('div');
  display = document.createElement('div');
  upButton = document.createElement('button');
  downButton = document.createElement('button');
  topContainer = document.createElement('div');
  bottomContainer = document.createElement('div');
  // backButton = document.createElement('button');

  control.classList.add('extension-controls');

  display.textContent = `${video.playbackRate}x`;
  display.classList.add('extension-display');
  topContainer.classList.add('top-container');
  bottomContainer.classList.add('bottom-container');

  upButton.textContent = '+';
  upButton.classList.add('extension-button');
  upButton.setAttribute('id', 'up-button');

  downButton.textContent = '-';
  downButton.classList.add('extension-button');
  downButton.setAttribute('id', 'down-button');

  // backButton.textContent = '<<';
  // backButton.classList.add('extension-button');
  // backButton.setAttribute('id', 'back-button');

  upButton.addEventListener('click', increaseSpeed);
  downButton.addEventListener('click', decreaseSpeed);

  backButton.addEventListener('click', () => jumpBack(5));

  // control.appendChild(backButton);
  control.appendChild(topContainer);
  control.appendChild(bottomContainer);
  bottomContainer.appendChild(downButton);
  bottomContainer.appendChild(upButton);
  topContainer.appendChild(display);

  player.appendChild(control);
}

document.addEventListener('keydown', function (e) {
  if (!e.ctrlKey) {
    return;
  }
  if (e.key === '=' || e.key === 'l') {
    increaseSpeed();
  } else if (e.key === '-' || e.key === 'j') {
    decreaseSpeed();
  }
});

function increaseSpeed() {
  video.playbackRate += 0.25;
  updateDisplay();
  return false;
}

function decreaseSpeed() {
  if (video.playbackRate <= 1) {
    video.playbackRate -= 0.25;
  } else {
    video.playbackRate -= 0.5;
  }

  updateDisplay();
  return false;
}

function jumpBack(duration) {
  video.currentTime -= duration;
  video.playbackRate -= 0.25;
  updateDisplay();
  return false;
}

function skipBack() {
  video.currentTime -= 10;
  return false;
}

function updateDisplay() {
  display.textContent = `${video.playbackRate}x`;
  return false;
}

/*
  Color Palette
   #EAE1DF
   #B79492
   #917C78
   #545E56
   #667761
*/

window.addEventListener('beforeunload', cleanup);
