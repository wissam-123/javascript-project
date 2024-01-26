// Verkrijg het canvas element en de 2D-context
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// Balvariabelen
var ballRadius = 10;// Radius van de bal
var x = canvas.width/2;// X-positie van de bal (start in het midden van het canvas)
var y = canvas.height-30;// Y-positie van de bal (start iets boven de onderkant van het canvas)
var dx = 2; // Horizontale snelheid van de bal
var dy = -2;// Verticale snelheid van de bal (negatief omhoog te bewegen)


// Paddlevariabelen
var paddleHeight = 10; // Hoogte van de paddle
var paddleWidth = 75; // Breedte van de paddle
var paddleX = (canvas.width-paddleWidth)/2; // X-positie van de paddle (start in het midden van het canvas)
var rightPressed = false; // Boolean om bij te houden of de rechtertoets is ingedrukt
var leftPressed = false;// Boolean om bij te houden of de linkertoets is ingedrukt

// Baksteenvariabelen
var brickRowCount = 5; // Aantal rijen bakstenen
var brickColumnCount = 3; // Aantal kolommen bakstenen
var brickWidth = 75; // Breedte van elke baksteen
var brickHeight = 20; // Hoogte van elke baksteen
var brickPadding = 10; // Afstand tussen bakstenen
var brickOffsetTop = 30; // Verticale offset vanaf de bovenkant van het canvas
var brickOffsetLeft = 30; // Horizontale offset vanaf de linkerzijde van het canvas

// Score en levens 
var score = 0;
var lives = 3;

// Array voor bakstenen
var bricks = []; // Array voor het opslaan van bakstenen
for(var c=0; c<brickColumnCount; c++) {
  bricks[c] = [];  // Maak een subarray voor elke kolom
  for(var r=0; r<brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 }; // Initialiseer elke baksteen met x- en y-posities, en status 1 (actief)
  }
}
// Event listeners voor toetsenbord en muis
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);


// Functie voor het hanteren van toetsaanslagen
function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true; // Zet rightPressed op true als de rechter pijltoets wordt ingedrukt
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true; // Zet leftPressed op true als de linker pijltoets wordt ingedrukt
    }
}


// Functie voor het hanteren van toetsenbord loslaten
function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

// Functie voor het hanteren van muisbewegingen
function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  if(relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth/2;
  }
}

// Functie voor het detecteren van botsingen met bakstenen
function collisionDetection() {
  for(var c=0; c<brickColumnCount; c++) {
    for(var r=0; r<brickRowCount; r++) {
      var b = bricks[c][r]; // Haal de huidige baksteen op
      if(b.status == 1) {   // Controleer of de baksteen actief is
        if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
          dy = -dy;   // Keer de verticale bewegingsrichting van de bal om bij een botsing
          b.status = 0;  // Markeer de baksteen als geraakt (status 0)
          score++;   // Verhoog de score
          if(score == brickRowCount*brickColumnCount) {
            alert("YOU WIN, CONGRATS!");  // Toon een felicitatie als alle bakstenen zijn geraakt
            document.location.reload();   // Herlaad de pagina om het spel opnieuw te starten
          }
        }
      }
    }
  }
}



// Functie voor het tekenen van de bal
function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.closePath();
}

// Functie voor het tekenen van de paddle
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.closePath();
}

// Functie voor het tekenen van de bakstenen
function drawBricks() {
  for(var c=0; c<brickColumnCount; c++) {
    for(var r=0; r<brickRowCount; r++) {
      if(bricks[c][r].status == 1) {  // Controleer of de baksteen actief is
        var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft; // Bereken de X-positie van de baksteen
        var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop; // Bereken de Y-positie van de baksteen
        bricks[c][r].x = brickX; // Update de X-positie van de baksteen in de array
        bricks[c][r].y = brickY; // Update de Y-positie van de baksteen in de array
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#5d452d"; // Stel de vulkleur van de baksteen in
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

// Functie voor het tekenen van de score
function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("Score: "+score, 8, 20);
}

// Functie voor het tekenen van de levens
function drawLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

// Hoofdfunctie voor het tekenen van het spel
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();  // Teken de bakstenen
  drawBall();   // Teken de bal
  drawPaddle();   // Teken de paddle
  drawScore();  // Teken de score
  drawLives();   // Teken het aantal levens
  collisionDetection(); // Controleer op botsingen met bakstenen

   // Botsingen met de muren
  if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  // Botsingen met het plafond
  if(y + dy < ballRadius) {
    dy = -dy;
  }

   // Botsingen met de paddle of verlies van levens
  else if(y + dy > canvas.height-ballRadius) {
    if(x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    }
    else {
      lives--;
      if(!lives) {
        alert("GAME OVER");
        document.location.reload();
      }
      else {
        x = canvas.width/2;
        y = canvas.height-30;
        dx = 3;
        dy = -3;
        paddleX = (canvas.width-paddleWidth)/2;
      }
    }
  }

   // Beweging van de paddle
  if(rightPressed && paddleX < canvas.width-paddleWidth) {
    paddleX += 7;
  }
  else if(leftPressed && paddleX > 0) {
    paddleX -= 7;
  }
  // Beweging van de bal
  x += dx;
  y += dy;
   // Voer de functie opnieuw uit voor animatie
  requestAnimationFrame(draw);
}
// Start de hoofdfunctie om het spel te starten
draw();

                                     // codes voor  portfolio  pagina
function showContent(contentType) {
  var display = document.getElementById('display');

  switch (contentType) {
      case 'photo':
          display.innerHTML = '<img src="fotos/wissam.JPG " height="100%" width=" 100%"   alt="Your Photo">';
          break;
      case 'contact':
          display.innerHTML = '<p style="color: white;">Contact Information:<br>Email: hatatwissam@hotmail.com<br>Tel.nr: 123-456-7890</p>';
          break;
      case 'button4':
          display.innerHTML = '<p style="color: white;"> Ervaring: ik heb ervaring in HTML, Css, php en javascript </p>';
          break;
      case 'button5':
          display.innerHTML = '<p style="color: white;">Diplomas: Havo diploma, taal diploma B1 en chefsdiploma  </p>';
          break;
      case 'button6':
          display.innerHTML = '<p style="color: white;"> Hobby : Sporten  </p>';;
          break;
      default:
          display.innerHTML = '<p style="color: white;">No content available</p>';
          break;
  }
} 
///rweowoifoifbgwoefgw

