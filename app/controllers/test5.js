exports.baseController = 'test';

exports.processId = 0;

exports.startHeavy = function() {
	// Start heavy process #1
	Ti.API.info('-Start-');
	
	$.processId = PM.process(task, {
		stopOn: false,
		stopAfter: 400,
		done: function(reason, data, options) {
			Ti.API.info('Processing stoppped with reason "' + reason + '" after ' + data.iterations + " executions");
		}
	});
	
	Ti.API.info('-End-');
};

exports.openWindow = function() {
	if ($.processId)
		PM.stop($.processId);
	
	Titanium.UI.createAlertDialog({title:'Dialog', message:'I\'m here!'}).show();
};


$.testWin.open();

function task(state, options) {
	if (!state.i) {
		state.i = 0;
	}
	
	if (state.i >= _array.length)
		return false;
	
	Ti.API.info('task - exec: '+state.i);
	_set[state.i] = _sha1.hex_sha1(''+state.i);
	state.i++;
}

var PM = require('ProcessManager'),
	_sha1 = require('alloy/sha1'),
	_array = _.range(600),
	_set = {};
