

    var edge = require('electron-edge');
    
    
    var init = function() {
         
        window.lookupData = edge.func({
            assemblyFile: './WarrantyLookupService/bin/Debug/dnx46/WarrantyLookupService.dll',
            typeName: 'WarrantyLookupService.Startup',
            methodName: 'GetLookupData'
        });
    }
    
    var isDebug = true; 
          
          if (isDebug){
            setTimeout(init, 1000);
          }
          else{
            init();
          }


