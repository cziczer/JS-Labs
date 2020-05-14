console.log(typeof window.prompt("niepotrzebne", "123"));
var output_form = document.forms.to_output;

function output() {
  alert(typeof output_form.elements.pole_tekstowe.value);
}

output_form.elements.WypiszButton.addEventListener("click", output, false);
