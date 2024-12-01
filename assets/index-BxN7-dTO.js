(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const l of o)if(l.type==="childList")for(const f of l.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&i(f)}).observe(document,{childList:!0,subtree:!0});function s(o){const l={};return o.integrity&&(l.integrity=o.integrity),o.referrerPolicy&&(l.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?l.credentials="include":o.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function i(o){if(o.ep)return;o.ep=!0;const l=s(o);fetch(o.href,l)}})();const W="/assets/soundNo-CfWvAgdT.mp3",Y="/assets/soundYes-bHlQI4kD.mp3",$=["Рыба","Трава","Орехи","Водяные растения","Сено","Листья","Фрукты (яблоки, арбузы, бананы)","Огурцы","Морковь","Конфеты","Капуста","Свёкла","Лук","Чеснок","Тыква","Брокколи","Мясо","Цитрусовые (апельсины, лимоны, грейпфруты)","Чай","Картофель","Грибы"],q=["Fish","Grass","Nuts","Aquatic plants","Hay","Leaves","Fruits (apples, watermelons, bananas)","Cucumbers","Carrots","Candies","Cabbage","Beets","Onion","Garlic","Pumpkin","Broccoli","Meat","Citrus fruits (oranges, lemons, grapefruits)","Tea","Potatoes","Mushrooms"],V=["Трава","Водяные растения","Сено","Листья","Фрукты (яблоки, арбузы, бананы)","Огурцы","Морковь","Капуста","Свёкла","Тыква","Брокколи"],D=["Grass","Aquatic plants","Hay","Leaves","Fruits (apples, watermelons, bananas)","Cucumbers","Carrots","Cabbage","Beets","Pumpkin","Broccoli"],t=e=>document.querySelector(e),d=e=>e.style.display="none",r=e=>e.style.display="block";let c="Ru";function I(e){const n=document.querySelectorAll(".controlPanelBtn"),s=t(".congratulationWrapRu"),i=t(".congratulationWrap");X(),y(c,e),v({lang:c});for(let o of n)o.classList.toggle("buttonHide");c==="En"?(r(i),d(s)):(r(s),d(i))}function X(){const e=t(".language");c=e.textContent==="Ru"?"En":"Ru",e.textContent=c}function y(e,n){let s=e==="Ru"?$:q;n.innerHTML="",s.forEach(i=>{n.insertAdjacentHTML("beforeend",`<li class="liView"><h1 data-species="${i}" >${i}</h1></li>`)})}document.querySelectorAll(".volumeBtn");let p=!0;function j(){const e=t(".volumeYes"),n=t(".volumeNo");p=!p,p?(e.classList.remove("buttonHide"),n.classList.add("buttonHide")):(n.classList.remove("buttonHide"),e.classList.add("buttonHide"))}function O(){return p}const K=t(".busket"),m=t(".food"),A=document.querySelectorAll(".hippo")[0],C=t(".hippoYes"),P=t(".hippoNo"),g=e=>e==="En",S=t(".score").firstElementChild,v=({lang:e="Ru",value:n=0,reset:s=!1})=>{let[i,o]=S.textContent.split(" ");i=g(e)?"Score":"Очки",S.textContent=`${i} ${s?0:Number(o)+n}`},Q=new Audio(Y),U=new Audio(W),z=t(".audio");z.addEventListener("click",()=>{j()});const N=t(".endOfGameBackground");let E=!1,h="";y(c,m);document.addEventListener("mousedown",J);let a=null,u=null;const w=()=>{u==="yes"&&d(C),u==="no"&&d(P),r(A),u=null};function J(e){e.preventDefault(),e.target.tagName==="H1"&&(E=!0,w(),e.target.classList.contains("duplicate")?a=e.target:(a=e.target.cloneNode(!0),a.classList.add("duplicate"),e.target.parentNode.classList.toggle("liView"),a.classList.add("liView"),e.target.style.visibility="hidden",document.body.append(a),a.style.padding="0.5rem 0.5rem",a.style.position="absolute"),document.addEventListener("mousemove",H),document.addEventListener("mouseup",Z,{once:!0}))}function H(e){e.preventDefault(),E&&(a.style.left=`${e.pageX-a.offsetWidth/2}px`,a.style.top=`${e.pageY-a.offsetHeight/2}px`)}function Z(e){if(E=!1,h=`${e.pageX},${e.pageY}`,_(h),h="",Array.from(m.children).filter(s=>s.classList.contains("liView")).length===0&&u){const s=t(".endOfGame");setTimeout(()=>{r(s),r(N)},1e3)}document.removeEventListener("mousemove",H)}function _(e){const[n,s]=e.split(","),{top:i,bottom:o,left:l,right:f}=K.getBoundingClientRect();if(n>=l&&n<=f&&s>=i&&s<=o){let M=a.dataset.species;d(A),a.remove(),ee(M)?(r(C),u="yes",v({lang:c,value:10}),O()&&Q.play()):(r(P),u="no",O()&&U.play())}}function ee(e){return(g(c)?D:V).includes(e)}const te=t(".buttonLang");te.addEventListener("click",()=>I(m));const F=t(".controlPanelShowList"),R=t(".controlPanelShowListRu"),oe=t(".endOfGame"),ne=t(".btnClose"),x=t(".listOfAllowedFood");let L=!1;ne.addEventListener("click",k);const B=t(".congratulationWrap"),G=t(".hippoEndOfGame"),T=t(".congratulationWrapRu");function b(e=[],n=[]){e.forEach(r),n.forEach(d)}function k(){L&&(b([g(c)?B:T,g(c)?F:R,G]),x.classList.toggle("active"),L=!1),b([],[oe,N]),w()}const se=t(".controlPanel");se.addEventListener("click",e=>{e.target.classList.contains("controlPanelShowList")&&(b([],[B,T,G,F,R]),L=!0,x.classList.toggle("active")),e.target.classList.contains("controlPanelplayAgain")&&(k(),y(c,m),w(),v({lang:c,reset:!0}))});
