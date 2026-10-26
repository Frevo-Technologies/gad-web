const esc=value=>String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
export const approvedTestimonials=entries=>entries.filter(entry=>entry.status==='approved'&&entry.approvedAttribution&&entry.approvalReference);
export function testimonialCards(entries,{draft=false}={}){
 return `<div class="testimonial-grid">${entries.map(entry=>`<article class="client-testimonial" id="${esc(entry.id)}">${draft?'<span class="testimonial-status">Draft · awaiting client approval</span>':''}<h3>${esc(entry.organisation)}</h3><blockquote><p>“${esc(entry.quote)}”</p></blockquote><p class="testimonial-attribution">${draft?'<strong>Suggested attribution:</strong> ':''}${esc(draft?entry.suggestedAttribution:entry.approvedAttribution)}</p></article>`).join('')}</div>`;
}
export function testimonialSection(entries){
 const approved=approvedTestimonials(entries);
 return `<section class="wrap section client-feedback-section" id="testimonials"><span class="eyebrow">TESTIMONIALS</span><h2>Client voices.</h2>${approved.length?testimonialCards(approved):'<p>Client testimonials will appear here once approved for sharing.</p>'}<a class="text-link" href="/contact">Speak with our team &nearr;</a></section>`;
}
