let addBarongCards;
let URL = "https://pixabay.com/api//?key=3524767-02f5ba794561ee4931dcf448b\&q=indonesia\&image_type=photo"
let indoPicsArray = [];
let shuffledIndoArray = [];

function fetchImageUrls(url){
  $.getJSON(url, function(data){
    if( data.hits.length > 0 ) {
      $.each(data.hits, addURLToArray);
      shuffledIndoArray = shuffle(indoPicsArray)
      displaySixIndoImages()
    } else {
      console.log('no images')
    }
  });
}

function addURLToArray(index, hit){
  indoPicsArray.push(hit.webformatURL)
}

function displaySixIndoImages(){
  let cardImagesAnswers = [];
  let $myDivCardContainer = $('.card-container');

  cardImagesAnswers = shuffle(cardImagesAnswers)

  for(let i = 0; i < 6; i++){
    cardImagesAnswers.push(shuffledIndoArray[i])
    cardImagesAnswers.push(shuffledIndoArray[i])
  }

  for (let i = 0; i < cardImagesAnswers.length; i++) {
    let currentImageURL = cardImagesAnswers[i];
    let $card = $('<div class="card col-xs-4"></div>');
    let $front = $('<div class="front invis"></div>');
    let $frontImg = $('<img class="frontImg" src="barong-image-cut.png" />');
    let $back = $('<div class="back invis"></div>');
    let $backImg = $(`<img class="cardBackImage" data-image-id="${i}"  src="${currentImageURL}" />`);

    $front.append($frontImg);
    $back.append($backImg);
    $card.append($front, $back);
    $myDivCardContainer.append($card);
  }
}

function flipCard(event) {
  event.stopImmediatePropagation();
  // track flipped cards

  // show image

  // if this is second card to be flipped
    // checkIfMatch(card1, card2)
    // if checkIfMatch returns false
      // flip both cards back over

  frontImg.hide()
  // backImg.show()
  back.toggleClass('invis')
}

// returns boolean
function checkIfMatch(card1, card2) {
  // if card1.img.src === card2.img.src
    // they match
}

function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

$(`.frontImg`).click(flipCard);
fetchImageUrls(URL);
