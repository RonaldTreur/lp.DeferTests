function startHeavy() {
	$.startHeavy();
}

function openWindow() {
	$.openWindow();
}

function closeWindow() {
	$.testWin.close();
}

exports.startHeavy = function() {};

exports.openWindow = function() {
	Titanium.UI.createAlertDialog({title:'Dialog', message:'I\'m here!'}).show();
};