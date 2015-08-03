$(document).ready(function() {
  var canvas = document.querySelector("#album");
  var foreground = document.getElementById('top-layer');
  var ctx = canvas.getContext("2d");
  var ctx2 = foreground.getContext("2d");
  var timer, fullText, currentOffset, onComplete, wordSet;
  var cloud = document.getElementById("cloudImg");
  var green = "#548779";
  var black = "#1D1F21";
  ctx.translate(0.5, 0.5);
  canvas.width = 1000;
  canvas.height = 500;
  canvas.style.width = canvas.width;
  canvas.style.height = canvas.height;

  init();

  function drawBubble(x,y) {
    ctx.beginPath();
    var gradient = ctx.createLinearGradient(0,0,0,170);
    gradient.addColorStop(0, 'aqua');
    gradient.addColorStop(1, 'blue');
    ctx.rect(x, y, 600, 300)
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = "#c0c0c0";
    ctx.stroke();
  }

  function init() {
    var person = "Squall";
    var text = ' \n"Taken...angels...singing voices...zeno...gias"\n';
    drawBubble(80, 100);
    writeText(person, text);
  }

  function writeText(person, text) {
    fullText = text;
    wordSet = text.split('');
    currentOffset = 0;
    timer = setInterval(onTick, 100);
    dialogHeader(person)
  }

  function onTick() {
    currentOffset++;
    if (currentOffset == wordSet.length) {
      ctx.closePath();
      clearInterval(timer);
      return;
    }
    var text = "";
    var x = 100;
    var y = 210;
    var pad = 15;
    for (var i = 0; i < currentOffset; i++){
      if (x  > 600) {
        y += 25;
        x = 100;
      }
      text += wordSet[i] + "";
      ctx.font = "15px Arial";
      ctx.fillStyle = 'white';
      ctx.fillText(wordSet[i], x, y);
      x += pad;
    }
    text.trim();
  }

  function dialogHeader(name) {
    ctx.font = "25px Arial"
    ctx.fillStyle = 'white';
    ctx.fillText(name, 180, 175);
    ctx.drawImage(cloud,110,120, 60, 60);
  }

})//init
