//CONSTANT DECLARATIONS
const startscanning = document.getElementById("start_scanning");
const viewport = document.querySelector(".viewport");

//EVENT LISTENERS
startscanning.addEventListener("click", async function () {
  console.log("Started Scanning");
  Quagga.init({
    inputStream: {
      name: "Live",
      type: "LiveStream",
      constraints: {
        width: { min: 640 },
        height: { min: 480 },
        facingMode: "environment"
      },
      target: viewport,
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
      alert("Error initializing Quagga: " + err.message);
      return;
    }
    Quagga.start();
  });

  Quagga.onProcessed(function (result) {
    if (result) {
      const drawingCtx = Quagga.canvas.ctx.overlay;
      const drawingCanvas = Quagga.canvas.dom.overlay;
      drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));

      if (result.boxes) {
        result.boxes.filter(box => box !== result.box).forEach(box => {
          Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: "green", lineWidth: 2 });
        });
      }
      if (result.box) {
        Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: "#00F", lineWidth: 2 });
      }
      if (result.codeResult && result.codeResult.code) {
        Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: 'red', lineWidth: 3 });
      }
    }
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