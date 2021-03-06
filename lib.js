$(document).ready(function() {
  var canvas = document.querySelector("#album");
  var foreground = document.getElementById('top-layer');
  var ctx = canvas.getContext("2d");
  var ctx2 = foreground.getContext("2d");
  var timer, fullText, currentOffset, onComplete, wordSet, chatCount, multiLength;
  var body = document.getElementById('body');
  var limit = 150;
  ctx.translate(0.5, 0.5);
  canvas.width = 1000;
  canvas.height = 500;
  canvas.style.width = canvas.width;
  canvas.style.height = canvas.height;

  var persona = {
    name: 'Cloud',
    url: 'http://i.imgur.com/N12jb6B.png'
  }

  var dia = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  init(persona, dia);

  function init(persona, input) {
    appendInfo(persona);
    var text = input
    console.log(text);
    dialog = text.split('');
    console.log(dialog.length);
    if (dialog.length > 100) {
      var dialog = textCal(dialog)
      drawBubble(80, 100);
      writeText(persona, dialog, function() {
        for (var i = 0; dialog.length < i; i++) {
          setTimeout(function() {
            writeText(persona, dialog[i])
          }, 2000);
        }
      })
    }
    else {
      drawBubble(80, 100);
      writeText(persona, dialog);
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

  function writeText(persona, text, callback) {
    onComplete = callback
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
    timer = setInterval(onTick, 50);
    dialogHeader(persona)
    $('.content').on('click', function() {
      clearInterval(timer);
      drawBubble(80, 100);
      dialogHeader(persona);
      var x = 100;
      var y = 210;
      var pad = 15;
      console.log(wordSet)
      for (var i = 0; wordSet.length > i; i++) {
        if (x  > 600) {
          y += 25;
          x = 100;
        }
        console.log("alert");
        ctx.font = "15px Arial";
        ctx.fillStyle = 'white';
        ctx.fillText(wordSet[i], x, y);
        x += pad;
      }
    })
  }

  function onTick() {
    currentOffset++;
    if (currentOffset == wordSet.length || multiLength === chatCount) {
      ctx.closePath();
      clearInterval(timer);
      if (multiLength !== chatCount) {
        console.log("next array")
        // drawBubble(80, 100);
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


  function appendInfo(persona) {
    var imgEl = document.createElement('img');
    $(imgEl).attr({
      src: persona.url,
      id: "avatar"
    }).css("display", "none");
    $(body).append(imgEl);
    setTimeout(function(){dialogHeader(persona)}, 100);
  }

  function dialogHeader(persona) {
    var image = document.getElementById('avatar');
    ctx.font = "25px Arial";
    ctx.fillStyle = 'white';
    ctx.fillText(persona.name, 180, 175);
    ctx.drawImage(image ,110,120, 60, 60);
  }

  function complete() {
    clearInterval(timer);
    timer = null;
    $("#message").html(fullText);
    if (onComplete) onComplete();
  }

});//init
