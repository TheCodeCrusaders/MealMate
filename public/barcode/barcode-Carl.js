const fileInput = document.getElementById('file-input');
const scanButton = document.getElementById('scan-button');

// Initialize Quagga
Quagga.init({
  inputStream: {
    name: 'FileInput',
    size: 2800, // Image size
    singleChannel: false,
  },
  decoder: {
    readers: ['ean_reader', 'code_128_reader', 'upc_reader', 'code_39_reader', 'code_39_vin_reader', 'codabar_reader', 'i2of5_reader', '2of5_reader', 'code_93_reader', 'code_ean_8_reader', 'upc_e_reader', 'upc_ean_reader'], // List of barcode types to scan
  },
  locate: true,
  numOfWorkers: 8,
}, (err) => {
  if (err) {
    console.error(err);
    return;
  }

  // Start Quagga when initialization is complete
  Quagga.start();
});

// Listen for file input changes
fileInput.addEventListener('change', () => {
  if (fileInput.files && fileInput.files[0]) {
    // Load the selected file into Quagga
    Quagga.decodeSingle({
      src: URL.createObjectURL(fileInput.files[0]),
      numOfWorkers: 16, // Disable web workers to prevent a CORS error
    }, (result) => {
      if (result && result.codeResult) {
        console.log(`Barcode detected: ${result.codeResult.code}`);
      } else {
        console.log('No barcode detected');
      }
    });
  }
});

// Listen for scan button clicks
scanButton.addEventListener('click', () => {
  fileInput.click();
});