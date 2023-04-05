document.addEventListener('DOMContentLoaded', () => {
    const result = document.getElementById('result');
    const cameraSelect = document.getElementById('camera-select');
    const startBtn = document.getElementById('start-btn');
    const stopBtn = document.getElementById('stop-btn');

    const html5QrCodeScanner = new Html5Qrcode('video', { fps: 10, qrbox: { width: 250, height: 250 } }, /* verbose= */ false);

    function onScanSuccess(decodedText, decodedResult) {
        console.log('1')
        if (decodedResult.format === 'ean_13') {
            html5QrCodeScanner.clear();
            result.textContent = `Scanned EAN-13: ${decodedText}`;
            startBtn.disabled = false;
            stopBtn.disabled = true;
        }
    }

    function onScanFailure(error) {
        console.log('2')
        console.error(`Error: ${error}`);
    }

    function startScanning() {
        console.log('3')
        html5QrCodeScanner.render(onScanSuccess,onScanFailure)
        startBtn.disabled = true;
        stopBtn.disabled = false;
    }

    function stopScanning() {
        console.log('4')
        html5QrCodeScanner.clear();
        startBtn.disabled = false;
        stopBtn.disabled = true;
    }

    startBtn.addEventListener('click', startScanning);
    stopBtn.addEventListener('click', stopScanning);

    Html5Qrcode.getCameras().then((cameras) => {
        console.log('5')
        cameras.forEach((camera) => {
            const option = document.createElement('option');
            option.value = camera.id;
            option.textContent = camera.label || `Camera ${camera.id}`;
            cameraSelect.appendChild(option);
        });
    }).catch((error) => {
        console.error(`Error fetching cameras: ${error}`);
    });
});