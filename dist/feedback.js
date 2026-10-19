(() => {
  const motion=matchMedia('(prefers-reduced-motion: reduce)');
  document.querySelectorAll('.sector-card').forEach(card=>{
    const button=card.querySelector('[data-sector-toggle]');
    const show=open=>{card.classList.toggle('is-flipped',open);button.setAttribute('aria-expanded',String(open));card.querySelector('.sector-front').setAttribute('aria-hidden',String(open));card.querySelector('.sector-back').setAttribute('aria-hidden',String(!open));};
    show(false);
    button.addEventListener('click',()=>show(!card.classList.contains('is-flipped')));
    card.addEventListener('pointerenter',event=>{if(event.pointerType==='mouse')show(true);});
    card.addEventListener('pointerleave',event=>{if(event.pointerType==='mouse'&&!card.contains(document.activeElement))show(false);});
    card.addEventListener('keydown',event=>{if(event.key==='Escape'){show(false);button.focus();}});
  });
  document.querySelectorAll('[data-client-ribbon]').forEach(ribbon=>{
    const windowEl=ribbon.querySelector('.client-ribbon-window'),track=ribbon.querySelector('.client-grid'),button=ribbon.querySelector('[data-ribbon-pause]');
    const original=[...track.children];original.forEach(el=>{const copy=el.cloneNode(true);copy.classList.remove('reveal-pending');copy.setAttribute('aria-hidden','true');copy.dataset.ribbonCopy='true';track.append(copy);});
    let paused=motion.matches,hovered=false,focused=false,visible=false,last=0;
    const update=()=>{button.textContent=paused?'Resume logos':'Pause logos';button.setAttribute('aria-pressed',String(paused));};update();
    button.addEventListener('click',()=>{paused=!paused;update();});
    ribbon.addEventListener('pointerenter',()=>hovered=true);ribbon.addEventListener('pointerleave',()=>hovered=false);
    ribbon.addEventListener('focusin',()=>focused=true);ribbon.addEventListener('focusout',e=>focused=ribbon.contains(e.relatedTarget));
    windowEl.addEventListener('touchstart',()=>{paused=true;update();},{passive:true});
    motion.addEventListener('change',()=>{paused=motion.matches;update();});
    new IntersectionObserver(([entry])=>visible=entry.isIntersecting).observe(ribbon);
    setInterval(()=>{const now=performance.now(),dt=Math.min(now-last,80);last=now;if(paused||hovered||focused||!visible||document.hidden||motion.matches)return;const cycle=track.children[original.length].offsetLeft-track.children[0].offsetLeft;windowEl.scrollLeft+=dt*.04;if(windowEl.scrollLeft>=cycle)windowEl.scrollLeft-=cycle;},25);
  });
})();
// Verification uses the same explicit email-draft model as general enquiries.
document.querySelector('#verification-form')?.addEventListener('submit',event=>{
 event.preventDefault();const form=event.currentTarget;if(!form.reportValidity())return;
 const data=new FormData(form);const lines=[['Requester',data.get('requester')],['Organization',data.get('organization')||'Not supplied'],['Contact email',data.get('email')],['Employee',data.get('employee')],['Status',data.get('status')],['Employee ID',data.get('employeeId')||'Not supplied'],['Details to verify',data.get('details')],['Authorization','Requester confirms they are the employee or have permission.']];
 const body=lines.map(([label,value])=>`${label}: ${value}`).join('\n');
 const result=document.querySelector('#verification-result');result.replaceChildren();
 const note=document.createElement('p');note.textContent='Your request is ready. Open the draft, review it and send it to hr@gadigital.in. Nothing has been sent yet.';
 const link=document.createElement('a');link.className='button';link.textContent='Open email to HR';link.href=`mailto:hr@gadigital.in?subject=${encodeURIComponent('Employment verification - '+data.get('employee'))}&body=${encodeURIComponent(body)}`;
 result.append(note,link);result.hidden=false;
});
