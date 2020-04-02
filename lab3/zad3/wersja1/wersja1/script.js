var numberInput = document.getElementById("number");
var counter = numberInput.value;

numberInput.addEventListener("input", function() {
    counter = numberInput.value;
});

var spans = document.querySelectorAll("span");

window.setInterval(function () { 
    if (counter > 0) 
      counter--;  
    if (counter == 0) 
      numberInput.value = "0";

    spans.forEach((span) => {span.textContent = counter;}); 
    }, 1000);


