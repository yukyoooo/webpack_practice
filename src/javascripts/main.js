import './reactApp.jsx';
import my from './my.js';
import '../stylesheets/main.scss';

import add from './add.ts';

console.log('webpack!');
my();

console.log(add(3, 9));
