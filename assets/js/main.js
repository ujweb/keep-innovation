"use strict";

function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: "zh-TW",
    includedLanguages: "zh-TW,en",
    layout: google.translate.TranslateElement.InlineLayout.SIMPLE
  }, "google_translate_element");
}

function onChangeFontSize(value) {
  console.log(value);
}

function onToggleFZSlideUp() {
  var dropdownEl = '.fontsize__dropdown';
  $(dropdownEl).slideUp();
}

function onToggleFZSlideDown() {
  var dropdownEl = '.fontsize__dropdown';
  $(dropdownEl).slideDown();
}

$(document).ready(function () {
  googleTranslateElementInit();
});
//# sourceMappingURL=main.js.map
