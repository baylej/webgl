/**
	3D Shaders.
**/

// Shaders class
function Shaders() {
	this.defLinked = false;
	this.defProgId = 0;
}

// Default vertex shader
Shaders.DEFAULT_VERT_SHADER_PRGM = 
	"#version 100\n" +
	
	"attribute vec3 vx_pos;" + // Vertice
	"attribute vec3 vx_col;" + // Color
	
	"uniform mat4 proj_m4;" +
	"uniform mat4 view_m4;" +
	"uniform mat4 model_m4;" +
	
	"varying vec3 color;" +
	
	"void main()" +
	"{" +
	"	gl_Position = proj_m4 * view_m4 * model_m4 * vec4(vx_pos, 1.0);" +
	"	color = vx_col;" +
	"}";

// Default fragment shader
Shaders.DEFAULT_FRAG_SHADER_PRGM = 
	"#version 100\n" +
	
	"precision mediump int;" +
	"precision mediump float;" +
	
	"varying vec3 color;\n" +
	
	"void main()\n" +
	"{" +
	"	gl_FragColor = vec4(color, 1.0);" +
	"}";

Shaders.prototype.loadDefaultShaders = function() {
	if (this.defLinked) {
		gl.useProgram(this.defProgId);
	}
	else {
		this.defProgId = gl.createProgram();
		gl.bindAttribLocation(this.defProgId, 0, "vx_pos");
		gl.bindAttribLocation(this.defProgId, 1, "vx_col");
		var vertShader = this.loadShader(this.defProgId, gl.VERTEX_SHADER, Shaders.DEFAULT_VERT_SHADER_PRGM); glCheckErr('loadDefaultShaders#1');
		var fragShader = this.loadShader(this.defProgId, gl.FRAGMENT_SHADER, Shaders.DEFAULT_FRAG_SHADER_PRGM); glCheckErr('loadDefaultShaders#2');
		this.linkProgram(this.defProgId); glCheckErr('loadDefaultShaders#3');
		gl.detachShader(this.defProgId, vertShader);
		gl.detachShader(this.defProgId, fragShader);
		gl.deleteShader(vertShader);
		gl.deleteShader(fragShader);
		gl.useProgram(this.defProgId); glCheckErr('loadDefaultShaders#4');
		gl.enableVertexAttribArray(0); // enables vx_pos
		gl.enableVertexAttribArray(1); // enables vx_col
		glCheckErr('loadDefaultShaders#5');
		this.defLinked = true;
	}
}

// Compiles and attaches a Shader into a program
Shaders.prototype.loadShader = function(program, shaderType, source) {
	// Compiles
	var shader = gl.createShader(shaderType);
	gl.shaderSource(shader, source);
	gl.compileShader(shader);

	var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
	if(compiled == gl.FALSE) {
		var msg = gl.getShaderInfoLog(shader);
		gl.deleteShader(shader);
		throw msg;
	}

	// Attaches
	gl.attachShader(program, shader);
	return shader;
}

// Links a program
Shaders.prototype.linkProgram = function(program) {
	gl.linkProgram(program);
	var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
	if (linked == gl.FALSE) {
		var msg = gl.getProgramInfoLog(program);
		gl.deleteProgram(program);
		throw msg;
	}
}