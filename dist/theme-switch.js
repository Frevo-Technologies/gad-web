(() => {
  const allowed=['editorial','classic','fresh'];
  const query=new URLSearchParams(location.search).get('theme');
  let saved;try{saved=localStorage.getItem('ga-preview-theme');}catch{}
  const initial=allowed.includes(query)?query:allowed.includes(saved)?saved:'editorial';
  function apply(theme){document.getElementById('editorial-theme').disabled=theme!=='editorial';document.documentElement.dataset.theme=theme;try{localStorage.setItem('ga-preview-theme',theme);}catch{}}
  apply(initial);
  document.addEventListener('DOMContentLoaded',()=>{
    const select=document.getElementById('theme-choice');select.value=initial;
    select.addEventListener('change',()=>{apply(select.value);const url=new URL(location.href);url.searchParams.set('theme',select.value);history.replaceState(null,'',url);});
  });
})();
