/**
 * Schriftliche Prüfungen (Fahrlehrerprüfung Klasse BE) für die Prüfungssimulation:
 * Aufgaben wortgetreu aus den Original-Prüfungen, gegliedert nach Prüfungsteilen.
 * Platzhalter – die Prüfungen werden nur in die private App bzw. die verschlüsselte
 * Website eingebaut, nicht im Klartext ins Repository.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.FLQuestionsSchriftlich = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  return { exams: [] };
});
