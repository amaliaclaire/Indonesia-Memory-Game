//jQuery adding class, img src and img id
var addBarongCards;
//Where the images lie
var URL = "https://pixabay.com/api//?key=3524767-02f5ba794561ee4931dcf448b\&q=indonesia\&image_type=photo"
var indoPicsArray = [];
var shuffledIndoArray = []; //used in the global scope


//fetching the image URLs
$.getJSON(URL, function(data){
  if(parseInt(data.totalHits) > 0) { //parseInt changes a string into a number. if x = "9000", parseInt(x) = 9000
    $.each(data.hits, addURLToArray);  //.each() is a jQuery function that iterate over a collection (array or Object) --> but we are using it over an Array

    shuffledIndoArray = shuffle(indoPicsArray)
    displaySixIndoImages() // necessary: it setting the source of the image elements.
  } else {
    console.log('no images')
  }
});

function addURLToArray(index, hit){
  indoPicsArray.push(hit.webformatURL) // this function will run for every item in data.hits ASK INSTRUCTOR HOW DATA.HITS AND hit is connected
}

function displaySixIndoImages(){
  let myDivCardContainer = $('.card-container');

  for (var i = 1; i <= 6; i++) {
    let currentImageURL = shuffledIndoArray[i];
    let card = $('<div class="card"></div>');
    let front = $('<div class="front invisible"></div>');
    let frontImg = $('<img class="frontImg" src="barong-image-cut.png" />');
    let back = $('<div class="back invisible"></div>');
    let backImg = $(`<img class="cardBackImage" data-image-id="${i}"  src="${currentImageURL}" />`);

    front.append(frontImg);
    back.append(backImg);
    card.append(front, back);

    myDivCardContainer.append(card);

    $(`.frontImg`).click(function (e){
      e.stopImmediatePropagation();
      frontImg.hide()
      // backImg.show()
      back.toggleClass('invisible')


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
