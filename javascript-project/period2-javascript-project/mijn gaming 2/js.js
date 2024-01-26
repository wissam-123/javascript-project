var telling = 0;
var speler = 1;
var bord = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

var canvas = document.getElementById("tic-tac-toe-board");
var context = canvas.getContext('2d');
var canvasGrootte = 500;
var sectieGrootte = canvasGrootte / 3;
canvas.width = canvasGrootte;
canvas.height = canvasGrootte;
context.translate(0.5, 0.5);
context.lineWidth = 10;

/* Gebeurtenis Functies */
function main() {
  document.getElementById("main").style.display = "block";
  document.getElementById("learn").style.display = "none";
  document.getElementById("game").style.display = "none";
}

/* Gebeurtenis Functies */
function startSpel() {
  document.getElementById("main").style.display = "none";
  document.getElementById("learn").style.display = "none";
  document.getElementById("game").style.display = "block";

  canvas.addEventListener('mouseup', function (event) {
    voegSpeelstukToe(krijgMuisPositieOpCanvas(event));
    tekenBord();
    setTimeout(() => {
      if (!controleerWieWint(1) && !controleerWieWint(2)) {
        controleerIsVoorbij();
      }
    }, 100);
  });
  tekenBord();
}

/* Gebeurtenis Functies */
function learn() {
  document.getElementById("main").style.display = "none";
  document.getElementById("learn").style.display = "block";
  document.getElementById("game").style.display = "none";
}



function voegSpeelstukToe(muis) {
  var xCoordinaat;
  var yCoordinaat;
  for (var x = 0; x < 3; x++) {
    for (var y = 0; y < 3; y++) {
      xCoordinaat = x * sectieGrootte;
      yCoordinaat = y * sectieGrootte;
      if (
        muis.x >= xCoordinaat && muis.x <= xCoordinaat + sectieGrootte &&
        muis.y >= yCoordinaat && muis.y <= yCoordinaat + sectieGrootte && bord[y][x] == 0
      ) {
        bord[y][x] = speler;
        speler = speler == 1 ? 2 : 1;
        telling++;
      }
    }
  }
}

function krijgMuisPositieOpCanvas(event) {
  var rechthoek = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rechthoek.left,
    y: event.clientY - rechthoek.top
  }
}

function wisSpeelgebied(xCoordinaat, yCoordinaat) {
  context.fillStyle = "#fff";
  context.fillRect(
    xCoordinaat,
    yCoordinaat,
    sectieGrootte,
    sectieGrootte
  );
}

function tekenO(xCoordinaat, yCoordinaat) {
  var helftSectieGrootte = (0.5 * sectieGrootte);
  var centerX = xCoordinaat + helftSectieGrootte;
  var centerY = yCoordinaat + helftSectieGrootte;
  var straal = (sectieGrootte - 100) / 2;
  var startHoek = 0 * Math.PI;
  var eindHoek = 2 * Math.PI;
  context.beginPath();
  context.arc(centerX, centerY, straal, startHoek, eindHoek);
  context.stroke();
}

function tekenX(xCoordinaat, yCoordinaat) {
  context.beginPath();
  var offset = 50;
  context.moveTo(xCoordinaat + offset, yCoordinaat + offset);
  context.lineTo(xCoordinaat + sectieGrootte - offset, yCoordinaat + sectieGrootte - offset);
  context.moveTo(xCoordinaat + offset, yCoordinaat + sectieGrootte - offset);
  context.lineTo(xCoordinaat + sectieGrootte - offset, yCoordinaat + offset);
  context.stroke();
}

function tekenBord() {
  // Het commando bijwerken
  document.querySelector("#textPlayer").textContent = "(Huidige Speler: " + speler + " )";
  document.querySelector("#textComd").textContent = "(Speler " + (telling % 2 + 1) + " kan nu spelen... )";

  var xCoordinaat;
  var yCoordinaat;
  for (var x = 0; x < 3; x++) {
    for (var y = 0; y < 3; y++) {
      xCoordinaat = x * sectieGrootte;
      yCoordinaat = y * sectieGrootte;
      // Eerst wissen en dan tekenen
      wisSpeelgebied(xCoordinaat, yCoordinaat);
      if (bord[y][x] === 1) {
        tekenX(xCoordinaat, yCoordinaat);
      }
      else if (bord[y][x] === 2) {
        {
          tekenO(xCoordinaat, yCoordinaat);
        }
      }
    }
  }

  // Lijnen van het bord tekenen
  var lijnStart = 4;
  var lijnLengte = canvasGrootte - 5;
  context.beginPath();
  for (var y = 1; y <= 2; y++) {
    context.moveTo(lijnStart, y * sectieGrootte);
    context.lineTo(lijnLengte, y * sectieGrootte);
  }
  for (var x = 1; x <= 2; x++) {
    context.moveTo(x * sectieGrootte, lijnStart);
    context.lineTo(x * sectieGrootte, lijnLengte);
  }
  context.stroke();
}

function controleerWieWint(nummer) {
  // Controleer winst, nummer zal 1 of 2 zijn
  // 1 voor speler EEN
  // 2 voor speler TWEE
  let isWinst = false;
  for (let i = 0; i < 3; i++) {
    if ((bord[i][0] === nummer && bord[i][1] === nummer && bord[i][2] === nummer) || (bord[0][i] === nummer && bord[1][i] === nummer && bord[2][i] === nummer)) {
      isWinst = true;
      alert("Speler " + nummer + " wint het spel");
      window.location.reload();
    }
  }

  if ((bord[0][0] === nummer && bord[1][1] === nummer && bord[2][2] === nummer) || (bord[0][2] === nummer && bord[1][1] === nummer && bord[2][0] === nummer)) {
    isWinst = true;
    alert("Speler " + nummer + " wint het spel");
    window.location.reload();
  }
  return isWinst;
}

function checkIsOver() {
  // IF BOTH ARE NOT WIN AND NO NEXT MOVE
  if (telling >= 9) {
    alert("Game is Over!!!");
    window.location.reload();
  }
}

window.onload = main;