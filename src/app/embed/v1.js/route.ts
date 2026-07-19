import { EMBED_RUNTIME_JS } from "@/lib/tools/render/runtime";
import { CORS_HEADERS } from "@/lib/http";

// Public embed loader (§8). Single-line snippet:
//   <script async src="APP/embed/v1.js" data-jsyxi="EMBED_KEY"></script>
const LOADER = `
(function(){
  var s=document.currentScript;
  if(!s){var all=document.querySelectorAll('script[data-jsyxi]');s=all[all.length-1];}
  if(!s)return;
  var key=s.getAttribute('data-jsyxi'); if(!key)return;
  var base; try{base=new URL(s.src).origin;}catch(e){base='';}
  var vid; try{vid=localStorage.getItem('jsyxi_vid');if(!vid){vid=Math.random().toString(36).slice(2)+Date.now().toString(36);localStorage.setItem('jsyxi_vid',vid);}}catch(e){vid='anon';}
  var page=location.host+location.pathname;
  fetch(base+'/api/embed/'+encodeURIComponent(key)).then(function(r){return r.json();}).then(function(d){
    if(!d||!d.ok)return;
    var cid='jw-root-'+key.replace(/[^a-zA-Z0-9_-]/g,'');
    var style=document.createElement('style');
    style.textContent=String(d.css).split('#jw-root').join('#'+cid);
    document.head.appendChild(style);
    var c=document.createElement('div'); c.id=cid; c.className='jsyxi-scope'; c.innerHTML=d.html;
    if(d.mode==='overlay'){document.body.appendChild(c);} else {s.parentNode.insertBefore(c,s.nextSibling);}
    if(window.__jsyxiInit){window.__jsyxiInit(c,d.toolKey,{preview:false});}
    try{
      var payload=JSON.stringify({key:key,v:vid,p:page,o:location.origin});
      if(navigator.sendBeacon){navigator.sendBeacon(base+'/api/view',payload);}
      else{fetch(base+'/api/view',{method:'POST',body:payload,keepalive:true});}
    }catch(e){}
  }).catch(function(){});
})();
`;

export async function GET() {
  return new Response(EMBED_RUNTIME_JS + "\n" + LOADER, {
    status: 200,
    headers: {
      "Content-Type": "application/javascript; charset=utf-8",
      "Cache-Control": "public, max-age=300",
      ...CORS_HEADERS,
    },
  });
}
