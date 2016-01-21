function Pad(cNorm, cLite, oFreq) {
  this.cNorm = cNorm;
  this.cLite = cLite;
  this.oFreq = oFreq;
}

var pad0 = new Pad("#00cc5d", "#3bf77f", 240);
var pad1 = new Pad("#dd3300", "#ff4f36", 300);
var pad2 = new Pad("#d7c700", "#ffee44", 360);
var pad3 = new Pad("#009add", "#3bccff", 420);

var secretCode, levelNumber, playerCode;

var stopPlay = true;

var tempo = [1500, 1230, 995, 750]
var pause = [500, 400, 325, 250]

// Set up sounds

var audioCtx = new(window.AudioContext || window.webkitAudioContext)();
var greenSound = audioCtx.createOscillator();
greenSound.type = 'sine';
greenSound.frequency.value = pad0.oFreq;
greenSound.start();
var greenGain = audioCtx.createGain();
greenGain.gain.value = 0;
greenSound.connect(greenGain);
greenGain.connect(audioCtx.destination);

var redSound = audioCtx.createOscillator();
redSound.type = 'sine';
redSound.frequency.value = pad1.oFreq;
redSound.start();
var redGain = audioCtx.createGain();
redGain.gain.value = 0;
redSound.connect(redGain);
redGain.connect(audioCtx.destination);

var yellowSound = audioCtx.createOscillator();
yellowSound.type = 'sine';
yellowSound.frequency.value = pad2.oFreq;
yellowSound.start();
var yellowGain = audioCtx.createGain();
yellowGain.gain.value = 0;
yellowSound.connect(yellowGain);
yellowGain.connect(audioCtx.destination);

var blueSound = audioCtx.createOscillator();
blueSound.type = 'sine';
blueSound.frequency.value = pad3.oFreq;
blueSound.start();
var blueGain = audioCtx.createGain();
blueGain.gain.value = 0;
blueSound.connect(blueGain);
blueGain.connect(audioCtx.destination);

var wrongSound = audioCtx.createOscillator();
wrongSound.type = 'sawtooth';
wrongSound.frequency.value = 60;
wrongSound.start();
var wrongGain = audioCtx.createGain();
wrongGain.gain.value = 0;
wrongSound.connect(wrongGain);
wrongGain.connect(audioCtx.destination);

$(document).ready(function() {

  // Set mousedown and mouseup on color pads
  $("#bar0").mousedown(function() {
    $(".norm0").css("fill", pad0.cLite);
    greenGain.gain.value = 1;
  });
  $("#bar1").mousedown(function() {
    $(".norm1").css("fill", pad1.cLite);
    redGain.gain.value = 1;
  });
  $("#bar2").mousedown(function() {
    $(".norm2").css("fill", pad2.cLite);
    yellowGain.gain.value = 1;
  });
  $("#bar3").mousedown(function() {
    $(".norm3").css("fill", pad3.cLite);
    blueGain.gain.value = 1;
  });
  $("*").mouseup(function() {
    $(".norm0").css("fill", pad0.cNorm);
    $(".norm1").css("fill", pad1.cNorm);
    $(".norm2").css("fill", pad2.cNorm);
    $(".norm3").css("fill", pad3.cNorm);
    greenGain.gain.value = 0;
    redGain.gain.value = 0;
    yellowGain.gain.value = 0;
    blueGain.gain.value = 0;
  });

  // Set click on color pads
  $("#bar0").click(function() {
    if (secretCode.charAt(playerCode.length) != "0" && stopPlay == false) {
      wrongAnswer();
    }
    if (secretCode.charAt(playerCode.length) == "0") {
      playerCode = playerCode + "0";
      if (playerCode.length == levelNumber + 1) {
        levelNumber++;
        var playPart = secretCode.slice(0, levelNumber + 1);
        playSecretCode(playPart);
      }
    }
  });
  $("#bar1").click(function() {
    if (secretCode.charAt(playerCode.length) != "1" && stopPlay == false) {
      wrongAnswer();
    }
    if (secretCode.charAt(playerCode.length) == "1") {
      playerCode = playerCode + "1";
      if (playerCode.length == levelNumber + 1) {
        levelNumber++;
        var playPart = secretCode.slice(0, levelNumber + 1);
        playSecretCode(playPart);
      }
    }
  });
  $("#bar2").click(function() {
    if (secretCode.charAt(playerCode.length) != "2" && stopPlay == false) {
      wrongAnswer();
    }
    if (secretCode.charAt(playerCode.length) == "2") {
      playerCode = playerCode + "2";
      if (playerCode.length == levelNumber + 1) {
        levelNumber++;
        var playPart = secretCode.slice(0, levelNumber + 1);
        playSecretCode(playPart);
      }
    }
  });
  $("#bar3").click(function() {
    if (secretCode.charAt(playerCode.length) != "3" && stopPlay == false) {
      wrongAnswer();
    }
    if (secretCode.charAt(playerCode.length) == "3") {
      playerCode = playerCode + "3";
      if (playerCode.length == levelNumber + 1) {
        levelNumber++;
        var playPart = secretCode.slice(0, levelNumber + 1);
        playSecretCode(playPart);
      }
    }
  });

  // Set click on start and reset buttons
  $("#startButton").click(function() {
    generateNewCode();
    levelNumber = 0;
    stopPlay = false;
    var playPart = secretCode.slice(0, levelNumber + 1);
    playSecretCode(playPart);
  });

  $("#resetButton").click(function() {
    document.getElementById("levelDisplay").innerHTML = "--";
    levelNumber = 0;
    stopPlay = true;
    playerCode = '';
    secretCode = '';
  })

  // Functions for game logic
  function generateNewCode() {
    secretCode = '';
    for (var x = 0; x < 50; x++) {
      var random0123 = Math.floor(Math.random() * 4);
      secretCode = secretCode + random0123.toString();
    }
  }

  function playSecretCode(xyz) {
    document.getElementById("levelDisplay").innerHTML = levelNumber + 1;
    playerCode = '';
    var seqTotal = xyz.length;
    var seqRound = 0;
    
    function flashPads() {
      var padRound = "pad" + xyz.charAt(seqRound);
      var normRound = ".norm" + xyz.charAt(seqRound);
      if (seqRound >= seqTotal || stopPlay) {
        $(".colBar").css("pointer-events", "auto");
        return;
      }
      setTimeout(function() {
        if (xyz.charAt(seqRound) == 0) {
          $(".norm0").css("fill", pad0.cLite);
          greenGain.gain.value = 1;
        }
        if (xyz.charAt(seqRound) == 1) {
          $(".norm1").css("fill", pad1.cLite);
          redGain.gain.value = 1;
        }
        if (xyz.charAt(seqRound) == 2) {
          $(".norm2").css("fill", pad2.cLite);
          yellowGain.gain.value = 1;
        }
        if (xyz.charAt(seqRound) == 3) {
          $(".norm3").css("fill", pad3.cLite);
          blueGain.gain.value = 1;
        }
      }, pause[Math.min(Math.floor(levelNumber/4),3)]);
      setTimeout(function() {
        if (xyz.charAt(seqRound) == 0) {
          $(".norm0").css("fill", pad0.cNorm);
          greenGain.gain.value = 0;
        }
        if (xyz.charAt(seqRound) == 1) {
          $(".norm1").css("fill", pad1.cNorm);
          redGain.gain.value = 0;
        }
        if (xyz.charAt(seqRound) == 2) {
          $(".norm2").css("fill", pad2.cNorm);
          yellowGain.gain.value = 0;
        }
        if (xyz.charAt(seqRound) == 3) {
          $(".norm3").css("fill", pad3.cNorm);
          blueGain.gain.value = 0;
        }
        seqRound++;
        flashPads();
      }, tempo[Math.min(Math.floor(levelNumber/4),3)]);
    }

    function flashLevel() {
      $("#levelDisplay").css("fill", "#4f4f44");
      setTimeout(function() {
        $("#levelDisplay").css("fill", "#ff2222");
      }, 250);
      setTimeout(function() {
        $("#levelDisplay").css("fill", "#4f4f44");
      }, 500);
      setTimeout(function() {
        $("#levelDisplay").css("fill", "#ff2222");
        $(".colBar").css("pointer-events", "none");
      }, 750);
      setTimeout(function() {
        flashPads();
      }, 1000);
    }
    flashLevel();
  }

  function wrongAnswer() {
    $(".norm0").css("fill", pad0.cNorm);
    $(".norm1").css("fill", pad1.cNorm);
    $(".norm2").css("fill", pad2.cNorm);
    $(".norm3").css("fill", pad3.cNorm);
    greenGain.gain.value = 0;
    redGain.gain.value = 0;
    yellowGain.gain.value = 0;
    blueGain.gain.value = 0;
    $("#simonOuter").css("fill", "#555555");
    wrongGain.gain.value = 0.4;
    setTimeout(function() {
      $("#simonOuter").css("fill", "#333333");
      wrongGain.gain.value = 0;
      var playPart = secretCode.slice(0, levelNumber + 1);
      playSecretCode(playPart);
    }, 1000);
  }

  // end of jQuery document ready
});