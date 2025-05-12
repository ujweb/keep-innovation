"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var countUp = /*#__PURE__*/function () {
  function countUp(el) {
    _classCallCheck(this, countUp);

    this.el = el;
    this.setVars();
    this.init();
  }

  _createClass(countUp, [{
    key: "setVars",
    value: function setVars() {
      var _this = this;

      console.log("aaaaaaaaaa");
      this.number = this.el.querySelectorAll("[data-countup-number]");
      this.observerOptions = {
        root: null,
        rootMargin: "0px 0px",
        threshold: 0
      };
      this.observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          var end = parseFloat(entry.target.dataset.countupNumber.replace(/,/g, ""));

          var decimals = _this.countDecimals(end);

          if (entry.isIntersecting) {
            _this.iterateValue(entry.target, end, decimals);
          }
        });
      }, this.observerOptions);
    }
  }, {
    key: "init",
    value: function init() {
      var _this2 = this;

      if (this.number.length > 0) {
        this.number.forEach(function (el) {
          _this2.observer.observe(el);
        });
      }
    }
  }, {
    key: "iterateValue",
    value: function iterateValue(el, end, decimals) {
      var _this3 = this;

      var start = 0;
      var duration = 2500;
      var startTimestamp = null;

      var step = function step(timestamp) {
        if (!startTimestamp) startTimestamp = timestamp;
        var elapsedPercent = (timestamp - startTimestamp) / duration;
        var easedProgress = Math.min(_this3.easeOutQuint(elapsedPercent), 1);
        var interimNumber = Math.abs(easedProgress * (end - start) + start);
        el.innerHTML = _this3.formatNumber(interimNumber, decimals);

        if (easedProgress < 1) {
          window.requestAnimationFrame(step);
        }
      };

      window.requestAnimationFrame(step);
    }
  }, {
    key: "easeOutQuad",
    value: function easeOutQuad(x) {
      return 1 - Math.pow(1 - x, 3);
    }
  }, {
    key: "easeOutQuint",
    value: function easeOutQuint(x) {
      return 1 - Math.pow(1 - x, 5);
    }
  }, {
    key: "countDecimals",
    value: function countDecimals(val) {
      var _val$toString$split$;

      if (Math.floor(val) === val) return 0;
      return ((_val$toString$split$ = val.toString().split(".")[1]) === null || _val$toString$split$ === void 0 ? void 0 : _val$toString$split$.length) || 0;
    }
  }, {
    key: "formatNumber",
    value: function formatNumber(val, decimals) {
      return val.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      });
    }
  }]);

  return countUp;
}();
"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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
  var dropdownEl = ".fontsize__dropdown";
  $(dropdownEl).slideUp();
}

function onToggleFZSlideDown() {
  var dropdownEl = ".fontsize__dropdown";
  $(dropdownEl).slideDown();
}

$(document).ready(function () {
  googleTranslateElementInit();

  var dataModules = _toConsumableArray(document.querySelectorAll('[data-module="countup"]'));

  dataModules.forEach(function (element) {
    new countUp(element);
  });
});
AOS.init(); // ====================

var heroBannerFlicking = new Flicking("#hero__banner--flicking", {
  circular: true,
  renderOnlyVisible: true
}).on("willChange", function (e) {
  var index = e.index; // TODO: 背景替換

  onChangeHeroBannerBackground(index); // TODO: Pagination 動畫

  onChangeHeroBannerFlicking(index); // TODO: 圖片 Blur-Out
}).on("changed", function (e) {
  var index = e.index; // TODO: 建立圖片往上位移滾動機制
  // TODO: 圖片 Blur-In

  console.log(document.querySelectorAll(".hero__banner__image"));
});

var onChangeHeroBannerBackground = function onChangeHeroBannerBackground(index) {
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

var onChangeHeroBannerFlicking = function onChangeHeroBannerFlicking(index) {
  console.log(index);
}; // heroBannerFlicking.addPlugins(new Flicking.Plugins.AutoPlay({ duration: 5000 }));
// heroBannerFlicking.addPlugins(new Flicking.Plugins.Fade());


var flickingOptions = {
  circular: true,
  bound: true,
  panelsPerView: 1,
  align: "center",
  moveType: "strict",
  renderOnlyVisible: true
};
document.querySelectorAll(".item__slider--flicking").forEach(function (el) {
  var flicking = new Flicking(el, flickingOptions);
  var arrowPlugin = new Flicking.Plugins.Arrow({
    parentEl: el,
    // 指向每個自己的容器
    prevElSelector: ".flicking-arrow-prev",
    nextElSelector: ".flicking-arrow-next"
  });
  flicking.addPlugins(arrowPlugin);
});
//# sourceMappingURL=main.js.map
