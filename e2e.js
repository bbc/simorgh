var waitUntil = require('wait-until');

waitUntil()
    .interval(500)
    .times(10)
    .condition(function() {
        return ((lsof -t -i TCP:7080) ? true : false);
    })
    .done(function(result) {
        console.log('hey, done!');
    });
