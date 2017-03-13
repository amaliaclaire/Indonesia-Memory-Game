// this is practice for API 

var URL = "https://pixabay.com/api//?key=3524767-02f5ba794561ee4931dcf448b\&q=indonesia\&image_type=photo"


var indoPicsArray = [];
var shuffledIndoArray;

$.getJSON(URL, function(data){
  if(parseInt(data.totalHits) > 0){
    // console.log(data);
    $.each(data.hits, addURLToArray);

    console.log(data.hits, addURLToArray)
  }else{
    console.log('no images');
  }
  return indoPicsArray;

});


function addURLToArray(index, hit){
  indoPicsArray.push(hit.webformatURL)

}


function displaySixIndoImages(){
  for (var i = 1; i < 6; i++) {

  }

}
