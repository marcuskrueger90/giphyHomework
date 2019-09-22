var buttons = ["Ferrari", "Lamborghini", "Zonda", "Bugatti"];

function makeButtons() {

    $(".recentResults").empty();
  for (var i = 0; i < buttons.length; i++) {
    var buttonName = buttons[i];

    var button = `<div class ="wrap-buttons">
                            <button class = "btn btn-search" data-name = "${buttonName}">${buttonName}</button>
                            <button data-name = "${buttonName}" class = "btn btn-delete far fa-times-circle"></button>
                        </div>`;

    $(".recentResults").append(button);
  }
}

makeButtons();


$("#submitButton").on("click", function(event){
    event.preventDefault();

    var value = $("#search").val().trim();
    
    buttons.push(value);

    makeButtons();
    
});