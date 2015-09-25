var page = require('webpage').create();

page.set('paperSize', {width: '108', height: '72'}, function(){
  page.render('file.pdf', function() {
    console.log('done');
  });
});
