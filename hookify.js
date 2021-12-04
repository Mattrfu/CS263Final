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

var out = escodegen.generate(ast);
console.log(out);

function enter(node){
  if (node.type === 'BlockStatement'){
    blocks.push(node.body);
  }
  if (node.type === 'Identifier'){
    if (node.name === 'width'){
      var curblock = blocks[blocks.length - 1];
      var toadd = esprima.parse('console.log("width extracted");').body[0];
      curblock.push(toadd);
    }
  }
}

function leave(node){
  if (node.type === 'BlockStatement'){
    blocks.pop();
  }
}
