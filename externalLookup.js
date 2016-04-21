

var edge = require('electron-edge');

var init = function () {
    window.lookupData = edge.func({
        assemblyFile: './WarrantyLookupService/bin/Debug/dnx46/WarrantyLookupService.dll',
        typeName: 'WarrantyLookupService.Startup',
        methodName: 'GetLookupData'
    });
    
     //window.lookupData = edge.func('WarrantyLookupService/bin/Debug/dnx46/WarrantyLookupService.dll');
}

var isDebug = true;

if (isDebug) {
    setTimeout(init, 1000);
}
else {
    init();
}


