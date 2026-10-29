/**
 * Sammlung von mündlichen Prüfungsfragen (Fahrlehrerlehrgang BE, Stand Januar 2023):
 * Fragen wortgetreu, Antworten recherchiert. Jede neue Frage steht in ihrem Fach
 * (questions) und als Karteikarte im passenden Stapel (flashcards, dazu Ankreuzfragen
 * und Spieldaten in games); Fragen, die es in der App schon gibt, sind nicht doppelt
 * aufgenommen.
 * Platzhalter – die Fragen werden nur in die private App bzw. die verschlüsselte
 * Website eingebaut, nicht im Klartext ins Repository.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.FLQuestionsMsammlung = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  return { questions: [], flashcards: [], games: { pairs: [], sequences: [] } };
});
