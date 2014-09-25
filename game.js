// Initialise the WebGL context
function init() {
	gl.clearColor(0.21, 0.21, 0.21, 1.0);
	
	gl.enable(gl.DEPTH_TEST);
	gl.depthFunc(gl.LEQUAL);
	gl.clearDepth(1.0);
	
	// Culling
	gl.enable(gl.CULL_FACE);
	gl.frontFace(gl.CCW);
	
	glCheckErr('init#1');
}

// Game EntryPoint
function main() {
	// Initialise the WebGL context
	init();
	var identity = mat4.create(); mat4.identity(identity);
	var model = mat4.create();
	var camera = new Camera();
	var shaders = new Shaders();
	var c = makeCube();
	var ad = new AxisDrawer(10.);
	
	shaders.loadDefaultShaders();
	var model_mat = gl.getUniformLocation(shaders.defProgId, 'model_m4');
	
	camera.frustum(gl.drawingBufferWidth, gl.drawingBufferHeight, 0.1, 100.0, 45);
	camera.setPosition(-5., -5., -5.);
	camera.setOrientation(Math.PI/5., -Math.PI/4., 0.);
	camera.foenum();
	camera.loadProjectionMatrix(shaders.defProgId);
	camera.loadViewMatrix(shaders.defProgId);
	glCheckErr('main#1');
	
	var step = 0;
	
	var loop = function() {
		gl.clear(gl.DEPTH_BUFFER_BIT);
		gl.clear(gl.COLOR_BUFFER_BIT);
		
		mat4.rotateY(model, identity, 0.005 * step); mat4.rotateX(model, model, 0.002 * step); step++;
		gl.uniformMatrix4fv(model_mat, gl.FALSE, model);
		c.draw();
		
		gl.uniformMatrix4fv(model_mat, gl.FALSE, identity);
		ad.draw();
		
		glCheckErr('main#2');
		requestAnimationFrame(loop); // loops on loop(); 
    };
    loop();
}

try {
	main();
}
catch (msg) {
	console.log(msg);
}
