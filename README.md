# FIRST PERSON CONTROL 👾

 <br>
  <br>
   <br>
    <br>

#### START by importing the code from the public folder

```javascript
import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls";
```

#### COMMON ERROR

- Since I had no idea how to start with this, I presumed I could simply import the folders from the node modules like I did before, but after watching the tutorial I realized it wasn't required.

##### the error

```javascript
    ./src/components/3dScenes/TropicFirstPerson.js
Attempted import error: 'FirstPersonControls' is not exported from 'three' (imported as 'THREE').

```

<br>

##### the solution

```javascript
//
// instead of this:
this.cameraControlsFirstPerson = new THREE.FirstPersonControls();
//
//
//
//
//add this: (remove the THREE)

this.cameraControlsFirstPerson = new FirstPersonControls();
```

  <br>
  <br>

# 🌵

#### NOW REPLACE the old settings from the the purple rain camera for the following:

```javascript
this.camera.position.x = 40;
this.camera.position.y = 40;
this.camera.position.z = 40; // origin: 50
//
this.camera.lookAt(this.scene.position); //we are looking at the center of the scene(depends of what yoou have in the camera position)
```

   <br>
    <br>

### HIDE the old Orbits controls and the zoom distance

```javascript
this.cameraControlsFirstPerson = new FirstPersonControls(
  this.camera,
  this.eleModelBlOne
);

this.cameraControlsFirstPerson.lookSpeed = 0.05;
this.cameraControlsFirstPerson.movementSpeed = 10;
//

//
//
//-------------- before the first person controls , we had this:
// OrbitControls allow a camera to orbit around the object
// https://threejs.org/docs/#examples/controls/OrbitControls
// this.controls = new OrbitControls(this.camera, this.eleModelBlOne);
//  ------------- **
//
//
//
//  to limit zoom distance so that the User
//  dont zoom out of the specified range

// this.controls.maxDistance = 70;
```

##### DELETE most of the models (leave just 1)

<br>
<br>

### Now add the delta to make it work

- I still dont get what is the concrete logic of the delta, i know that here it s updating something and causing a loop like, but I am confused about the "why " of its use.I just know that if you use the delta with the clock, your animation will never stop from doing what you told it to do, ex: if you want an object to move from top to bottom without ending and with a certain tempo, it will do it.

```javascript
//
    //
    // ------------------ clock
    this.stop = 0;
    this.stepy = 0;
    this.clock = new THREE.Clock();

    //
    //
    //
  };

  // 3
  startAnimationLoop = () => {
    this.stop += 0.005;
    this.stepy += 0.00005;
    this.delta = this.clock.getDelta();
    //
    //
    this.cameraControlsFirstPerson.update(this.delta);
    //
    this.renderer.render(this.scene, this.camera);
    this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
  };
  /*


```

### First result

- Here (in the image) I am clicking to get near the red object.

- to turn, i just have to mouse over the direction i want.

- but its not nice to test it on this object, tomorrow i will create another model where it will be much more easier to check the progress.

[<img src="./src/images/preview_first-setp.gif"/>]()
