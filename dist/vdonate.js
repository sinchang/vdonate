(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.vdonate = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function styleInject(css, ref) {
    if ( ref === void 0 ) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') { return; }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css = "#donate-modal-container {\n  position: fixed;\n  height: 100%;\n  width: 100%;\n  top: 0;\n  left: 0;\n  z-index: 999;\n  transform: scale(0);\n}\n#donate-modal-container.active {\n  transform: scale(1);\n}\n#donate-modal-container .donate-quote {\n  padding: 0;\n  margin: 0;\n}\n#donate-modal-container .donate-quote-left {\n  display: inline-block;\n  vertical-align: text-bottom;\n  width: 32px;\n  height: 32px;\n  background: url(\"https://ooo.0o0.ooo/2017/03/09/58c158afac35c.png\");\n}\n#donate-modal-container .donate-quote-word {\n  font-size: 20px;\n  color: #333;\n}\n#donate-modal-container .donate-quote-right {\n  display: inline-block;\n  vertical-align: text-bottom;\n  width: 32px;\n  height: 32px;\n  background: url(\"https://ooo.0o0.ooo/2017/03/09/58c1584d5fd9d.png\");\n}\n#donate-modal-container .donate-tab {\n  margin-top: 20px;\n  font-size: 0;\n}\n#donate-modal-container .donate-tab a {\n  display: inline-block;\n  padding: 10px 0;\n  width: 120px;\n  font-size: 16px;\n  text-decoration: none;\n  color: #333;\n  background-color: #eee;\n  transition: all .3s;\n}\n#donate-modal-container .donate-tab .donate-wechat.active {\n  background-color: #44b549;\n  color: #fff;\n}\n#donate-modal-container .donate-tab .donate-alipay.active {\n  background-color: #059AE3;\n  color: #fff;\n}\n#donate-modal-container .donate-image {\n  display: none;\n  min-height: 450px;\n  max-width: 300px;\n  margin: 20px auto;\n}\n#donate-modal-container .donate-image.active {\n  display: block;\n}\n#donate-modal-container .donate-modal-background {\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.8);\n}\n#donate-modal-container .donate-modal-background .donate-modal {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  box-sizing: border-box;\n  background: #fff;\n  max-width: 900px;\n  padding: 50px;\n  border-radius: 3px;\n  font-weight: 300;\n}\n.donate-btn {\n  display: inline-block;\n  padding: 8px 16px;\n  border-radius: 5px;\n  background-color: #44b549;\n  color: #fff;\n  text-decoration: none;\n  margin-bottom: 20px;\n  transition: all .3s;\n}\n.donate-btn:hover {\n  opacity: .8;\n}\n.donate-btn .donate-qrcode {\n  display: inline-block;\n  padding-right: 5px;\n  vertical-align: -2px;\n  width: 16px;\n  height: 16px;\n  background: url(\"https://ooo.0o0.ooo/2017/03/09/58c16b1f3eaa4.png\") no-repeat;\n}\n@media (max-width: 768px) {\n  #donate-modal-container .donate-modal-background .donate-modal {\n    padding: 20px;\n    width: 100%;\n  }\n  #donate-modal-container .donate-modal-background .donate-image {\n    width: 100%;\n  }\n}\n";
  styleInject(css);

  var defaults = {
    title: '如果觉得我的文章对您有用，请随意打赏。您的支持将鼓励我继续创作!',
    btnText: '打赏支持'
  };
  var bd = document.body;
  var isShow = false;

  var Donate =
  /*#__PURE__*/
  function () {
    function Donate(options) {
      _classCallCheck(this, Donate);

      if (arguments[0] && _typeof(arguments[0]) === "object") {
        this.options = Object.assign({}, defaults, options);
      }

      if (!this.options.wechatImage) {
        throw new Error('wechatImage is required');
      }

      if (!this.options.alipayImage) {
        throw new Error('alipayImage is required');
      }

      this.el = this.options.el && this.options.el;
      this.render();
      this.bind();
    }

    _createClass(Donate, [{
      key: "render",
      value: function render() {
        var modalTpl = "\n      <div class=\"donate-modal-background\">\n        <div class=\"donate-modal\">\n          <p class=\"donate-quote\">\n            <i class=\"donate-quote-left\"></i>\n            <span class=\"donate-quote-word\">".concat(this.options.title, "</span>\n            <i class=\"donate-quote-right\"></i>\n          </p>\n          <div class=\"donate-tab\">\n            <a href=\"javascript:;\" class=\"donate-wechat active\" data-index=\"0\">\u5FAE\u4FE1</a>\n            <a href=\"javascript:;\" class=\"donate-alipay\" data-index=\"1\">\u652F\u4ED8\u5B9D</a>\n            <img src=\"").concat(this.options.wechatImage, "\" alt=\"wechat\" class=\"donate-image active\">\n            <img src=\"").concat(this.options.alipayImage, "\" alt=\"alipay\" class=\"donate-image\">\n          </div>\n        </div>\n      </div>\n    ");
        var btnTpl = "\n      <a href=\"javascript:;\" class=\"donate-btn\"><i class=\"donate-qrcode\"></i>".concat(this.options.btnText, "</a>\n    ");
        if (this.el) this.el.innerHTML = btnTpl;
        this.modal = document.createElement('div');
        this.modal.innerHTML = modalTpl;
        this.modal.id = 'donate-modal-container';
        bd.appendChild(this.modal);
      }
    }, {
      key: "bind",
      value: function bind() {
        var self = this;
        this.btns = this.modal.querySelectorAll('.donate-tab a');
        this.images = this.modal.querySelectorAll('.donate-tab .donate-image');
        this.modal.addEventListener('click', this._modalEvent.bind(self), false);

        if (!this.el) {
          return;
        }

        this.el.addEventListener('click', this._donateBtnEvent.bind(self), false);
      }
    }, {
      key: "_modalEvent",
      value: function _modalEvent(e) {
        e.stopPropagation();
        var index = e.target.dataset.index;

        if (index) {
          [].slice.call(this.btns).forEach(function (btn) {
            btn.classList.toggle('active');
          });
          [].slice.call(this.images).forEach(function (image) {
            image.classList.toggle('active');
          });
          return;
        }

        this.hide();
      }
    }, {
      key: "_donateBtnEvent",
      value: function _donateBtnEvent(e) {
        if (e.target.className === 'donate-btn') {
          this.show();
        }
      }
    }, {
      key: "show",
      value: function show() {
        if (isShow) return;
        this.modal.classList.add('active');
        isShow = true;
      }
    }, {
      key: "hide",
      value: function hide() {
        this.modal.classList.remove('active');
        isShow = false;
      }
    }, {
      key: "destroy",
      value: function destroy() {
        var self = this;
        this.modal.removeEventListener('click', this._modalEvent.bind(self), false);
        this.el.removeEventListener('click', this._donateBtnEvent.bind(self), false);
        bd.removeChild(this.modal);
      }
    }]);

    return Donate;
  }();

  return Donate;

})));
