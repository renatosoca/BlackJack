import './style.css';
import app from './src/todo/app';
import todoStore from './src/store/todo';

todoStore.initStore();

app('#app');
