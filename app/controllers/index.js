
function openTest1(e) {
	openTest(1);
}
function openTest2(e) {
	openTest(2);
}
function openTest3(e) {
	openTest(3);
}
function openTest4(e) {
	openTest(4);
}
function openTest5(e) {
	openTest(5);
}

function openTest(nr) {
	Alloy.createController("test"+nr).getView().open();
}

$.index.open();

