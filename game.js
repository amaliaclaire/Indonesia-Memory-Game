let URL = "https://pixabay.com/api//?key=3524767-02f5ba794561ee4931dcf448b\&q=indonesia\&image_type=photo"
let indoPicsArray = [];
let shuffledIndoArray = [];
let selectedCardsFlip = [];
let counter = 0;
let score = 0;
let card1Back;
let card2Back;

function addURLToArray(index, hit){
  indoPicsArray.push(hit.webformatURL)
}


function displaySixIndoImages(counter){
  let cardImagesAnswers = [];
  let $myDivCardContainer = $('.card-container');
  let card1;
  let card2;
  let card3;
  let card4;


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

    $(`.frontImg`).click(function flipCard(event) {
      event.stopImmediatePropagation();

      $frontImg.hide()
      $back.toggleClass('invis')

      counter += 1;
      selectedCardsFlip.push($backImg[0].src)
      checkIfMatch(counter, $backImg, $frontImg, $back, $front);
    });
  }
}

function checkIfMatch(count, $backImg, $frontImg, $back, $front) {
  if (count % 2 !== 0){
    card1 = $backImg[0]
    card3 = $frontImg;
    card1Back = $back;
  } else if (count % 2 === 0){
    card2 = $backImg[0]
    card4 = $frontImg
    card2Back = $back;
    selectedCardsFlip[0] === selectedCardsFlip[1]

    if(selectedCardsFlip[0] === selectedCardsFlip[1]){
      score++;
      checkWin();
    } else {
      setTimeout(timeFlip, 1000)
    }

    selectedCardsFlip.length = 0;
    counter = 0;
  }
}

function timeFlip(){
  $(card1Back).toggleClass('invis');
  $(card2Back).toggleClass('invis');
  $(card3).show()
  $(card4).show()
}

function shuffle(array) {
  let currentIndex = array.length
  let temporaryValue;
  let randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function resetCards(){
  location.reload();
}

function checkWin(){
  if(score === 6){
    $('.container').prepend('<div class="winner-winner-chicken-dinner"><h1>Thank you for playing!</h1></div>');
  }
}

function fetchImageUrls(url){
  $.getJSON(url, function(data){
    if( data.hits.length > 0 ) {
      console.log(data.hits);
      $.each(data.hits, addURLToArray);

      shuffledIndoArray = shuffle(indoPicsArray)

      displaySixIndoImages(counter)

    } else {
      console.log('no images')
    }
  });
}

checkWin()
$('#restart').on('click', resetCards);
fetchImageUrls(URL);
