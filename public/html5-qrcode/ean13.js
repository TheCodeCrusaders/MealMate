async function requestCameraPermission() {
  try {
    await navigator.mediaDevices.getUserMedia({ video: true });
  } catch (error) {
    console.error("Error requesting camera permission:", error);
    return false;
  }
  return true;
}

async function startScanner() {
  const hasPermission = await requestCameraPermission();
  if (!hasPermission) {
    console.error("Camera permission denied");
    return;
  }

  scanner.start(
    { facingMode: "environment" },
    onScanSuccess,
    onScanFailure,
    { formatsToSupport: ["ean_13"] }
  )
  .catch((error) => {
    console.error("Error starting scanner:", error);
  });
}

function stopScanner() {
  scanner.stop()
    .then(() => {
      console.log("Scanner stopped");
    })
    .catch((error) => {
      console.error("Error stopping scanner:", error);
    });
}

startButton.addEventListener("click", startScanner);
startButton.addEventListener("touchstart", startScanner);

stopButton.addEventListener("click", stopScanner);
stopButton.addEventListener("touchstart", stopScanner);