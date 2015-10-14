var fs = require('fs');
var async = require('async');
var path = require('path');
var PDFDocument = require('pdfkit');
var wkhtmltopdf = require('wkhtmltopdf');
var request = require('request');
var sizeOf=require('image-size');

// barcode // var url = 'https://rest.sandbox.netsuite.com/app/site/hosting/restlet.nl?script=129&deploy=1';
//var url = "https://rest.sandbox.netsuite.com/app/site/hosting/restlet.nl?script=135&deploy=1";
var url = "https://rest.na1.netsuite.com/app/site/hosting/restlet.nl?script=167&deploy=1";
var url2 = "https://rest.na1.netsuite.com/app/site/hosting/restlet.nl?script=168&deploy=1";

var headers = {
  'Authorization': 'NLAuth nlauth_account=277620,nlauth_email=jake@zake.com,nlauth_signature=@Eldar4242,nlauth_role=3',
  'Content-Type': 'application/json'
}

var list = {};
var dups = [];



function start(){
  var file = fs.readFileSync('NS-Labels-Barcodes-3.csv', 'utf-8');
  var lines = file.split('\r\n');
  async.each(lines, function(line, cb){
    var row = line.split(',');
    var sku = row[0];
    var legacy = row[1];
    var qty = row[2];
    if(legacy != undefined){
      list[legacy] = {sku: sku, qty: qty};
    }
    cb();
  }, function(){
    compare(function(){
      console.log('done');
    });
  });
}

function compare(callback){
  var file = fs.readFileSync('Items381.csv', 'utf-8');
  var lines = file.split('\n');
  async.each(lines, function(line, cb){
    var row = line.split(',');
    var sku = row[0];
    var legacy = row[1];
    if(legacy){
      var info = list[legacy];
      if(info == undefined){
        cb();
      }else{
        if(sku == info.sku){
          cb();
        }else{
          request.post({
            url: url,
            headers: headers,
            body: '"'+sku+'"'
          }, function(err, res, body){
            var parsed = JSON.parse(body);
            async.each(parsed, function(item, cb2){
              console.log(sku, item.id);
              cb2();
              /*request.post({
                url: url2,
                headers: headers,
                body: '"'+item.id+'"'
              }, function(err, res, body){
                if(err) console.log(err);
                console.log(body);
                cb2();
              });*/
            }, function(){
              cb();
            });
          });
        }
      }
    }else{
      cb();
    }
  }, function(){
    callback();
  });
}

/*function start(){
  var file = fs.readFileSync('Items155.csv', 'utf-8');
  var lines = file.split('\n');
  var obj = {};
  async.each(lines, function(line, cb){
    var row = line.split(',');
    var sku = row[1];
    var legacy = row[2];
    var letter = /^[a-zA-Z]/.test(sku);
    if(line.length > 1){
      if(letter){
        cb();
      }else{
        if(legacy.length > 1){
          var ext = sku.split('_');
          var k = ext[0];
          if(obj[k] == undefined){
            obj[k] = [];
            obj[k].push(sku);
            cb();
          }else{
            obj[k].push(sku);
            cb();
          }
        }else{
          cb();
        }
      }
    }else{
      cb();
    }
  }, function(){
    var keys = Object.keys(obj);
    var cl = require('./classToSku.js');
    async.eachSeries(keys, function(key, cb){
      if(obj[key].length > 1){
        var cat = key.split('-')[0];
        var cat2 = cl[cat];
        var i = 1;
        async.eachSeries(obj[key], function(variant, cb2){
          var str = '_'+i;
          var sku = key+str;
          console.log('{"oldID":"'+variant+'", "newID":"'+sku+'", "class":"'+cat2+'"}');
          request.post({
            url: url,
            headers: headers,
            body: '{"oldID":"'+variant+'", "newID":"'+sku+'", "class":"'+cat2+'"}'
          }, function(err, res, body){
            console.log(err, body);
            i++;
            cb2();
          });
        }, function(){
          cb();
        });
      }else{
        cb();
      }
    }, function(){
      console.log('done');
    });
  });
}*/

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


/*function start(){
  request.post({
    url: url,
    headers: headers,
    body: '{"oldID":"808-1443_5", "newID":"240-1443_5", "class":"26"}'
  }, function(err, res, body){
    console.log(err, body);
  });
}*/

/*function start(){
  var key = require('./key.js');
  var classKey = require('./classToSku.js');
  var file = fs.readFileSync('Items292.csv', 'utf-8');
  var lines = file.split('\n');
  var obj = {};
  async.eachSeries(lines, function(line, cb){
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
          var cl = classKey[nSKU[0]];
          var newSKU = nSKU.join('-');
          request.post({
            url: url,
            headers: headers,
            body: '{"oldID":"'+sku+'", "newID":"'+newSKU+'", "class":"'+cl+'"}'
          }, function(err, res, body){
            console.log(err, body);
            cb();
          });
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
