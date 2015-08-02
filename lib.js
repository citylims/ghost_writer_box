$(document).ready(function() {
  var background = document.querySelector("#album");
  var foreground = document.getElementById('top-layer');
  var ctx = background.getContext("2d");
  var ctx2 = foreground.getContext("2d");
  var timer, fullText, currentOffset, onComplete, wordSet;

  var green = "#548779";
  var black = "#1D1F21";


  function drawBubble(x,y) {
    ctx.beginPath();
    var gradient = ctx.createLinearGradient(0,0,0,170);
    gradient.addColorStop(0, 'aqua');
    gradient.addColorStop(1, 'blue');
    ctx.rect(x, y, 600, 300)
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.lineWidth = .4;
    ctx.strokeStyle = gradient;
    ctx.stroke();
  }

var person = "Squall";
var text = "Taken...angel's...singing  voices...zeno...gias";

  drawBubble(80, 100);
  writeText(person, text);



  function writeText(person, text) {
    var name = person
    fullText = text;
    wordSet = text.split('');
    currentOffset = 0;
    timer = setInterval(onTick, 100);

    // for (var i = 0; arr.length > i; i++) {
    //
    // }

  }


  function onTick() {
      currentOffset++;
      if (currentOffset == wordSet.length) {
          complete();
          return;
      }
      var text = "";
      var x = 100;
      var y = 120;
      var pad = 15;
      for(var i = 0; i < currentOffset; i++){
       text += wordSet[i] + "";
       ctx.font = "15px Arial";
       ctx.fillStyle = 'black';
       ctx.fillText(wordSet[i], x, y);
       x += pad;
      //  y += pad;
      }
      text.trim();

  }

  function complete() {
      clearInterval(timer);
      timer = null;
      $("#message").html(fullText);
      if (onComplete) onComplete();
  }

  $(".box").click(function () {
      complete();
  });

  var title = "Tifa";
  var text = "Taken...angel's...singing  voices...zeno...gias";

  $('.speech-button').on("click", function() {
    Speak(title, text, function () {
      setTimeout(function () {
        Speak("good bye", "lover")
      }, 2000);
    });
  });





})
