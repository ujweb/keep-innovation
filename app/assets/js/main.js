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

AOS.init();

const slider__item = document.querySelectorAll(".slider__item")
const createHeroBannerFlicking = (selector) => {
    return new Flicking(selector, {
        circular: true,
        renderOnlyVisible: true,
    })
        .on("willChange", function (e) {
            const index = e.index;
            onChangeHeroBannerBackground(index);
            onChangeHeroBannerFlicking(index);
            // TODO: 圖片 Blur-In
            slider__item.forEach(element => {
                element.style.filter = "blur(8px)"
            });
        })
        .on("changed", function (e) {
            const index = e.index;
            // TODO: 建立圖片往上位移滾動機制
            // TODO: 圖片 Blur-Out
            slider__item.forEach(element => {
                element.style.filter = "blur(0)"
            });
        });
}

// 建立四個 Flicking 實例
const selectors = [
    "#slider__item__flicking--1",
    "#slider__item__flicking--2",
    "#slider__item__flicking--3",
    "#slider__item__flicking--4"
];

const heroBannerFlickings = selectors.map(createHeroBannerFlicking);

// 加入 Sync 插件（假設第一個為主控）
heroBannerFlickings[0].addPlugins(
    new Flicking.Plugins.Sync({
        type: "camera",
        synchronizedFlickingOptions: heroBannerFlickings.map(flicking => ({
            flicking,
            isClickable: false
        }))
    })
);
heroBannerFlickings[0].addPlugins(new Flicking.Plugins.AutoPlay({ duration: 5000 }));
heroBannerFlickings[0].addPlugins(new Flicking.Plugins.Fade());

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
        case 3:
            switchToColorSet4();
            break;
        default:
            break;
    }
};

const pagination = document.querySelectorAll('.hero__banner--pagination button')
const onChangeHeroBannerFlicking = (index) => {
    pagination.forEach(element => {
        element.classList.remove('active')
    });
    pagination[index].classList.add('active')
};

const onChangeHeroFlicking = (index) => {
    heroBannerFlickings[0].moveTo(index)
};

const flickingOptions = {
    circular: true,
    bound: true,
    panelsPerView: 1,
    align: "center",
    moveType: "strict",
    renderOnlyVisible: true,
};

document.querySelectorAll(".item__slider--flicking").forEach((el) => {
    const flicking = new Flicking(el, flickingOptions);

    const arrowPlugin = new Flicking.Plugins.Arrow({
        parentEl: el, // 指向每個自己的容器
        prevElSelector: ".flicking-arrow-prev",
        nextElSelector: ".flicking-arrow-next",
    });

    flicking.addPlugins(arrowPlugin);
});
