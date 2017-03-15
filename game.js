let addBarongCards;
let URL = "https://pixabay.com/api//?key=3524767-02f5ba794561ee4931dcf448b\&q=indonesia\&image_type=photo"
let indoPicsArray = [];
let shuffledIndoArray = [];
let counter = 0;

function addURLToArray(index, hit){
  indoPicsArray.push(hit.webformatURL)
}





function displaySixIndoImages(counter){
  let cardImagesAnswers = [];
  let $myDivCardContainer = $('.card-container');
  let card1;
  let card2;


  for(let i = 0; i < 6; i++){
    cardImagesAnswers.push(shuffledIndoArray[i])
    cardImagesAnswers.push(shuffledIndoArray[i])
  }
  cardImagesAnswers = shuffle(cardImagesAnswers)

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

    //add event listener to each of the cards to listen to the click  -- flip function; you're going to listen to that click -- and on the click Url.[0].src save it as your card one.
    // $frontImg.addEventListener('click', flipCard) //function flip card, do what's in the flip card function -- we want to add the event listener and when I CLICK i want to do the 

    $(`.frontImg`).click(function flipCard(event) {
      event.stopImmediatePropagation();
      // track flipped cards

      // show image

      // if this is second card to be flipped
        // checkIfMatch(card1, card2)
        // if checkIfMatch returns false
          // flip both cards back over

      $frontImg.hide()
      // backImg.show()
      $back.toggleClass('invis')

      counter += 1;
      console.log(counter)
    });
  }
}



// returns boolean
function checkIfMatch(counter) {


  if(counter === 1){
    card1 = $backImg[0].src

    console.log(card1);
    return card1;

  }else if(counter ===2){
    card2 = $backImg[0].src
    console.log(card2)

    if(card1 === card2){
      console.log('yay')

    }else{
      console.log('no');



    }
    return card2;

  }
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

fetchImageUrls(URL);
checkIfMatch()
