var assert = require('assert'),
	giphy = require('./../index')('dc6zaTOxFJmzC');

suite('Giphy api', function () {
	this.timeout(5000);

	test('http request', function (done) {
		giphy._request('patrikring.se', '', function (err, data) {
			if (err) {
				assert.equal(true, false);
			}

			var has_data = false;

			if (data.toString() != '') {
				has_data = true;
			}

			assert.equal(has_data, true);
			done();
		});
	});

	test('Build path', function (done) {
		var path = giphy._buildPath('search', 'foo=bar&b=f');

		assert.equal(path, '/v1/search?api_key=dc6zaTOxFJmzC&foo=bar&b=f');
		done();
	});

	test('Giphy search', function (done) {
		giphy.search('otters', 10, 0, function (err, data) {
			assert.equal(typeof(data), 'object');
			done();
		});
	});

	test('Giphy recent', function (done) {
		giphy.recent('dun', 10, function (err, data) {
			assert.equal(typeof(data), 'object');
			done();
		});
	});
});