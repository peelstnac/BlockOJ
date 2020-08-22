import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

library.add(faGithub, faLinkedinIn);

export function loadIcons () {
    dom.i2svg({
        callback: function () {
            console.log('Finished rendering icons');
        }
    });
}

loadIcons();