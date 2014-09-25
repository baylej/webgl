/**
	3D Axis Drawer.
**/

function AxisDrawer(len) {
	var vertices = // [6][3] 
	    [0.0, 0.0, 0.0,  len, 0.0, 0.0,
	     0.0, 0.0, 0.0,  0.0, len, 0.0,
	     0.0, 0.0, 0.0,  0.0, 0.0, len];
	
	var colors = // [6][3]
	    [1.0, 0.0, 0.0,  1.0, 0.0, 0.0,
	     0.0, 1.0, 0.0,  0.0, 1.0, 0.0,
	     0.0, 0.0, 1.0,  0.0, 0.0, 1.0];
	;
	
	// Vertex attributes
	this.verticesVBO = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.verticesVBO);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	
	this.colorsVBO = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.colorsVBO);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
	
	glCheckErr('IndexedMesh#1');
}

AxisDrawer.prototype.draw = function() {
	gl.bindBuffer(gl.ARRAY_BUFFER, this.verticesVBO);
	gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
	
	gl.bindBuffer(gl.ARRAY_BUFFER, this.colorsVBO);
	gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 0, 0);
	
	gl.drawArrays(gl.LINES, 0, 6);
}