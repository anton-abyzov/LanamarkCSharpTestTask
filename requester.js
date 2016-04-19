
(function () {
    "use strict";

    window.processLookups = function (serialNumbers) {
        if (!Array.isArray(serialNumbers) || serialNumbers.length === 0)
            alert("Incorrect parameter: should be not empty array");
        
        function process(lookupItem) {
            var values = lookupItem.split(',');
            var url= 'https://support.lenovo.com/services/by/be/SystemXWarrantyLookup/QueryWarrantyStatus';
            var options = {
                url: url,
                type: 'POST',
                data: 'SerialNumber=' + values[0],// + '&MachineType=' + values[1],
                //data: 'SerialNumber=' + values[0] + '&MachineType=' + values[1],
                headers: { "Content-type": "application/x-www-form-urlencoded; charset=UTF-8" }
            }

            function callback(data) {
               // if (status === 200) {
                    // var response = JSON.parse(responseText);
                    // if (!!response.IsSucceeded) {
                    //     var data = JSON.stringify(response.Data);
                        output(data.MachineInfo.serial + ' ' + data.MachineInfo.type + ' '  + data.ServiceInfoList[0].sdfDesc);
                    // } else {
                    //     output('Has no matching data');
                    // }
                // } else {
                //     output("Error obtaining a lookup. XHR status code: " + status);
                // }
            }

            function output(value) {
                console.log(value);
                // var listView = $('#basicListView')[0].winControl;
                // Lookups.data.push({ title: lookupItem, text: value });
                // var itemList = new WinJS.Binding.List(Lookups.data);
                // listView.itemDataSource = itemList.dataSource;
                // listView.selectionMode = WinJS.UI.SelectionMode.single;
                // listView.tapBehavior = WinJS.UI.TapBehavior.toggleSelect;
            }

            // WinJS.xhr(options).done(
            //     function (result) {
            //         callback(result.responseText, result.status);
            //     },
            //     function (result) {
            //         callback(null, result.status);
            //     }
            // );
            
           $.ajax(options).done( function(value) {
                
                if (value.IsSucceeded){
                    callback(value.Data, value.Message);
                }                
            })
            .fail(function(value){
                debugger;
                callback(null, value.status);
            });
        }

        function sleep(delay) {
            var start = parseInt(new Date().getTime());
            while (
                new Date().getTime() < (start + parseInt(delay))
                );
        }
        
        $.each(serialNumbers, function (index, item) {
            process(item);                
        });
    }
}
)()