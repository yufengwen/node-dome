require(['jquery'], function() {
	window.abc = 123;

// require(['jquery'], function () {
	$.fn.hello = function () {
		console.log('hello');
	};
// })
	console.log(9)

    return function(a, b) {
        return a + b;
    }

})

console.log('abc');
