'use strict';

const video = document.createElement('video');
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

const qrCodeReader = new Html5Qrcode('reader');

function startCamera() {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
      video.srcObject = stream;
      video.play();
      requestAnimationFrame(tick);
    })
    .catch((err) => console.error('Unable to get access to camera', err));
}

function tick() {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  qrCodeReader.scan((result) => {
    console.log(`QR Code detected: ${result}`);
  });

  requestAnimationFrame(tick);
}

document.getElementById('startButton').addEventListener('click', () => {
  startCamera();
});