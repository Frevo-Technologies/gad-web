(() => {
  const allowed=['editorial','classic','fresh'];
  const select=document.getElementById('theme-choice');
  const query=select?new URLSearchParams(location.search).get('theme'):null;
  let saved;try{saved=select?localStorage.getItem('ga-preview-theme-v2'):null;}catch{}
  const initial=allowed.includes(query)?query:allowed.includes(saved)?saved:'fresh';
  function apply(theme){document.getElementById('editorial-theme').disabled=theme!=='editorial';document.documentElement.dataset.theme=theme;try{localStorage.setItem('ga-preview-theme-v2',theme);}catch{}}
  apply(initial);
  document.addEventListener('DOMContentLoaded',()=>{
    if(!select)return;
    select.value=initial;
    select.addEventListener('change',()=>{apply(select.value);const url=new URL(location.href);url.searchParams.set('theme',select.value);history.replaceState(null,'',url);});
  });
})();
