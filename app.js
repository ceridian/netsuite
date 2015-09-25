var fs = require('fs');
var async = require('async');
var path = require('path');
var PDFDocument = require('pdfkit');
var wkhtmltopdf = require('wkhtmltopdf');
var request = require('request');

var url = 'https://rest.sandbox.netsuite.com/app/site/hosting/restlet.nl?script=129&deploy=1';

var headers = {
  'Authorization': 'NLAuth nlauth_account=277620,nlauth_email=jake@zake.com,nlauth_signature=@Eldar4242,nlauth_role=3',
  'Content-Type': 'application/json'
}

var size = [108,72];

function start(){
  request.post({
    url: url,
    headers: headers,
    body: '{"oldID":"808-1443_5", "newID":"270-1443_5"}'
  }, function(err, res, body){
    console.log(err, body);
  });
}

/*function start(){
  var key = require('./key.js');
  var file = fs.readFileSync('Items292.csv', 'utf-8');
  var lines = file.split('\n');
  var obj = {};
  async.each(lines, function(line, cb){
    var row = line.split(',');
    var sku = row[0];
    var legacy = row[1];
    var name = row[2];
    var cat = row[3];
    var desc = row[4];
    var letter = /^[a-zA-Z]/.test(sku);
    if(line.length > 1){
      if(letter){
        cb();
      }else{
        if(legacy.length > 1){
          var oSKU = legacy.split('-');
          var nSKU = sku.split('-');
          var oldCat = oSKU[0];
          var cat2 = key[oldCat];
          if(cat2 == undefined){
            nSKU[0] = '404';
          }else{
            nSKU[0] = cat2;
          }
          var newSKU = nSKU.join('-');

          console.log(newSKU+','+sku);
          cb();
        }else{
          cb();
        }
      }
    }else{
      cb();
    }
  }, function(){
    console.log('done');
  });
}*/

// working on variants
/*var ext = newSKU.split('_');
var k = ext[0];
if(k == undefined){
  obj[newSKU] = newSKU;
  cb()
}else{
  if(obj[k] == undefined){
    obj[k] = [];
    obj[k].push(newSKU);
    cb();
  }else{
    obj[k].push(newSKU);
    cb();
  }
}*/

/*var p = path.join(__dirname, 'imgs', 'AC-DC-UNI-PR-AD150HC.png');
var html = '<html><head></head><body><div>AC-DC-UNI-PR-AD150HC</div><img src="./imgs/AC-DC-UNI-PR-AD150HC.png"></body></html>';
wkhtmltopdf(html).pipe(fs.createWriteStream('test.pdf'));*/

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
