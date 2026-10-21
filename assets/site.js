(() => {
  const button = document.getElementById('language');
  const query = new URLSearchParams(location.search);
  let language = query.get('lang') === 'en' ? 'en' : 'zh';
  function render() {
    document.documentElement.dataset.language = language;
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
    button.textContent = language === 'zh' ? 'English' : '中文';
    document.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href');
      if (/^(index|privacy|about)\.html(?:[?#]|$)/.test(href)) {
        const url = new URL(href, location.href);
        url.searchParams.set('lang', language);
        link.setAttribute('href', url.pathname.split('/').pop() + url.search + url.hash);
      }
    });
  }
  button.hidden = false;
  button.addEventListener('click', () => {
    language = language === 'zh' ? 'en' : 'zh';
    const url = new URL(location.href);
    url.searchParams.set('lang', language);
    history.replaceState(null, '', url);
    render();
  });
  render();
})();
