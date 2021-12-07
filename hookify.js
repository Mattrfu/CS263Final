// object code to be injected in first js
var obj = {
  "resolution" : 0,
  "gamut" : 0
}
//

// stat display code to be injected at the end of each js
for (var key in obj){
  console.log(`${key} count: ${obj[key]}`);
}
//

var fs = require('fs');
var esprima = require('esprima');
var escodegen = require('escodegen');
var estraverse = require('estraverse');

var infile = process.argv[2];
var input = fs.readFileSync(infile, 'utf-8');

var ast = esprima.parse(input);
var blocks = [];
blocks.push(ast.body);

estraverse.traverse(ast, {
  enter: enter,
  leave: leave
});

// add object declaration to beginning
ast.body.unshift(esprima.parse('var obj = {"resolution" : 0, "gamut" : 0}'));

// add stat display code to end
ast.body.push(esprima.parse('for (var key in obj){ console.log(`${key} count: ${obj[key]}`);}'));
var out = escodegen.generate(ast);

console.log("\nProcessed JavaScript:\n")
console.log(out);

function enter(node){
  if (node.type === 'BlockStatement'){
    blocks.push(node.body);
  }
  if (node.type === 'Identifier'){
    if (node.name === 'width'){
      var curblock = blocks[blocks.length - 1];
      var toadd = esprima.parse('obj["resolution"] += 1;').body[0];
      curblock.push(toadd);
    }
  }
  if (node.type === 'TemplateElement'){
    if (node.value.raw === '(color-gamut: '){
      var curblock = blocks[blocks.length - 1];
      var toadd = esprima.parse('obj["gamut"] += 1;').body[0];
      curblock.push(toadd);
    }
  }
}

function leave(node){
  if (node.type === 'BlockStatement'){
    blocks.pop();
  }
}
