// Testing judge
const compile = require('./compile.js');
/*
var py = `
# Blockly uses text_prompt

def text_prompt(msg):
  try:
    return raw_input(msg)
  except NameError:
    return input(msg)

n = int(text_prompt(''))
for i in range(n):
  x = int(text_prompt(''))
  print(x*x)
`
*/
var js = `
var n = Number(window.prompt(''));
for (let i = 0; i < n; i++) {
    var x = Number(window.prompt(''));
    window.alert(x*x);
}
`;

var problem = {
    number: 0,
    cases: 4
}
compile(js, problem, (response) => {
    console.log(response);
    // This callback is called ONCE at the end of judging
});

/*
EACH PROBLEM HAS 1 INPUT FILE: EX. PROBLEM 0 HAS INPUT FILE in/0.txt
SO FORMAT EACH PROBLEM LIKE THIS: "single input will contain T cases" (ie. in program have to loop T times)

EACH PROBLEM CAN HAVE AS MANY TEST CASE FILES: EX. PROBLEM 0 HAS 4 FILES IN test/0/1.txt, ..., test/0/4.txt
*/