
var max_num_of_items = 5;
var lower_thresh = 0.7; //  set a similarity threshold for finding similar words
var buffered_word = ""; // store the last word entered
var rLock = -1; // prevent multiple requests for the same word
var rList = []; // store the list of recommended words


/* this fn is called every time a word is typed in the input field. 
It converts the word to lowercase and checks if the length of the word is greater than or equal to 2 
and is different from the last buffered word. If these conditions are met, the word is buffered 
and makeRecommendation() is called after a delay of 180ms to avoid multiple requests for the same word */

function wordTyped(){
    var new_word = document.getElementById("lookupText").value.toLowerCase();
    if(new_word.length >= 2 && new_word != buffered_word){
        buffered_word = new_word;
        if(rLock < 1){
            rLock = 1;
            setTimeout(function(){ makeRecommendation(new_word); }, 180);
        }
    }
}


/*  this fn is called to make recommendations for the buffered word. 
It first checks if rLock is set to 1, indicating that a request for recommendations is currently being processed. 
If rLock is set to 0, it means that recommendations are available, and it calls displayRecommendation(new_word) 
to display the list of recommended words. If rLock is set to -1, it means that recommendations are not available, 
and it sets rLock to 1 to process the request */

function makeRecommendation(new_word){
    if(rLock == 1){
        rLock = 0;
        if(buffered_word == new_word){
            rLock = -1;
            rList = find_similar(new_word, lower_thresh)[0];
            displayRecommendation(new_word);
        }
        else{
            buffered_word = "";
            wordTyped();
        }
    }
}

/*function displayRecommendation(new_word){
    if(rList.length > 0){
        var num = Math.random();
        var dots;
        if(num <= 0.25) dots = ".";
        else if(num <= 0.5) dots = "..";
        else if(num <= 0.75) dots = "...";
        else dots = "....";
        
        var code_out = "<p class='lead' style='color: #777777;'>" + dots + "Recommended Words" + dots + "</p><span class='list-group' style='max-width: 250px; display: block; box-shadow: 2px 2px 5px #EEE;'>";
        
        for(var i = 0; i < rList.length && i < max_num_of_items; i++){
            if(i == 0 && rList[0].toLowerCase() == new_word){
                code_out += "<a href='#' class='list-group-item list-group-item-success'>"
                         + rList[i] + "</a>";
            }
            else code_out += "<a href='#' class='list-group-item'>" + rList[i] + "</a>";
        }
        code_out += "</span>";
        
        document.getElementById("results").innerHTML = code_out;
    }
}*/


// fn definition to display the list of recommended words
function displayRecommendation(new_word){
    if(rList.length > 0){
        var num = Math.random();
        var dots;
        if(num <= 0.25) dots = ".";
        else if(num <= 0.5) dots = "..";
        else if(num <= 0.75) dots = "...";
        else dots = "....";
        
        var code_out = "<p class='lead' style='color: #777777;'>" + dots + "Recommended Words" + dots + "</p><span class='list-group' style='max-width: 250px; display: block; box-shadow: 2px 2px 5px #EEE;'>";
        
        for(var i = 0; i < rList.length && i < max_num_of_items; i++){
            if(i == 0 && rList[0].toLowerCase() == new_word){
                code_out += "<a href='javascript:void(0)' class='list-group-item list-group-item-success' onclick='setInputValue(\""+rList[i]+"\")'>" // onclick event that calls the function setInputValue to set the value of the input field with the clicked word.
                         + rList[i] + "</a>";
            }
            else code_out += "<a href='javascript:void(0)' class='list-group-item' onclick='setInputValue(\""+rList[i]+"\")'>" + rList[i] + "</a>";
        }
        code_out += "</span>";
        
        document.getElementById("results").innerHTML = code_out;
    }
}

// fn definition to set the value of the input field with the clicked word as the argument
function setInputValue(rList) {
    document.getElementById("lookupText").value = rList;
}

// Input validation
// Get the lookupText input field element
var lookupText = document.getElementById("lookupText");

// Add an event listener to the lookupText input field for the "blur" event
lookupText.addEventListener("blur", function() {
  // Get the value of the lookupText input field
  var lookupTextValue = lookupText.value;
  
  // Trim leading and trailing whitespace from the lookupText input field value
  var trimmedLookupTextValue = lookupTextValue.trim();
  
  // Check if the trimmed lookupText input field value is empty
  if (trimmedLookupTextValue === "") {
    // If the trimmed lookupText input field value is empty, display an error message
    alert("Please enter a word.");
  }
});


const errorDiv = document.getElementById("error");

// add event listener to validate input
lookupText.addEventListener("input", function(e) {
    const value = e.target.value.trim(); //retrieve the value of the input field and trim any leading or trailing whitespace
    const letters = /^[A-Za-z]+$/;
    if (value.match(letters)) {
      errorDiv.innerHTML = "";
      errorDiv.classList.remove("alert-danger");
    } else {
      errorDiv.innerHTML = "Error: Only alphabetical characters allowed.";
      errorDiv.classList.add("alert-danger");
    }
  });
