# vdonate
> 为你的网站增加个微信、支付宝二维码，方便读者打赏。 inspired by [Ruby China](https://ruby-china.org)

# 使用
```
<div id="donate">

<script src="https://unpkg.com/vdonate"></script>

new Donate({
  title: '如果觉得我的文章对您有用，请随意打赏。您的支持将鼓励我继续创作!', // 可选参数，打赏标题
  btnText: '打赏按钮', // 可选参数，打赏按钮文字
  el: document.getElementById('donate'), // 可选参数，打赏按钮的容器
  wechatImage: 'https://ooo.0o0.ooo/2017/03/09/58c15ca28db39.jpg', // 必选参数，微信收款二维码
  alipayImage: 'https://ooo.0o0.ooo/2017/03/09/58c15cb1ea865.jpg' // 必选参数，支付宝收款二维码
});
```

# API

- show() - 显示模态框
- hide() - 隐藏模态框
- destroy() - 销毁

# License

This content is released under the [MIT](http://opensource.org/licenses/MIT) License.
