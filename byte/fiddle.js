//--- CODE --------------------------
(function (angular) {
    // Create module
    var myApp = angular.module('myApp', []);
    myApp.filter('byte', [function() {
    	return function (bytes) {
      	if (bytes / 1024 < 1) {
        	return bytes + " Byte";
        } 
        
        if (bytes / 1048576 < 1) {
        	return (bytes / 1024) + " kB";
        } 
        
        if (bytes / 1073741824 < 1) {
        	return (bytes / 1048576) + " MB";
        } 
        
        if (bytes / 1099511627776 < 1) {
        	return (bytes / 1073741824) + " GB";
        }
      
      	return (bytes / 1099511627776) + " TB";
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
            expect(filter("byte")(1)).toBe('1 Byte');
        });
        
        it('returns "1 kB"', function () {
            expect(filter("byte")(1024)).toBe('1 kB');
        });
        
        it('returns "1 MB"', function () {
            expect(filter("byte")(1048576)).toBe('1 MB');
        });
        
        it('returns "1 GB"', function () {
            expect(filter("byte")(1073741824)).toBe('1 GB');
        });
        
        it('returns "1 TB"', function () {
            expect(filter("byte")(1099511627776)).toBe('1 TB');
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
