/* Liste des jeux affichés sur la page d'accueil, dans cet ordre.
   Pour ajouter un jeu : mettre son dossier dans « jeux/ » (index.html, manifest.webmanifest, icons/),
   puis ajouter une ligne ici avec le nom exact de ce dossier. */
window.JEUX = [
  { dossier: 'tag-team',             nom: 'Tag Team',             phrase: 'Un duel de cartes, avec 18 combattants au choix.',        min: 2, max: 2,  genre: 'Combat' },
  { dossier: 'kostky',               nom: 'Kostky',               phrase: 'Le jeu de dés des tavernes de Bohême, tiré de Kingdom Come.', min: 2, max: 6,  genre: 'Dés' },
  { dossier: 'love-letter',          nom: 'Love Letter',          phrase: 'Faites parvenir votre lettre à la Princesse.',            min: 2, max: 6,  genre: 'Cartes' },
  { dossier: 'one-king-one-crown',   nom: 'One King One Crown',   phrase: 'Des nobles qui sourient, promettent, puis trahissent.',   min: 4, max: 8,  genre: 'Trahisons' },
  { dossier: 'secret-hitler',        nom: 'Secret Hitler',        phrase: 'Libéraux contre fascistes, votes et rôles cachés.',       min: 5, max: 10, genre: 'Rôles cachés' },
  { dossier: 'two-rooms-and-a-boom', nom: 'Two Rooms and a Boom', phrase: 'Deux salles, deux équipes, une bombe.',                   min: 6, max: 30, genre: 'Rôles cachés' }
];
