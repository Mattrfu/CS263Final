// object code to be injected in first js
if (!obj){
  var obj = {
    "resolution" : 0,
    "gamut" : 0,
    "color_depth" : 0,
    "cpu" : 0,
    "contrast" : 0,
    "memory" : 0,
    "concurrency" : 0,
    "hdr" : 0,
    "inverted_colors" : 0,
    "color_depth" : 0
  };
}
//

// stat display code to be injected at the end of each js
//for (var key in obj){
//  console.log(`${key} count: ${obj[key]}`);
//}
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
ast.body.unshift(esprima.parse('if (!obj){ var obj = {"resolution" : 0, "gamut" : 0, "color_depth" : 0, "cpu" : 0, "contrast" : 0, "memory" : 0, "concurrency" : 0, "hdr" : 0, "inverted_colors" : 0, "color_depth" : 0}; };'));

// add stat display code to end
ast.body.push(esprima.parse('for (var key in obj){ console.log(`${key} count: ${obj[key]}`);}'));

var out = escodegen.generate(ast);

//console.log("\nProcessed JavaScript:\n")
console.log(out);

function enter(node){
  if (node.type === 'BlockStatement'){
    blocks.push(node.body);
  }
  var curblock = blocks[blocks.length - 1];

  var toeval = 'curblock.push(toadd);';
  // if inside a function definition, add line before return statement
  if (curblock[curblock.length - 1].type === 'ReturnStatement'){
    toeval = 'curblock.splice(curblock.length - 1, 0, toadd);'
  }

  if (node.type === 'Identifier'){
    if (node.name.includes('height') || node.name.includes('width')){
      var toadd = esprima.parse('obj["resolution"] += 1;').body[0];
      eval(toeval);
    } else if (node.name.includes('oscpu') || node.name.includes('cpuClass') || node.name.includes('platform')) {
      var toadd = esprima.parse('obj["cpu"] += 1;').body[0];
      eval(toeval);
    } else if (node.name.includes('deviceMemory')){
      var toadd = esprima.parse('obj["memory"] += 1;').body[0];
      eval(toeval);
    } else if (node.name.includes('hardwareConcurrency')){
      var toadd = esprima.parse('obj["concurrency"] += 1;').body[0];
      eval(toeval);
    } else if (node.name.includes('colorDepth')){
      var toadd = esprima.parse('obj["color_depth"] += 1;').body[0];
      eval(toeval);
    }
  } else if (node.type === 'TemplateElement'){
    if (node.value.raw.includes('color-gamut')){
      var toadd = esprima.parse('obj["gamut"] += 1;').body[0];
      eval(toeval);
    } else if (node.value.raw.includes('prefers-contrast')){
      var toadd = esprima.parse('obj["contrast"] += 1;').body[0];
      eval(toeval);
    } else if (node.value.raw.includes('dynamic-range')){
      var toadd = esprima.parse('obj["hdr"] += 1;').body[0];
      eval(toeval);
    } else if (node.value.raw.includes('inverted-colors')){
      var toadd = esprima.parse('obj["inverted_colors"] += 1;').body[0];
      eval(toeval);
    }
  }
}

function leave(node){
  if (node.type === 'BlockStatement'){
    blocks.pop();
  }
}
