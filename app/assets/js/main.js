function googleTranslateElementInit() {
    new google.translate.TranslateElement(
        {
            pageLanguage: "zh-TW",
            includedLanguages: "zh-TW,en",
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_translate_element"
    );
}

function onChangeFontSize(value) {
    console.log(value);
}

$(document).ready(() => {
    googleTranslateElementInit();
});
