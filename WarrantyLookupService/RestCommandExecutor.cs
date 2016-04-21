using System;
using System.Threading.Tasks;
using RestSharp;

namespace WarrantyLookupService
{
    public class RestCommandExecutor
    {
        private const string Url = "https://support.lenovo.com/services/by/be/SystemXWarrantyLookup";
        private const string UrlRpcName = "/QueryWarrantyStatus";

        public Task<object> Post(Tuple<string, string> lookupData)
        {
            var client = new RestClient(Url);
            var request = new RestRequest(UrlRpcName, Method.POST);
            request.AddParameter("SerialNumber", lookupData.Item1);
            //request.AddParameter("MachineType", lookupData.Item2);
            var response = (Task<object>)client.GetContentAsync(request);
            return response;

        }
    }
}