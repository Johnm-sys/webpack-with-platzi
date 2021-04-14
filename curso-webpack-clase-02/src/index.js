import Template from '@templates/Template.js';
import '@style/main.css'
import '@style/variables.scss'

(async function App() {
  const main = null || document.getElementById('main');
  main.innerHTML = await Template();
})();
