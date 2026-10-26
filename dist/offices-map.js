(() => {
 if(!window.L)return;
 document.querySelectorAll('[data-office-map]').forEach(section=>{
  const container=section.querySelector('[data-all-offices-map]');
  if(!container)return;
  const offices=JSON.parse(section.querySelector('.office-map-data').textContent);
  const map=L.map(container,{scrollWheelZoom:false}).setView([22.5,79],4);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'}).addTo(map);
  const markers=new Map();
  offices.forEach(office=>{
   if(!office.coordinates)return;
   const popup=document.createElement('div'),title=document.createElement('strong'),address=document.createElement('p'),directions=document.createElement('a');
   title.textContent=office.city+' · '+office.type;address.textContent=office.address;
   directions.textContent='Get directions ↗';directions.href='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(office.address);directions.target='_blank';directions.rel='noopener noreferrer';
   popup.append(title,address,directions);
   const marker=L.marker(office.coordinates,{title:office.city+' office',alt:office.city+' office location'}).addTo(map).bindPopup(popup);
   marker.on('click',()=>section.querySelector(`[data-office-select="${office.id}"]`).click());
   markers.set(office.id,marker);
  });
  const showAll=()=>{map.closePopup();map.fitBounds([...markers.values()].map(marker=>marker.getLatLng()),{padding:[35,35],maxZoom:5,animate:false});};
  section.querySelectorAll('[data-office-select]').forEach(button=>button.addEventListener('click',()=>{
   const marker=markers.get(button.dataset.officeSelect);if(!marker)return;
   map.setView(marker.getLatLng(),12,{animate:false});marker.openPopup();
  }));
  section.querySelector('[data-show-all-offices]').addEventListener('click',showAll);
  showAll();new ResizeObserver(()=>map.invalidateSize({animate:false})).observe(container);
 });
})();
