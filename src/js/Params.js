import Audio from "./Audio.js";

const baliseAudios = document.querySelectorAll("audio");
const imageParam = document.getElementById("image-param");
const divParameter = document.getElementById("div-parameter");

export default class Params {
  static volumeGeneral = 0;

  static init() {
    const section = document.createElement("section");
    section.classList.add("containerVolume");
    divParameter.appendChild(section);
    section.innerHTML = `
    <div class="container-input-volume">
            <div class="label-input-volume">
                <label for="soundGame">Son du jeu</label>
                <input name="soundGame" id="soundGame" type="range" step="0.1" value=${Audio.volumeCurseur} max=${Audio.volumeMax} min=${Audio.volumeMin} />
            </div>
        <button id="btnFermerParams">Fermer</button>
    </div>
`;
    const btnFermer = document.getElementById("btnFermerParams");
    const input = document.getElementById("soundGame");
    input.addEventListener("input", () => {
      this.modifyVolume(Number(input.value));
    });

    divParameter.addEventListener("click", () => {
      imageParam.style.visibility = "hidden";
      section.style.visibility = "visible";
      section.classList.add("visibleContainerVolume");
    });

    btnFermer.addEventListener("click", (event) => {
      event.stopPropagation();
      section.style.visibility = "hidden";
      imageParam.style.visibility = "visible";
      section.classList.remove("visibleContainerVolume");
    });
  }

  static modifyVolume(volume) {
    Audio.volumeCurseur = Number(volume);

    baliseAudios.forEach((item) => {
      const isEffect =
        item.classList.contains("son_player") ||
        item.classList.contains("son_bruitages");

      item.volume =
        isEffect && volume > 0
          ? Math.min(Number(volume) + 0.2, 1)
          : Number(volume);
    });
  }
}
