const startscanning = document.getElementById("start_scanning");
const viewport = document.querySelector(".viewport");

startscanning.addEventListener("click", async function () {
    viewport.style.display = "block";

    Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: viewport,
            constraints: {
                width: { min: 640 },
                height: { min: 480 },
                facingMode: "environment"
            },
        },
        locator: { halfSample: true },
        decoder: {
            readers: ["ean_reader"],
            locate: true
        },
        numOfWorkers: 4,
        locate: true,
        patchSize: "medium"
    }, function (err) {
        if (err) {
            console.log(err);
            return;
        }
        Quagga.start();
    });

    Quagga.onDetected(function (result) {
        var code = result.codeResult.code;
        console.log("Barcode detected:", code);
        Quagga.stop();

        if (code.length > 13) {
            alert("Error: Barcode contains more than 13 numbers. Please scan again.");
            Quagga.start();
        } else if (confirm("Scan again?")) {
            Quagga.start();
        }
    });
});