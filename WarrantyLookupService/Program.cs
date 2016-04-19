using System;
using Newtonsoft.Json.Linq;

namespace WarrantyLookupService
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var startup = new Startup();
            // test scenario
            var result = startup.GetLookupData( new { SerialNumber = "KQZMTV4", MachineType = "7978"});
            var response = result.Result;
            Console.WriteLine(response);
            Console.ReadLine();
        }
    }
}