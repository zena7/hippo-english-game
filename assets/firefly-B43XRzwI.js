import{g as a}from"./game-D8kX0VDd.js";import"./style-CqPbzQPE.js";const i=a(".firefly-container"),m=()=>{const t=document.createElement("div");t.classList.add("firefly");const n=Math.random()*window.innerWidth,o=Math.random()*(window.innerHeight/1.5),e=Math.floor(Math.random()*18+4);t.style.left=`${n}px`,t.style.bottom=`${o}px`,t.style.width=`${e}px`,t.style.height=`${e}px`,i.appendChild(t),setTimeout(()=>{t.remove()},6e3);const r=Math.ceil(Math.random()*700+300);setTimeout(m,r)};export{m as createFirefly};