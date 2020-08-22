// Testing judge
const compile = require('./compile.js');
var py = `
n = int(input())
for i in range(n):
  x = int(input())
  print(x*x)
`
var problem = {
    number: 0,
    cases: 4
}
compile(py, problem, (response) => {
    console.log(response);
    console.log('called once per verdict');
});