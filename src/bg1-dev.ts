addRefreshScript();
import('./bg1');

function addRefreshScript() {
  const script = document.createElement('script');
  script.type = 'module';
  script.textContent = `
    import RefreshRuntime from '${new URL('./@react-refresh', import.meta.url)}'
    RefreshRuntime.injectIntoGlobalHook(self)
    self.$RefreshReg$ = () => {}
    self.$RefreshSig$ = () => type => type
    self.__vite_plugin_react_preamble_installed__ = true
  `;
  document.head.appendChild(script);
}
