

// Get the input element for the file
const fileInput = document.getElementById('file-input');

// Get the result element to show the detected barcode
const resultDiv = document.getElementById('result');
//submit button
const subbutton=document.getElementById('submitbu');

const showpic=document.getElementById("showpic");

const postpicplace=document.getElementById("postpicplace");

function displayImages() {
  let images = ""
  imageArray.forEach((image, index) => {
    images += `<div class="image">
                <img src="${URL.createObjectURL(image)}" alt="image">
                <span onclick="deleteImage(${index})">&times;</span>
              </div>`
  })
  postpicplace.innerHTML = images
}

let imageArray =[];
showpic.addEventListener('click', function(){
console.log("It runs");
const fil=fileInput.files
imageArray.push(fil[0])
displayImages()

});









const quagga = new Quagga();




// Add an event listener to the submit button for when a file is selected
subbutton.addEventListener('click', async function() {//Works
// Get the uploaded file
const file = fileInput.files[0];

  // Get the selected file from the input element
  // Create a new image element and set its source to the uploaded file
  const image = new Image();
  image.src = URL.createObjectURL(file);

  // Wait for the image to load
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

   // Start the barcode detection
   quagga.start();
  });
  // Listen for barcode detection events
  quagga.onDetected((result) => {
    console.log(result);
    alert(`Barcode detected: ${result.codeResult.code}`);
  });
});