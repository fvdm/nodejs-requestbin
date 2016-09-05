var requestbin = require ('requestbin');

requestbin.create (false, function (err, data) {
  if (err) {
    console.log (err);
    return;
  }

  console.log ('Send requests to: http://requestb.in/' + data.name);
  console.log ('Inspect requests: http://requestb.in/' + data.name + '?inspect');
});
