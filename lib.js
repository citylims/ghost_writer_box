$(document).ready(function() {
  var canvas = document.querySelector("#album");
  var foreground = document.getElementById('top-layer');
  var ctx = canvas.getContext("2d");
  var ctx2 = foreground.getContext("2d");
  var timer, fullText, currentOffset, onComplete, wordSet, chatCount, multiLength;
  var cloud = document.getElementById("cloudImg");
  var green = "#548779";
  var black = "#1D1F21";
  var limit = 150;
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
    ctx.rect(x, y, 600, 270)
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = "#c0c0c0";
    ctx.stroke();
  }

  function init() {
    var person = "Cloud";
    var text = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    dialog = text.split('');
    console.log(dialog.length);
    if (dialog.length > 100) {
      var dialog = textCal(dialog)
      drawBubble(80, 100);
      writeText(person, dialog)
    }
    else {
      drawBubble(80, 100);
      writeText(person, dialog);
    }
  }


  function textCal(dialog) {
    var cycle = _.map(dialog, function(item, index){
      return index % limit === 0 ? dialog.slice(index, index + limit) : null;
    });
    var collection = cycle.filter(function(item){
      return item;
    });
    console.log(collection);
    return collection
  }

  function writeText(person, text) {
    console.log(text.length);
    if (chatCount === undefined) {
      chatCount = 0;
    }
    if (text.length > 1) {
      multiLength = text.length
      wordSet = text[chatCount];
    }
    fullText = text.join('');
    currentOffset = 0;
    timer = setInterval(onTick, 100);
    dialogHeader(person)
  }

  function onTick() {
    currentOffset++;
    if (multiLength === chatCount) {
      ctx.closePath();
      clearInterval(timer);
      return
    }
    if (currentOffset == wordSet.length) {
      ctx.closePath();
      clearInterval(timer);
      if (multiLength !== chatCount) {
        console.log("next array")
        drawBubble(80, 100);
      }
      return;
    }
    var text = "";
    var x = 100;
    var y = 210;
    var pad = 15;
    for (var i = 0; i < currentOffset + 1; i++){
      if (x  > 600) {
        y += 25;
        x = 100;
      }
      text += text[i] + "";
      ctx.font = "15px Arial";
      ctx.fillStyle = 'white';
      ctx.fillText(wordSet[i], x, y);
      x += pad;
    }
    text.trim();
  }

  function dialogHeader(name) {
    ctx.font = "25px Arial";
    ctx.fillStyle = 'white';
    ctx.fillText(name, 180, 175);
    ctx.drawImage(cloud,110,120, 60, 60);
  }

})//init
