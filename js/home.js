var textToInsert = "analyse, optimize, strategize & support.";
var position = 0;
var speed = 100;
let chart;
var itr_labels = [];
var itr_data = [];
var audit_labels = [];
var audit_data = [];
var startup_labels = [];
var startup_data = [];
var registration_labels = [];
var registration_data = [];
var i = 0;
var firstTime = true;

$(document).ready(function () {
  $.ajax({
    type: "GET",
    url: "./data/itr_data.csv",
    dataType: "text",
	  headers: {
            'Access-Control-Allow-Origin': '*',
          },
    success: function (data) {
      processDataItr(data);
    }
  });
});

function processDataItr(allText) {
  var allTextLines = allText.split(/\r\n|\n/);
  for (i = 0; i < allTextLines.length; i++) {
    var entries = allTextLines[i].split(',');
    itr_labels.push(entries[0]);
    itr_data.push(entries[1]);
  }
}

$(document).ready(function () {
  $.ajax({
    type: "GET",
    url: "data/audit_data.csv",
    dataType: "text",
	  headers: {
            'Access-Control-Allow-Origin': '*',
          },
    success: function (data) {
      processDataAudit(data);
    }
  });
});

function processDataAudit(allText) {
  var allTextLines = allText.split(/\r\n|\n/);
  for (i = 0; i < allTextLines.length; i++) {
    var entries = allTextLines[i].split(',');
    audit_labels.push(entries[0]);
    audit_data.push(entries[1]);
  }
}

$(document).ready(function () {
  $.ajax({
    type: "GET",
    url: "data/startup_data.csv",
    dataType: "text",
	  headers: {
            'Access-Control-Allow-Origin': '*',
          },
    success: function (data) {
      processDataStartUp(data);
    }
  });
});

function processDataStartUp(allText) {
  var allTextLines = allText.split(/\r\n|\n/);
  for (i = 0; i < allTextLines.length; i++) {
    var entries = allTextLines[i].split(',');
    startup_labels.push(entries[0]);
    startup_data.push(entries[1]);
  }
}

$(document).ready(function () {
  $.ajax({
    type: "GET",
    url: "data/registration_data.csv",
    dataType: "text",
    success: function (data) {
      processDataRegistration(data);
    }
  });
});

function processDataRegistration(allText) {
  var allTextLines = allText.split(/\r\n|\n/);
  for (i = 0; i < allTextLines.length; i++) {
    var entries = allTextLines[i].split(',');
    registration_labels.push(entries[0]);
    registration_data.push(entries[1]);
  }
}

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

function createNewChart(days, location) {
  const ctx = document.getElementById(location).getContext('2d');
  var labels = [];
  var data = [];
  var labelsOfLocation = [];
  var dataOfLocation = [];
  if (location == "itr_chart") {
    labelsOfLocation = itr_labels;
    dataOfLocation = itr_data;
  }
  if (location == "audit_chart") {
    labelsOfLocation = audit_labels;
    dataOfLocation = audit_data;
  }
  if (location == "startup_chart") {
    labelsOfLocation = startup_labels;
    dataOfLocation = startup_data;
  }
  if (location == "registration_chart") {
    labelsOfLocation = registration_labels;
    dataOfLocation = registration_data;
  }
  if (days == 90) {
    for (i = 0; i < 3; i++) {
      if (labelsOfLocation.length - 1 - 3 + i >= 0 && dataOfLocation.length - 1 - 3 + i >= 0) {
        labels[i] = labelsOfLocation[labelsOfLocation.length - 1 - 3 + i];
        data[i] = dataOfLocation[labelsOfLocation.length - 1 - 3 + i];
      }
    }
  }
  if (days == 180) {
    for (i = 0; i < 6; i++) {
      if (labelsOfLocation.length - 1 - 3 + i >= 0 && dataOfLocation.length - 1 - 6 + i >= 0) {
        labels[i] = labelsOfLocation[labelsOfLocation.length - 1 - 6 + i];
        data[i] = dataOfLocation[labelsOfLocation.length - 1 - 6 + i];
      }
    }
  }
  if (days == 365) {
    for (i = 0; i < 12; i++) {
      if (labelsOfLocation.length - 1 - 12 + i >= 0 && dataOfLocation.length - 1 - 12 + i >= 0) {
        labels[i] = labelsOfLocation[labelsOfLocation.length - 1 - 12 + i];
        data[i] = dataOfLocation[labelsOfLocation.length - 1 - 12 + i];
      }
    }
  }
  if (days == 366) {
    for (i = 0; i < labelsOfLocation.length; i++) {
      labels[i] = labelsOfLocation[i];
      data[i] = dataOfLocation[i];
    }
  }
  var config = {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: '',
        data: data,
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      elements: {
        point: {
          radius: 0
        }
      },
      responsive: true,
      scales: {
        x: {
          display: false
        },
        y: {
          display: false
        }
      }
    }
  };
  if (chart == null) {
    chart = new Chart(ctx, config);
  } else {
    chart.destroy();
    chart = new Chart(ctx, config);
  }
}
if (firstTime) {
  setTimeout(function () {
    createNewChart(180, "itr_chart");
  }, 2000);
  firstTime = false;
}
// Get all buttons with class="btn" inside the container
var btns = document.getElementsByClassName("chart-btn");

// Loop through the buttons and add the active class to the current/clicked button
for (i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function () {
    for (var i = 0; i < btns.length; i++) {
      btns[i].className = btns[i].className.replace(" active", "");
    }
    this.className += " active";
  });
}
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

const myCarouselElement = document.querySelector('#carouselChartControls')

const carousel = new bootstrap.Carousel(myCarouselElement, {
  interval: 20000000,
  touch: false
})
myCarouselElement.addEventListener('slide.bs.carousel', event => {
  var text = event.relatedTarget.innerText;
  if (text.toString().includes('ITR Filing')) {
    createNewChart(180, 'itr_chart');
  }
  if (text.toString().includes('Audits')) {
    createNewChart(180, 'audit_chart');
  }
  if (text.toString().includes('Startup')) {
    createNewChart(180, 'startup_chart');
  }
  if (text.toString().includes('Registration')) {
    createNewChart(180, 'registration_chart');
  }
})
