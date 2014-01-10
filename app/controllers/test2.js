exports.baseController = 'test';

exports.startHeavy = function() {
	// Start heavy process #1
	heavy1();
	
	// Start heavy process #2
	_.defer(heavy2);
};


$.testWin.open();

var _sha1 = require('alloy/sha1'),
	_array = _.range(500),
	_set = {};
	
function heavy1() {
	Ti.API.info('-Start 1-');
	
	_.each(_array, task1);
	
	Ti.API.info('-End 1-');
}

function heavy2() {
	Ti.API.info('-Start 2-');
	
	_.each(_set, task2);
	
	Ti.API.info('-End 2-');
}

function task1(i) {
	_set[i] = _sha1.hex_sha1(''+i);	
}

function task2(crypt, key) {
	_sha1.hex_sha1(crypt+key);
}





