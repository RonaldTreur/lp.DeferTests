var Alloy = require('alloy'), 
	_ = Alloy._, 
	Backbone = Alloy.Backbone;
	
	
/**
 * @class ProcessManager
 * 
 * Manages deferred processes
 */
var ProcessManager = _.extend({
	/**
	 * Create a new defered process, using the supplied function
	 * 
	 * @param {Function} fn The function that should be defered
	 * @param {Object} [options] Dictionary containing directions for processing
	 * @param {Mixed} [options.stopOn] Stop processing when fn's execution result equals this value
	 * @param {Number} [option.stopAfter] Stop when fn has executed this many times
	 */
	process: function(fn, options) {
		var id = Ti.Platform.createUUID();
		_processes[id] = {
			fn: fn,
			options: options || {},
			data: {
				iterations: 0,
				state: {}
			}
		};
		
		_process(id);
		
		return id;
	},
	
	/**
	 * Stop a process immediately after the next execution.
	 * 
	 * If the process does not exist, nothing happens.
	 * 
 	 * @param {String} id The unique process ID
	 */
	stop: function(id) {
		var process = _processes[id];
		
		if (process) {
			process.data.stopNow = true;
		}
	},
	
	/**
	 * Clear memory
	 */
	destroy: function() {
		_processes = null;
	}
	
}, Backbone.Events);

var id,
	_processes = {};


/**
 * Process the function just once, and then reschedule if required
 * 
 * @param {String} id The unique process ID
 * @private
 */
function _process(id) {
	var process = _processes[id],
		fn = process.fn,
		options = process.options,
		data = process.data,
		result = fn.call(data.state, options, data);
		
	data.iterations++;
		
	if (_continue(result, data, options))
		_.defer(_process, id);
	else {
		_unregister(id);
		if (options.done) {
			options.done(data.stopped, data, options);
		}
		ProcessManager.trigger('stopped', id, options, data);
	}
}

/**
 * Check if, based on the supplied data, this process should be rescheduled.
 * 
 * @param {Object} result The result from the last execution of process
 * @param {Object} data The data associated with the process
 * @param {Object} options The options originally passed when starting the process
 * @return {Boolean} True if rescheduling is in order, false otherwise
 * @private
 */
function _continue(result, data, options) {
	if (data.stopNow) {
		data.stopped = 'manual';
	} else if (!_.isUndefined(options.stopOn) && result == options.stopOn) {
		data.stopped = 'stopOn';
	} else if (!_.isUndefined(options.stopAfter) && data.iterations >= options.stopAfter) {
		data.stopped = 'stopAfter';
	} else
		return true;
		
	return false;
}

/**
 * Unregister a process
 * 
 * @param {String} id The unique process ID
 * @private
 */
function _unregister(id) {
	delete _processes[id];
}

module.exports = ProcessManager;
