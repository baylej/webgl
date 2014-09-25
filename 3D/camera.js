/**
	3D Camera.
	
	Requires glMatrix (glmatrix.net).
**/

// Camera class
function Camera() {
	this.cam_orient = vec3.fromValues(0, 0, 0); // (alpha, gamma, teta) angles in rads
	this.cam_pos    = vec3.fromValues(0, 0, 0); // (X, Y, Z) position
	
	// Projection Matrix
	this.proj_mat = mat4.create();
	mat4.identity(this.proj_mat);
	// View Matrix
	this.view_mat = mat4.create();
	mat4.identity(this.view_mat);
};

// Set this camera position
Camera.prototype.setPosition = function(x, y, z) {
	vec3.set(this.cam_pos, x, y, z);
}

// Set this camera orientation
Camera.prototype.setOrientation = function(alpha, gamma, teta) {
	vec3.set(this.cam_orient, alpha, gamma, teta);
}

// Computes and store the view matrix for the current values in cam_pos and cam_orient
Camera.prototype.foenum = function() {
	var id_mat = mat4.create(); mat4.identity(id_mat);
	
	var cam_rotX = mat4.create();
	mat4.rotateX(cam_rotX, id_mat, this.cam_orient[0]);
	
	var cam_rotY = mat4.create();
	mat4.rotateY(cam_rotY, id_mat, this.cam_orient[1]);

	var cam_tr = mat4.create();
	mat4.translate(cam_tr, id_mat, this.cam_pos);

	mat4.multiply(id_mat, cam_rotX, cam_rotY);
	mat4.multiply(this.view_mat, id_mat, cam_tr); // view_mat = cam_rotX * cam_rotY * cam_tr
}

// Computes and store the projection matrix for the given parameters, call glViewport also
Camera.prototype.frustum = function(width, height, znear, zfar, fov) {
	//gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
	
	if (height==0) height=1;
	if (width==0)  width=1;
	gl.viewport(0, 0, width, height);

	var ratio = width/height;

	var f = 1./Math.tan(fov * Math.PI/360.);

	this.proj_mat[0]  = f/ratio;
	this.proj_mat[5]  = f;
	this.proj_mat[10] = -(zfar*znear)/(zfar-znear);
	this.proj_mat[11] = -1.;
	this.proj_mat[14] = -2. * zfar * znear / (zfar-znear);
	this.proj_mat[15] = 0.;
}

// Loads the projection matrix in the "proj_m4" uniform mat4 (programmable rendering pipeline)
Camera.prototype.loadProjectionMatrix = function(shaderId) {
	var uid = gl.getUniformLocation(shaderId, 'proj_m4');
	gl.uniformMatrix4fv(uid, gl.FALSE, this.proj_mat);
	glCheckErr('loadProjectionMatrix');
}

// Loads the view matrix in the "view_m4" uniform mat4 (programmable rendering pipeline)
Camera.prototype.loadViewMatrix = function(shaderId) {
	var uid = gl.getUniformLocation(shaderId, 'view_m4');
	gl.uniformMatrix4fv(uid, gl.FALSE, this.view_mat);
	glCheckErr('loadViewMatrix');
}