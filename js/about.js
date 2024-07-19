// JavaScript Document
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add(entry.target.id);
    }
  });
});

const explodeElements = document.querySelectorAll('.explode');
explodeElements.forEach(el => {
  observer.observe(el);
});

const bold2Text = document.querySelectorAll('.bold_2');
bold2Text.forEach(el => {
  observer.observe(el);
});

function openForm() {
  document.getElementById("join_us_id").style.display = "block";
}

function closeForm() {
  document.getElementById("join_us_id").style.display = "none";
}

window.addEventListener('click', function (e) {
  if (!document.getElementById('join_us_id').contains(e.target) && !document.getElementById('contact-id').contains(e.target) && !document.getElementById("footer_contact_id").contains(e.target)) {
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
  return false;
}
