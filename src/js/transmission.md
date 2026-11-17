Travail effectué : 
Retravaille du index.html pour que l'overlay se trouve dans #game-container 
Creation du chrono, écoute des events start et end 
Correction du sky qui commence en bas gauche du canvas au lieu de x=0 et y=0 (ligne 63-65 de Sky.js)
Mise en place de Audio.js qui gere le lancement des musiques et du Fade
Mise en place de Params.js pour gerer les diverses parametres ( volume uniquement pour l'instant )
Si tu veut mute, ligne 25 de Audio.js, volumeCurseur = 0 a decommenté, ça soulage les tympans ^^ 


Normes : 
<!-- width 5120 px x 256 px format des frames personnages   -->
<!-- width 2172 px x 2000 px format des background          --> // attention cette taille viens de changer le 17/11, hauteur plus grande
<!-- width 2172 px x 71 px format des sols                  -->

Pour le scoring : 

- [ ] Il me faut un gameEvent "obstaclePassed" pour le passage de chaque ile dans le Score 
- [ ] Au moment du startPlay, on initialise encore, il faudrait un event au moment du lancement réel de la partie genre gameStarted pour que je commence le chrono score dessus


Pour le moteur audio:
