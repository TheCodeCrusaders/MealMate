//CONSTANT DECLERATIONS
const postpicplace = document.getElementById("postpicplace");
const fileInput = document.getElementById('file-input');
const resultDiv = document.getElementById('result');
const subbutton = document.getElementById('submitbu');
const showpic = document.getElementById("showpic");
const quagga = new Quagga();




//EVENT LISTENERS
subbutton.addEventListener('click', async function () {
  const file = fileInput.files[0];
  const image = new Image();
  image.src = URL.createObjectURL(file);
  await new Promise((resolve) => {
    image.onload = resolve;
  });
  quagga.init({
    inputStream: {
      type: 'ImageStream',
      src: image,
    },
    decoder: {
      readers: ['ean_reader'],
    },
  }, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    quagga.start();
  });
  quagga.onDetected((result) => {
    console.log(result);
    alert(`Barcode detected: ${result.codeResult.code}`);
  });
});




//FUNCTION DECLERATIONS
function displayImages() {
  postpicplace.textContent = ""; // Clear existing content
  imageArray.forEach((image, index) => {
    const imageDiv = document.createElement("div");
    imageDiv.className = "image";

    const img = document.createElement("img");
    img.src = URL.createObjectURL(image);
    img.alt = "image";
    imageDiv.appendChild(img);

    const span = document.createElement("span");
    span.textContent = "×";
    span.onclick = () => deleteImage(index);
    imageDiv.appendChild(span);

    postpicplace.appendChild(imageDiv);
  });
}