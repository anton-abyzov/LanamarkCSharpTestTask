
var init = function () {
    debugger;

    var add7 = edge.func(function () {/*
	using System.Threading.Tasks;

	public class Startup
	{
		public async Task<object> Invoke(object input)
		{
			return this.Add7((int)input);
		}

		int Add7(int v) 
		{
			return Helper.Add7(v);
		}
	}

	static class Helper
	{
		public static int Add7(int v)
		{
			return v + 7;
		}
	}
*/});

    add7(12, function (error, result) {
        if (error) throw error;
        console.log(result);
    });







	var index = 0;
	debugger;
	var cb = function (error, result) {
		console.log('done');
	};
	var rec = function (index) {
		if (index === 100) return;

		var test = edge.func({
			assemblyFile: './WarrantyLookupService/bin/Debug/dnx46/WarrantyLookupService.dll',
			typeName: 'WarrantyLookupService.Startup',
			methodName: 'GetLookupData'
		});



		test({ "SerialNumber": "KQZMTV4", "MachineType": '7978' }, cb);

		setTimeout(function () {
			rec(++index);
		}, 500);


	}
	rec(0);
	// for (var i = 0; i < 100; i++) {

	// }
}

setTimeout(function () {
    init();
}, 1000);