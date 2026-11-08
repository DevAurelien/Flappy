// import Score from "./Scores.js";
import "../js/overlay.js";
const canvas = document.querySelector("canvas");
const btn = document.getElementById("btn-jouer");
const btnLevel = document.querySelector("#affichage-level");
const ctx = canvas.getContext("2d");

// Score.init();
// Score.recupererLocalStorage();

canvas.width = window.innerWidth - 200;
canvas.height = window.innerHeight - 200;
let timestamp = 0;

//temps X speed = distance
//  s   x  km/h =  px/s

// distance/temps     = vitesse
//   km    / h        =  km/h
//   px    / s        =  px/s
//   100   /deltatime =  100px/deltaTime = 100 * deltaTime

let x = canvas.width / 2 - 128;
let y = canvas.height / 2 - 128;
let gravité = 110; // px 
let speed = 50;

let reqId;let id = 0;
let startTime = 0 ;
// btn.style.visibility = "hidden";
btnLevel.addEventListener("click", () => {
  window.cancelAnimationFrame(id);
  window.cancelAnimationFrame(reqId);
});

btn.addEventListener("click", (timestamp) => {
  btn.style.visibility = "hidden";
  startTime = performance.now();
  reqId = requestAnimationFrame(draw);
});

canvas.addEventListener('click', ()=>{
  y -= 60
})

const img = new Image();

// img.src = "./src/assets/heros/normalSprite.png";
img.src = "./src/assets/heros/normalSprite.png";
img.addEventListener("load", () => {
  // requestAnimationFrame(draw);
});
let i = 0;
let boucleSens = true;
let lastFrameTime = 0;
const frameInterval = 50;
let deltaTime = 0;

function jump (deltaTime){
  y -= 60* deltaTime;
}

function draw(timestamp) {
  deltaTime = (timestamp - startTime) / 1000;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(
    img,
    i, //sx : position horizontale où commence la découpe.
    0, //sy : position verticale.
    256, //sw : largeur de la découpe.
    256, //sh : hauteur de la découpe.
    x,
    y,
    256,
    256,
  );

  y += 10 * deltaTime;
  y += deltaTime * gravité; 

  if (timestamp - lastFrameTime >= frameInterval) {
    boucleSens === true ? (i += 256) : (i -= 256);

    lastFrameTime = timestamp;
  }

  if (i === 4864 && boucleSens === true) boucleSens = false;
  if (i === 0 && boucleSens === false) boucleSens = true;

  id = requestAnimationFrame(draw);
  startTime = timestamp;
}
