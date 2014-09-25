/**
	3D GL wrapper.
**/
// Checks for WebGL error
// logs the error concatenated with the given `desc` string and throw a new Error
function glCheckErr(desc) {
	var err = gl.getError();
	if (err != gl.NO_ERROR /*&& err != gl.CONTEXT_LOST_WEBGL*/) {
		var msg = 'GL Error ' + err + ' (' + desc + ')';
		throw msg;
	}
}