import { addCoordInScene, addMovementToMesh } from "./utils.js";

const canvas = document.querySelector("#game-canvas");
const engine = new BABYLON.Engine(canvas, true, { stencil: true }, true);

let cubeSkelet;

const cubeSkeletonScene = function (size) {
	var scene = new BABYLON.Scene(engine);

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

	cubeSkelet = BABYLON.Mesh.CreateLines("cubeSkelet", points, scene);
	cubeSkelet.color = new BABYLON.Color3(0, 0, 0);

    return scene;
}

const cubeScene = cubeSkeletonScene(2);
addMovementToMesh(cubeScene, cubeSkelet);

engine.runRenderLoop(() => {
	cubeScene.render();
})
