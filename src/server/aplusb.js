const compile = require('./compile');

var js = `
var lst, a, b;


var repeat_end = Number(window.prompt());
for (var count = 0; count < repeat_end; count++) {
  lst = window.prompt().split(' ');
  a = (Number((lst[0])));
  b = (Number((lst.slice(-1)[0])));
  console.log(a + b);
}
`;

var problem = {
    number: 1,
    cases: 5
}

compile(js, problem, (verdict) => {
    console.log(verdict);
});