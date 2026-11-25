
// ----- Edit your socials here. Leave a value empty to hide it. -----
var SOCIALS={Instagram:"",TikTok:"",GitHub:"",X:"",Telegram:"",YouTube:"",Email:""};
var s=document.getElementById('soc'),any=false;
for(var k in SOCIALS){if(SOCIALS[k]){any=true;var a=document.createElement('a');a.className='btn';a.target='_blank';a.rel='noopener';a.textContent=k;a.href=k==='Email'?'mailto:'+SOCIALS[k]:SOCIALS[k];s.appendChild(a)}}
if(!any)s.innerHTML='<span style="color:var(--mute);font-size:.9rem">Social links coming soon.</span>';

// clock in 2090
var clk=document.getElementById('clock');
function tick(){var d=new Date();clk.textContent='● '+d.toLocaleDateString('en-GB',{day:'2-digit',month:'short'})+' 2090 · '+d.toLocaleTimeString('en-GB')}
tick();setInterval(tick,1000);

// starfield with warp
var cv=document.getElementById('stars'),cx=cv.getContext('2d'),W,H,st=[],speed=1,target=1,mx=0,my=0;
function size(){W=cv.width=innerWidth;H=cv.height=innerHeight}
size();addEventListener('resize',size);
for(var i=0;i<260;i++)st.push({x:Math.random()*2-1,y:Math.random()*2-1,z:Math.random()});
addEventListener('mousemove',function(e){mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5});
var lastY=scrollY;addEventListener('scroll',function(){target=Math.min(1+Math.abs(scrollY-lastY)/12,8);lastY=scrollY});
var w=document.getElementById('warp');
['mousedown','touchstart'].forEach(function(e){w.addEventListener(e,function(){target=14})});
['mouseup','mouseleave','touchend'].forEach(function(e){w.addEventListener(e,function(){target=1})});
var reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
function frame(){
 speed+=(target-speed)*.08;if(target>1&&target<14)target=Math.max(1,target-.15);
 cx.fillStyle='rgba(4,4,13,'+(speed>3?.25:.6)+')';cx.fillRect(0,0,W,H);
 for(var i=0;i<st.length;i++){var p=st[i],pz=p.z;p.z-=.0015*speed*(reduce?0:1);
  if(p.z<=.01){p.x=Math.random()*2-1;p.y=Math.random()*2-1;p.z=1;pz=1}
  var sx=(p.x/p.z)*W*.5+W/2-mx*40,sy=(p.y/p.z)*H*.5+H/2-my*40,ox=(p.x/pz)*W*.5+W/2-mx*40,oy=(p.y/pz)*H*.5+H/2-my*40;
  var b=1-p.z;cx.strokeStyle='rgba('+(i%3?'200,220,255':'176,140,255')+','+(b*.9+.1)+')';cx.lineWidth=b*2+.3;
  cx.beginPath();cx.moveTo(ox,oy);cx.lineTo(sx+(speed>2?0:.4),sy);cx.stroke()}
 requestAnimationFrame(frame)}
frame();

// 3D neural orb (wireframe sphere + nodes)
var oc=document.getElementById('orb'),ox=oc.getContext('2d'),N=[],ang=0,tx=0,ty=0;
function osz(){var r=devicePixelRatio||1,b=oc.getBoundingClientRect();oc.width=b.width*r;oc.height=b.height*r}
osz();addEventListener('resize',osz);
for(var i=0;i<140;i++){var u=Math.acos(1-2*(i+.5)/140),v=Math.PI*(1+Math.sqrt(5))*i;N.push([Math.sin(u)*Math.cos(v),Math.cos(u),Math.sin(u)*Math.sin(v)])}
addEventListener('mousemove',function(e){tx=(e.clientY/innerHeight-.5)*.8;ty=(e.clientX/innerWidth-.5)*.8});
var rx=0,ry=0;
function orb(){
 var w=oc.width,h=oc.height,R=w*.34;ox.clearRect(0,0,w,h);ang+=.004;rx+=(tx-rx)*.05;ry+=(ty-ry)*.05;
 var P=N.map(function(n){var x=n[0],y=n[1],z=n[2],a=ang+ry,c=Math.cos(a),s=Math.sin(a),x1=x*c+z*s,z1=-x*s+z*c,c2=Math.cos(rx),s2=Math.sin(rx),y1=y*c2-z1*s2,z2=y*s2+z1*c2;return[w/2+x1*R,h/2+y1*R,z2]});
 for(var i=0;i<P.length;i++)for(var j=i+1;j<P.length;j++){var dx=P[i][0]-P[j][0],dy=P[i][1]-P[j][1],d=Math.sqrt(dx*dx+dy*dy);
  if(d<R*.32){ox.strokeStyle='rgba(82,224,255,'+(.35*(1-d/(R*.32)))*(P[i][2]+1.2)/2.2+')';ox.lineWidth=1;ox.beginPath();ox.moveTo(P[i][0],P[i][1]);ox.lineTo(P[j][0],P[j][1]);ox.stroke()}}
 P.forEach(function(p,i){var r=(p[2]+1.4)*w*.006;ox.fillStyle=i%7?'rgba(160,230,255,.9)':'rgba(255,179,71,.95)';ox.beginPath();ox.arc(p[0],p[1],r,0,7);ox.fill()});
 for(var k=0;k<3;k++){ox.save();ox.translate(w/2,h/2);ox.rotate(ang*(k+1)*.7+k*1.1);ox.scale(1,.28+k*.12);ox.strokeStyle='rgba(176,107,255,'+(.5-k*.1)+')';ox.lineWidth=2;ox.beginPath();ox.arc(0,0,R*(1.2+k*.18),0,7);ox.stroke();ox.restore()}
 requestAnimationFrame(orb)}
orb();

// card tilt
document.querySelectorAll('.card').forEach(function(c){
 c.addEventListener('mousemove',function(e){var b=c.getBoundingClientRect(),x=(e.clientX-b.left)/b.width-.5,y=(e.clientY-b.top)/b.height-.5;c.style.transform='rotateY('+x*14+'deg) rotateX('+(-y*14)+'deg)'});
 c.addEventListener('mouseleave',function(){c.style.transform=''})});

// chat demo (preset replies)
var R=[[/nexus|platform|what is/i,'NEXUS is an AI platform with four systems: Neural Chat, Creation Studio, Time Engine, and Orbit API.'],
[/year|date|time/i,'In this world it is 2090. The clock at the top of the page shows today’s date in that year.'],
[/who|built|created|babyface|developer|owner/i,'NEXUS 2090 was built by Babyface. You can message the developer on WhatsApp from the Developer section.'],
[/create|make|generate|studio/i,'Creation Studio turns ideas into text, images, music, and code. This demo only shows the idea.'],
[/api|orbit|code/i,'Orbit API lets other apps talk to NEXUS. It is on the roadmap for 2035.'],
[/hello|hi|hey/i,'Hello! Ask me about NEXUS, 2090, or the developer.']];
var log=document.getElementById('log'),inp=document.getElementById('in');
function add(t,c){var d=document.createElement('div');d.className='m '+c;d.textContent=t;log.appendChild(d);log.scrollTop=log.scrollHeight}
function ask(t){if(!t.trim())return;add(t,'u');var r='I only know a few topics in this demo. Try asking what NEXUS is, what year it is, or who built it.';
 for(var i=0;i<R.length;i++)if(R[i][0].test(t)){r=R[i][1];break}
 setTimeout(function(){add(r,'b')},500)}
document.getElementById('f').addEventListener('submit',function(e){e.preventDefault();ask(inp.value);inp.value=''});
document.querySelectorAll('#q button').forEach(function(b){b.onclick=function(){ask(b.textContent)}});

// NEXUS Editor
(function(){
var $=function(i){return document.getElementById(i)};
var v=document.createElement('video');v.playsInline=true;
var au=new Audio();au.loop=true;
var sc=$('sc'),x=sc.getContext('2d'),st=$('st'),pl=$('pl'),ac,dest,vg,mg,rec,outBlob,ext='webm';
var D={b:100,c:100,s:100,w:0,gray:0,hue:0,blur:0,v:0,grain:0,bars:0,fi:0,fo:0,sp:1,ts:0,te:0,ov:1,mv:.6,cap:''},E=Object.assign({},D);
var R={b:[50,160],c:[50,160],s:[0,220],w:[0,40],gray:[0,100],hue:[-180,180],blur:[0,6],v:[0,100],grain:[0,100],bars:[0,1],fi:[0,5],fo:[0,5],sp:[.25,4],ts:[0,1e5],te:[0,1e5],ov:[0,1],mv:[0,1]};
function apply(o){for(var k in R){if(o[k]==null)continue;var n=+o[k];if(isNaN(n))continue;E[k]=Math.max(R[k][0],Math.min(R[k][1],n))}
if(typeof o.cap==='string')E.cap=o.cap.slice(0,80);gains()}
function gains(){v.playbackRate=E.sp;if(vg)vg.gain.value=E.ov;if(mg)mg.gain.value=E.mv}
function end(){return E.te>E.ts?E.te:(v.duration||0)}
function stats(el){var t=document.createElement('canvas');t.width=64;t.height=36;var c=t.getContext('2d');c.drawImage(el,0,0,64,36);var d=c.getImageData(0,0,64,36).data,n=d.length/4,s=0,q=0,sa=0,l,mx,mn;
for(var i=0;i<d.length;i+=4){l=.2126*d[i]+.7152*d[i+1]+.0722*d[i+2];s+=l;q+=l*l;mx=Math.max(d[i],d[i+1],d[i+2]);mn=Math.min(d[i],d[i+1],d[i+2]);sa+=mx?(mx-mn)/mx:0}
var m=s/n;return{lum:m,std:Math.sqrt(Math.max(q/n-m*m,1)),sat:sa/n+.01}}
function auto(){try{var a=stats(v);return{b:100+(118-a.lum)*.45,c:100+(55-a.std)*.5,s:115,w:5,v:20}}catch(e){return{b:104,c:110,s:115,w:5,v:20}}}
function local(p){var t=p.toLowerCase(),o={},steps=[],m;function has(r){return r.test(t)}
if(has(/enhance|perfect|professional|polish|fix|improve|better/)){o=auto();steps.push('Auto-corrected brightness, contrast and colour')}
if(has(/cinematic|movie|film look/)){Object.assign(o,{b:95,c:120,s:90,w:15,v:50,bars:1});steps.push('Cinematic grade with letterbox bars')}
if(has(/vivid|colou?rful|pop/)){o.s=150;o.c=115;steps.push('Boosted colours')}
if(has(/warm|golden|sunset/)){o.w=30;steps.push('Warmer tone')}
if(has(/black and white|b&w|monochrome|noir|old film|vintage/)){Object.assign(o,{gray:100,grain:40,v:40,c:120});steps.push('Black and white with film grain')}
if(has(/bright|lighter/)){o.b=118;steps.push('Brighter picture')}
if(has(/dark|moody/)){o.b=88;o.c=120;steps.push('Darker, moodier picture')}
if(has(/dream|soft|glow/)){Object.assign(o,{blur:1.5,b:108,s:120});steps.push('Soft dreamy glow')}
if(has(/slow ?mo|slower/)){o.sp=.5;steps.push('Slow motion (0.5x)')}
if(has(/speed up|faster|fast|time ?lapse/)){o.sp=2;steps.push('Sped up (2x)')}
if(has(/fade/)){o.fi=1;o.fo=1;steps.push('Fade in and fade out')}
if(has(/mute|no original sound|remove (the )?sound/)){o.ov=0;steps.push('Original sound muted')}
if(has(/loud music|music louder/)){o.mv=.9;steps.push('Louder music')}
if(has(/quiet music|soft music|music lower/)){o.mv=.25;steps.push('Quieter music')}
if(m=p.match(/["\u201c']([^"\u201d']{1,60})["\u201d']/)){o.cap=m[1];steps.push('Added the caption you asked for')}
if(m=t.match(/first (\d+)/)){o.te=+m[1];steps.push('Trimmed to the first '+m[1]+' seconds')}
if(m=t.match(/last (\d+)/)){if(v.duration){o.ts=Math.max(0,v.duration-m[1]);steps.push('Kept the last '+m[1]+' seconds')}}
if(!steps.length){o=auto();steps.push('No specific style found, so I applied an automatic professional polish')}
o.summary=steps.join(', ')+'.';o.steps=steps;return o}
async function ai(p){var sm=null;try{sm=window.claude&&await claude.use('sample')}catch(e){}
if(!sm)return null;
var q='You are NEXUS Editor, a professional video editor. Turn the request into edit settings. Reply with JSON only, using these keys: summary (one sentence), steps (array of short strings), b brightness 50-160 (100 normal), c contrast 50-160, s saturation 0-220, w warmth 0-40, gray 0-100, hue -180 to 180, blur 0-6, v vignette 0-100, grain 0-100, bars 0 or 1 for cinematic bars, fi fade-in seconds, fo fade-out seconds, sp speed 0.25-4, ts trim start seconds, te trim end seconds (0 means full length), ov original sound 0-1, mv music 0-1, cap caption text. Include only keys that should change. Current settings: '+JSON.stringify(E)+'. Video length: '+Math.round(v.duration)+' seconds. Music added: '+(au.src?'yes':'no')+'. Request: '+p;
try{return await sm.json(q,{modelTier:'quick',cache:false})}catch(e){return null}}
$('go').onclick=async function(){if(!v.src)return;var p=$('pr').value.trim();if(!p){st.textContent='Describe the edit first.';return}
var b=this;b.disabled=true;st.textContent='NEXUS is planning your edit…';
var o=await ai(p),src='AI';if(!o||typeof o!=='object'){o=local(p);src='built-in rules'}
apply(o);var pn=$('plan');pn.textContent='';var h=document.createElement('div');h.textContent=typeof o.summary==='string'?o.summary:'Edit applied.';pn.appendChild(h);
if(Array.isArray(o.steps)){var u=document.createElement('ul');o.steps.slice(0,10).forEach(function(s){var l=document.createElement('li');l.textContent=String(s);u.appendChild(l)});pn.appendChild(u)}
st.textContent='Edit planned with '+src+'. Press Play to preview, then render.';b.disabled=false};
$('rs').onclick=function(){E=Object.assign({},D);gains();$('plan').textContent='';st.textContent='All edits cleared.'};
var eg=['Make it cinematic with the title \u201cMy Trip\u201d','Old black and white film look with fade in and out','Professional polish, vivid colours, slow motion','Brighter and warmer, speed up 2x'];
eg.forEach(function(t){var b=document.createElement('button');b.textContent=t;b.onclick=function(){$('pr').value=t};$('eg').appendChild(b)});
function load(f){if(!f||f.type.indexOf('video')!==0)return;stop();v.src=URL.createObjectURL(f);outBlob=null;$('out').hidden=true;$('dl').hidden=true;
v.onloadedmetadata=function(){var w=Math.min(v.videoWidth,1280);sc.width=w;sc.height=Math.round(w*v.videoHeight/v.videoWidth);E=Object.assign({},D);v.currentTime=0;$('plan').textContent='';st.textContent='Loaded '+f.name+' ('+Math.round(v.duration)+'s). Describe the edit you want.';location.hash='editor';route()}}
$('vf').onchange=function(e){load(e.target.files[0])};
var dp=$('drop');dp.ondragover=function(e){e.preventDefault();dp.classList.add('on')};dp.ondragleave=function(){dp.classList.remove('on')};dp.ondrop=function(e){e.preventDefault();dp.classList.remove('on');load(e.dataTransfer.files[0])};
$('af').onchange=function(e){var f=e.target.files[0];if(!f)return;au.src=URL.createObjectURL(f);st.textContent='Music added: '+f.name+'. Ask NEXUS for louder or quieter music if needed.'};
$('rf').onchange=function(e){var f=e.target.files[0];if(!f||!v.videoWidth)return;var r=document.createElement('video');r.muted=true;r.src=URL.createObjectURL(f);
r.onloadedmetadata=function(){r.currentTime=r.duration/2};
r.onseeked=function(){try{var a=stats(r),b=stats(v);apply({b:100+(a.lum-b.lum)*.5,c:100*a.std/b.std,s:100*a.sat/b.sat});$('plan').textContent='Matched the brightness, contrast and colour of the reference video.';st.textContent='Reference look applied. Press Play to preview.'}catch(er){st.textContent='Could not read the reference video.'}}};
function draw(){var W=sc.width,H=sc.height;
if(v.videoWidth&&!$('editor').hidden){x.filter='brightness('+E.b+'%) contrast('+E.c+'%) saturate('+E.s+'%) sepia('+E.w+'%) grayscale('+E.gray+'%) hue-rotate('+E.hue+'deg) blur('+E.blur+'px)';x.drawImage(v,0,0,W,H);x.filter='none';
if(E.v){var g=x.createRadialGradient(W/2,H/2,H*.35,W/2,H/2,W*.65);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,'+E.v/130+')');x.fillStyle=g;x.fillRect(0,0,W,H)}
if(E.grain){x.fillStyle='rgba(255,255,255,'+E.grain/400+')';for(var i=0;i<W*H/900;i++)x.fillRect(Math.random()*W,Math.random()*H,1.5,1.5)}
if(E.bars){x.fillStyle='#000';x.fillRect(0,0,W,H*.11);x.fillRect(0,H*.89,W,H*.11)}
if(E.cap){x.font='bold '+Math.round(H*.06)+'px Space Grotesk,sans-serif';x.textAlign='center';x.lineWidth=H*.012;x.strokeStyle='#000';x.fillStyle='#fff';x.strokeText(E.cap,W/2,H*.92);x.fillText(E.cap,W/2,H*.92)}
var t=v.currentTime,a=0;if(E.fi&&t-E.ts<E.fi)a=1-(t-E.ts)/E.fi;if(E.fo&&end()-t<E.fo)a=Math.max(a,1-(end()-t)/E.fo);
if(a>0){x.fillStyle='rgba(0,0,0,'+Math.min(1,a)+')';x.fillRect(0,0,W,H)}
if(!v.paused&&(t>=end()||v.ended))stop()}
requestAnimationFrame(draw)}
draw();
function graph(){if(ac)return;ac=new(window.AudioContext||window.webkitAudioContext)();dest=ac.createMediaStreamDestination();vg=ac.createGain();ac.createMediaElementSource(v).connect(vg);vg.connect(ac.destination);vg.connect(dest);mg=ac.createGain();ac.createMediaElementSource(au).connect(mg);mg.connect(ac.destination);mg.connect(dest);gains()}
function go(){graph();ac.resume();v.currentTime=E.ts;v.play();if(au.src){au.currentTime=0;au.play()}pl.textContent='Pause'}
function stop(){v.pause();au.pause();pl.textContent='Play';if(rec&&rec.state==='recording')rec.stop()}
pl.onclick=function(){if(v.paused)go();else stop()};
$('ex').onclick=function(){
if(!v.src)return;
if(!window.MediaRecorder||!sc.captureStream){st.textContent='Rendering needs a recent Chrome, Edge, or Firefox.';return}
graph();ac.resume();
var ms=new MediaStream(sc.captureStream(30).getVideoTracks().concat(dest.stream.getAudioTracks())),
mt=['video/mp4;codecs=avc1','video/webm;codecs=vp9,opus','video/webm'].filter(function(m){return MediaRecorder.isTypeSupported(m)})[0],ch=[];
ext=mt.indexOf('mp4')>-1?'mp4':'webm';
rec=new MediaRecorder(ms,{mimeType:mt,videoBitsPerSecond:8e6});
rec.ondataavailable=function(e){ch.push(e.data)};
rec.onstop=function(){outBlob=new Blob(ch,{type:mt});var o=$('out');o.src=URL.createObjectURL(outBlob);o.hidden=false;$('dl').hidden=false;$('dn').textContent='Your edited video is ready. Preview it, then download it.';st.textContent='Render finished.';rec=null};
$('dn').textContent='Rendering in real time. Keep this tab open and visible until it finishes.';
rec.start();go()};
$('dl').onclick=async function(){if(!outBlob)return;var name='nexus-edit.'+ext,d=null;try{d=window.claude&&await claude.use('downloads')}catch(e){}
if(d){try{await d.save({filename:name,data:outBlob})}catch(e){if(!e||e.code!=='declined')$('dn').textContent='Could not save the file. Try again.'}return}
var a=document.createElement('a');a.href=URL.createObjectURL(outBlob);a.download=name;a.click()};
function route(){var on=location.hash==='#editor'&&!!v.src;$('editor').hidden=!on;document.body.style.overflow=on?'hidden':'';if(!on&&location.hash==='#editor')history.replaceState(null,'','#studio')}
addEventListener('hashchange',route);route();
$('exit').onclick=function(){stop();location.hash='studio'};
})();

// copy number
document.getElementById('copy').onclick=function(){var b=this;try{navigator.clipboard.writeText('09129999324').then(function(){b.textContent='Copied'})}catch(e){b.textContent='09129999324'}setTimeout(function(){b.textContent='Copy number'},2000)};
