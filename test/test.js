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
		giphy.search('otters', 10, 0, 'y',function (err, data) {
			assert.equal(typeof(data), 'object');
			done();
		});
	});

	test('Giphy getById', function (done) {
		giphy.getById('feqkVgjJpYtjy', function (err, data) {
			assert.equal(typeof(data), 'object');
			done();
		});
	});

	test('Giphy getByIds', function (done) {
		giphy.getByIds(['feqkVgjJpYtjy', '7rzbxdu0ZEXLy'], function (err, data) {
			assert.equal(typeof(data), 'object');
			done();
		});
	});

	test('Giphy translate', function (done) {
		giphy.translate('superman', function (err, data) {
			assert.equal(typeof(data), 'object');
			done();
		});
	});

	test('Giphy random', function (done) {
		giphy.random('superman', function (err, data) {
			assert.equal(typeof(data), 'object');
			done();
		});
	});

	test('Giphy trending', function (done) {
		giphy.trending(1, function (err, data) {
			assert.equal(typeof(data), 'object');
			done();
		});
	});
});
