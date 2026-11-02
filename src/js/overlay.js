const app = document.getElementById("overlay");
const btnJouer = document.getElementById("btn-jouer");

const overlay = document.createElement("div");

overlay.classList.add("cadre-overlay");

overlay.innerHTML = `
        <p id="game-over-title">Game Over</p>
        <p id="btn-retry">Réessayer</p>
`;

const showOverlay = () => {
  btnJouer.style.visibility = "hidden";
  app.appendChild(overlay);
};

export default showOverlay;

// import showOverlay from "./overlay.js"    Ta plus qu'a copier ça dans ton main et le lancer (fait gaffe le masque le btn-Jouer en même temps) ^^