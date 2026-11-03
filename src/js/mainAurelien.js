// import Score from "./Scores.js";
import "./overlay.js";
const canvas = document.querySelector("canvas");
const btn = document.getElementById("btn-jouer");
const ctx = canvas.getContext("2d");

// Score.init();
// Score.recupererLocalStorage();

canvas.width = window.innerWidth - 200;
canvas.height = window.innerHeight - 200;

btn.addEventListener("click", () => {
  btn.style.visibility = "hidden";
  draw();
});

const img = new Image();
const timestamp = Date.now();
// img.src = "../assets/heros/chevalier_1.png";
img.src = "./src/assets/heros/chevalier_anim.png";
img.addEventListener("load", () => {
  requestAnimationFrame(draw);
});
let i = 0;
let frameIndex = 0;
let lastFrameTime = 0;
const frameInterval = 50;
//const frame = { 0: 0, 1: 434.4, 2: 868.8, 3: 1303.2, 4: 1737.6 }; // 4: 2172
const frame = { 0: -17.2, 1: 417.2, 2: 851.6, 3: 1286, 4: 1720.4 }; // 4: 2172

function draw(timestamp) {
  // ctx.fillStyle = "rgb(200 0 0)";
  // ctx.fillRect(0,0, canvas.width,canvas.height);
    if (timestamp - lastFrameTime >= frameInterval) {
    frameIndex++;
    if (frameIndex === 5) frameIndex = 0;

    lastFrameTime = timestamp;
  }
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.drawImage(
      img,
      frame[frameIndex], //sx : position horizontale où commence la découpe.
      0, //sy : position verticale.
      434.4,//434.4, //sw : largeur de la découpe.  frame[i],
      724, //sh : hauteur de la découpe.
      canvas.width / 2 - 217.2,
      canvas.height / 2 - 362,
      434.4,
      724,
    );
    
    // requestAnimationFrame(draw);
    }
// 
   // 2172 * 724 px image originale donc 434.4 pour voir une seule image donc 217.2 au centre

//   


