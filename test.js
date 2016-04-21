
var init = function () {
    debugger;

    var lines = [1, 2, 5, 4, 9, 3, 4];

    var promise = Promise.resolve();

    // promise = new Promise(function (resolve, reject) {
    //     console.log(lines[0]);
    //     resolve();
    // });

    // promise.then(function () {
    //     return new Promise(function (resolve, reject) {

    //         setTimeout(function () {
    //             console.log('Pause 1');
    //             resolve();
    //         }, 1000);
    //         reject();
    //     });
    // });
    var index = 0;
    var readLine = function (index) {
        if (index === lines.length) return;
        var line = lines[index];

        var cb = function (resp, temp) {
            debugger;
            console.log('done ' + line + index);
        };
        
        var err = function (resp, temp) {
            debugger;
            console.log('er ' + line + index);
        };

        debugger;
        //setTimeout(function () {
        console.log('Sending request ' + index);
        var get = $.get('http://minifootball.by', cb);
        // get.done(cb)//.then(sleep(3000));
        //     .fail(cb);
        //sleep(4000);
        setTimeout(function () {
            index++;
            readLine(index);
        }, 500);

        //}, 3000);

        //return pr; 
        //.then(sleep(3000));       
    }

    readLine(index);


    function sleep(delay) {
        debugger;
        var start = parseInt(new Date().getTime());
        while (
            new Date().getTime() < (start + parseInt(delay))
        );
        console.log('pause');
    }

    var timeout = setTimeout(function () {
        console.log('Pause 1');
    }, 1000);
    debugger;
    //var resps = lines.map(readLine);





    // promise.then(Promise.resolve(
    //         sleep(1000)
    // ));

    // promise.then(function () {
    //     debugger;
    //     console.log(lines[1]);
    // })

}

setTimeout(function () {
    init();
}, 1000);