const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// canvas.width = Math.min(window.innerWidth * 0.8, 800);
// canvas.height = Math.min(window.innerHeight * 0.8, 600);

// window.addEventListener("resize", () => {
//   canvas.width = Math.min(window.innerWidth * 0.8, 800);
//   canvas.height = Math.min(window.innerHeight * 0.8, 600);
// });


const BASE_HEIGHT = 700;
let scale;
let largeurLogique;

function resizeCanvas() {
  const largeurDispo = window.innerWidth * 0.9;
  const hauteurDispo = window.innerHeight * 0.7;
  canvas.width = Math.floor(largeurDispo);
  canvas.height = Math.floor(hauteurDispo);
  scale = canvas.height / BASE_HEIGHT;
  largeurLogique = canvas.width / scale;
  }



resizeCanvas();



window.addEventListener("resize", resizeCanvas);

// sur pc, le joueur aura un espace
//  plus large, mais la gravité et la taille
//  du perso resteront cohérente à la hauteur du jeu