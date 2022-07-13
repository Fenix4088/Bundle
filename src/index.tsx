import ReactDOM from 'react-dom';
import { App } from './components/App';

document.addEventListener('DOMContentLoaded', () => {
  const root: HTMLElement | null = document.getElementById('root');

  ReactDOM.render(<App />, root);
});
