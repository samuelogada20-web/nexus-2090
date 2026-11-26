
// ----- Edit your socials here. Leave a value empty to hide it. -----
var SOCIALS={Instagram:"",TikTok:"",GitHub:"",X:"",Telegram:"",YouTube:"",Email:""};
var s=document.getElementById('soc'),any=false;
for(var k in SOCIALS){if(SOCIALS[k]){any=true;var a=document.createElement('a');a.className='btn';a.target='_blank';a.rel='noopener';a.textContent=k;a.href=k==='Email'?'mailto:'+SOCIALS[k]:SOCIALS[k];s.appendChild(a)}}
if(!any)s.innerHTML='<span style="color:var(--mute);font-size:.9rem">Social links coming soon.</span>';

// clock in 2090
var clk=document.getElementById('clock');
function tick(){var d=new Date();clk.textContent='● '+d.toLocaleDateString('en-GB',{day:'2-digit',month:'short'})+' 2090 · '+d.toLocaleTimeString('en-GB')}
tick();setInterval(tick,1000);

// red dreamland: live 3D background
var cv=document.getElementById('stars'),target=1,speed=1,mx=0,my=0,panels=[],moving=[];
var reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
addEventListener('mousemove',function(e){mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5});
var lastY=scrollY;addEventListener('scroll',function(){target=Math.min(1+Math.abs(scrollY-lastY)/12,8);lastY=scrollY});
var w=document.getElementById('warp');
['mousedown','touchstart'].forEach(function(e){w.addEventListener(e,function(){target=14})});
['mouseup','mouseleave','touchend'].forEach(function(e){w.addEventListener(e,function(){target=1})});
if(window.THREE){(function(){
var T=THREE,rn=new T.WebGLRenderer({canvas:cv,antialias:true}),sn=new T.Scene(),cm=new T.PerspectiveCamera(70,1,.1,200);
sn.background=new T.Color(0x000000);sn.fog=new T.FogExp2(0x000000,.026);
function rs(){rn.setPixelRatio(Math.min(devicePixelRatio,2));rn.setSize(innerWidth,innerHeight,false);cm.aspect=innerWidth/innerHeight;cm.updateProjectionMatrix()}
rs();addEventListener('resize',rs);
var rings=[],i,m;
for(i=0;i<36;i++){m=new T.Mesh(new T.TorusGeometry(7+Math.sin(i)*1.5,.04,8,64),new T.MeshBasicMaterial({color:i%4?0xff2038:0xffb0a0,transparent:true,opacity:.5}));m.position.z=-i*3;sn.add(m);rings.push(m)}
m=new T.Mesh(new T.SphereGeometry(9,32,32),new T.MeshBasicMaterial({color:0xb3001b,fog:false}));m.position.set(14,6,-120);sn.add(m);
var halo=new T.Mesh(new T.SphereGeometry(12,32,32),new T.MeshBasicMaterial({color:0xff1a33,transparent:true,opacity:.18,fog:false,side:T.BackSide}));halo.position.copy(m.position);sn.add(halo);
for(i=0;i<14;i++){m=new T.Mesh(i%2?new T.TorusKnotGeometry(.9,.25,60,8):new T.IcosahedronGeometry(1.1,0),new T.MeshBasicMaterial({color:i%3?0xff2038:0xff9a8a,wireframe:true}));
m.position.set((Math.random()-.5)*20,(Math.random()-.5)*11,-6-i*7.5);m.userData.r=.3+Math.random()*.6;sn.add(m);moving.push(m)}
for(i=0;i<5;i++){var g=new T.PlaneGeometry(6,3.4),p=new T.Mesh(g,new T.MeshBasicMaterial({color:0x1a0004,transparent:true,opacity:.35,side:T.DoubleSide}));
var side=i%2?1:-1;p.position.set(side*(8+Math.random()*3),(Math.random()-.5)*6,-14-i*18);p.rotation.y=-side*.5;p.userData.r=0;
p.add(new T.LineSegments(new T.EdgesGeometry(g),new T.LineBasicMaterial({color:0xff2038})));sn.add(p);moving.push(p);panels.push(p)}
var N=600,pa=new Float32Array(N*3);for(i=0;i<N;i++){pa[i*3]=(Math.random()-.5)*30;pa[i*3+1]=(Math.random()-.5)*20;pa[i*3+2]=-Math.random()*110}
var pg=new T.BufferGeometry();pg.setAttribute('position',new T.BufferAttribute(pa,3));
sn.add(new T.Points(pg,new T.PointsMaterial({color:0xff5a3c,size:.09,transparent:true,opacity:.85})));
var sh=new T.Group(),trails=[];
sn.add(new T.AmbientLight(0x5a2a38,.9));
var l1=new T.DirectionalLight(0xff3a4a,1.2);l1.position.set(-3,2,2);sn.add(l1);
var l2=new T.DirectionalLight(0x7f9bff,.7);l2.position.set(3,5,-2);sn.add(l2);
var VX={N:[0,.15,-3.2],S:[0,.58,-.3],Tl:[0,.38,1.6],L:[-2.4,0,1.5],Ln:[-1,.12,.9],R:[2.4,0,1.5],Rn:[1,.12,.9]},
TR=[['N','L','S'],['S','L','Ln'],['S','Ln','Tl'],['N','S','R'],['S','R','Rn'],['S','Rn','Tl']],pos=[];
TR.forEach(function(t){t.forEach(function(k){pos.push.apply(pos,VX[k])})});
var hg2=new T.BufferGeometry();hg2.setAttribute('position',new T.BufferAttribute(new Float32Array(pos),3));hg2.computeVertexNormals();
var hull=new T.MeshPhongMaterial({color:0x0b0b10,specular:0xaa4455,shininess:70,flatShading:true,side:T.DoubleSide});
sh.add(new T.Mesh(hg2,hull));
var fin=new T.Mesh(new T.ConeGeometry(.12,2.3,4),hull);fin.geometry.translate(0,1.15,0);fin.position.set(0,.5,.5);fin.rotation.x=.9;sh.add(fin);
var cp=new T.Mesh(new T.SphereGeometry(1,16,12),new T.MeshPhongMaterial({color:0x1a0508,specular:0xff6666,shininess:90,emissive:0x330006}));cp.scale.set(.32,.17,.8);cp.position.set(0,.52,-1.3);sh.add(cp);
function strip(a,b,w){var A=new T.Vector3(a[0],a[1],a[2]),B=new T.Vector3(b[0],b[1],b[2]),d=B.clone().sub(A),m=new T.Mesh(new T.BoxGeometry(w,w*.6,d.length()),new T.MeshBasicMaterial({color:0xff2038}));m.position.copy(A).add(B).multiplyScalar(.5);m.lookAt(B);sh.add(m)}
[-1,1].forEach(function(s){strip([s*.3,.17,-2.6],[s*2.1,.04,1.2],.07);strip([s*.3,.54,-.7],[s*.8,.2,.8],.05);
var e=new T.Mesh(new T.SphereGeometry(.15,12,8),new T.MeshBasicMaterial({color:0xff5a3c}));e.position.set(s*.5,.22,1.5);sh.add(e);
var f=new T.Mesh(new T.ConeGeometry(.22,2.6,12,1,true),new T.MeshBasicMaterial({color:0xff2a3a,transparent:true,opacity:.45,blending:T.AdditiveBlending,depthWrite:false,side:T.DoubleSide}));
f.geometry.translate(0,1.3,0);f.rotation.x=Math.PI/2;f.position.set(s*.5,.22,1.55);sh.add(f);trails.push(f)});
var nd=new T.Mesh(new T.SphereGeometry(.08,8,8),new T.MeshBasicMaterial({color:0xff2a3a}));nd.position.set(0,.17,-3.1);sh.add(nd);
sh.position.set(0,-1.15,-8.5);sn.add(sh);
window.nexusBg=function(u){var b=document.createElement('video');b.src=u;b.muted=true;b.loop=true;b.playsInline=true;b.play().catch(function(){});
var tx=new T.VideoTexture(b);panels.forEach(function(q){q.material.map=tx;q.material.color.set(0xff8c8c);q.material.opacity=.7;q.material.needsUpdate=true})};
var ck=new T.Clock();
function loop(){var dt=Math.min(ck.getDelta(),.05);speed+=(target-speed)*.06;if(target>1&&target<14)target=Math.max(1,target-.12);
var vz=(reduce?.05:1)*speed*dt*6,k;
rings.forEach(function(r){r.position.z+=vz;if(r.position.z>4)r.position.z-=108;r.rotation.z+=dt*.1});
moving.forEach(function(o){o.position.z+=vz;if(o.position.z>6)o.position.z-=110;o.rotation.x+=dt*o.userData.r;o.rotation.y+=dt*o.userData.r*1.3});
for(k=0;k<N;k++){pa[k*3+1]+=dt*.6;pa[k*3+2]+=vz;if(pa[k*3+1]>10)pa[k*3+1]=-10;if(pa[k*3+2]>6)pa[k*3+2]-=110}
pg.attributes.position.needsUpdate=true;
cm.position.x+=(mx*3-cm.position.x)*.05;cm.position.y+=(-my*2-cm.position.y)*.05;cm.lookAt(0,0,-20);
var tt=ck.elapsedTime,k2=reduce?.2:1,px=Math.sin(tt*.5)*1.5*k2+mx*2.5;
sh.rotation.z=-(px-sh.position.x)*.4+Math.sin(tt*.7)*.06*k2;sh.position.x+=(px-sh.position.x)*.05;
sh.position.y=-1.15+Math.sin(tt*.9)*.2*k2-my*.8;sh.rotation.x=Math.sin(tt*.6)*.04*k2+my*.15;
sh.scale.setScalar(Math.min(.62,.62*cm.aspect/1.6));
trails.forEach(function(q){q.scale.y=1+speed*.2+Math.sin(tt*30)*.05});
rn.render(sn,cm);requestAnimationFrame(loop)}
loop()})()}

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
  if(d<R*.32){ox.strokeStyle='rgba(255,45,63,'+(.35*(1-d/(R*.32)))*(P[i][2]+1.2)/2.2+')';ox.lineWidth=1;ox.beginPath();ox.moveTo(P[i][0],P[i][1]);ox.lineTo(P[j][0],P[j][1]);ox.stroke()}}
 P.forEach(function(p,i){var r=(p[2]+1.4)*w*.006;ox.fillStyle=i%7?'rgba(255,170,160,.9)':'rgba(255,235,210,.95)';ox.beginPath();ox.arc(p[0],p[1],r,0,7);ox.fill()});
 for(var k=0;k<3;k++){ox.save();ox.translate(w/2,h/2);ox.rotate(ang*(k+1)*.7+k*1.1);ox.scale(1,.28+k*.12);ox.strokeStyle='rgba(255,60,80,'+(.6-k*.12)+')';ox.lineWidth=2;ox.beginPath();ox.arc(0,0,R*(1.2+k*.18),0,7);ox.stroke();ox.restore()}
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
var D={b:100,c:100,s:100,w:0,gray:0,hue:0,blur:0,v:0,grain:0,bars:0,fi:0,fo:0,sp:1,ts:0,te:0,ov:1,mv:.6,cap:'',zm:0,pulse:0,shake:0,ti:'none',to:'none',td:.8},E=Object.assign({},D);
var R={b:[50,160],c:[50,160],s:[0,220],w:[0,40],gray:[0,100],hue:[-180,180],blur:[0,6],v:[0,100],grain:[0,100],bars:[0,1],fi:[0,5],fo:[0,5],sp:[.25,4],ts:[0,1e5],te:[0,1e5],ov:[0,1],mv:[0,1],zm:[-60,100],pulse:[0,100],shake:[0,100],td:[.3,3]};
function apply(o){for(var k in R){if(o[k]==null)continue;var n=+o[k];if(isNaN(n))continue;E[k]=Math.max(R[k][0],Math.min(R[k][1],n))}
if(typeof o.cap==='string')E.cap=o.cap.slice(0,80);['ti','to'].forEach(function(k){if(['none','wipe','iris','flash','glitch'].indexOf(o[k])>-1)E[k]=o[k]});gains()}
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
if(has(/zoom out|pull out/)){o.zm=-40;steps.push('Slow zoom out')}else if(has(/zoom|push in/)){o.zm=40;steps.push('Slow zoom in')}
if(has(/pulse|beat/)){o.pulse=45;steps.push('Zoom pulse on the beat')}
if(has(/shake|earthquake|handheld|rumble/)){o.shake=has(/handheld/)?15:45;steps.push('Camera shake')}
if(has(/glitch/)){o.ti='glitch';o.to='glitch';steps.push('Glitch intro and outro')}
if(has(/wipe/)){o.ti='wipe';steps.push('Wipe intro')}
if(has(/iris|circle/)){o.to='iris';steps.push('Iris outro')}
if(has(/flash|whip/)){o.to='flash';steps.push('Flash outro')}
if(has(/transition/)&&o.ti==null){o.ti='wipe';o.to='iris';steps.push('Wipe intro and iris outro')}
if(!steps.length){o=auto();steps.push('No specific style found, so I applied an automatic professional polish')}
o.summary=steps.join(', ')+'.';o.steps=steps;return o}
async function ai(p){var sm=null;try{sm=window.claude&&await claude.use('sample')}catch(e){}
if(!sm)return null;
var q='You are NEXUS Editor, a professional video editor. Turn the request into edit settings. Reply with JSON only, using these keys: summary (one sentence), steps (array of short strings), b brightness 50-160 (100 normal), c contrast 50-160, s saturation 0-220, w warmth 0-40, gray 0-100, hue -180 to 180, blur 0-6, v vignette 0-100, grain 0-100, bars 0 or 1 for cinematic bars, fi fade-in seconds, fo fade-out seconds, sp speed 0.25-4, ts trim start seconds, te trim end seconds (0 means full length), ov original sound 0-1, mv music 0-1, cap caption text, zm zoom (positive pushes in, negative pulls out, -60 to 100), pulse beat zoom pulse 0-100, shake camera shake 0-100, ti intro transition and to outro transition (each one of none, wipe, iris, flash, glitch), td transition seconds 0.3-3. Include only keys that should change. Current settings: '+JSON.stringify(E)+'. Video length: '+Math.round(v.duration)+' seconds. Music added: '+(au.src?'yes':'no')+'. Request: '+p;
try{return await sm.json(q,{modelTier:'quick',cache:false})}catch(e){return null}}
$('go').onclick=async function(){if(!v.src)return;var p=$('pr').value.trim();if(!p){st.textContent='Describe the edit first.';return}
var b=this;b.disabled=true;st.textContent='NEXUS is planning your edit…';
var o=await ai(p),src='AI';if(!o||typeof o!=='object'){o=local(p);src='built-in rules'}
apply(o);var pn=$('plan');pn.textContent='';var h=document.createElement('div');h.textContent=typeof o.summary==='string'?o.summary:'Edit applied.';pn.appendChild(h);
if(Array.isArray(o.steps)){var u=document.createElement('ul');o.steps.slice(0,10).forEach(function(s){var l=document.createElement('li');l.textContent=String(s);u.appendChild(l)});pn.appendChild(u)}
st.textContent='Edit planned with '+src+'. Press Play to preview, then render.';b.disabled=false};
$('rs').onclick=function(){E=Object.assign({},D);gains();$('plan').textContent='';st.textContent='All edits cleared.'};
var eg=['Make it cinematic with the title \u201cMy Trip\u201d','Old black and white film look with fade in and out','Professional polish, vivid colours, slow motion','Zoom in slowly, add shake, glitch intro and flash ending'];
eg.forEach(function(t){var b=document.createElement('button');b.textContent=t;b.onclick=function(){$('pr').value=t};$('eg').appendChild(b)});
function load(f){if(!f||f.type.indexOf('video')!==0)return;stop();v.src=URL.createObjectURL(f);if(window.nexusBg)nexusBg(v.src);outBlob=null;$('out').hidden=true;$('dl').hidden=true;
v.onloadedmetadata=function(){var w=Math.min(v.videoWidth,1280);sc.width=w;sc.height=Math.round(w*v.videoHeight/v.videoWidth);E=Object.assign({},D);v.currentTime=0;$('plan').textContent='';st.textContent='Loaded '+f.name+' ('+Math.round(v.duration)+'s). Describe the edit you want.';if(window.nexusRec)nexusRec(f.name);location.hash='editor';route()}}
$('vf').onchange=function(e){load(e.target.files[0])};
var dp=$('drop');dp.ondragover=function(e){e.preventDefault();dp.classList.add('on')};dp.ondragleave=function(){dp.classList.remove('on')};dp.ondrop=function(e){e.preventDefault();dp.classList.remove('on');load(e.dataTransfer.files[0])};
$('af').onchange=function(e){var f=e.target.files[0];if(!f)return;au.src=URL.createObjectURL(f);st.textContent='Music added: '+f.name+'. Ask NEXUS for louder or quieter music if needed.'};
$('rf').onchange=function(e){var f=e.target.files[0];if(!f||!v.videoWidth)return;var r=document.createElement('video');r.muted=true;r.src=URL.createObjectURL(f);
r.onloadedmetadata=function(){r.currentTime=r.duration/2};
r.onseeked=function(){try{var a=stats(r),b=stats(v);apply({b:100+(a.lum-b.lum)*.5,c:100*a.std/b.std,s:100*a.sat/b.sat});$('plan').textContent='Matched the brightness, contrast and colour of the reference video.';st.textContent='Reference look applied. Press Play to preview.'}catch(er){st.textContent='Could not read the reference video.'}}};
function trans(k,p,W,H){if(k==='flash'){x.fillStyle='rgba(255,255,255,'+(1-p)+')';x.fillRect(0,0,W,H)}
else if(k==='wipe'){x.fillStyle='#000';x.fillRect(W*p,0,W,H)}
else if(k==='iris'){x.fillStyle='#000';x.beginPath();x.rect(0,0,W,H);x.arc(W/2,H/2,p*Math.hypot(W,H)/2,0,7);x.fill('evenodd')}
else if(k==='glitch'){for(var i=0;i<8;i++){var y=Math.random()*H,hh=H*.04+Math.random()*H*.08;x.drawImage(sc,0,y,W,hh,(Math.random()-.5)*W*.15*(1-p),y,W,hh)}}}
function draw(){var W=sc.width,H=sc.height;
if(v.videoWidth&&!$('editor').hidden){x.filter='brightness('+E.b+'%) contrast('+E.c+'%) saturate('+E.s+'%) sepia('+E.w+'%) grayscale('+E.gray+'%) hue-rotate('+E.hue+'deg) blur('+E.blur+'px)';var t0=v.currentTime,pr=Math.min(1,Math.max(0,(t0-E.ts)/Math.max(.1,end()-E.ts))),z=1+E.shake/900;if(E.zm>0)z+=E.zm/100*pr;else if(E.zm<0)z+=-E.zm/100*(1-pr);if(E.pulse)z+=Math.max(0,Math.sin(t0*6))*E.pulse/600;
x.save();x.translate(W/2,H/2);if(E.shake){x.translate((Math.random()-.5)*W*E.shake/700,(Math.random()-.5)*H*E.shake/700);x.rotate((Math.random()-.5)*E.shake/3000)}x.scale(z,z);x.translate(-W/2,-H/2);x.drawImage(v,0,0,W,H);x.restore();x.filter='none';
if(E.v){var g=x.createRadialGradient(W/2,H/2,H*.35,W/2,H/2,W*.65);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,'+E.v/130+')');x.fillStyle=g;x.fillRect(0,0,W,H)}
if(E.grain){x.fillStyle='rgba(255,255,255,'+E.grain/400+')';for(var i=0;i<W*H/900;i++)x.fillRect(Math.random()*W,Math.random()*H,1.5,1.5)}
if(E.bars){x.fillStyle='#000';x.fillRect(0,0,W,H*.11);x.fillRect(0,H*.89,W,H*.11)}
if(E.cap){x.font='bold '+Math.round(H*.06)+'px Space Grotesk,sans-serif';x.textAlign='center';x.lineWidth=H*.012;x.strokeStyle='#000';x.fillStyle='#fff';x.strokeText(E.cap,W/2,H*.92);x.fillText(E.cap,W/2,H*.92)}
var t=v.currentTime,a=0;if(E.fi&&t-E.ts<E.fi)a=1-(t-E.ts)/E.fi;if(E.fo&&end()-t<E.fo)a=Math.max(a,1-(end()-t)/E.fo);
if(a>0){x.fillStyle='rgba(0,0,0,'+Math.min(1,a)+')';x.fillRect(0,0,W,H)}
if(!v.paused){if(E.ti!=='none'){var p1=(t-E.ts)/E.td;if(p1<1)trans(E.ti,Math.max(0,p1),W,H)}if(E.to!=='none'){var p2=(end()-t)/E.td;if(p2<1)trans(E.to,Math.max(0,p2),W,H)}}
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

// sidebar, login and 3D logo
(function(){
var $=function(i){return document.getElementById(i)};
$('menu').onclick=function(){$('side').classList.toggle('open')};
$('side').addEventListener('click',function(e){if(e.target.closest('a'))this.classList.remove('open')});
$('sf').onsubmit=function(e){e.preventDefault();var q=$('sq').value.toLowerCase().trim();if(!q)return;
var s=Array.prototype.find.call(document.querySelectorAll('main section'),function(s){return s.textContent.toLowerCase().indexOf(q)>-1});
if(s){s.scrollIntoView({behavior:'smooth'});$('side').classList.remove('open')}else{$('sq').value='';$('sq').placeholder='No match found'}};
window.nexusRec=function(name){var r=$('rec');r.textContent='';var a=document.createElement('a');a.href='#editor';a.textContent='🎬 '+name;r.appendChild(a)};
// Set these to your own backend endpoints to send real codes by email or SMS.
var AUTH={sendUrl:'',verifyUrl:''};
var mode='email',code='',to='',tries=0,user=null,tm,otp=$('otp');
try{user=localStorage.getItem('nx_user')}catch(e){}
for(var i=0;i<6;i++){var n=document.createElement('input');n.maxLength=1;n.inputMode='numeric';n.setAttribute('aria-label','Digit '+(i+1));if(!i)n.autocomplete='one-time-code';otp.appendChild(n)}
var bx=otp.children;
[].forEach.call(bx,function(b,i){
b.oninput=function(){b.value=b.value.replace(/\D/g,'');if(b.value&&bx[i+1])bx[i+1].focus()};
b.onkeydown=function(e){if(e.key==='Backspace'&&!b.value&&bx[i-1])bx[i-1].focus()};
b.onpaste=function(e){var t=(e.clipboardData.getData('text')||'').replace(/\D/g,'').slice(0,6);if(!t)return;e.preventDefault();for(var k=0;k<6;k++)bx[k].value=t[k]||'';bx[Math.min(t.length,5)].focus()}});
function mask(t){return t.indexOf('@')>-1?t.replace(/^(.{2}).*(@.*)$/,'$1***$2'):t.slice(0,4)+' *** '+t.slice(-4)}
function who(){$('who').textContent=user?mask(user):'Guest';$('lg').textContent=user?'Log out':'Log in'}who();
function show(n){['s1','s2','s3'].forEach(function(s,k){$(s).hidden=k!==n-1});if(n===3)$('hi').textContent='Signed in as '+mask(user);if(n===2)bx[0].focus()}
document.querySelectorAll('.tabs button').forEach(function(b){b.onclick=function(){mode=b.dataset.t;document.querySelectorAll('.tabs button').forEach(function(x){x.classList.toggle('on',x===b)});$('fe').hidden=mode!=='email';$('fp').hidden=mode!=='phone';$('e1').textContent=''}});
function norm(){if(mode==='email'){var e=$('em').value.trim();return/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e)?e:null}var d=$('ph').value.replace(/\D/g,'').replace(/^0+/,'');return d.length>=7&&d.length<=12?$('cc').value+d:null}
function timer(){var s=30,b=$('rsend');b.disabled=true;clearInterval(tm);tm=setInterval(function(){s--;b.textContent=s>0?'Resend in '+s+'s':'Resend code';if(s<=0){clearInterval(tm);b.disabled=false}},1000);b.textContent='Resend in 30s'}
async function sendCode(){var t=norm(),er=$('e1');if(!t){er.textContent=mode==='email'?'Enter a valid email address.':'Enter a valid phone number.';return}
er.textContent='';to=t;tries=0;$('ver').disabled=false;$('e2').textContent='';[].forEach.call(bx,function(b){b.value=''});var b=$('send');b.disabled=true;
try{if(AUTH.sendUrl){var r=await fetch(AUTH.sendUrl,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({to:t,type:mode})});if(!r.ok)throw 0;$('demo').hidden=true}
else{code=String(crypto.getRandomValues(new Uint32Array(1))[0]%900000+100000);$('demo').hidden=false;$('demo').textContent='Demo mode: no message was really sent. Your code is '+code+'.'}
$('sentto').textContent='We sent a code to '+mask(t)+'.';show(2);timer()}catch(e){er.textContent='Could not send the code. Try again.'}b.disabled=false}
async function verify(){var v=[].map.call(bx,function(b){return b.value}).join(''),er=$('e2');if(v.length<6){er.textContent='Enter all 6 digits.';return}
var ok=false;if(AUTH.verifyUrl){try{var r=await fetch(AUTH.verifyUrl,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({to:to,code:v})});ok=r.ok}catch(e){er.textContent='Could not verify. Try again.';return}}else ok=v===code;
if(ok){user=to;try{localStorage.setItem('nx_user',to)}catch(e){}who();show(3)}else{tries++;if(tries>=5){er.textContent='Too many attempts. Request a new code.';$('ver').disabled=true}else er.textContent='That code is not right.'}}
$('send').onclick=sendCode;$('ver').onclick=verify;$('rsend').onclick=sendCode;$('back').onclick=function(){show(1)};
['em','ph'].forEach(function(id){$(id).onkeydown=function(e){if(e.key==='Enter')sendCode()}});
$('lg').onclick=function(){if(user){user=null;try{localStorage.removeItem('nx_user')}catch(e){}who()}else location.hash='login'};
function close(){location.hash='studio'}$('lclose').onclick=close;$('done').onclick=close;
addEventListener('keydown',function(e){if(e.key==='Escape'&&location.hash==='#login')close()});
// 3D NEXUS logo: extruded N with orbit rings
var cv=$('n3d'),c=cv.getContext('2d'),Q=[[-.7,-.9],[-.35,-.9],[.35,.35],[.35,-.9],[.7,-.9],[.7,.9],[.35,.9],[-.35,-.35],[-.35,.9],[-.7,.9]],ang=0,tx=0,ty=0,run=false;
function sz(){var r=devicePixelRatio||1,b=cv.getBoundingClientRect();cv.width=b.width*r;cv.height=b.height*r}
function pr(x,y,z,a,t,W){var cs=Math.cos(a),sn=Math.sin(a),x1=x*cs+z*sn,z1=-x*sn+z*cs,c2=Math.cos(t),s2=Math.sin(t),y1=y*c2-z1*s2,z2=y*s2+z1*c2,k=3.2/(3.2+z2);return[W/2+x1*k*W*.3,W/2+y1*k*W*.3]}
function poly(P,f,s){c.beginPath();P.forEach(function(p,i){i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1])});c.closePath();c.fillStyle=f;c.fill();c.strokeStyle=s;c.stroke()}
function frame(){if(!run)return;var W=cv.width,r,i;c.clearRect(0,0,W,W);ang+=.012;var a=ang+tx,t=-.25+ty;c.lineJoin='round';c.lineWidth=W*.006;
for(r=0;r<2;r++){var R=1.35+r*.25,A=a*(r?-.6:.6)+r;c.strokeStyle='rgba(225,29,46,'+(.4-r*.14)+')';c.beginPath();
for(i=0;i<=64;i++){var q=i/64*6.283,p=pr(Math.cos(q)*R,0,Math.sin(q)*R,A,t+r*.6,W);i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1])}c.stroke();
var d=pr(Math.cos(ang*(1.6+r))*R,0,Math.sin(ang*(1.6+r))*R,A,t+r*.6,W);c.fillStyle='#e11d2e';c.beginPath();c.arc(d[0],d[1],W*.012,0,7);c.fill()}
var F=Q.map(function(p){return pr(p[0],p[1],.25,a,t,W)}),B=Q.map(function(p){return pr(p[0],p[1],-.25,a,t,W)});
poly(B,'rgba(225,29,46,.10)','rgba(225,29,46,.55)');c.strokeStyle='rgba(225,29,46,.5)';
F.forEach(function(p,i){c.beginPath();c.moveTo(p[0],p[1]);c.lineTo(B[i][0],B[i][1]);c.stroke()});
poly(F,'rgba(225,29,46,.22)','#e11d2e');requestAnimationFrame(frame)}
$('login').addEventListener('pointermove',function(e){tx=(e.clientX/innerWidth-.5)*.9;ty=(e.clientY/innerHeight-.5)*.6});
function lroute(){var on=location.hash==='#login';$('login').hidden=!on;if(on){document.body.style.overflow='hidden';show(user?3:1);run=true;sz();frame()}else run=false}
addEventListener('hashchange',lroute);addEventListener('resize',function(){if(run)sz()});lroute();
})();

// copy number
document.getElementById('copy').onclick=function(){var b=this;try{navigator.clipboard.writeText('09129999324').then(function(){b.textContent='Copied'})}catch(e){b.textContent='09129999324'}setTimeout(function(){b.textContent='Copy number'},2000)};
