import{d as N,c as de,r,o as G,n as pe,a as v,b as i,e as _,f as l,t as d,g as _e,h as o,m as ve,i as R,w as s,u as me,E as K,j as fe,k as he,l as L,p as ye,q as M,F as P,v as B,s as ge,x as we,y as Ve}from"./index-8cfa907d.js";import{o as ke,p as Ie,g as Ce,a as Se,b as xe}from"./videoData-cc158f19.js";import{_ as z}from"./_plugin-vue_export-helper-a42cbba8.js";import{a as be,S as Ee}from"./EventListener-1a57220a.js";const $e={class:"auto-width-wrapper"},De=N({__name:"AutoWidthInput",props:["modelvalue"],emits:["update:modelvalue"],setup(f,{emit:h}){const y=f,m=de({get(){return y.modelvalue},set(p){h("update:modelvalue",p)}}),V=r(),a=r();return G(()=>{pe(()=>{const p=V.value.input,u=getComputedStyle(p),k=getComputedStyle(p.parentElement);a.value={padding:k.padding,lineHeight:k.height,fontSize:u.fontSize,fontWeight:u.fontWeight,fontFamily:u.fontFamily}})}),(p,u)=>{const k=v("el-input");return i(),_("div",$e,[l("span",{class:"auto-width-span",style:_e(a.value)},d(m.value),5),o(k,ve({ref_key:"inputInstance",ref:V,modelValue:m.value,"onUpdate:modelValue":u[0]||(u[0]=x=>m.value=x)},p.$attrs,{class:"auto-width-input"}),null,16,["modelValue"])])}}});const Te=z(De,[["__scopeId","data-v-f1eb78e5"]]),Le={class:"video-cover-wrapper"},Pe={class:"video-overplay"},We={class:"video-info"},Ae=["title"],Me={class:"video-upload-date"},Be=N({__name:"VideoCompact",props:{videoInfo:{}},setup(f){const h=f,y=`${ke}/${h.videoInfo.videoId}/hqdefault.jpg`,m={padding:"0",display:"flex",cursor:"pointer",height:"94px"};return(V,a)=>{const p=v("el-image"),u=v("el-card");return i(),R(u,{"body-style":m,class:"video-compact"},{default:s(()=>[l("div",Le,[o(p,{src:y}),l("span",Pe,d(h.videoInfo.overplay),1)]),l("div",We,[l("span",{class:"video-title",title:h.videoInfo.title},d(h.videoInfo.title),9,Ae),l("span",Me,d(h.videoInfo.uploadDate),1)])]),_:1})}}});const X=z(Be,[["__scopeId","data-v-41b07e46"]]),Re=f=>(we("data-v-e5e57902"),f=f(),Ve(),f),Ue={style:{height:"100%"}},Ne={class:"player-wrapper"},ze=Re(()=>l("div",{id:"player"},null,-1)),Fe=["title"],Oe={class:"video-upload-date"},je=["onClick"],qe={class:"caption-number"},Ye={class:"caption-row"},He={key:0,class:"caption-word"},Ke={class:"caption-answer-error"},Xe={key:1,class:"caption-word-span"},Ge={class:"caption-word-span"},Je=N({__name:"DictationPlay",setup(f){let y=me().params.videoId;const m=r();let V,a;G(()=>{be(),V=m.value.wrapRef.children[0];const e=document.createElement("script");e.src="https://www.youtube.com/iframe_api";const t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t),window.onYouTubeIframeAPIReady=()=>{a=new YT.Player("player",{height:"360",width:"640",playerVars:{iv_load_policy:3,modestbranding:1},events:{onReady:J,onStateChange:Q}})}});const p=r(!1),u=r(-2);let k=r(0),x=-1,b=-1,g;function J(){p.value=!0,Z(),k.value=setInterval(()=>{var c;b=a.getCurrentTime();const e=W.value.findIndex(w=>w.start<=b&&b<w.start+w.dur);if(e===-1||e===x)return;(c=V.children[x])==null||c.children[0].classList.remove("caption-text-current"),x=e;const t=V.children[e].children[0];t.classList.add("caption-text-current"),D||m.value.setScrollTop(Math.max(t.offsetTop-200,0))},100),document.addEventListener("keydown",F)}function Q(e){u.value=e.data}function F(e){if(e.key===" "){e.preventDefault();const t=a.getPlayerState();t===1?a.pauseVideo():t===2&&a.playVideo()}else if(e.key==="ArrowLeft")e.preventDefault(),a.seekTo(b-3,!0);else if(e.key==="ArrowRight")e.preventDefault(),a.seekTo(b+3,!0);else if(e.key==="ArrowUp"){e.preventDefault();const t=Math.min(a.getVolume()+5,100);a.setVolume(t),g==null||g.close(),g=K(`volume:${t}%`)}else if(e.key==="ArrowDown"){e.preventDefault();const t=Math.max(a.getVolume()-5,0);a.setVolume(t),g==null||g.close(),g=K(`volume:${t}%`)}}const W=r([]),I=r([]),S=r(),O=r([]),j=r([]);function Z(){W.value=[],I.value=[],Ie(y).then(e=>{var t;for(const c of e)W.value.push(c),I.value.push([]);S.value=Ce(y);for(const c of((t=S.value)==null?void 0:t.userInputs)||[])I.value[c[0]][c[1]]=""}).finally(()=>{O.value=Se(),j.value=xe(),a.loadVideoById(y),E.value=!0,$.value=!1})}const E=r(!0),$=r(!1);function ee(e){D=setTimeout(q,4e3),a.playVideo(),a.seekTo(e.start,!0)}function te(e){e.target.parentElement.classList.add("caption-text-hover")}function oe(e){e.target.parentElement.classList.remove("caption-text-hover")}function ae(e){e.target.parentElement.parentElement.parentElement.parentElement.classList.remove("caption-text-hover")}function ne(e){e.target.parentElement.parentElement.parentElement.parentElement.classList.add("caption-text-hover")}let D=0;function q(){D=0}function le(){clearTimeout(D),D=setTimeout(q,4e3)}function Y(e){e.videoId!==y&&(window.location.href=`/dictation/${e.videoId}/play`)}return fe(()=>{clearInterval(k.value),document.removeEventListener("keydown",F)}),(e,t)=>{const c=v("el-col"),w=v("el-row"),U=v("el-scrollbar"),se=v("el-aside"),H=v("el-switch"),ie=v("el-main"),re=v("el-container"),ce=he("loading");return L((i(),R(re,{class:"player-container"},{default:s(()=>[o(se,{width:"660px",class:"player-side"},{default:s(()=>[l("div",Ue,[l("div",Ne,[ze,o(w,null,{default:s(()=>[o(c,{span:18},{default:s(()=>[S.value?(i(),_("span",{key:0,class:"video-title",title:S.value.title},d(S.value.title),9,Fe)):ye("",!0)]),_:1}),o(c,{span:6},{default:s(()=>{var n;return[l("span",Oe,"upload date: "+d((n=S.value)==null?void 0:n.uploadDate),1)]}),_:1})]),_:1})]),o(w,{class:"more-video"},{default:s(()=>[o(c,{span:12,class:"lastest-videos"},{default:s(()=>[o(U,{height:"100%"},{default:s(()=>[(i(!0),_(P,null,M(O.value,n=>(i(),R(X,{key:n.videoId,onClick:C=>Y(n),"video-info":n},null,8,["onClick","video-info"]))),128))]),_:1})]),_:1}),o(c,{span:12,class:"dated-videos"},{default:s(()=>[o(U,{height:"100%"},{default:s(()=>[(i(!0),_(P,null,M(j.value,n=>(i(),R(X,{key:n.videoId,onClick:C=>Y(n),"video-info":n},null,8,["onClick","video-info"]))),128))]),_:1})]),_:1})]),_:1})])]),_:1}),o(ie,{ref:"playerMain",class:"player-main"},{default:s(()=>[o(w,null,{default:s(()=>[o(H,{modelValue:E.value,"onUpdate:modelValue":t[0]||(t[0]=n=>E.value=n),class:"show-caption-switch","inline-prompt":"","active-text":"hide caption","inactive-text":"show caption"},null,8,["modelValue"]),L(o(H,{modelValue:$.value,"onUpdate:modelValue":t[1]||(t[1]=n=>$.value=n),"inline-prompt":"","active-text":"hide answer","inactive-text":"show answer"},null,8,["modelValue"]),[[B,E.value]])]),_:1}),o(w,{class:"voice-input"},{default:s(()=>[o(Ee)]),_:1}),L(o(U,{ref_key:"scrollbar",ref:m,onWheel:le},{default:s(()=>[(i(!0),_(P,null,M(W.value,(n,C)=>(i(),_("div",null,[l("div",{class:"caption-text",onClick:T=>ee(n),onMouseenter:te,onMouseleave:oe},[l("span",qe,d(C+1),1),l("div",Ye,[l("span",null,d(n.firstSeparator),1),(i(!0),_(P,null,M(n.words,(T,A)=>(i(),_(P,null,[I.value[C][A]!==void 0?(i(),_("div",He,[l("div",{class:"caption-input-wrapper",onClick:t[2]||(t[2]=ge(()=>{},["stop"])),onMouseenter:ae,onMouseleave:ne},[L(l("div",Ke,null,512),[[B,$.value&&I.value[C][A]!==T.value]]),o(Te,{size:"large",modelvalue:I.value[C][A],"onUpdate:modelvalue":ue=>I.value[C][A]=ue,class:"caption-input",maxlength:"32"},null,8,["modelvalue","onUpdate:modelvalue"])],32),L(l("span",{class:"caption-word-answer"},d(T.value),513),[[B,$.value]])])):(i(),_("span",Xe,d(T.value),1)),l("span",Ge,d(T.separator),1)],64))),256))])],40,je)]))),256))]),_:1},512),[[B,E.value]])]),_:1},512)]),_:1})),[[ce,u.value===-2]])}}});const ot=z(Je,[["__scopeId","data-v-e5e57902"]]);export{ot as default};