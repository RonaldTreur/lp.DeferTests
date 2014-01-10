exports.baseController = 'test';

exports.startHeavy = function() {
	// Start heavy process #1
	Ti.API.info('-Start-');
	
	_.each(_array, task);
	
	Ti.API.info('-End-');
};

$.testWin.open();

function task(i) {
	Ti.API.info('task - defer: '+i);
	_.defer(function() {
		Ti.API.info('task - exec: '+i);
		_set[i] = _sha1.hex_sha1(''+i);
	});
}

var _sha1 = require('alloy/sha1'),
	_array = _.range(600),
	_set = {};