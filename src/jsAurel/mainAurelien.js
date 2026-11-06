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

let id = 0;
//temps X speed = distance
//  s   x  km/h =  px/s   

// distance/temps     = vitesse
//   km    / h        =  km/h
//   px    / s        =  px/s
//   100   /deltatime =  100px/deltaTime


let gravité = 100; // px / s 1000ms = 1sec

// btn.style.visibility = "hidden";
btnLevel.addEventListener("click", ()=> window.cancelAnimationFrame(id) )

btn.addEventListener("click", () => {
  btn.style.visibility = "hidden";
  draw();
});

const img = new Image();
let startTime = performance.now();

// img.src = "./src/assets/heros/normalSprite.png";
img.src = "./src/assets/heros/normalSprite.png";
img.addEventListener("load", () => {
  // requestAnimationFrame(draw);
});
let i = 0;
let boucleSens = true;
let lastFrameTime = 0;
const frameInterval = 80;
let deltaTime = 0;

function draw(timestamp) {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.drawImage(
      img,
      i,//sx : position horizontale où commence la découpe.
      0, //sy : position verticale.
      256, //sw : largeur de la découpe. 
      256, //sh : hauteur de la découpe.
      canvas.width / 2 - 128,
      canvas.height / 2 - 128,
      256,
      256,
    );
    console.log("deltaTime", deltaTime = (timestamp - lastFrameTime)/1000)

    if (timestamp - lastFrameTime >= frameInterval) {
          boucleSens === true ? i += 256 : i-=256;

          lastFrameTime = timestamp;
  }
    
    if(i === 4864 && boucleSens === true) boucleSens = false;
    if(i === 0 && boucleSens === false) boucleSens = true;

    id = requestAnimationFrame(draw);
    startTime = timestamp
    }



