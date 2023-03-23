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













// Add an event listener to the submit button for when a file is selected
subbutton.addEventListener('click', function() {

  // Get the selected file from the input element
  const file = fileInput.files[0];

  // Create a new image element to load the selected file into
  const img = new Image();

  // When the image has finished loading, run Quagga to decode the barcode
  img.onload = function() {
    Quagga.decodeSingle({
      src: img, // Set the source image to the loaded image
      numOfWorkers: navigator.hardwareConcurrency || 4, // Set the number of workers to use for decoding
      locate: true, // Enable barcode location
      decoder: {
        readers: ['ean_reader'] // Set the decoder to use the EAN reader
      },
      locator: {
        patchSize: 'medium', // Set the patch size for the barcode locator
        halfSample: true // Enable half-sample image resizing for the locator
      }
    }, function(result) {
      // When decoding is complete, check if a barcode was detected
      if (result && result.codeResult) {
        resultDiv.innerHTML = 'Barcode detected: ' + result.codeResult.code; // Display the detected barcode
      } else {
        resultDiv.innerHTML = 'No barcode detected.'; // Display a message if no barcode was detected
      }
    });
  };

  // Load the selected file into the image element
  img.src = URL.createObjectURL(file);
});