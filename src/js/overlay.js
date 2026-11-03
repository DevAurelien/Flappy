const overlay = document.getElementById("overlay");
const btnJouer = document.getElementById("btn-jouer");

const div = document.createElement("div");
overlay.style.display = 'none';

div.classList.add("cadre-overlay");

div.innerHTML = `
        <p id="game-over-title">Game Over</p>
        <p id="btn-retry">Réessayer</p>
`;

const showOverlay = () => {
  btnJouer.style.visibility = "hidden";
  overlay.appendChild(div);
  overlay.style.display = "flex"
};

export default showOverlay;

// import showOverlay from "./overlay.js"    Ta plus qu'a copier ça dans ton main
//  et le lancer (fait gaffe le masque le btn-Jouer en même temps) ^^
