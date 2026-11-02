/**
 * Prüfungsfragen-Sammlung (schriftliche Fachkundeprüfung, Fahrlehrerlehrgang BE).
 * Platzhalter – die Fragen werden nach Abschluss der Recherche ergänzt.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.FLQuestionsSammlung = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  return { questions: [], covered: [] };
});
