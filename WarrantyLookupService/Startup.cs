using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Security;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;
using RestSharp;

namespace WarrantyLookupService
{
    public class Startup
    {
        public Task<object> GetLookupData(dynamic input)
        {
            var executor = new RestCommandExecutor();

            var lookupData = new Tuple<string, string>(input.SerialNumber, input.MachineType);
            var result = executor.Post(lookupData);

            return result;
        }
    }
}
