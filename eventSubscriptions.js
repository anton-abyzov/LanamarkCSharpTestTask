
var init = function () {
    document.querySelector('#uploadCsv').addEventListener('change', function (e) {
        var files = e.target.files;
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
                    var cells = rows[i].split(",");
                    if (cells[0] == "") continue;
                    lines[i] = { SerialNumber: cells[0] };
                    if (cells.length > 1) {
                        lines[i].MachineType = cells[1]
                    };
                }

                if (window.lookupData != undefined) {
                    lines.forEach(function (element) {
                        
                        window.lookupData(element, function (error, result) {
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
                            }

                        });
                    }, this);
                }
            }
            reader.readAsText(file);

        } else {
            alert("This browser does not support HTML5.");
        }


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

