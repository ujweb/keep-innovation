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
function onToggleFZSlideUp() {
    const dropdownEl = ".fontsize__dropdown";
    $(dropdownEl).slideUp();
}
function onToggleFZSlideDown() {
    const dropdownEl = ".fontsize__dropdown";
    $(dropdownEl).slideDown();
}

$(document).ready(() => {
    googleTranslateElementInit();

    const dataModules = [...document.querySelectorAll('[data-module="countup"]')];
    dataModules.forEach((element) => {
        new countUp(element);
    });
});

// ====================
const flicking = new Flicking("#hero__banner--flicking", {
    circular: true,
    renderOnlyVisible: true,
})
    .on("willChange", function (e) {
        const index = e.index;
        // TODO: 背景替換
        onChangeHeroBannerBackground(index);
        // TODO: Pagination 動畫
        onChangeHeroBannerFlicking(index);
        // TODO: 圖片 Blur-Out

    })
    .on("changed", function (e) {
        const index = e.index;
        // TODO: 建立圖片往上位移滾動機制
        // TODO: 圖片 Blur-In
        console.log(document.querySelectorAll('.hero__banner__image'));
    });

const onChangeHeroBannerBackground = (index) => {
    switch (index) {
        case 0:
            switchToColorSet1();
            break;
        case 1:
            switchToColorSet2();
            break;
        case 2:
            switchToColorSet3();
            break;
        default:
            break;
    }
};

const onChangeHeroBannerFlicking = (index) => {
    console.log(index);
};

// flicking.addPlugins(new Flicking.Plugins.AutoPlay({ duration: 5000 }));
// flicking.addPlugins(new Flicking.Plugins.Fade());
