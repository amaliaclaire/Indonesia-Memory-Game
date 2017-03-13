//jQuery adding class, img src and img id
var addBarongCards;



//Where the images lie
var URL = "https://pixabay.com/api//?key=3524767-02f5ba794561ee4931dcf448b\&q=indonesia\&image_type=photo"

var indoPicsArray = [];
var shuffledIndoArray; //used in the global scope


//fetching the image URLs
$.getJSON(URL, function(data){

  if(parseInt(data.totalHits) > 0) { //parseInt changes a string into a number. if x = "9000", parseInt(x) = 9000
    $.each(data.hits, addURLToArray);  //.each() is a jQuery function that iterate over a collection (array or Object) --> but we are using it over an Array

    shuffledIndoArray = shuffle(indoPicsArray)
    displaySixIndoImages() // necessary: it setting the source of the image elements.
  } else {
    console.log('no images')
  }

  console.log(data);
});


function addURLToArray(index, hit){
  indoPicsArray.push(hit.webformatURL) // this function will run for every item in data.hits ASK INSTRUCTOR HOW DATA.HITS AND hit is connected
}

function displaySixIndoImages(){

  for (var i = 1; i <= 6; i++) {

    myDivCardContainer = $(`
    <div class="card">
      <div class="front">
        <img src="barong-image-cut.png">
      </div>
      <div class="back">
        <img id="indoImage${i}" src="">
      </div>
    </div>`)

    $('.card-container').append(myDivCardContainer)

    //Get an imageId, so that we can get an image element
    var imageId = "indoImage" + i;

    // Get image element, using imageId
    var imageElement = document.getElementById(imageId)// this is going through the 1st - 6th image
    // Get a URL for a indonesian picture
    var currentImageURL = shuffledIndoArray[i]; // RANDOM IMAGES
    // Assign URL to the src attribute of image element
    imageElement.src = currentImageURL; // Using the DOM --> we can manipulate it like an object. we have selected it by ID

console.log('hello', $(`#indoImage${i}`));
    $(`#indoImage${i}`).click(function (){
      console.log('hisdifjosjdf');
      alert("handler for .click is called");

    });


  }
}

function shuffle(array) { //downloaded this off stack overflow
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
