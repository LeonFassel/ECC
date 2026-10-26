/**
 * Karteikarten (Lernkarten Fahrlehrer BE) nach Stapeln: Pädagogik, Recht, Technik,
 * Verkehrsverhalten. Frage = Vorderseite, Musterantwort = Rückseite der Karte.
 * Platzhalter – die Karten werden nur in die private App bzw. die verschlüsselte
 * Website eingebaut, nicht im Klartext ins Repository.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.FLQuestionsKarteikarten = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  return { decks: [], questions: [] };
});
