// JavaScript Document
var textToInsert = "analyse, optimize, strategize & support.";
var position = 0;
var speed = 100;

function startTextAnimation() {
  position++;
  if (position <= textToInsert.length) {
    document.getElementById("home-adding-text").innerHTML = textToInsert.substring(0, position);
    blinkCursor();
    setTimeout(startTextAnimation, speed);
  } else {
    position = 3;
  }
}

function blinkCursor() {
  if (position % 2 == 0) {
    document.getElementById("blink").style.visibility = 'hidden';
  } else {
    document.getElementById("blink").style.visibility = 'visible';
  }
}
startTextAnimation();

function openForm() {
  document.getElementById("join_us_id").style.display = "block";
}

function closeForm() {
  document.getElementById("join_us_id").style.display = "none";
}

window.addEventListener('click', function (e) {
  if (!document.getElementById('join_us_id').contains(e.target) && !document.getElementById('contact-id').contains(e.target) && !document.getElementById("footer_contact_id").contains(e.target) && !document.getElementById('get_in_touch').contains(e.target)) {
    closeForm();
  }
});
document
  .getElementById("contact-form-id")
  .onsubmit = submitForm;

function submitForm(event) {
  event.preventDefault();
  var firstName = document.getElementById("first-name").value;
  var lastName = document.getElementById("last-name").value;
  var email = document.getElementById("email").value;
  var phone = document.getElementById("phone").value;
  var message = document.getElementById("message").value;

  console.log(firstName + " " + lastName + " " + email + " " + phone + " " + message);
  return false;
}
