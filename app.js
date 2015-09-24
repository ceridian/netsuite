var fs = require('fs');
var async = require('async');
var path = require('path');
var PDFDocument = require('pdfkit');
var wkhtmltopdf = require('wkhtmltopdf');


var size = [108,72];

function start(){
  var file = fs.readFileSync('cat.csv', 'utf-8');
  var cut = file.split('\r\n');
  var num = 100;
  async.each(cut, function(line, cb){
    console.log(line, num);
    num = num + 10;
    cb();
  }, function(){

  });
}

/*function start(){
  var file = fs.readFileSync('Items292.csv', 'utf-8');
  var lines = file.split('\n');
  async.each(lines, function(line, cb){
    var row = line.split(',');
    var fullSku = row[0];
    var legacy = row[1];
    var name = row[2];
    var cat = row[3];
    var desc = row[4];
    var sku = row[0].slice(0,8);
    var letter = /^[a-zA-Z]/.test(sku);
    if(letter){
      cb();
    }else{
      if(legacy.length > 1){

      }else{

      }
    }
  }, function(){

  });
  /*var p = path.join(__dirname, 'imgs', 'AC-DC-UNI-PR-AD150HC.png');
  var html = '<html><head></head><body><div>AC-DC-UNI-PR-AD150HC</div><img src="./imgs/AC-DC-UNI-PR-AD150HC.png"></body></html>';
  wkhtmltopdf(html).pipe(fs.createWriteStream('test.pdf'));*/
//}

/*function start(){
  var doc = new PDFDocument({size: size});
  var stream = doc.pipe(fs.createWriteStream('test.pdf'));

  doc.fontSize(25)
     .text('Here is some vector graphics...');

  doc.end();

}*/

/*function start(){
  var file = fs.readFileSync('done.csv', 'utf-8');
  var cut = file.split('\r\n');
  async.eachSeries(cut, function(line, cb){
    var row = line.split(',');
    var code = row[0];
    var sku = row[1];
    var desc = row[2];
    var qty = row[3];
    var outfile = path.join(__dirname, 'imgs', sku+'.png');
    console.log(outfile);
    bwipjs.toBuffer({
      bcid: 'code128',
      text: code,
      includetext: true,
      scale: 1
    }, function(err, png){
      if(err){
        console.log(err);
        cb();
      }else{
        fs.writeFile(outfile, png, function(err){
          if(err){
            console.log(err);
            cb();
          }else{
            cb()
          }
        });
      }
    });
  }, function(){
    console.log('done');
  });
}*/

start();
