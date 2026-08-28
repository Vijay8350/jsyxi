// Shared client runtime injected into the preview iframe and the embed loader.
// Exposes window.__jsyxiInit(root, tool, opts). Vanilla JS, defensive, no deps.

export const EMBED_RUNTIME_JS = `
(function(){
  function q(root,sel){return root.querySelector(sel)}
  function qa(root,sel){return Array.prototype.slice.call(root.querySelectorAll(sel))}
  function pad(n){return (n<10?'0':'')+n}

  function initCountdown(root){
    var el=q(root,'.jw-countdown'); if(!el) return;
    var end=new Date(el.getAttribute('data-endat')).getTime();
    var hide=el.getAttribute('data-hide')==='true';
    var expiredMsg=el.getAttribute('data-expired')||'This offer has ended.';
    var clock=q(el,'.jw-clock');
    function tick(){
      var diff=end-Date.now();
      if(isNaN(end)){return}
      if(diff<=0){
        if(hide){el.style.display='none'}
        else{clock.innerHTML='<div class="jw-expired">'+expiredMsg+'</div>'}
        clearInterval(t); return;
      }
      var d=Math.floor(diff/86400000);
      var h=Math.floor(diff%86400000/3600000);
      var m=Math.floor(diff%3600000/60000);
      var s=Math.floor(diff%60000/1000);
      var map={days:d,hours:h,minutes:m,seconds:s};
      qa(el,'.jw-num').forEach(function(n){var u=n.getAttribute('data-u'); n.textContent=pad(map[u])});
    }
    tick(); var t=setInterval(tick,1000);
  }

  function initFaq(root){
    var faq=q(root,'.jw-faq'); if(!faq) return;
    var multiple=faq.getAttribute('data-multiple')==='true';
    qa(faq,'.jw-q').forEach(function(btn){
      btn.addEventListener('click',function(){
        var item=btn.parentNode;
        var isOpen=item.classList.contains('jw-open');
        if(!multiple){qa(faq,'.jw-item').forEach(function(i){i.classList.remove('jw-open')})}
        if(isOpen){item.classList.remove('jw-open')}else{item.classList.add('jw-open')}
      });
    });
  }

  function initPopup(root){
    var pop=q(root,'.jw-popup'); if(!pop) return;
    var once=pop.getAttribute('data-once')==='true';
    var delay=parseInt(pop.getAttribute('data-delay')||'0',10);
    var key='jsyxi_pop_'+(pop.getAttribute('data-key')||'x');
    try{ if(once && localStorage.getItem(key)){return} }catch(e){}
    function show(){pop.hidden=false}
    setTimeout(show, Math.max(0,delay)*1000);
    function dismiss(){pop.hidden=true; try{if(once)localStorage.setItem(key,'1')}catch(e){}}
    var c=q(pop,'.jw-close'); if(c)c.addEventListener('click',dismiss);
    var b=q(pop,'.jw-backdrop'); if(b)b.addEventListener('click',dismiss);
  }

  function initWhatsapp(root){
    var wa=q(root,'.jw-wa'); if(!wa) return;
    var btn=q(wa,'.jw-wabtn'), panel=q(wa,'.jw-wapanel'), close=q(wa,'.jw-waclose');
    var delay=parseInt(wa.getAttribute('data-delay')||'0',10);
    if(delay>0){wa.style.display='none'; setTimeout(function(){wa.style.display=''},delay*1000)}
    if(btn)btn.addEventListener('click',function(){panel.hidden=!panel.hidden});
    if(close)close.addEventListener('click',function(){panel.hidden=true});
  }

  function initForm(root,opts){
    var form=q(root,'.jw-form'); if(!form) return;
    var preview=form.getAttribute('data-preview')==='1' || (opts&&opts.preview);
    form.addEventListener('submit',function(e){
      e.preventDefault();
      var success=q(form,'.jw-success');
      var fieldsEl=q(form,'.jw-fields');
      var btn=q(form,'.jw-submit');
      function done(){ if(fieldsEl)fieldsEl.style.display='none'; if(btn)btn.style.display='none'; if(success)success.hidden=false; }
      if(preview || !form.getAttribute('action')){ done(); return; }
      var data={}; qa(form,'input,textarea,select').forEach(function(el){if(el.name)data[el.name]=el.value});
      if(btn){btn.disabled=true;btn.textContent='Sending…'}
      fetch(form.getAttribute('action'),{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)})
        .then(function(){done()})
        .catch(function(){done()});
    });
  }

  function sepnum(s){var p=(''+s).split('.');var a=p[0],neg=false;if(a.charAt(0)==='-'){neg=true;a=a.slice(1)}var out='';for(var i=0;i<a.length;i++){if(i>0&&(a.length-i)%3===0)out+=',';out+=a.charAt(i)}return (neg?'-':'')+out+(p[1]?'.'+p[1]:'')}

  function initCounter(root){
    var wrap=q(root,'.jw-counter'); if(!wrap) return;
    var dur=parseInt(wrap.getAttribute('data-duration')||'1600',10);
    var sep=wrap.getAttribute('data-sep')==='true';
    var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function fmt(n,dec){var s=dec>0?n.toFixed(dec):(''+Math.round(n));return sep?sepnum(s):s}
    function run(){
      qa(wrap,'.jw-cnum').forEach(function(el){
        var target=parseFloat(el.getAttribute('data-target'))||0;
        var dec=parseInt(el.getAttribute('data-dec')||'0',10);
        var out=q(el,'.jw-cval'); if(!out) return;
        if(reduce){out.textContent=fmt(target,dec);return}
        var start=null;
        function step(ts){if(start===null)start=ts;var p=Math.min(1,(ts-start)/dur);var e=1-Math.pow(1-p,3);out.textContent=fmt(target*e,dec);if(p<1)requestAnimationFrame(step);else out.textContent=fmt(target,dec)}
        requestAnimationFrame(step);
      });
    }
    if('IntersectionObserver' in window){var io=new IntersectionObserver(function(en){en.forEach(function(e){if(e.isIntersecting){run();io.disconnect()}})},{threshold:.3});io.observe(wrap)}else{run()}
  }

  function initHours(root){
    var el=q(root,'.jw-hours'); if(!el) return;
    var badge=q(el,'.jw-status');
    var offset=parseFloat(el.getAttribute('data-offset'))||0;
    var sched; try{sched=JSON.parse(el.getAttribute('data-schedule')||'[]')}catch(e){sched=[]}
    var now=new Date();
    var loc=new Date(now.getTime()+now.getTimezoneOffset()*60000+offset*3600000);
    var idx=(loc.getDay()+6)%7;
    var mins=loc.getHours()*60+loc.getMinutes();
    var rows=qa(el,'.jw-hrow'); if(rows[idx])rows[idx].classList.add('jw-today');
    if(!badge) return;
    function toMin(t){var m=(''+t).split(':');if(m.length<2)return null;var h=parseInt(m[0],10),mm=parseInt(m[1],10);return isNaN(h)||isNaN(mm)?null:h*60+mm}
    var d=sched[idx], open=false;
    if(d&&!d.closed){var f=toMin(d.from),t=toMin(d.to);if(f!==null&&t!==null){open=t>f?(mins>=f&&mins<t):(mins>=f||mins<t)}}
    badge.classList.remove('jw-status-loading');
    if(open){badge.classList.add('jw-status-open');badge.textContent='Open now'}else{badge.classList.add('jw-status-closed');badge.textContent='Closed'}
  }

  function initBackToTop(root){
    var el=q(root,'.jw-btt'); if(!el) return;
    var btn=q(el,'.jw-bttbtn');
    var threshold=parseInt(el.getAttribute('data-threshold')||'300',10);
    var progress=el.getAttribute('data-progress')==='true';
    var circ=parseFloat(el.getAttribute('data-circ'))||0;
    var fg=q(el,'.jw-bttfg');
    function onScroll(){
      var y=window.pageYOffset||document.documentElement.scrollTop||0;
      el.hidden=y<threshold;
      if(progress&&fg){var h=document.documentElement.scrollHeight-window.innerHeight;var p=h>0?Math.min(1,y/h):0;fg.style.strokeDashoffset=(circ*(1-p)).toFixed(1)}
    }
    window.addEventListener('scroll',onScroll,{passive:true});
    window.addEventListener('resize',onScroll,{passive:true});
    onScroll();
    if(btn)btn.addEventListener('click',function(){var rm=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;try{window.scrollTo({top:0,behavior:rm?'auto':'smooth'})}catch(e){window.scrollTo(0,0)}});
  }

  function initGallery(root){
    var g=q(root,'.jw-gallery'); if(!g||g.getAttribute('data-lb')!=='true') return;
    var imgs; try{imgs=JSON.parse(g.getAttribute('data-images')||'[]')}catch(e){imgs=[]}
    var lb=q(g,'.jw-lb'); if(!lb) return;
    var fig=q(lb,'img'), cap=q(lb,'figcaption'), cur=0;
    function show(i){if(!imgs.length)return;cur=(i%imgs.length+imgs.length)%imgs.length;var it=imgs[cur];fig.src=it.src;fig.alt=it.cap||'';cap.textContent=it.cap||'';cap.style.display=it.cap?'':'none';lb.hidden=false}
    function close(){lb.hidden=true;fig.src=''}
    qa(g,'.jw-gcell').forEach(function(c){if(c.disabled)return;c.addEventListener('click',function(){show(parseInt(c.getAttribute('data-i'),10)||0)})});
    var x=q(lb,'.jw-lbx'),p=q(lb,'.jw-lbp'),n=q(lb,'.jw-lbn'),bd=q(lb,'.jw-lbbd');
    if(x)x.addEventListener('click',close); if(bd)bd.addEventListener('click',close);
    if(p)p.addEventListener('click',function(){show(cur-1)}); if(n)n.addEventListener('click',function(){show(cur+1)});
    document.addEventListener('keydown',function(e){if(lb.hidden)return;if(e.key==='Escape')close();else if(e.key==='ArrowLeft')show(cur-1);else if(e.key==='ArrowRight')show(cur+1)});
  }

  function initButton(root){
    var btn=q(root,'.jw-cbtn[data-action]'); if(!btn) return;
    var action=btn.getAttribute('data-action'), target=btn.getAttribute('data-target')||'';
    btn.addEventListener('click',function(){
      if(action==='scroll'){var t=null;try{t=document.querySelector(target)}catch(e){}if(t){var rm=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;t.scrollIntoView({behavior:rm?'auto':'smooth',block:'start'})}}
      else if(action==='copy'){var done=function(){var c=q(root,'.jw-copied');if(c){c.hidden=false;setTimeout(function(){c.hidden=true},1600)}};if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(target).then(done).catch(done)}else{done()}}
    });
  }

  function initBeforeAfter(root){
    var el=q(root,'.jw-ba'); if(!el) return;
    var wrap=q(el,'.jw-bawrap'); if(!wrap) return;
    var vert=el.className.indexOf('jw-bavert')>=0, dragging=false;
    function setFromEvent(e){
      var rect=wrap.getBoundingClientRect();
      var t=e.touches&&e.touches[0]?e.touches[0]:e;
      var p=vert?((t.clientY-rect.top)/rect.height*100):((t.clientX-rect.left)/rect.width*100);
      wrap.style.setProperty('--p',Math.max(0,Math.min(100,p))+'%');
    }
    wrap.addEventListener('mousedown',function(e){dragging=true;setFromEvent(e);e.preventDefault()});
    window.addEventListener('mousemove',function(e){if(dragging)setFromEvent(e)});
    window.addEventListener('mouseup',function(){dragging=false});
    wrap.addEventListener('touchstart',function(e){dragging=true;setFromEvent(e)},{passive:true});
    wrap.addEventListener('touchmove',function(e){if(dragging)setFromEvent(e)},{passive:true});
    wrap.addEventListener('touchend',function(){dragging=false});
  }

  function initSlider(root){
    var el=q(root,'.jw-slider'); if(!el) return;
    var track=q(el,'.jw-sltrack'), slides=qa(el,'.jw-slide'); if(!track||!slides.length) return;
    var dots=qa(el,'.jw-sldot'), i=0, timer=null;
    var auto=el.getAttribute('data-autoplay')==='true', interval=parseInt(el.getAttribute('data-interval')||'5',10)*1000;
    function go(n){i=(n%slides.length+slides.length)%slides.length;track.style.transform='translateX(-'+(i*100)+'%)';dots.forEach(function(d,di){d.classList.toggle('jw-active',di===i)})}
    function next(){go(i+1)} function prev(){go(i-1)}
    function stop(){if(timer){clearInterval(timer);timer=null}}
    function start(){if(auto&&slides.length>1){timer=setInterval(next,interval)}}
    function restart(){stop();start()}
    var pn=q(el,'.jw-slnext'),pp=q(el,'.jw-slprev');
    if(pn)pn.addEventListener('click',function(){next();restart()});
    if(pp)pp.addEventListener('click',function(){prev();restart()});
    dots.forEach(function(d){d.addEventListener('click',function(){go(parseInt(d.getAttribute('data-i'),10)||0);restart()})});
    el.addEventListener('mouseenter',stop); el.addEventListener('mouseleave',start);
    var x0=null;
    track.addEventListener('touchstart',function(e){x0=e.touches[0].clientX;stop()},{passive:true});
    track.addEventListener('touchend',function(e){if(x0===null)return;var dx=e.changedTouches[0].clientX-x0;if(Math.abs(dx)>40){dx<0?next():prev()}x0=null;start()},{passive:true});
    go(0); start();
  }

  function initPortfolio(root){
    var el=q(root,'.jw-portfolio'); if(!el) return;
    var projects; try{projects=JSON.parse(el.getAttribute('data-projects')||'[]')}catch(e){projects=[]}
    qa(el,'.jw-pfilter').forEach(function(btn){btn.addEventListener('click',function(){
      qa(el,'.jw-pfilter').forEach(function(b){b.classList.remove('jw-active')});btn.classList.add('jw-active');
      var cat=btn.getAttribute('data-cat');
      qa(el,'.jw-pcell').forEach(function(c){c.style.display=(cat==='*'||c.getAttribute('data-cat')===cat)?'':'none'});
    })});
    var m=q(el,'.jw-pmodal'); if(!m) return;
    var mi=q(m,'.jw-pmimg'),mc=q(m,'.jw-pmcat'),mt=q(m,'.jw-pmtitle'),md=q(m,'.jw-pmdesc'),ml=q(m,'.jw-pmlink');
    function open(idx){var p=projects[idx];if(!p)return;if(p.image){mi.src=p.image;mi.style.display=''}else{mi.style.display='none'}mc.textContent=p.category||'';mt.textContent=p.title||'';md.textContent=p.description||'';if(p.link){ml.href=p.link;ml.hidden=false}else{ml.hidden=true}m.hidden=false}
    function close(){m.hidden=true}
    qa(el,'.jw-pcell').forEach(function(c){c.addEventListener('click',function(){open(parseInt(c.getAttribute('data-i'),10)||0)})});
    var x=q(m,'.jw-pmx'),bd=q(m,'.jw-pmbd');
    if(x)x.addEventListener('click',close); if(bd)bd.addEventListener('click',close);
    document.addEventListener('keydown',function(e){if(!m.hidden&&e.key==='Escape')close()});
  }

  function initAgeGate(root){
    var el=q(root,'.jw-agegate'); if(!el) return;
    var key='jsyxi_age_'+(el.getAttribute('data-key')||'x');
    var remember=parseInt(el.getAttribute('data-remember')||'30',10);
    try{var raw=localStorage.getItem(key);if(raw){var rec=JSON.parse(raw);if(rec&&rec.t&&(remember===0||Date.now()-rec.t<remember*86400000)){return}}}catch(e){}
    el.hidden=false;
    var mode=el.getAttribute('data-mode'), min=parseInt(el.getAttribute('data-min')||'18',10);
    var ok=q(el,'.jw-agok'), no=q(el,'.jw-agno'), err=q(el,'.jw-agerr'), yr=q(el,'.jw-agyear');
    function pass(){try{localStorage.setItem(key,JSON.stringify({t:Date.now()}))}catch(e){}el.hidden=true}
    function reject(){var url=el.getAttribute('data-reject');if(url){location.href=url;return}var msg=el.getAttribute('data-rejectmsg')||'Sorry, you cannot enter.';var card=q(el,'.jw-agcard');if(card){var p=document.createElement('p');p.className='jw-agmsg';p.style.margin='0';p.textContent=msg;card.innerHTML='';card.appendChild(p)}}
    if(ok)ok.addEventListener('click',function(){
      if(mode==='birthyear'){var y=parseInt(yr&&yr.value,10);var now=new Date().getFullYear();if(!y||y<1900||y>now){if(err){err.textContent='Please enter a valid year.';err.hidden=false}return}if(now-y<min){reject();return}pass()}
      else{pass()}
    });
    if(no)no.addEventListener('click',reject);
  }

  function initCookie(root){
    var el=q(root,'.jw-cookie'); if(!el) return;
    var key='jsyxi_cookie_'+(el.getAttribute('data-key')||'x');
    var remember=parseInt(el.getAttribute('data-remember')||'180',10);
    try{var raw=localStorage.getItem(key);if(raw){var rec=JSON.parse(raw);if(rec&&rec.t&&(Date.now()-rec.t<remember*86400000)){return}}}catch(e){}
    el.hidden=false;
    function choose(v){try{localStorage.setItem(key,JSON.stringify({t:Date.now(),choice:v}))}catch(e){}el.hidden=true}
    var ok=q(el,'.jw-ckok'), no=q(el,'.jw-ckno');
    if(ok)ok.addEventListener('click',function(){choose('accept')});
    if(no)no.addEventListener('click',function(){choose('reject')});
  }

  function initCalculator(root){
    var el=q(root,'.jw-calc'); if(!el) return;
    var base=parseFloat(el.getAttribute('data-base'))||0;
    var tax=parseFloat(el.getAttribute('data-tax'))||0;
    var disc=parseFloat(el.getAttribute('data-disc'))||0;
    var cur=el.getAttribute('data-cur')||'';
    var bd=el.getAttribute('data-bd')==='true';
    var total=q(el,'.jw-calctotal'), bdEl=q(el,'.jw-calcbd');
    function fmt(n){var s=(Math.round(n*100)/100).toFixed(2);if(s.slice(-3)==='.00')s=s.slice(0,-3);return cur+sepnum(s)}
    function calc(){
      var sum=base;
      qa(el,'.jw-calcin').forEach(function(inp){var v=parseFloat(inp.value)||0;var c=parseFloat(inp.getAttribute('data-coef'))||0;sum+=v*c;var out=inp.parentNode&&inp.parentNode.querySelector('.jw-calcout');if(out)out.textContent=inp.value});
      var afterDisc=sum*(1-disc/100), fin=afterDisc*(1+tax/100);
      if(total)total.textContent=fmt(fin);
      if(bd&&bdEl){var rows='<div class="jw-bdrow"><span>Subtotal</span><span>'+fmt(sum)+'</span></div>';if(disc>0)rows+='<div class="jw-bdrow"><span>Discount ('+disc+'%)</span><span>-'+fmt(sum-afterDisc)+'</span></div>';if(tax>0)rows+='<div class="jw-bdrow"><span>Tax ('+tax+'%)</span><span>+'+fmt(fin-afterDisc)+'</span></div>';bdEl.innerHTML=rows}
    }
    qa(el,'.jw-calcin').forEach(function(inp){inp.addEventListener('input',calc)});
    calc();
  }

  function initCalendar(root){
    var el=q(root,'.jw-calendar'); if(!el) return;
    if(el.getAttribute('data-hidepast')!=='true') return;
    var d=new Date(), mm=d.getMonth()+1, dd=d.getDate();
    var today=d.getFullYear()+'-'+(mm<10?'0':'')+mm+'-'+(dd<10?'0':'')+dd;
    var any=false;
    qa(el,'.jw-cev').forEach(function(ev){var dt=ev.getAttribute('data-date')||'';if(dt&&dt<today){ev.style.display='none'}else{any=true}});
    var empty=q(el,'.jw-cempty'); if(empty)empty.hidden=any;
  }

  function initJobs(root){
    var el=q(root,'.jw-jobs'); if(!el) return;
    var jobs; try{jobs=JSON.parse(el.getAttribute('data-jobs')||'[]')}catch(e){jobs=[]}
    qa(el,'.jw-jfilter').forEach(function(btn){btn.addEventListener('click',function(){
      qa(el,'.jw-jfilter').forEach(function(b){b.classList.remove('jw-active')});btn.classList.add('jw-active');
      var d=btn.getAttribute('data-d');
      qa(el,'.jw-jcard').forEach(function(c){c.style.display=(d==='*'||c.getAttribute('data-d')===d)?'':'none'});
    })});
    var m=q(el,'.jw-jmodal'); if(!m) return;
    var mt=q(m,'.jw-jmtitle'),mm=q(m,'.jw-jmmeta'),md=q(m,'.jw-jmdesc'),ma=q(m,'.jw-jmapply');
    function open(idx){var j=jobs[idx];if(!j)return;mt.textContent=j.title||'';mm.innerHTML='';['department','location','type','salary'].forEach(function(k){if(j[k]){var s=document.createElement('span');s.textContent=j[k];mm.appendChild(s)}});md.textContent=j.description||'';if(j.applyUrl){ma.href=j.applyUrl;ma.style.display=''}else{ma.style.display='none'}m.hidden=false}
    function close(){m.hidden=true}
    qa(el,'.jw-jview').forEach(function(v){v.addEventListener('click',function(){open(parseInt(v.getAttribute('data-i'),10)||0)})});
    var x=q(m,'.jw-jmx'),bd=q(m,'.jw-jmbd');
    if(x)x.addEventListener('click',close); if(bd)bd.addEventListener('click',close);
    document.addEventListener('keydown',function(e){if(!m.hidden&&e.key==='Escape')close()});
  }

  function initAccessibility(root){
    var el=q(root,'.jw-a11y'); if(!el) return;
    var btn=q(el,'.jw-a11ybtn'), panel=q(el,'.jw-a11ypanel'), close=q(el,'.jw-a11yclose'), reset=q(el,'.jw-a11yreset');
    if(btn)btn.addEventListener('click',function(){panel.hidden=!panel.hidden});
    if(close)close.addEventListener('click',function(){panel.hidden=true});
    var docEl=document.documentElement, SID='jw-a11y-style';
    if(!document.getElementById(SID)){
      var st=document.createElement('style'); st.id=SID;
      st.textContent='html.jwa-bigtext{font-size:118%!important}html.jwa-contrast{background:#000!important}html.jwa-contrast *{background-color:#000!important;color:#fff!important;border-color:#fff!important}html.jwa-contrast a{color:#ffd24a!important}html.jwa-readable *{font-family:Arial,Helvetica,sans-serif!important}html.jwa-links a{text-decoration:underline!important;font-weight:700!important}html.jwa-grayscale{filter:grayscale(1)}html.jwa-spacing *{letter-spacing:.06em!important;word-spacing:.12em!important;line-height:1.7!important}';
      (document.head||docEl).appendChild(st);
    }
    var KEY='jsyxi_a11y', active={};
    try{active=JSON.parse(localStorage.getItem(KEY)||'{}')||{}}catch(e){active={}}
    function apply(){qa(el,'.jw-a11yopt').forEach(function(o){var f=o.getAttribute('data-feat');var on=!!active[f];o.classList.toggle('jw-on',on);docEl.classList.toggle('jwa-'+f,on)});try{localStorage.setItem(KEY,JSON.stringify(active))}catch(e){}}
    qa(el,'.jw-a11yopt').forEach(function(o){o.addEventListener('click',function(){var f=o.getAttribute('data-feat');active[f]=!active[f];apply()})});
    if(reset)reset.addEventListener('click',function(){active={};apply()});
    apply();
  }

  function initStoreLocator(root){
    var el=q(root,'.jw-sl'); if(!el) return;
    var frame=q(el,'.jw-slframe'); if(!frame) return;
    qa(el,'.jw-slbtn').forEach(function(btn){btn.addEventListener('click',function(){
      var qv=btn.getAttribute('data-q')||'';
      frame.src='https://maps.google.com/maps?q='+qv+'&z=15&output=embed';
      qa(el,'.jw-slitem').forEach(function(it){it.classList.remove('jw-active')});
      if(btn.parentNode)btn.parentNode.classList.add('jw-active');
    })});
  }

  function initVisitors(root){
    var el=q(root,'.jw-visitors'); if(!el) return;
    var numEl=q(el,'.jw-vnum'); if(!numEl) return;
    var preview=el.getAttribute('data-preview')==='1';
    var sep=el.getAttribute('data-sep')==='true';
    var offset=parseFloat(el.getAttribute('data-offset'))||0;
    var key=el.getAttribute('data-key')||'', api=el.getAttribute('data-api')||'', metric=el.getAttribute('data-metric')||'total';
    function fmt(n){var s=''+Math.round(n);return sep?sepnum(s):s}
    function animate(target){var dur=1400,start=null;function step(ts){if(start===null)start=ts;var p=Math.min(1,(ts-start)/dur);var e=1-Math.pow(1-p,3);numEl.textContent=fmt(target*e);if(p<1)requestAnimationFrame(step);else numEl.textContent=fmt(target)}requestAnimationFrame(step)}
    if(preview||!key||!api){animate(offset>0?offset:1240);return}
    fetch(api+'/api/embed/stats/'+key).then(function(res){return res.json()}).then(function(d){if(!d||!d.ok){animate(offset);return}var real=metric==='today'?(d.today||0):(d.total||0);animate(real+offset)}).catch(function(){animate(offset)});
  }

  function initAnnouncement(root){
    var bar=q(root,'.jw-abar'); if(!bar) return;
    var x=q(bar,'.jw-abar-x'); if(!x) return;
    var t=q(bar,'.jw-abar-text');
    var key='jw_abar_'+((t&&t.textContent||'').slice(0,32));
    try{ if(localStorage.getItem(key)==='1'){ bar.style.display='none'; return; } }catch(e){}
    x.addEventListener('click',function(){ bar.style.display='none'; try{localStorage.setItem(key,'1')}catch(e){} });
  }

  function initTabs(root){
    var tabs=qa(root,'.jw-tab'); var panes=qa(root,'.jw-pane');
    if(!tabs.length) return;
    tabs.forEach(function(t){
      t.addEventListener('click',function(){
        var i=t.getAttribute('data-i');
        tabs.forEach(function(x){ x.className=x.className.split(' jw-on').join(''); });
        panes.forEach(function(p){ p.className=p.className.split(' jw-on').join(''); });
        t.className+=' jw-on';
        panes.forEach(function(p){ if(p.getAttribute('data-i')===i) p.className+=' jw-on'; });
      });
    });
  }

  function initVideo(root){
    var thumb=q(root,'.jw-vthumb'); if(!thumb) return;
    var modal=q(root,'.jw-vmodal'); if(!modal) return;
    var iframe=q(modal,'iframe'); var close=q(modal,'.jw-vclose');
    if(!iframe) return;
    function open(){ var e=thumb.getAttribute('data-embed'); if(e){ iframe.src=e+'?autoplay=1&rel=0'; } modal.removeAttribute('hidden'); }
    function shut(){ modal.setAttribute('hidden',''); iframe.src=''; }
    thumb.addEventListener('click',open);
    if(close)close.addEventListener('click',shut);
    modal.addEventListener('click',function(ev){ if(ev.target===modal)shut(); });
  }

  function initCoupon(root){
    var btn=q(root,'.jw-cp-btn'); if(!btn) return;
    var orig=btn.textContent;
    btn.addEventListener('click',function(){
      var code=btn.getAttribute('data-code')||'';
      var done=btn.getAttribute('data-done')||'Copied!';
      function ok(){ btn.textContent=done; setTimeout(function(){ btn.textContent=orig; },1800); }
      if(navigator.clipboard&&navigator.clipboard.writeText){ navigator.clipboard.writeText(code).then(ok,ok); }
      else { try{ var ta=document.createElement('textarea'); ta.value=code; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta); ok(); }catch(e){} }
    });
  }

  function initStats(root){
    var nums=qa(root,'.jw-stat-n'); if(!nums.length) return;
    function fmt(target,cur){ var dec=(target%1!==0)?1:0; return dec?cur.toFixed(1):Math.round(cur).toLocaleString(); }
    function run(el){
      if(el.getAttribute('data-done')==='1') return;
      el.setAttribute('data-done','1');
      var target=parseFloat(el.getAttribute('data-target'))||0;
      var vEl=q(el,'.jw-stat-v'); if(!vEl) return;
      if(el.getAttribute('data-animate')!=='1'){ vEl.textContent=fmt(target,target); return; }
      var start=null,dur=1400;
      function step(ts){
        if(!start)start=ts;
        var p=Math.min((ts-start)/dur,1);
        var eased=1-Math.pow(1-p,3);
        vEl.textContent=fmt(target,target*eased);
        if(p<1)requestAnimationFrame(step); else vEl.textContent=fmt(target,target);
      }
      requestAnimationFrame(step);
    }
    // Viewport-based trigger (reliable inside preview iframes where
    // IntersectionObserver on about:srcdoc can stay silent).
    function inView(el){ var rc=el.getBoundingClientRect(); var h=window.innerHeight||document.documentElement.clientHeight; return rc.top<h*0.92 && rc.bottom>0; }
    function check(){ nums.forEach(function(el){ if(el.getAttribute('data-done')!=='1'&&inView(el)) run(el); }); }
    window.addEventListener('scroll',check,{passive:true});
    window.addEventListener('resize',check);
    check();
    setTimeout(check,300);
  }

  function initProgressbar(root){
    var fill=q(root,'.jw-progress-fill'); if(!fill) return;
    function upd(){
      var h=document.documentElement;
      var max=(h.scrollHeight-h.clientHeight);
      var p=max>0?((h.scrollTop||document.body.scrollTop)/max)*100:0;
      if(p<0)p=0; if(p>100)p=100;
      fill.style.width=p+'%';
    }
    window.addEventListener('scroll',upd,{passive:true});
    window.addEventListener('resize',upd);
    upd();
  }

  function initTslider(root){
    var wrap=q(root,'.jw-tslider'); if(!wrap) return;
    var slides=qa(root,'.jw-ts-slide'); var dots=qa(root,'.jw-ts-dot');
    if(slides.length<1) return;
    var cur=0, timer=null;
    function show(n){
      if(n<0)n=slides.length-1; if(n>=slides.length)n=0; cur=n;
      slides.forEach(function(s,i){ s.className=s.className.split(' jw-on').join('')+(i===n?' jw-on':''); });
      dots.forEach(function(d,i){ d.className=d.className.split(' jw-on').join('')+(i===n?' jw-on':''); });
    }
    function start(){
      if(wrap.getAttribute('data-autoplay')!=='1') return;
      var iv=parseInt(wrap.getAttribute('data-interval'),10)||5000;
      timer=setInterval(function(){ show(cur+1); },iv);
    }
    function reset(){ if(timer){ clearInterval(timer); start(); } }
    var prev=q(root,'.jw-ts-prev'), next=q(root,'.jw-ts-next');
    if(prev)prev.addEventListener('click',function(){ show(cur-1); reset(); });
    if(next)next.addEventListener('click',function(){ show(cur+1); reset(); });
    dots.forEach(function(d){ d.addEventListener('click',function(){ show(parseInt(d.getAttribute('data-i'),10)||0); reset(); }); });
    start();
  }

  function initTypewriter(root){
    var dyn=q(root,'.jw-tw-dyn'); if(!dyn) return;
    var raw=dyn.getAttribute('data-words')||'';
    var words=raw.split('|').filter(function(w){return w.length});
    if(words.length<1) return;
    if(words.length===1){ dyn.textContent=words[0]; return; }
    var wi=0,ci=0,del=false;
    function tick(){
      var w=words[wi];
      if(!del){ ci++; if(ci>w.length){ del=true; setTimeout(tick,1400); return; } }
      else { ci--; if(ci<0){ del=false; wi=(wi+1)%words.length; ci=0; setTimeout(tick,220); return; } }
      dyn.textContent=w.slice(0,ci);
      setTimeout(tick, del?45:90);
    }
    tick();
  }

  function initFlipcard(root){
    var wrap=q(root,'.jw-flipcard'); if(!wrap) return;
    if(wrap.getAttribute('data-trigger')!=='click') return;
    qa(root,'.jw-fc').forEach(function(c){
      c.addEventListener('click',function(){
        if(c.className.indexOf('jw-flipped')>-1) c.className=c.className.split(' jw-flipped').join('');
        else c.className+=' jw-flipped';
      });
    });
  }

  function initSocialShare(root){
    var wrap=q(root,'.jw-socialshare'); if(!wrap) return;
    var toast=q(wrap,'.jw-sh-toast');
    qa(root,'.jw-sh').forEach(function(b){
      b.addEventListener('click',function(){
        var raw=wrap.getAttribute('data-url')||location.href;
        var text=wrap.getAttribute('data-text')||'';
        var net=b.getAttribute('data-net');
        var u=encodeURIComponent(raw), t=encodeURIComponent(text);
        var target='';
        if(net==='facebook')target='https://www.facebook.com/sharer/sharer.php?u='+u;
        else if(net==='twitter')target='https://twitter.com/intent/tweet?url='+u+'&text='+t;
        else if(net==='linkedin')target='https://www.linkedin.com/sharing/share-offsite/?url='+u;
        else if(net==='whatsapp')target='https://wa.me/?text='+t+'%20'+u;
        else if(net==='telegram')target='https://t.me/share/url?url='+u+'&text='+t;
        else if(net==='pinterest')target='https://pinterest.com/pin/create/button/?url='+u+'&description='+t;
        else if(net==='reddit')target='https://www.reddit.com/submit?url='+u+'&title='+t;
        else if(net==='email')target='mailto:?subject='+t+'&body='+u;
        else if(net==='copy'){
          function ok(){ if(toast){ toast.removeAttribute('hidden'); setTimeout(function(){toast.setAttribute('hidden','');},1800); } }
          if(navigator.clipboard&&navigator.clipboard.writeText){ navigator.clipboard.writeText(raw).then(ok,ok); } else { ok(); }
          return;
        }
        if(target){ if(net==='email')location.href=target; else window.open(target,'_blank','noopener,width=600,height=520'); }
      });
    });
  }

  function initHotspots(root){
    var pins=qa(root,'.jw-hs-pin'); if(!pins.length) return;
    pins.forEach(function(p){
      p.addEventListener('click',function(e){
        e.preventDefault();
        var open=p.className.indexOf('jw-open')>-1;
        pins.forEach(function(x){ x.className=x.className.split(' jw-open').join(''); });
        if(!open)p.className+=' jw-open';
      });
    });
  }

  function initChatbot(root){
    var wrap=q(root,'.jw-cbot'); if(!wrap) return;
    var launch=q(wrap,'.jw-cbot-launch');
    var panel=q(wrap,'.jw-cbot-panel');
    var closeb=q(wrap,'.jw-cbot-close');
    var msgs=q(wrap,'.jw-cbot-msgs');
    var form=q(wrap,'.jw-cbot-input');
    var input=form?q(form,'input'):null;
    if(!panel||!msgs||!form||!input) return;
    var preview=wrap.getAttribute('data-preview')==='1';
    var ai=wrap.getAttribute('data-ai')==='1';
    var endpoint=wrap.getAttribute('data-endpoint')||'';
    var fallback=wrap.getAttribute('data-fallback')||"I'm not sure about that — please contact our team.";
    var faq=[]; try{ faq=JSON.parse(wrap.getAttribute('data-faq')||'[]'); }catch(e){}
    var history=[];
    function scrollDown(){ msgs.scrollTop=msgs.scrollHeight; }
    function open(){ panel.removeAttribute('hidden'); if(wrap.className.indexOf('jw-cbot-open')<0)wrap.className+=' jw-cbot-open'; setTimeout(function(){ try{input.focus()}catch(e){} },60); scrollDown(); }
    function shut(){ panel.setAttribute('hidden',''); wrap.className=wrap.className.split(' jw-cbot-open').join(''); }
    if(launch)launch.addEventListener('click',open);
    if(closeb)closeb.addEventListener('click',shut);
    if(wrap.getAttribute('data-open')==='1') open();
    function bubble(text,who){
      var d=document.createElement('div');
      d.className='jw-cbot-msg jw-cbot-'+(who==='user'?'user':'bot');
      d.textContent=text; msgs.appendChild(d); scrollDown(); return d;
    }
    function typing(){
      var d=document.createElement('div');
      d.className='jw-cbot-msg jw-cbot-bot jw-cbot-typing';
      d.innerHTML='<span></span><span></span><span></span>';
      msgs.appendChild(d); scrollDown(); return d;
    }
    function localAnswer(text){
      var t=text.toLowerCase(); var best=null,score=0;
      for(var i=0;i<faq.length;i++){
        var qq=(''+(faq[i].q||'')).toLowerCase(); if(!qq)continue;
        var s=0; if(t.indexOf(qq)>-1)s+=5;
        var words=qq.split(' ');
        for(var w=0;w<words.length;w++){ if(words[w].length>3 && t.indexOf(words[w])>-1)s++; }
        if(s>score){score=s;best=faq[i];}
      }
      return (best&&score>0)?best.a:null;
    }
    function reply(text){
      var local=localAnswer(text);
      if(local){ bubble(local,'bot'); history.push({role:'user',content:text}); history.push({role:'assistant',content:local}); return; }
      if(ai && endpoint && !preview){
        var t=typing(); var hist=history.slice(-6);
        fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:text,history:hist})})
          .then(function(r){return r.json()})
          .then(function(d){ if(t.parentNode)t.parentNode.removeChild(t); var ans=(d&&d.reply)?d.reply:fallback; bubble(ans,'bot'); history.push({role:'user',content:text}); history.push({role:'assistant',content:ans}); })
          .catch(function(){ if(t.parentNode)t.parentNode.removeChild(t); bubble(fallback,'bot'); });
      } else { bubble(fallback,'bot'); }
    }
    function send(text){ text=(''+(text||'')).trim(); if(!text)return; bubble(text,'user'); input.value=''; var sug=q(wrap,'.jw-cbot-sugs'); if(sug)sug.style.display='none'; reply(text); }
    form.addEventListener('submit',function(e){ e.preventDefault(); send(input.value); });
    qa(wrap,'.jw-cbot-sug').forEach(function(b){ b.addEventListener('click',function(){ send(b.textContent); }); });
  }

  window.__jsyxiInit=function(root,tool,opts){
    opts=opts||{};
    try{
      if(tool==='countdown')initCountdown(root);
      else if(tool==='faq')initFaq(root);
      else if(tool==='popup')initPopup(root);
      else if(tool==='whatsapp')initWhatsapp(root);
      else if(tool==='form')initForm(root,opts);
      else if(tool==='counter')initCounter(root);
      else if(tool==='hours')initHours(root);
      else if(tool==='backtotop')initBackToTop(root);
      else if(tool==='gallery')initGallery(root);
      else if(tool==='button')initButton(root);
      else if(tool==='beforeafter')initBeforeAfter(root);
      else if(tool==='slider')initSlider(root);
      else if(tool==='portfolio')initPortfolio(root);
      else if(tool==='agegate')initAgeGate(root);
      else if(tool==='cookie')initCookie(root);
      else if(tool==='calculator')initCalculator(root);
      else if(tool==='calendar')initCalendar(root);
      else if(tool==='jobs')initJobs(root);
      else if(tool==='accessibility')initAccessibility(root);
      else if(tool==='storelocator')initStoreLocator(root);
      else if(tool==='visitors')initVisitors(root);
      else if(tool==='announcement')initAnnouncement(root);
      else if(tool==='tabs')initTabs(root);
      else if(tool==='video')initVideo(root);
      else if(tool==='coupon')initCoupon(root);
      else if(tool==='stats')initStats(root);
      else if(tool==='progressbar')initProgressbar(root);
      else if(tool==='testimonialslider')initTslider(root);
      else if(tool==='typewriter')initTypewriter(root);
      else if(tool==='flipcard')initFlipcard(root);
      else if(tool==='socialshare')initSocialShare(root);
      else if(tool==='imagehotspots')initHotspots(root);
      else if(tool==='chatbot')initChatbot(root);
    }catch(e){ if(window.console)console.warn('jsyxi init',e) }
  };
})();
`;
