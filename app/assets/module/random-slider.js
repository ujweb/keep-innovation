// 三組資料（你可自行替換）
const expansionData = [
    {
        slug: "rapidtek",
        label: "擴張期",
        article: "離開地球表面！臺灣低軌衛星的先導者：鐳洋科技",
        compony: "鐳洋科技",
    },
    {
        slug: "ancillary-power",
        label: "擴張期",
        article: "臺灣民間電業的先發投手「安瑟樂威」：開拓不是使命而是挑戰",
        compony: "安瑟樂威",
    },
    {
        slug: "droxo-tech",
        label: "擴張期",
        article: "熱情讓科幻成為現實 佐翼科技與創造新「未來式」服務",
        compony: "佐翼科技",
    },
    {
        slug: "yajin",
        label: "擴張期",
        article: "準確觀察俐落進場 創新服務模式領「亞勁車電」進軍國際",
        compony: "亞勁車電",
    },
    {
        slug: "seeknfind",
        label: "擴張期",
        article: "神識物聯攜手邁特電子 推動 AIoT 精準定位技術商業化獨步全球",
        compony: "神識物聯",
    },
    {
        slug: "misecure",
        label: "擴張期",
        article: "署內競賽催生能源最佳解：聯新國際醫院 Ft.邁薩資通",
        compony: "邁薩資通",
    },
    {
        slug: "fiduciaedge-technologies",
        label: "擴張期",
        article: "樺漢集團母雞帶小雞 領資安新強人邊信聯走出新天地",
        compony: "邊信聯",
    },
];
const creationData = [
    {
        slug: "strongwises",
        label: "創建期",
        article: "樺漢集團母雞帶小雞 領資安新強人邊信聯走出新天地",
        compony: "雄材大智材料科技股份有限公司",
    },
    {
        slug: "freebionics",
        label: "創建期",
        article: "樺漢集團母雞帶小雞 領資安新強人邊信聯走出新天地",
        compony: "福寶科技股份有限公司",
    },
];
const growingData = [
    {
        slug: "etreego",
        label: "成長期",
        article: "樺漢集團母雞帶小雞 領資安新強人邊信聯走出新天地",
        compony: "起而行綠能股份有限公司",
    },
    {
        slug: "cancerfree",
        label: "成長期",
        article: "樺漢集團母雞帶小雞 領資安新強人邊信聯走出新天地",
        compony: "精拓生技股份有限公司",
    },
    {
        slug: "tsgc",
        label: "成長期",
        article: "樺漢集團母雞帶小雞 領資安新強人邊信聯走出新天地",
        compony: "鴻躉股份有限公司",
    },
    {
        slug: "fontrip",
        label: "成長期",
        article: "樺漢集團母雞帶小雞 領資安新強人邊信聯走出新天地",
        compony: "豐趣科技股份有限公司",
    },
];

const dataSets = [expansionData, creationData, growingData];

/**
 * 將資料填入單一組結構
 * @param {Array} data  資料陣列（expansionData / creationData / growingData）
 * @param {Number} groupIndex  第幾組（1、2、3）
 */
function fillGroup(data, groupIndex) {
    // 從指定 data 隨機抽 1 筆
    const index = Math.floor(Math.random() * data.length);
    const { slug, article, label, compony } = data[index];

    // 填入文字區塊
    const articleLink = document.getElementById(`articleLink${groupIndex}`);
    const articleLabel = document.getElementById(`articleLabel${groupIndex}`);
    const articleTitle = document.getElementById(`articleTitle${groupIndex}`);
    const articleCompany = document.getElementById(`articleCompany${groupIndex}`);

    console.log(groupIndex);

    articleLink.href = `article/${slug}.html`;
    articleLink.alt = article;
    articleLabel.textContent = `#${label}`;
    articleTitle.textContent = article;
    articleCompany.textContent = compony;

    // 填入三張圖片（對應 HTML 的 Img1/Img2/Img3）
    for (let i = 1; i <= 3; i++) {
        const img = document.getElementById(`articleImg${groupIndex}${i}`);
        if (img) {
            img.src = `assets/images/hero-banner/${slug}/${i}.jpg`;
        }
    }
}

// 依序填入 1、2、3 組
dataSets.forEach((d, idx) => fillGroup(d, idx + 1));
