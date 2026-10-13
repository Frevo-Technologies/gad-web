(() => {
  const root=document.documentElement, motion=matchMedia('(prefers-reduced-motion: reduce)');
  const key='ga-intro-seen';
  let seen=false;try{seen=sessionStorage.getItem(key)==='1';}catch{}
  const replay=new URLSearchParams(location.search).get('intro')==='1';
  if((seen&&!replay)||motion.matches||!Element.prototype.animate)return;
  // Run once per browser tab, not on every internal navigation.
  try{sessionStorage.setItem(key,'1');}catch{}
  root.classList.add('intro-pending');
  let overlay,flight,brand,finished=false;
  const animations=[];
  const finish=()=>{if(finished)return;finished=true;animations.forEach(a=>a.cancel());overlay?.remove();flight?.remove();root.classList.remove('intro-pending','intro-active');brand?.classList.remove('intro-brand-hidden');};
  const safety=setTimeout(finish,5000);
  const stop=()=>{clearTimeout(safety);finish();};
  motion.addEventListener('change',stop,{once:true});
  addEventListener('pagehide',stop,{once:true});
  addEventListener('resize',stop,{once:true});
  addEventListener('keydown',stop,{once:true});
  addEventListener('wheel',stop,{once:true,passive:true});
  document.addEventListener('DOMContentLoaded',async()=>{
    if(finished)return;
    brand=document.querySelector('.site-header .brand');
    if(!brand||scrollY>40||location.hash){stop();return;}
    try{
      const rect=(brand.querySelector('.logo-crop')||brand).getBoundingClientRect();
      overlay=document.createElement('div');overlay.className='site-intro';overlay.setAttribute('aria-hidden','true');
      overlay.style.background=getComputedStyle(document.querySelector('.site-header')).backgroundColor;
      overlay.innerHTML='<div class="intro-halo"><i></i><i></i><i></i></div>';
      overlay.addEventListener('pointerdown',stop);
      flight=document.createElement('div');flight.className='site-header intro-flight';flight.setAttribute('aria-hidden','true');
      const clone=document.createElement('span');clone.className='brand intro-logo-art';
      const artwork=document.createElement('img');artwork.src='/assets/ga-digital-intro-logo.png';artwork.alt='';artwork.width=645;artwork.height=638;clone.append(artwork);flight.append(clone);
      Object.assign(flight.style,{left:rect.left+'px',top:rect.top+'px',width:rect.width+'px',height:rect.height+'px'});
      document.body.append(overlay,flight);brand.classList.add('intro-brand-hidden');
      root.classList.replace('intro-pending','intro-active');
      const scale=Math.min(320/rect.width,(innerWidth-52)/rect.width,(innerHeight*.55)/rect.height);
      const x=innerWidth/2-(rect.left+rect.width/2),y=innerHeight/2-(rect.top+rect.height/2);
      const centre=`translate(${x}px,${y}px) scale(${scale})`;
      flight.style.transform=centre;flight.style.opacity='0';
      const logo=clone.querySelector('img');
      if(logo?.decode)await Promise.race([logo.decode().catch(()=>{}),new Promise(r=>setTimeout(r,400))]);
      if(finished)return;
      const reveal=flight.animate([
        {opacity:0,transform:`translate(${x}px,${y+55}px) scale(${scale*.45}) rotate(-12deg)`,filter:'blur(8px)',offset:0},
        {opacity:1,transform:`translate(${x}px,${y-8}px) scale(${scale*1.08}) rotate(3deg)`,filter:'blur(0px)',offset:.68},
        {opacity:1,transform:centre,filter:'blur(0px)',offset:1}
      ],{duration:1000,easing:'cubic-bezier(.2,.7,.2,1)',fill:'forwards'});animations.push(reveal);await reveal.finished;
      if(finished)return;
      flight.classList.add('intro-shining');
      const pulse=flight.animate([{transform:centre},{transform:`translate(${x}px,${y-7}px) scale(${scale*1.045})`,offset:.5},{transform:centre}],{duration:650,easing:'ease-in-out',fill:'forwards'});animations.push(pulse);await pulse.finished;
      if(finished)return;
      // Reveal the page in sequence while the logo travels to its header position.
      const hero=document.querySelector('.home-hero');
      if(hero){
        const parts=[...hero.querySelectorAll('.hero-copy>.eyebrow,.hero-copy>h1,.hero-copy>p,.hero-copy>.button-group,.hero-copy>.hero-tags')];
        parts.forEach((el,i)=>{const entrance=el.animate([{opacity:0,translate:'0 18px'},{opacity:1,translate:'0 0'}],{duration:480,delay:100+i*70,easing:'cubic-bezier(.2,.7,.2,1)',fill:'backwards'});animations.push(entrance);});
        const photo=hero.querySelector('.hero-photo');
        if(photo){const photoEntrance=photo.animate([{opacity:0,clipPath:'inset(0 0 12% 0)',translate:'0 15px'},{opacity:1,clipPath:'inset(0 0 0% 0)',translate:'0 0'}],{duration:720,delay:180,easing:'cubic-bezier(.2,.7,.2,1)',fill:'backwards'});animations.push(photoEntrance);}
      }
      const fade=overlay.animate([{opacity:1},{opacity:0}],{duration:850,easing:'ease-in-out',fill:'forwards'});animations.push(fade);
      const travel=flight.animate([{transform:centre},{transform:'translate(0,0) scale(1)'}],{duration:1000,easing:'cubic-bezier(.65,0,.25,1)',fill:'forwards'});animations.push(travel);await travel.finished;stop();
    }catch{stop();}
  },{once:true});
})();
