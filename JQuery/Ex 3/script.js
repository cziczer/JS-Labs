const $searchForm = $('form');
const $tab = $('#tab');
const $progressBar = $('.progress-bar');
const $requestBtn = $('#request');

const requestMax = Math.floor(Math.random() * 7 + 3);
const increment = 860 / requestMax;
let counterReq = 0;

$searchForm.on('submit', async (e) => {
  e.preventDefault();

  let req = $("#id").val();

  const res = await fetch(`http://localhost:5000/search/${encodeURIComponent(req)}`);
  const data = await res.json();

  counterReq += 1;
  $progressBar.css('width', `${counterReq / requestMax * 100}%`);
  $progressBar.text(`${counterReq} / ${requestMax}`);
   
  if (counterReq >= requestMax) {
    $requestBtn.prop('disabled', true);
    $progressBar.text(`${requestMax}`);
  }

  for (let [key, value] of Object.entries(data))
    $tab.append(`<tr><td>${key}</td><td>${value}</td></tr>`);
  $tab.append(`<hr>`);
});