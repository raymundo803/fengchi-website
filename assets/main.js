// 移动端菜单
const burger = document.querySelector('.hamburger');
const links = document.querySelector('.nav-links');
if (burger) {
  burger.addEventListener('click', () => {
    links.classList.toggle('open');
    burger.classList.toggle('active');
  });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
}

// 滚动揭示动画
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('show'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// 表单提交（演示：前端拦截）
document.querySelectorAll('form[data-demo]').forEach(f => {
  f.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('演示环境：表单已提交（实际接入后会实时通知到企业微信/邮件）');
    f.reset();
  });
});

// ===== 浮动联系按钮组件 =====
(function(){
  const phone = '400-XXX-XXXX';
  const wxId = 'fc-ad-2005';

  const icons = {
    msg: '<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zM6 8h12v2H6zm0 4h8v2H6z"/></svg>',
    tel: '<svg viewBox="0 0 24 24"><path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.4 21 3 13.6 3 4.5c0-.55.45-1 1-1H8c.55 0 1 .45 1 1 0 1.24.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>',
    qr: '<svg viewBox="0 0 24 24"><path d="M3 11h8V3H3v8zm2-6h4v4H5V5zM3 21h8v-8H3v8zm2-6h4v4H5v-4zM13 3v8h8V3h-8zm6 6h-4V5h4v4zM13 13h2v2h-2zM15 15h2v2h-2zM13 17h2v2h-2zM17 13h2v2h-2zM19 15h2v2h-2zM17 17h2v2h-2zM15 19h2v2h-2zM19 19h2v2h-2z"/></svg>',
    top: '<svg viewBox="0 0 24 24"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/></svg>'
  };

  const bar = document.createElement('div');
  bar.className = 'floating-bar';
  bar.innerHTML = `
    <div class="float-btn" data-action="msg" title="留言咨询">${icons.msg}<span class="float-tip">留言咨询</span></div>
    <a class="float-btn" data-action="tel" title="拨打电话" href="tel:${phone.replace(/-/g,'')}">${icons.tel}<span class="float-label">电话 ${phone}</span><span class="float-tip">拨打电话</span></a>
    <div class="float-btn" data-action="wx" title="添加微信">${icons.qr}<span class="float-tip">添加微信</span></div>
    <div class="float-btn" data-action="top" title="返回顶部">${icons.top}<span class="float-tip">返回顶部</span></div>
  `;
  document.body.appendChild(bar);

  // overlay + popups
  const overlay = document.createElement('div');
  overlay.className = 'float-overlay';
  overlay.innerHTML = `
    <div class="float-popup" data-popup="wx">
      <button class="close">&times;</button>
      <h3>添加微信咨询</h3>
      <p>扫描二维码或搜索微信号添加客服</p>
      <div class="qr-placeholder">二维码占位<br>正式上线替换</div>
      <div class="wx-id">${wxId}</div>
    </div>
    <div class="float-popup" data-popup="msg">
      <button class="close">&times;</button>
      <h3>留言咨询</h3>
      <p>留下联系方式，24 小时内与您联系</p>
      <form data-demo>
        <label>称呼</label>
        <input type="text" placeholder="您的姓名 / 公司" required>
        <label>联系电话</label>
        <input type="tel" placeholder="手机号" required>
        <label>需求类型</label>
        <select required>
          <option value="">请选择</option>
          <option>广告 / 标识标牌</option>
          <option>装饰装潢工程</option>
          <option>市政 / 亮化 / 钢结构</option>
          <option>AI 数字化陪跑</option>
          <option>活动策划执行</option>
          <option>媒体投放合作</option>
        </select>
        <label>需求说明</label>
        <textarea rows="3" placeholder="简单描述您的项目或目标"></textarea>
        <button type="submit" class="btn btn-ghost">提交需求</button>
      </form>
    </div>
  `;
  document.body.appendChild(overlay);

  const popups = overlay.querySelectorAll('.float-popup');
  const closeBtns = overlay.querySelectorAll('.float-popup .close');

  function openPopup(name){
    overlay.classList.add('open');
    popups.forEach(p => p.classList.remove('open'));
    const target = overlay.querySelector(`.float-popup[data-popup="${name}"]`);
    if(target) target.classList.add('open');
  }
  function closeAll(){
    overlay.classList.remove('open');
    popups.forEach(p => p.classList.remove('open'));
  }

  bar.querySelectorAll('.float-btn').forEach(btn => {
    const action = btn.dataset.action;
    if(action === 'msg') btn.addEventListener('click', () => openPopup('msg'));
    if(action === 'wx') btn.addEventListener('click', () => openPopup('wx'));
    if(action === 'tel'){
      btn.addEventListener('mouseenter', () => btn.classList.add('show-label'));
      btn.addEventListener('mouseleave', () => btn.classList.remove('show-label'));
      btn.addEventListener('click', () => btn.classList.toggle('show-label'));
    }
    if(action === 'top') btn.addEventListener('click', () => window.scrollTo({top:0,behavior:'smooth'}));
  });

  overlay.addEventListener('click', (e) => { if(e.target === overlay) closeAll(); });
  closeBtns.forEach(b => b.addEventListener('click', closeAll));

  // 绑定弹窗内表单
  overlay.querySelectorAll('form[data-demo]').forEach(f => {
    f.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('演示环境：留言已提交（实际接入后会实时通知到企业微信/邮件）');
      f.reset();
      closeAll();
    });
  });

  // 滚动超过 400px 才显示返回顶部，可选
  const topBtn = bar.querySelector('[data-action="top"]');
  topBtn.style.opacity = '0';
  topBtn.style.pointerEvents = 'none';
  window.addEventListener('scroll', () => {
    if(window.scrollY > 400){ topBtn.style.opacity='1'; topBtn.style.pointerEvents='auto'; }
    else { topBtn.style.opacity='0'; topBtn.style.pointerEvents='none'; }
  });
})();
