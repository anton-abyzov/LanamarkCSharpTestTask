
var init = function () {

    //onclick subscribe for fileUploader 
    document.querySelector('#uploadCsv').addEventListener('change', function (e) {
        var files = e.target.files;
        //validation
        if (files.length > 1) {
            alert('Please select only one file');
            return;
        }
        if (files.length === 0) {
            alert('Please select a file');
            return;
        }

        var file = files[0];
        if (!file.name.endsWith('.csv')) {
            alert('Please select a csv file');
            return;
        }

        if (typeof (FileReader) != "undefined") {
            var reader = new FileReader();
            reader.onload = function (e) {
                var rows = e.target.result.split("\n");
                var lines = [];
                for (var i = 0; i < rows.length; i++) {
                    var lookupItem = parseLine(rows[i]);
                    if (lookupItem === undefined) continue;
                    lines[i] = lookupItem;
                }
                if (window.lookupData === undefined) return;
                var index = 0;
                var delay = window.requestPause;
                //recursive function to send with delay if specified
                var sendRequest = function (index) {
                    if (index === lines.length) return;
                    var element = lines[index];

                    window.lookupData(element, function (error, result) {
                        if (error) {
                            console.log("An error occurred when requesting Lenovo Support");
                            return;
                        }                        
                        var response = JSON.parse(result);                        
                        if (!response.IsSucceeded)
                            printNotFound(element.SerialNumber, response);
                        else {
                            printResult(response);
                        };
                    });

                    setTimeout(function () {
                        if (delay !== 0)
                            console.log('paused at ' + js_yyyy_mm_dd_hh_mm_ss() + ' with delay ' + delay);
                        sendRequest(++index);
                    }, delay);
                }
                sendRequest(index);

            }
            reader.readAsText(file);

        } else {
            alert("This browser does not support HTML5.");
        }
    });

    //onclick subscribe for manual input
    $('#manualApply').click(function (e) {
        var inputArr = $('#manualInput')[0].value.split(';');
        if (window.lookupData === undefined) return;
        inputArr.map(function (item) {
            var lookupItem = parseLine(item);            
            window.lookupData(lookupItem, function (error, result) {
                // this callback can't use closures, need to think on how to reuse the same code for output
                if (error) {
                    console.log("An error occurred when requesting Lenovo Support")
                    return;
                }                
                var response = JSON.parse(result);
                if (!response.IsSucceeded)
                    printNotFound(lookupItem.SerialNumber, response);
                else {
                    printResult(response);
                }

            });
        });
    });

    //setting delay time
    window.requestPause = 0;//default 
    $('#requestPause').on('change', function (e) {
        window.requestPause = $(e.target)[0].value;
    });

    var printNotFound = function (serial, response) {
        if (serial && response)
            console.log(serial + ' error: ' + response.Message);
    }

    var printResult = function (response) {
        if (response && response.Data && response.Data.MachineInfo)
            console.log(response.Data.MachineInfo.serial + ' product:' + response.Data.MachineInfo.product + ' status:' + response.Data.MachineInfo.status);
    }

    // parsing based on format 
    var parseLine = function (line) {
        var cells = line.split(",");
        if (cells[0] == "") return;
        var item = { SerialNumber: cells[0], MachineType: '' };
        if (cells.length > 1) {
            item.MachineType = cells[1];
        };
        return item;
    }

    function js_yyyy_mm_dd_hh_mm_ss() {
        now = new Date();
        year = "" + now.getFullYear();
        month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
        day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }
        hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour; }
        minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
        second = "" + now.getSeconds(); if (second.length == 1) { second = "0" + second; }
        millisecond = "" + now.getMilliseconds(); if (millisecond.length == 1) { second = "0" + second; }
        return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second + ":" + millisecond;
    }
}

// workaround to enable debugging, as breakpoint not hit without this delay
var isDebug = true;

if (isDebug) {
    setTimeout(init, 1000);
}
else {
    init();
}

