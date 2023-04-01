document.addEventListener("DOMContentLoaded", function() {
  const { BrowserMultiFormatReader } = ZXing;
  const video = document.getElementById("video");
  const scanButton = document.getElementById("scan-button");

  const reader = new BrowserMultiFormatReader();
  reader.setPossibleFormats([ZXing.BarcodeFormat.EAN_13]);
  let scanning = false;

  function startScan() {
    if (!scanning) {
      scanning = true;
      video.style.display = "block";
      scanButton.textContent = "Stop scanning";

      reader.decodeFromVideoDevice(null, video, (result, err) => {
        if (result) {
          console.log("Found barcode:", result.getText());
          stopScan();
        }
        if (err && !(err instanceof ZXing.NotFoundException)) {
          console.error(err);
          stopScan();
        }
      });
    }
  }

  function stopScan() {
    if (scanning) {
      scanning = false;
      video.style.display = "none";
      scanButton.textContent = "Start scanning";
      reader.reset();
    }
  }

  scanButton.addEventListener("click", () => {
    if (scanning) {
      stopScan();
    } else {
      startScan();
    }
  });
});