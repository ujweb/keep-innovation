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
    const list = ["sm", "md", "lg"];
    list.forEach((element) => {
        document.body.classList.remove(`fontsize--${element}`);
    });
    document.body.classList.add(`fontsize--${value}`);
}
// function onToggleFZSlideUp() {
//     const dropdownEl = ".fontsize__dropdown";
//     $(dropdownEl).slideUp();
// }
// function onToggleFZSlideDown() {
//     const dropdownEl = ".fontsize__dropdown";
//     $(dropdownEl).slideDown();
// }

$(document).ready(() => {
    googleTranslateElementInit();

    const dataModules = [...document.querySelectorAll('[data-module="countup"]')];
    dataModules.forEach((element) => {
        new countUp(element);
    });
});

document.querySelectorAll(".img__container img").forEach((el) => {
    const container = el.parentElement;
    const width = el.offsetWidth;
    if (width < 100) {
        container.classList.add("img__container--lg");
    } else {
        container.classList.remove("img__container--lg");
    }
});
