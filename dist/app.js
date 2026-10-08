(() => {
  if(location.pathname.replace(/\/$/,'')==='/about/md-message'){location.replace('/about'+location.search+'#director-message');return;}
  const countMotion=matchMedia('(prefers-reduced-motion: reduce)');
  document.querySelectorAll('.impact-strip').forEach(strip=>{
    const counters=[...strip.querySelectorAll('[data-count-to]')];
    const finish=()=>counters.forEach(el=>el.textContent=Number(el.dataset.countTo).toLocaleString('en-IN'));
    if(countMotion.matches||!('IntersectionObserver' in window)){finish();return;}
    const observer=new IntersectionObserver(entries=>{
      if(!entries.some(e=>e.isIntersecting))return;
      observer.disconnect();
      const start=performance.now();
      function tick(now){
        if(countMotion.matches){finish();return;}
        const progress=Math.min((now-start)/1500,1),eased=1-Math.pow(1-progress,3);
        counters.forEach(el=>el.textContent=Math.round(Number(el.dataset.countTo)*eased).toLocaleString('en-IN'));
        if(progress<1)requestAnimationFrame(tick);else finish();
      }
      counters.forEach(el=>el.textContent='0');requestAnimationFrame(tick);
    },{threshold:.25});observer.observe(strip);
  });
  // Layer hover motion over the one-time banner entrance without restarting it.
  const bannerMotion=matchMedia('(prefers-reduced-motion: reduce)'),hoverPointer=matchMedia('(hover: hover) and (pointer: fine)');
  document.querySelectorAll('.inner-hero').forEach(banner=>{
    const shapes=[...banner.querySelectorAll('.banner-art i')];
    let frame=0,active=false,strength=0,last=0;
    const clear=()=>{cancelAnimationFrame(frame);frame=0;strength=0;last=0;shapes.forEach(el=>{el.style.removeProperty('translate');el.style.removeProperty('rotate');});};
    const tick=now=>{
      const dt=last?Math.min(now-last,50):16;last=now;
      strength+=((active?1:0)-strength)*(1-Math.exp(-dt/240));
      if(!active&&strength<.001){clear();return;}
      shapes.forEach((el,i)=>{const t=now/1800+i*1.4;el.style.translate=`${Math.sin(t)*12*strength}px ${Math.cos(t*.8)*9*strength}px`;el.style.rotate=`${Math.sin(t*.6)*7*strength}deg`;});
      frame=requestAnimationFrame(tick);
    };
    banner.addEventListener('pointerenter',()=>{if(bannerMotion.matches||!hoverPointer.matches)return;active=true;if(!frame)frame=requestAnimationFrame(tick);});
    banner.addEventListener('pointerleave',()=>{active=false;});
    bannerMotion.addEventListener('change',()=>{active=false;clear();});
    hoverPointer.addEventListener('change',()=>{active=false;clear();});
    document.addEventListener('visibilitychange',()=>{if(document.hidden){active=false;clear();}});
  });
  const gentleMotion=matchMedia('(prefers-reduced-motion: reduce)');
  const revealAnimations=new Set();
  if('IntersectionObserver' in window){
    const revealObserver=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(!entry.isIntersecting)return;
        revealObserver.unobserve(entry.target);
        if(gentleMotion.matches)return;
        const el=entry.target;
        const index=el.matches('.service-row,.client-tile')?[...el.parentElement.children].indexOf(el)%4:0;
        const animation=el.animate([{opacity:0,translate:'0 16px'},{opacity:1,translate:'0 0'}],{duration:520,delay:index*65,easing:'cubic-bezier(.2,.7,.2,1)',fill:'backwards'});
        revealAnimations.add(animation);animation.onfinish=()=>revealAnimations.delete(animation);
      });
    },{threshold:.12});
    document.querySelectorAll('.section-heading,.faq-layout>div:first-child,.service-row,.client-tile').forEach(el=>revealObserver.observe(el));
    gentleMotion.addEventListener('change',()=>{if(gentleMotion.matches){revealAnimations.forEach(a=>a.cancel());revealAnimations.clear();}});
    document.addEventListener('focusin',()=>{revealAnimations.forEach(a=>a.cancel());revealAnimations.clear();});
  }
  document.querySelectorAll('details').forEach(details=>{
    const summary=details.querySelector('summary');if(!summary)return;
    let animation=null,targetOpen=details.open;
    const settle=()=>{if(animation){animation.cancel();animation=null;}details.open=targetOpen;details.style.removeProperty('height');details.style.removeProperty('overflow');};
    summary.addEventListener('click',event=>{
      if(gentleMotion.matches)return;
      event.preventDefault();
      const start=details.getBoundingClientRect().height;
      targetOpen=animation?!targetOpen:!details.open;
      if(animation)animation.cancel();
      details.open=true;details.style.removeProperty('height');
      const border=parseFloat(getComputedStyle(details).borderTopWidth)+parseFloat(getComputedStyle(details).borderBottomWidth);
      const end=targetOpen?details.getBoundingClientRect().height:summary.getBoundingClientRect().height+border;
      details.style.overflow='hidden';
      animation=details.animate([{height:start+'px'},{height:end+'px'}],{duration:260,easing:'ease-in-out'});
      animation.onfinish=settle;
    });
    gentleMotion.addEventListener('change',()=>{if(gentleMotion.matches&&animation)settle();});
  });
  const profileDialog=document.querySelector('#profile-dialog');
  document.querySelectorAll('[data-profile-pending]').forEach(button=>button.addEventListener('click',()=>{profileDialog.querySelector('[data-profile-name]').textContent=button.dataset.profilePending;profileDialog.showModal();}));
  profileDialog?.addEventListener('click',e=>{if(e.target===profileDialog){const rect=profileDialog.getBoundingClientRect();if(e.clientX<rect.left||e.clientX>rect.right||e.clientY<rect.top||e.clientY>rect.bottom)profileDialog.close();}});
  document.querySelectorAll('.cert-carousel').forEach(carousel=>{
    const track=carousel.querySelector('.cert-track'),pause=carousel.querySelector('[data-cert-pause]'),motion=matchMedia('(prefers-reduced-motion: reduce)');let paused=motion.matches,hovered=false,focused=false,visible=false;
    const update=()=>{pause.textContent=paused?'Resume scrolling':'Pause scrolling';pause.setAttribute('aria-pressed',String(paused));};update();
    pause.addEventListener('click',()=>{paused=!paused;update();});
    carousel.querySelector('[data-cert-prev]').addEventListener('click',()=>{paused=true;update();track.scrollBy({left:-242,behavior:motion.matches?'instant':'smooth'});});
    carousel.querySelector('[data-cert-next]').addEventListener('click',()=>{paused=true;update();track.scrollBy({left:242,behavior:motion.matches?'instant':'smooth'});});
    carousel.addEventListener('mouseenter',()=>hovered=true);carousel.addEventListener('mouseleave',()=>hovered=false);
    carousel.addEventListener('focusin',()=>focused=true);carousel.addEventListener('focusout',e=>{if(!carousel.contains(e.relatedTarget))focused=false;});
    track.addEventListener('touchstart',()=>{paused=true;update();},{passive:true});
    motion.addEventListener('change',e=>{if(e.matches){paused=true;update();}});
    new IntersectionObserver(([entry])=>visible=entry.isIntersecting).observe(carousel);
    setInterval(()=>{if(paused||hovered||focused||!visible||document.hidden)return;const repeat=track.querySelector('[data-cert-copy="1"]');const cycle=repeat.offsetLeft-track.firstElementChild.offsetLeft;track.scrollLeft+=1;if(track.scrollLeft>=cycle)track.scrollLeft-=cycle;},40);
  });
  document.querySelectorAll('[data-office-map]').forEach(map=>{
    const offices=JSON.parse(map.querySelector('.office-map-data').textContent);
    let selected=offices[0].id;
    map.querySelectorAll('[data-office-select]').forEach(button=>button.addEventListener('click',()=>{
      const office=offices.find(o=>o.id===button.dataset.officeSelect);
      if(selected===office.id)return;
      selected=office.id;
      const frame=map.querySelector('.office-street-map');
      frame.src='https://maps.google.com/maps?q='+encodeURIComponent(office.address)+'&ll=22.5,79&z=4&output=embed';
      frame.title=office.city+' office street map';
      map.querySelector('[data-street-title]').textContent=office.city+' \u00b7 '+office.type;
      map.querySelector('[data-street-address]').textContent=office.address;
      map.querySelector('[data-street-directions]').href='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(office.address);
      map.querySelectorAll('[data-office-select]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.officeSelect===selected)));
    }));
  });
  const toggle=document.querySelector('.menu-toggle'),nav=document.querySelector('#main-nav');
  const navTriggers=[...document.querySelectorAll('.nav-trigger')];
  function closeDropdowns(){navTriggers.forEach(b=>{b.setAttribute('aria-expanded','false');document.getElementById(b.getAttribute('aria-controls')).hidden=true;});}
  navTriggers.forEach(button=>button.addEventListener('click',()=>{const open=button.getAttribute('aria-expanded')==='true';closeDropdowns();if(!open){button.setAttribute('aria-expanded','true');document.getElementById(button.getAttribute('aria-controls')).hidden=false;}}));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){const active=navTriggers.find(b=>b.getAttribute('aria-expanded')==='true');if(active){closeDropdowns();active.focus();e.stopImmediatePropagation();}}});
  document.addEventListener('click',e=>{if(!e.target.closest('.nav-group'))closeDropdowns();});
  nav?.addEventListener('focusout',e=>{if(!nav.contains(e.relatedTarget))closeDropdowns();});
  function closeMenu(){closeDropdowns();nav?.classList.remove('is-open');toggle?.setAttribute('aria-expanded','false');}
  nav?.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu();});
  toggle?.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',String(!open));nav.classList.toggle('is-open',!open);});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav?.classList.contains('is-open')){closeMenu();toggle.focus();}});
  document.addEventListener('click',e=>{if(!e.target.closest('.site-header'))closeMenu();});
  matchMedia('(min-width:1051px)').addEventListener('change',e=>{if(e.matches)closeMenu();});

  document.querySelectorAll('[data-filter-group]').forEach(group=>{
    const rows=[...group.querySelectorAll('[data-search]')],search=group.querySelector('[data-search-input]');
    const controls=['category','location','status','type'].map(key=>[key,group.querySelector(`[data-${key}-select]`)]);
    function filter(){const term=(search?.value||'').trim().toLowerCase();let count=0;rows.forEach(row=>{const show=(!term||row.dataset.search.toLowerCase().includes(term))&&controls.every(([key,select])=>!select||select.value==='all'||row.dataset[key]===select.value);row.hidden=!show;if(show)count++;});const empty=group.querySelector('.empty-state');if(empty)empty.hidden=count!==0;const counter=group.querySelector('.result-count');if(counter)counter.textContent=`${count} ${count===1?'notice':'notices'}`;}
    search?.addEventListener('input',filter);controls.forEach(([,select])=>select?.addEventListener('change',filter));
    group.querySelector('.reset-filters')?.addEventListener('click',()=>{if(search)search.value='';controls.forEach(([,select])=>{if(select)select.value='all';});filter();search?.focus();});filter();
  });

  const params=new URLSearchParams(location.search),form=document.querySelector('#enquiry-form');
  if(form){const service=form.elements.service;if([...service.options].some(o=>o.value===params.get('service')))service.value=params.get('service');
    const error=document.querySelector('#form-error'),result=document.querySelector('#form-result');
    form.addEventListener('input',e=>{e.target.removeAttribute('aria-invalid');result.hidden=true;});
    form.addEventListener('submit',async e=>{e.preventDefault();error.hidden=true;result.hidden=true;const fields=[...form.querySelectorAll('input,select,textarea')];fields.forEach(f=>f.removeAttribute('aria-invalid'));const invalid=fields.filter(f=>!f.checkValidity()||(f.required&&f.type!=='checkbox'&&!f.value.trim()));if(invalid.length){invalid.forEach(f=>f.setAttribute('aria-invalid','true'));error.textContent='Please complete all required fields, provide a valid email and phone number, and write a message of at least 20 characters.';error.hidden=false;invalid[0].focus();return;}
      const button=form.querySelector('button[type=submit]');button.disabled=true;button.textContent='Preparing your enquiry…';form.setAttribute('aria-busy','true');
      try{await new Promise(r=>setTimeout(r,350));const data=new FormData(form);const label=service.selectedOptions[0].textContent;const body=`Name: ${data.get('name')}\nCompany: ${data.get('company')}\nDesignation: ${data.get('designation')||'Not supplied'}\nEmail: ${data.get('email')}\nPhone: ${data.get('phone')}\nService: ${label}\n\n${data.get('message')}`;const subject=`Business enquiry — ${label} — ${data.get('company')}`;
      result.replaceChildren();const heading=document.createElement('h3');heading.textContent='Your enquiry is ready to send.';const p=document.createElement('p');p.textContent='Open the draft in your email app, review it, then send it to info@gadigital.in. Nothing has been sent yet.';const link=document.createElement('a');link.className='button';link.textContent='Open email draft ↗';link.href=`mailto:info@gadigital.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;const download=document.createElement('button');download.type='button';download.className='text-link';download.textContent='Download enquiry as text ↓';download.addEventListener('click',()=>{const blob=new Blob([`To: info@gadigital.in\nSubject: ${subject}\n\n${body}`],{type:'text/plain;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='ga-digital-business-enquiry.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});result.append(heading,p,link,download);result.hidden=false;result.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth',block:'nearest'});
      }catch{error.textContent='We could not prepare the draft. Please email info@gadigital.in directly or call 0120-4218525.';error.hidden=false;}finally{button.disabled=false;button.innerHTML='Prepare enquiry <span aria-hidden="true">↗</span>';form.removeAttribute('aria-busy');}
    });
  }
  const application=document.querySelector('#application-job');
  if(application){if([...application.options].some(o=>o.value===params.get('job')))application.value=params.get('job');const update=()=>{const option=application.selectedOptions[0],link=document.querySelector('#original-application'),closed=option.dataset.closed==='true';document.querySelector('#application-guidance').textContent=closed?'The published application deadline has passed. This notice is archived and is not open for application.':'Availability is unconfirmed. Check the vacancy notification and confirm with the company before applying.';link.href=option.dataset.url;link.textContent=closed?'View archived notification ↗':'Open application notice ↗';};application.addEventListener('change',update);update();}
})();
