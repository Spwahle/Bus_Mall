'use strict';
//defining global vars here
var picturesArray = [];
var displayPictures = [];
var lastShown = [];
var chartLabel = [];
var chartClickData = [];
var chartDisplayData = [];
var counter = 0;


//this if loop checks to see if local data exists in the file turns splits array
if (localStorage.chartClickData && localStorage.chartDisplayData) {
  chartClickData = localStorage.chartClickData.split(',');
  chartDisplayData = localStorage.chartDisplayData.split(',');
  counter = 25;

}
//constructor function to make my objects
function PictureOption(name, path) {
  this.name = name;
  this.path = path;
  this.displayCount = 0;
  this.shownCount = 0;
  this.clickCount = 0;
  picturesArray.push(this);
}
//creating objects with the constructor
new PictureOption('bag', 'img/bag.jpg');
new PictureOption('banana', 'img/banana.jpg');
new PictureOption('bathroom', 'img/bathroom.jpg');
new PictureOption('boots', 'img/boots.jpg');
new PictureOption('breakfast', 'img/breakfast.jpg');
new PictureOption('bubblegum', 'img/bubblegum.jpg');
new PictureOption('chair', 'img/chair.jpg');
new PictureOption('cthulhu', 'img/cthulhu.jpg');
new PictureOption('dog-duck', 'img/dogDuck.jpg');
new PictureOption('dragon', 'img/dragon.jpg');
new PictureOption('pen', 'img/pen.jpg');
new PictureOption('pet-sweep', 'img/petSweep.jpg');
new PictureOption('shark', 'img/shark.jpg');
new PictureOption('sweep', 'img/sweep.png');
new PictureOption('tauntaun', 'img/tauntaun.jpg');
new PictureOption('unicorn', 'img/unicorn.jpg');
new PictureOption('usb', 'img/usb2.gif');
new PictureOption('water-can', 'img/waterCan.jpg');
new PictureOption('wine-glass', 'img/wineGlass.jpg');

// console.log('in array:', picturesArray);

//function designed to create a random picutres and make sure it's not duplicating

function randomPictures() {
  while (displayPictures.length !== 3) {
    var image = picturesArray[Math.floor(Math.random() * picturesArray.length)];
    if (displayPictures.includes(image) === false && lastShown.includes(image) === false) {
      displayPictures.push(image);
    }
  }
}

//quering the DOM and setting

function render() {
  for (var i = 0; i < 3; i++) {
    var display = document.getElementById('display');
    var imageObj = displayPictures[i];
    var image = document.createElement('img');
    image.setAttribute('class', 'survey');
    image.setAttribute('src', imageObj.path);
    image.setAttribute('id', imageObj.name);
    display.appendChild(image);
    image.addEventListener('click', eventHandler);
    imageObj.displayCount++;
    imageObj.shownCount++;

  }
}

function clicker(selected) {
  for (var j = 0; j < picturesArray.length; j++) {
    if (picturesArray[j].name === selected) {
      picturesArray[j].clickCount++;
    }
  }
}

function eventHandler() {
  if (counter < 25) {
    var selected = event.target.id;
    clicker(selected);
    counter++;
    lastShown = displayPictures;
    displayPictures = [];
    document.getElementById('display').innerHTML = '';
    randomPictures();
    render();
  } else {
    getChartData();
    buildChart();
    save();
  }
}


function getChartData() {
  for (var d = 0; d < picturesArray.length; d++) {
    chartLabel.push(picturesArray[d].name);
    chartClickData.push(picturesArray[d].clickCount);
    chartDisplayData.push(picturesArray[d].displayCount);
    chartDisplayData.push(picturesArray[d].shownCount);

  }
}

function buildChart() {
  var canvas = document.getElementById('chart');
  var ctx = canvas.getContext('2d');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: chartLabel,
      datasets: [{
        label: 'number of clicks',
        data: chartClickData,
        backgroundColor: '#92CFFF',
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}




//creating save function

function save() {
  localStorage.chartClickData = chartClickData;
  localStorage.chartDisplayData = chartDisplayData;
}
//loading localStorage if 25 clicks reached
function load() {
  if (counter >= 24) {
    for (var p = 0; p < picturesArray.length; p++) {
      chartLabel.push(picturesArray[p].name);
    }

//Using DOM to construct chart

    buildChart();
    var display = document.getElementById('display');
    var button = document.createElement('button');
    display.removeChild(button);
  }
}

//calliing functions
randomPictures();
render();
load();
