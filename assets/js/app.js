var buttons = ["Ferrari", "Lamborghini", "Zonda", "Bugatti", "Porsche", "Ford GT", "McLaren"];
// var apiKey = "nOJwbHaZutxiADkLXKFOlxkGXpX6MBNp";
function makeButtons() {

    $(".recentResults").empty();
  for (var i = 0; i < buttons.length; i++) {
    var buttonName = buttons[i];

    var button = `<div class ="wrap-buttons">
                            <button class = "btn btn-search" data-name = "${buttonName}">${buttonName}</button>
                            <button data-name = "${buttonName}" data-index="${i}" class = "btn btn-delete far fa-times-circle"></button>
                        </div>`;

    $(".recentResults").append(button);
  }
}

makeButtons();



function addBtn(value){
     
    buttons.push(value);

    makeButtons();

};
function removeBtn(){
    var buttonIndex = $(this).attr("data-index");

    buttons.splice(buttonIndex, 1);

    makeButtons();

}

function createGiphyTemplate(giphy){
    var images = giphy.images;
    var template=
    `<div class="giphy">
    
    </i>
    <div class="giphy-image">
        <img src="${images.original_still.url}" 
        data-still="${images.original_still.url}" 
        data-animate="${images.original.url}" 
        data-state="still">
    </div>
    <div class="giphy-info">
        <p>Rating: ${giphy.rating}</p>

    </div>
  
  </div>`;

  return template;
}

function makeGiphy(giphys){
    $('.giphyContent').empty();

    for(let i = 0; i < giphys.length; i++){
        var giphy = giphys[i];

        

        var giphyTemplate = createGiphyTemplate(giphy);
            

          $('.giphyContent').prepend(giphyTemplate);
    }
}

function getGiphy(value){
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=nOJwbHaZutxiADkLXKFOlxkGXpX6MBNp&q="+ value + "&limit=10";
    
    $.ajax({
        url: queryURL,
        
    }).then(function(response){
            var giphys = response.data;

            
           
            makeGiphy(giphys);
        
    })

}



function searchGiphy(event){
    event.preventDefault();

    var value = $("#search").val().trim();
   if(buttons.includes(value)){
    
       
   }else{
    addBtn(value);

    getGiphy(value);

    
   }

   $("#search").val("");

}

function imgClick(){
    var giphyImg = $(this);
    var img = giphyImg.find('img');
    var still = img.attr('data-still');
    var animate = img.attr('data-animate');
    var state = img.attr('data-state');

    if(state==='still'){
        img.attr({
            src: animate,
            'data-state':'animate'
        })
    }else{
        img.attr({
            src: still,
            'data-state': 'still'
        })

    }
}

function searchGiphyBtn(){
    var buttonName=$(this).attr("data-name");

    getGiphy(buttonName);

}


$(document).on("click",".btn-delete", removeBtn);

$("#submitButton").on("click", searchGiphy);
$(document).on("click", ".btn-search", searchGiphyBtn)

$(document).on("click", ".giphy-image", imgClick);


