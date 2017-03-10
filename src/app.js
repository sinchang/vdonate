require('./app.scss');

const defaults = {
  title: '如果觉得我的文章对您有用，请随意打赏。您的支持将鼓励我继续创作!',
  btnText: '打赏支持'
}

const bd = document.body;

class Donate {
  constructor(options) {
    if (arguments[0] && typeof arguments[0] === "object") {
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

  render() {
    var modalTpl = `
      <div class="donate-modal-background">
        <div class="donate-modal">
          <p class="donate-quote">
            <i class="donate-quote-left"></i>
            <span class="donate-quote-word">${this.options.title}</span>
            <i class="donate-quote-right"></i>
          </p>
          <div class="donate-tab">
            <a href="javascript:;" class="donate-wechat active" data-index="0">微信</a>
            <a href="javascript:;" class="donate-alipay" data-index="1">支付宝</a> 
            <img src="${this.options.wechatImage}" alt="wechat" class="donate-image active">
            <img src="${this.options.alipayImage}" alt="alipay" class="donate-image">
          </div>
        </div>
      </div>
    `;

    var btnTpl = `
      <a href="javascript:;" class="donate-btn"><i class="donate-qrcode"></i>${this.options.btnText}</a>
    `

    if (this.el) this.el.innerHTML = btnTpl;
    this.modal = document.createElement('div');
    this.modal.innerHTML = modalTpl;
    this.modal.id = 'donate-modal-container';
    bd.appendChild(this.modal);
  }

  bind() {
    var btns = this.modal.querySelectorAll('.donate-tab a');
    var images = this.modal.querySelectorAll('.donate-tab .donate-image');

    this.modal.addEventListener('click', (e) => {
      e.stopPropagation();
      var index = e.target.dataset.index;
      if (index) {
        [].slice.call(btns).forEach((btn) => {
          btn.classList.toggle('active');
        });
        [].slice.call(images).forEach((image) => {
          image.classList.toggle('active');
        });
        return;
      }

      this.hide();

    }, false);

    if (!this.el) {
      return;
    }

    this.el.addEventListener('click', (e) => {
      if (e.target.className === 'donate-btn') {
        this.show();
      }
    }, false);
  }

  show() {
    this.modal.classList.add('active');
  }

  hide() {
    this.modal.classList.remove('active');
  }
}

module.exports = Donate;