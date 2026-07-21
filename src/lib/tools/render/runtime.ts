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
    }catch(e){ if(window.console)console.warn('jsyxi init',e) }
  };
})();
`;
