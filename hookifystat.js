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

estraverse.traverse(ast, {
  enter: enter,
  leave: leave
});

for (var key in obj){
  console.log(`${key} count: ${obj[key]}`);
}

function enter(node){
  if (node.type === 'Identifier'){
    if (node.name.includes('height') || node.name.includes('width')){
      obj["resolution"] += 1;
    } else if (node.name.includes('oscpu') || node.name.includes('cpuClass') || node.name.includes('platform')) {
      obj["cpu"] += 1;
    } else if (node.name.includes('deviceMemory')){
      obj["memory"] += 1;
    } else if (node.name.includes('hardwareConcurrency')){
      obj["concurrency"] += 1;
    } else if (node.name.includes('colorDepth')){
      obj["color_depth"] += 1;
    }
  } else if (node.type === 'TemplateElement'){
    if (node.value.raw.includes('color-gamut')){
      obj["gamut"] += 1;
    } else if (node.value.raw.includes('prefers-contrast')){
      obj["contrast"] += 1;
    } else if (node.value.raw.includes('dynamic-range')){
      obj["hdr"] += 1;
    } else if (node.value.raw.includes('inverted-colors')){
      obj["inverted_colors"] += 1;
    }
  }
}

function leave(node){
}
