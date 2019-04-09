var writeText = require('../index.js');
var fs = require('fs');

// var file = './example/F5lPa5p.jpg';
// var text = 'Wish you were here';
var file = './example/a.png';
var text = 'Please Click Below Text -> Subscribe';
writeText({path: file, text: text,fontSize:32,maxWidth:426,maxHeight:240})
  .then(function(result) {
    // console.log('result', result);
    if(!fs.existsSync('./tmp')){
      fs.mkdirSync('./tmp');
    }
    
    // fs.writeFile('./tmp/F5lPa5p.jpg', result,function(err){
    fs.writeFile('./tmp/a.png', result,function(err){
      if(err){
        console.error(err);
      }else{
        console.log('success');
      }
    });
  })
  .fail(function(err) {
    console.log('error', err);
  });