//--- CODE --------------------------
(function (angular) {
    // Create module
    var myApp = angular.module('myApp', []);
    myApp.filter('byte', ['$filter',function($filter) {
    	return function (bytes, presisicion) {
      	if (bytes / 1024 < 1) {
        	return $filter('number')(bytes, presisicion) + " Byte";
        } 
        
        if (bytes / 1048576 < 1) {
        	return $filter('number')((bytes / 1024), presisicion) + " kB";
        } 
        
        if (bytes / 1073741824 < 1) {
        	return $filter('number')((bytes / 1048576), presisicion) + " MB";
        } 
        
        if (bytes / 1099511627776 < 1) {
        	return $filter('number')((bytes / 1073741824), presisicion) + " GB";
        }
      
      	return $filter('number')((bytes / 1099511627776), presisicion) + " TB";
      }    
    }]);
})(angular);



// ---SPECS-------------------------

describe('myApp', function () {
    beforeEach(function () {
        module('myApp');
    });

    describe('CtrlHttp', function () {
    	var filter = null;
    
        beforeEach(inject(function ($filter) {
        	filter = $filter;
        }));

        it('returns "1 Byte"', function () {
            expect(filter("byte")(1, 2)).toBe('1.00 Byte');
        });
        
        it('returns "1.50 kB"', function () {
            expect(filter("byte")(1536, 2)).toBe('1.50 kB');
        });
        
        it('returns "1 MB"', function () {
            expect(filter("byte")(1048576, 2)).toBe('1.00 MB');
        });
        
        it('returns "15.21 kB"', function () {
            expect(filter("byte")(15948544, 2)).toBe('15.21 MB');
        });
        
        it('returns "1 GB"', function () {
            expect(filter("byte")(1073741824, 2)).toBe('1.00 GB');
        });
        
        it('returns "1 TB"', function () {
            expect(filter("byte")(1099511627776, 2)).toBe('1.00 TB');
        });
    });
});

// --- Runner -------------------------
(function () {
    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;

    var htmlReporter = new jasmine.HtmlReporter();

    jasmineEnv.addReporter(htmlReporter);

    jasmineEnv.specFilter = function (spec) {
        return htmlReporter.specFilter(spec);
    };

    var currentWindowOnload = window.onload;

    window.onload = function () {
        if (currentWindowOnload) {
            currentWindowOnload();
        }
        execJasmine();
    };

    function execJasmine() {
        jasmineEnv.execute();
    }

})();
