const artwork={
 instagram:'<rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="17.5" cy="6.5" r="1.1"/>',
 facebook:'<path d="M14 22v-9h3l.5-4H14V7c0-1.2.4-2 2-2h2V1.4A25 25 0 0 0 15 1c-3 0-5 1.8-5 5v3H7v4h3v9z"/>',
 x:'<path d="M18.9 2H22l-6.8 7.8L23.2 22H17l-4.9-7.4L5.6 22H2.5l8.2-9.4L1 2h6.4l4.4 6.7L18.9 2Zm-1.1 18h1.7L6.5 4H4.7l13.1 16Z"/>',
 linkedin:'<path d="M5.4 7.7H1.6V22h3.8V7.7ZM3.5 1.5a2.2 2.2 0 1 0 0 4.4 2.2 2.2 0 0 0 0-4.4ZM22.4 13.4c0-4.3-2.3-6.3-5.3-6.3-2.4 0-3.5 1.3-4.1 2.2V7.7H9.2V22H13v-8c0-2.1 1-3.2 2.7-3.2s2.9 1.1 2.9 3.2v8h3.8v-8.6Z"/>'
};

export const socialIcon=network=>`<svg class="social-icon" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">${artwork[network]}</svg>`;

export const socialProfiles=[
 {network:'instagram',name:'Instagram',url:'https://www.instagram.com/ga_digital__/'},
 {network:'facebook',name:'Facebook',url:'https://www.facebook.com/GADigitalWebWord/'},
 // Add the supplied company URL here when available.
 {network:'x',name:'X',url:null},
 {network:'linkedin',name:'LinkedIn',url:null}
];

export function socialLinks(){
 return `<div class="social-links" role="group" aria-label="Follow GA Digital">${socialProfiles.map(({network,name,url})=>url?`<a class="social-link" href="${url}" target="_blank" rel="noopener noreferrer" aria-label="GA Digital on ${name} (opens in a new tab)" title="${name}">${socialIcon(network)}</a>`:`<span class="social-link social-link-pending" role="img" aria-label="${name} — profile link coming soon" title="${name} — profile link coming soon">${socialIcon(network)}</span>`).join('')}</div>`;
}
