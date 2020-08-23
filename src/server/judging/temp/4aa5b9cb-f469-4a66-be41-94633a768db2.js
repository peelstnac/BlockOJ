
	  	// INSERT INTO BEGINNING OF EVERY SUBMISSION
	  	const fs = require('fs');
	  	var COMPILE_ln = 0;
	  	var COMPILE_stdin = fs.readFileSync(0, 'utf-8').toString().split(/\r?\n/);
	  	const window = {
			prompt: () => {
				if (COMPILE_ln + 1> COMPILE_ln.length) {
					return '';
				}
      		return COMPILE_stdin[COMPILE_ln++];
      		},
	  	}
	

		var __MD792 = window.prompt();
	  	while(__MD792--) {

  	console.log('Hello, World!');


  	}

  	