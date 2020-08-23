import { library, dom } from '../@fortawesome/fontawesome-svg-core.js';
import { faUser, faLock } from '../@fortawesome/free-solid-svg-icons.js';
import './component-loader.js';

library.add(faUser, faLock);

export function loadIcons () {
    dom.i2svg({
        callback: function () {
            console.log('Finished rendering icons');
        }
    });
}

loadIcons();