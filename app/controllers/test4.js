exports.baseController = 'test';

exports.startHeavy = function() {
	// Start heavy process #1
	Ti.API.info('-Start-');
	
	heavy(0);
	
	Ti.API.info('-End-');
};

$.testWin.open();

function heavy(i) {
	task(i);
	if (i++ < _array.length) {
		Ti.API.info('task - defer: '+i);
		_.defer(heavy, i);
	}		
}

function task(i) {
	Ti.API.info('task - exec: '+i);
	_set[i] = _sha1.hex_sha1(''+i);
}

var _sha1 = require('alloy/sha1'),
	_array = _.range(600),
	_set = {};
