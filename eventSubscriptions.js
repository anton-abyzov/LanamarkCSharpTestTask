
var init = function () {
    //function to display result from lenovo resource


    // parsing based on format 
    var parseLine = function (line) {
        var cells = line.split(",");
        if (cells[0] == "") return;
        var item = { SerialNumber: cells[0] };
        if (cells.length > 1) {
            item.MachineType = cells[1];
        };
        return item;
    }

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
                    if (lookupItem !== undefined)
                        lines[i] = lookupItem;
                }
                debugger;
                if (window.lookupData !== undefined) {
                    var index = 0;
                    var delay = window.requestPause;
                    var sendRequest = function (index) {
                        if (index === lines.length) return;
                        var element = lines[index];
                        //debugger;
                        var cbResponseReceived = function (error, result) {
                            //debugger;
                            if (error) {
                                console.log("An error occurred when requesting Lenovo Support")
                            }
                            else {
                                var responseText = JSON.parse(result);
                                if (!responseText.IsSucceeded)
                                    console.log(element.SerialNumber + ' error: ' + responseText.Message);
                                else {
                                    console.log(responseText.Data.MachineInfo.serial + ' product:' + responseText.Data.MachineInfo.product + ' status:' + responseText.Data.MachineInfo.status);
                                }
                            };
                        };
                        window.lookupData(element, cbResponseReceived);

                        setTimeout(function () {
                            sendRequest(++index);
                        }, delay);
                    }
                    sendRequest(index);
                }
            }
            reader.readAsText(file);

        } else {
            alert("This browser does not support HTML5.");
        }
    });

    //onclick subscribe for manual input
    $('#manualApply').click(function (e) {
        var inputArr = $('#manualInput')[0].value.split(';');
        if (window.lookupData !== undefined) {
            inputArr.map(function (item) {
                window.lookupData(parseLine(item), cbResponseReceived);
            });
        };
    });

    //setting delay time
    window.requestPause = 0;//default 
    $('#requestPause').on('change', function (e) {
        window.requestPause = $(e.target)[0].value;
    });
}

// workaround to enable debugging, as breakpoint not hit without this delay
var isDebug = true;

if (isDebug) {
    setTimeout(init, 1000);
}
else {
    init();
}

