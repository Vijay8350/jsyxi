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

  window.__jsyxiInit=function(root,tool,opts){
    opts=opts||{};
    try{
      if(tool==='countdown')initCountdown(root);
      else if(tool==='faq')initFaq(root);
      else if(tool==='popup')initPopup(root);
      else if(tool==='whatsapp')initWhatsapp(root);
      else if(tool==='form')initForm(root,opts);
    }catch(e){ if(window.console)console.warn('jsyxi init',e) }
  };
})();
`;
