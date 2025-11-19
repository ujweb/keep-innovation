document.addEventListener("DOMContentLoaded", () => {
    const flickingSelectors = [
        "#slider__item__flicking--1",
        "#slider__item__flicking--2",
        "#slider__item__flicking--3",
        "#slider__item__flicking--4",
    ];

    const heroBannerFlickings = flickingSelectors.map((selector) => {
        const flicking = new Flicking(selector, {
            circular: true,
            preventClickOnDrag: true,
            preventDefaultOnDrag: true,
        });

        flicking.on("willChange", (e) => {
            const index = e.index;
            onChangeHeroBannerBackground(index);
            onChangeHeroBannerPagination(index);
            document.querySelectorAll(".slider__item").forEach((el) => (el.style.filter = "blur(8px)"));
        });

        flicking.on("changed", () => {
            document.querySelectorAll(".slider__item").forEach((el) => (el.style.filter = "blur(0)"));
        });

        return flicking;
    });

    // 加上 Sync Plugin
    heroBannerFlickings[0].addPlugins(
        new Flicking.Plugins.Sync({
            type: "index",
            synchronizedFlickingOptions: [
                { flicking: heroBannerFlickings[0], isSlidable: true },
                { flicking: heroBannerFlickings[1], isSlidable: true },
                { flicking: heroBannerFlickings[2], isSlidable: true },
                { flicking: heroBannerFlickings[3], isSlidable: true },
            ],
        })
    );

    // Pagination
    const pagination = document.querySelectorAll(".hero__banner--pagination button");
    const onChangeHeroBannerPagination = (index) => {
        pagination.forEach((el) => el.classList.remove("active"));
        pagination[index].classList.add("active");
    };
    pagination.forEach((btn, idx) => {
        btn.addEventListener("click", () => {
            heroBannerFlickings[0].moveTo(idx);
        });
    });

    // 背景顏色
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

    // 外部按鈕切換
    window.onChangeHeroFlicking = (index) => {
        heroBannerFlickings[0].moveTo(index);
    };
});

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
