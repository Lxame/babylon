export function addCoordInScene (scene, size) {
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

export function addMovementToMesh(scene, mesh) {
    scene.onKeyboardObservable.add((kbInfo) => {
        switch (kbInfo.type) {
            case BABYLON.KeyboardEventTypes.KEYDOWN:
                console.log("KEY DOWN: ", kbInfo.event.key);
                switch (kbInfo.event.key) {
                    case "a":
                    case "A":
                        mesh.position.x -= 0.1;
                        break
                    case "d":
                    case "D":
                        mesh.position.x += 0.1;
                    break
                    case "w":
                    case "W":
                        mesh.position.y += 0.1;
                        break
                    case "s":
                    case "S":
                        mesh.position.y -= 0.1;
                        break
                    case "q":
                    case "Q":
                        mesh.position.z -= 0.1;
                        break
                    case "e":
                    case "E":
                        mesh.position.z += 0.1;
                        break                
                }
                break;
            case BABYLON.KeyboardEventTypes.KEYUP:
                console.log("KEY UP: ", kbInfo.event.code);
                break;
        }
    });
}