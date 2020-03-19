"use strict";

var expect = chai.expect;

function sum(x, y) {
  return x + y;
}

var sum_of_digits = 0;
var how_much_letters = 0;
var sum = 0;
var all_numbers = "<- Suma = ";
var is_first_num = true;

function sum_input(value_to_process) {
  var x = document.createElement("DIV");
  x.appendChild(document.createTextNode(value_to_process));
  for (var i = 0; i < value_to_process.length; i++) {
    var num = parseInt(value_to_process[i]);
    console.log(num);
    if (!isNaN(num)) sum_of_digits++;
    else how_much_letters++;
  }

  var to_sum = parseInt(value_to_process);
  if (!isNaN(to_sum)) {
    sum += to_sum;
    if (is_first_num) {
      all_numbers = all_numbers.concat(" ", to_sum);
      is_first_num = false;
    } else all_numbers = all_numbers.concat(" + ", to_sum);
  }

  var z = document.createElement("DIV");
  var d = document.createElement("DIV");
  d.appendChild(document.createTextNode(sum_of_digits));
  d.style.color = "red";
  d.style.float = "left";
  d.style.marginRight = "10px";
  z.appendChild(d);
  var l = document.createElement("DIV");
  l.appendChild(document.createTextNode(how_much_letters + " "));
  l.style.float = "left";
  l.style.marginRight = "10px";
  l.style.color = "green";
  z.appendChild(l);
  var s = document.createElement("DIV");
  s.appendChild(document.createTextNode(sum));
  s.style.float = "left";
  s.style.color = "blue";
  s.style.marginRight = "10px";
  z.appendChild(s);
  var str = document.createElement("div");
  str.appendChild(document.createTextNode(all_numbers));
  s.style.float = "left";
  z.appendChild(str);
  var clear = document.createElement("div");
  clear.style.clear = "both";
  z.appendChild(clear);
  z.style.margin = "5px";
  z.style.marginLeft = "15px";
  x.appendChild(z);

  document.body.appendChild(x);
}

while (true) {
  var value_to_process = window.prompt("Wprowadź liczbę:");
  if (value_to_process == null) break;
  sum_input(value_to_process);
  how_much_letters = 0;
  sum_of_digits = 0;
  //   var x = document.createElement("DIV");
  //   x.appendChild(document.createTextNode(value_to_process));
  //   for (var i = 0; i < value_to_process.length; i++) {
  //     var num = parseInt(value_to_process[i]);
  //     console.log(num);
  //     if (!isNaN(num)) sum_of_digits++;
  //     else how_much_letters++;
  //   }

  //   var to_sum = parseInt(value_to_process);
  //   if (!isNaN(to_sum)) {
  //     sum += to_sum;
  //     if (is_first_num) {
  //       all_numbers = all_numbers.concat(" ", to_sum);
  //       is_first_num = false;
  //     } else all_numbers = all_numbers.concat(" + ", to_sum);
  //   }

  //   var z = document.createElement("DIV");
  //   var d = document.createElement("DIV");
  //   d.appendChild(document.createTextNode(sum_of_digits));
  //   d.style.color = "red";
  //   d.style.float = "left";
  //   d.style.marginRight = "10px";
  //   z.appendChild(d);
  //   var l = document.createElement("DIV");
  //   l.appendChild(document.createTextNode(how_much_letters + " "));
  //   l.style.float = "left";
  //   l.style.marginRight = "10px";
  //   l.style.color = "green";
  //   z.appendChild(l);
  //   var s = document.createElement("DIV");
  //   s.appendChild(document.createTextNode(sum));
  //   s.style.float = "left";
  //   s.style.color = "blue";
  //   s.style.marginRight = "10px";
  //   z.appendChild(s);
  //   var str = document.createElement("div");
  //   str.appendChild(document.createTextNode(all_numbers));
  //   s.style.float = "left";
  //   z.appendChild(str);
  //   var clear = document.createElement("div");
  //   clear.style.clear = "both";
  //   z.appendChild(clear);
  //   z.style.margin = "5px";
  //   z.style.marginLeft = "15px";
  //   x.appendChild(z);

  //   document.body.appendChild(x);
  //   how_much_letters = 0;
  //   sum_of_digits = 0;
}

// describe("The sum() function", function() {
//   it("Returns 4 for 2+2", function() {
//     expect(sum(2, 2)).to.equal(4);
//   });
//   it("Returns 0 for -2+2", function() {
//     expect(sum(-2, 2)).to.equal(0);
//   });
// });

describe("Sum of input test", function() {
  it("Only digits in input", function() {
    sum_input("512");
    expect(sum_of_digits).to.equal(3);
    expect(how_much_letters).to.equal(0);
    expect(sum).to.equal(512);
    sum_of_digits = 0;
    how_much_letters = 0;
  });
  it("Only letters in input", function() {
    sum_input("agargaeefv");
    expect(sum_of_digits).to.equal(0);
    expect(how_much_letters).to.equal(10);
    expect(sum).to.equal(512);
    sum_of_digits = 0;
    how_much_letters = 0;
  });
  it("Letters, then digits in input", function() {
    sum_input("aa512");
    expect(sum_of_digits).to.equal(3);
    expect(how_much_letters).to.equal(2);
    expect(sum).to.equal(512);
    sum_of_digits = 0;
    how_much_letters = 0;
  });
  it("Digits, then letters in input", function() {
    sum_input("123abs");
    expect(sum_of_digits).to.equal(3);
    expect(how_much_letters).to.equal(3);
    expect(sum).to.equal(635);
    sum_of_digits = 0;
    how_much_letters = 0;
  });
  it("Empty string in input", function() {
    sum_input("");
    expect(sum_of_digits).to.equal(0);
    expect(how_much_letters).to.equal(0);
    expect(sum).to.equal(635);
    sum_of_digits = 0;
    how_much_letters = 0;
  });
});
