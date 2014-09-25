/**
	3D Geometry + Indexed Mesh Class.
	
	Requires glMatrix (glmatrix.net).
**/

// Class IndexedMesh : (indices, vertices, colors) arrays same size, same index per-vertex. 
function IndexedMesh(ind, vtx, col) {
	this.vtxCount = ind.length;
	
	// Vertex attributes
	this.verticesVBO = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.verticesVBO);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vtx), gl.STATIC_DRAW);
	
	this.colorsVBO = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.colorsVBO);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(col), gl.STATIC_DRAW);
	
	// Binds the index array
	this.indicesVBO = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indicesVBO);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(ind), gl.STATIC_DRAW);
	
	glCheckErr('IndexedMesh#1');
}

IndexedMesh.prototype.draw = function() {
	gl.bindBuffer(gl.ARRAY_BUFFER, this.verticesVBO);
	gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
	
	gl.bindBuffer(gl.ARRAY_BUFFER, this.colorsVBO);
	gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 0, 0);
	
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indicesVBO);
	gl.drawElements(gl.TRIANGLES, this.vtxCount, gl.UNSIGNED_SHORT, 0);
}

// Makes a cube, returns an IndexedMesh
function makeCube() {
	var vertices = [ // [24][3] 
		-0.5, -0.5,  0.5,   0.5, -0.5,  0.5,   0.5,  0.5,  0.5,  -0.5,  0.5,  0.5, 
		-0.5, -0.5, -0.5,  -0.5,  0.5, -0.5,   0.5,  0.5, -0.5,   0.5, -0.5, -0.5, 
		-0.5, -0.5, -0.5,  -0.5, -0.5,  0.5,  -0.5,  0.5,  0.5,  -0.5,  0.5, -0.5, 
		 0.5, -0.5,  0.5,   0.5, -0.5, -0.5,   0.5,  0.5, -0.5,   0.5,  0.5,  0.5, 
		-0.5,  0.5,  0.5,   0.5,  0.5,  0.5,   0.5,  0.5, -0.5,  -0.5,  0.5, -0.5, 
		-0.5, -0.5,  0.5,  -0.5, -0.5, -0.5,   0.5, -0.5, -0.5,   0.5, -0.5,  0.5
	];
	
	var colors = [ // [24][3]
		1., .9, 0.,  1., .9, 0.,  1., .9, 0.,  1., .9, 0., 
		.7, .8, .9,  .7, .8, .9,  .7, .8, .9,  .7, .8, .9, 
		1., .7, .8,  1., .7, .8,  1., .7, .8,  1., .7, .8, 
		.7, 1., .9,  .7, 1., .9,  .7, 1., .9,  .7, 1., .9, 
		0., 1., .5,  0., 1., .5,  0., 1., .5,  0., 1., .5, 
		.5, .8, .9,  .5, .8, .9,  .5, .8, .9,  .5, .8, .9
	];
	
	var indices = [ // [12][3]
		 0,  1,  2,   0,  2,  3, // Face front
		 4,  5,  6,   4,  6,  7, // Face back
		 8,  9, 10,   8, 10, 11, // Face left
		12, 13, 14,  12, 14, 15, // Face right
		16, 17, 18,  16, 18, 19, // Face top
		20, 21, 22,  20, 22, 23  // Face down
	];
	
	return new IndexedMesh(indices, vertices, colors);
}