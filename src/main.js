const canvas = document.querySelector("#game-canvas");
const engine = new BABYLON.Engine(canvas, true, { stencil: true }, true);

const createScene = function () {
    // This creates a basic Babylon Scene object (non-mesh)
    const scene = new BABYLON.Scene(engine);

    // This creates and positions a free camera (non-mesh)
    const camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);

    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    // Our built-in 'sphere' shape.
    //const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2, segments: 32}, scene);

    // Move the sphere upward 1/2 its height
    //sphere.position.y = 1;

    // Our built-in 'ground' shape.
    const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);

    const material = new BABYLON.StandardMaterial("groundMaterial", scene);
    material.diffuseColor = BABYLON.Color3.FromHexString("#97ae3b");
    ground.material = material

    BABYLON.SceneLoader.ImportMeshAsync(
        null,
        "./res/",
        "Market_SecondAge_Level3.gltf",
        scene
    ).then((result) => {
        // const [root] = result.meshes;
        // root.scaling.setAll(5);
    });

    BABYLON.SceneLoader.ImportMeshAsync(
        null,
        "./res/",
        "Adventurer.gltf",
        scene
    ).then((result) => {
        const [root] = result.meshes;
        root.scaling.setAll(0.3);
        result.animationGroups.forEach((ag) => {
            if (ag.name == "Idle") {
                ag.start(true);
            } else {
                ag.stop();
            }
        });
        //root.rotate(BABYLON.Vector3.Up(), Math.PI);
    });

    return scene;
};

function addCoordInScene (scene, size) {
	var axisX = BABYLON.Mesh.CreateLines("axisX", [ 
		new BABYLON.Vector3.Zero(), new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, 0.05 * size, 0), 
		new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, -0.05 * size, 0)
	], scene);
  axisX.color = new BABYLON.Color3(1, 0, 0);
  //var xChar = makeTextPlane("X", "red", size / 10);
  //xChar.position = new BABYLON.Vector3(0.9 * size, -0.05 * size, 0);

  var axisY = BABYLON.Mesh.CreateLines("axisY", [
	  new BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3( -0.05 * size, size * 0.95, 0), 
	  new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3( 0.05 * size, size * 0.95, 0)
  ], scene);
  axisY.color = new BABYLON.Color3(0, 1, 0);
  //var yChar = makeTextPlane("Y", "green", size / 10);
  //yChar.position = new BABYLON.Vector3(0, 0.9 * size, -0.05 * size);

  var axisZ = BABYLON.Mesh.CreateLines("axisZ", [
	  new BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3( 0 , -0.05 * size, size * 0.95),
	  new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3( 0, 0.05 * size, size * 0.95)
  ], scene);
  axisZ.color = new BABYLON.Color3(0, 0, 1);
  //var zChar = makeTextPlane("Z", "blue", size / 10);
  //zChar.position = new BABYLON.Vector3(0, 0.05 * size, 0.9 * size);
}

const coordScene = function () {
	var scene = new BABYLON.Scene(engine);

	//var light = new BABYLON.DirectionalLight("hemi", new BABYLON.Vector3(-1, -1, -1), scene);
    const light1 = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(-1, -1, -1), scene);
    const light2 = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 1), scene);
    light1.intensity = 0.5;
    light2.intensity = 0.5;
	
	var camera = new BABYLON.ArcRotateCamera("camera1",  0, 0, 0, new BABYLON.Vector3(0, 0, 0), scene);
  	camera.setPosition(new BABYLON.Vector3(0, 5, -30));
	camera.attachControl(canvas, true);
	  
	//Create a custom mesh  
	var customMesh = new BABYLON.Mesh("custom", scene);
	
	//Set arrays for positions and indices
	var positions = [-5,  2, -3,
                     -7, -2, -3,
                     -3, -2, -3,
                      5,  2,  3, 
                      7, -2,  3,
                      3, -2,  3];
	var indices = [0, 1, 2, 3, 4, 5];	
	
	//Empty array to contain calculated values
	var normals = [];
	
	var vertexData = new BABYLON.VertexData();
	BABYLON.VertexData.ComputeNormals(positions, indices, normals);

	//Assign positions, indices and normals to vertexData
	vertexData.positions = positions;
	vertexData.indices = indices;
	vertexData.normals = normals;

	//Apply vertexData to custom mesh
	vertexData.applyToMesh(customMesh);
	
	
	/******Display custom mesh in wireframe view to show its creation****************/
	var mat = new BABYLON.StandardMaterial("mat", scene);
	mat.wireframe = true;
	customMesh.material = mat;
	/*******************************************************************************/

    var makeTextPlane = function(text, color, size) {
    	var dynamicTexture = new BABYLON.DynamicTexture("DynamicTexture", 50, scene, true);
    	dynamicTexture.hasAlpha = true;
    	dynamicTexture.drawText(text, 5, 40, "bold 36px Arial", color , "transparent", true);
    	var plane = new BABYLON.Mesh.CreatePlane("TextPlane", size, scene, true);
    	plane.material = new BABYLON.StandardMaterial("TextPlaneMaterial", scene);
    	plane.material.backFaceCulling = false;
    	plane.material.specularColor = new BABYLON.Color3(0, 0, 0);
    	plane.material.diffuseTexture = dynamicTexture;
    	return plane;
    };
	
	// show axis
  	// var showAxis = function(size) { 
    // 	var axisX = BABYLON.Mesh.CreateLines("axisX", [ 
    //   		new BABYLON.Vector3.Zero(), new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, 0.05 * size, 0), 
    //   		new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, -0.05 * size, 0)
    //   	], scene);
    // 	axisX.color = new BABYLON.Color3(1, 0, 0);
    // 	var xChar = makeTextPlane("X", "red", size / 10);
    // 	xChar.position = new BABYLON.Vector3(0.9 * size, -0.05 * size, 0);

    // 	var axisY = BABYLON.Mesh.CreateLines("axisY", [
    //     	new BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3( -0.05 * size, size * 0.95, 0), 
    //     	new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3( 0.05 * size, size * 0.95, 0)
    //     ], scene);
    // 	axisY.color = new BABYLON.Color3(0, 1, 0);
    // 	var yChar = makeTextPlane("Y", "green", size / 10);
    // 	yChar.position = new BABYLON.Vector3(0, 0.9 * size, -0.05 * size);

    // 	var axisZ = BABYLON.Mesh.CreateLines("axisZ", [
    //     	new BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3( 0 , -0.05 * size, size * 0.95),
    //     	new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3( 0, 0.05 * size, size * 0.95)
    //     ], scene);
    // 	axisZ.color = new BABYLON.Color3(0, 0, 1);
    // 	var zChar = makeTextPlane("Z", "blue", size / 10);
    // 	zChar.position = new BABYLON.Vector3(0, 0.05 * size, 0.9 * size);
	// };
	
	// showAxis(1);

	addCoordInScene(scene, 2);
	
	//Label vertices with indices
	var i0 = makeTextPlane("0","black", 1.5);
	i0.position = new BABYLON.Vector3(-5, 2, -3);
	var i1 = makeTextPlane("1","black", 1.5);
	i1.position = new BABYLON.Vector3(-7, -2, -3);
	var i2 = makeTextPlane("2","black", 1.5);
	i2.position = new BABYLON.Vector3(-2.2, -2, -3)
	var i3 = makeTextPlane("3","black", 1.5);
	i3.position = new BABYLON.Vector3(5, 2, 3);
	var i4 = makeTextPlane("4","black", 1.5);
	i4.position = new BABYLON.Vector3(7.7, -2, 3);
	var i5 = makeTextPlane("5","black", 1.5);
	i5.position = new BABYLON.Vector3(3, -2, 3);
	
	
	//Show normals for customMesh
	// var pdata = customMesh.getVerticesData(BABYLON.VertexBuffer.PositionKind);
	// var ndata = customMesh.getVerticesData(BABYLON.VertexBuffer.NormalKind);
	
	// for (var p = 0; p < pdata.length; p += 3) {
	// 		var line = BABYLON.Mesh.CreateLines("lines", [
    //         new BABYLON.Vector3(pdata[p],pdata[p+1],pdata[p+2]),
	// 		new BABYLON.Vector3(pdata[p]+ndata[p]*2,pdata[p+1]+ndata[p+1]*2,pdata[p+2]+ndata[p+2]*2),
	// 		new BABYLON.Vector3(pdata[p]+ndata[p]*2,pdata[p+1]+0.5,pdata[p+2]+ndata[p+2]*1.5),
	// 		new BABYLON.Vector3(pdata[p]+ndata[p]*2,pdata[p+1]-0.5,pdata[p+2]+ndata[p+2]*1.5),
	// 		new BABYLON.Vector3(pdata[p]+ndata[p]*2,pdata[p+1]+ndata[p+1]*2,pdata[p+2]+ndata[p+2]*2)
    //     ], scene);
	// }

    const cube = BABYLON.MeshBuilder.CreateBox("box", {}, scene);
    //BABYLON.MeshBuilder.CreateLines();
    //const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2, segments: 32}, scene);
	const vertexTotal = cube.getTotalVertices();
    const vertixData = cube.getVerticesData(BABYLON.VertexBuffer.PositionKind);
    const indicesMatrix = [];
    const weightMatrix = [];

    // for (let i = 0; i < vertexTotal; i++) {
    //     BABYLON.Vector3.FromArrayToRef(vertixData, 3 * i, vertex);
    //     const y = (vertex.y + sizing.halfHeight);
    //     const skinIndex = Math.floor(y / sizing.segmentHeight);
    //     const skinWeight = (y % sizing.segmentHeight) / sizing.segmentHeight;
    //     indicesMatrix.push(skinIndex, skinIndex + 1, 0, 0);
    //     weightMatrix.push(1 - skinWeight, skinWeight, 0, 0);
    // }

	return scene;
};

const cubeSkeletonScene = function (size) {
	var scene = new BABYLON.Scene(engine);

	//var light = new BABYLON.DirectionalLight("hemi", new BABYLON.Vector3(-1, -1, -1), scene);
    const light1 = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(-1, -1, -1), scene);
    const light2 = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 1), scene);
    light1.intensity = 0.5;
    light2.intensity = 0.5;
	
	var camera = new BABYLON.ArcRotateCamera("camera1",  0, 0, 0, new BABYLON.Vector3(0, 0, 0), scene);
  	camera.setPosition(new BABYLON.Vector3(0, 5, -30));
	camera.attachControl(canvas, true);

	addCoordInScene(scene, 2);

	const cube = BABYLON.MeshBuilder.CreateBox("box", {size: size}, scene);
	cube.isVisible = false;
	const vertexTotal = cube.getTotalVertices("position");
    const vertixData = cube.getVerticesData(BABYLON.VertexBuffer.PositionKind, false, false);
	console.log(vertexTotal);
	console.log(vertixData);

	const pointsArr = [];
	const points = []
	for (let i = 0; i < vertixData.length; i += 3) {
		const v = new BABYLON.Vector3(vertixData[i], vertixData[i + 1], vertixData[i + 2]);
		points.push(v);
	}
	console.log(pointsArr);

	const cubeSkelet = BABYLON.Mesh.CreateLines("cubeSkelet", points, scene);
	cubeSkelet.color = new BABYLON.Color3(0, 0, 0);

    return scene;
}

// const scene = createScene();
// const coord = coordScene();

const cubeScene = cubeSkeletonScene(2);

engine.runRenderLoop(() => {
	cubeScene.render();
})

cubeScene.onKeyboardObservable.add((kbInfo) => {
    switch (kbInfo.type) {
      case BABYLON.KeyboardEventTypes.KEYDOWN:
        console.log("KEY DOWN: ", kbInfo.event.key);
        if (kbInfo.event.key === "w") {
            console.log("WW");
        }
        break;
      case BABYLON.KeyboardEventTypes.KEYUP:
        console.log("KEY UP: ", kbInfo.event.code);
        break;
    }
  });