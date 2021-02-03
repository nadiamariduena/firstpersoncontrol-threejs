import React, { Component } from "react";
import * as THREE from "three";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";

//
//
const style = {
  height: 600, // we can control scene size by setting container dimensions
};
let raycaster;
const objects = [];
//----------------
//
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let canJump = false;

let prevTime = performance.now();
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
const vertex = new THREE.Vector3();
const color = new THREE.Color();
/*






  */
class TropicalVoid extends Component {
  componentDidMount() {
    this.sceneSetup();
    this.addCustomSceneObjects();
    this.startAnimationLoop();
    //
    window.addEventListener("resize", this.handleWindowResize);
  }
  //
  //
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowResize);
    window.cancelAnimationFrame(this.requestID);
    // right now with the first person control,
    // we dont need this dispose as it s already included inside the three folder, check the read me, in the
    // beginning you will find a copy of the code inside the threejs that I am using.
    this.controls.dispose();
  }
  /*



  */
  // 1
  sceneSetup = () => {
    // background color scene
    // this.lemonChiffon = "rgb(240, 224, 190)";

    const width = this.eleModelBlOne.clientWidth;
    const height = this.eleModelBlOne.clientHeight;
    //
    this.scene = new THREE.Scene();
    // this.scene.background = new THREE.Color(0xffffff);
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    this.camera.position.y = 10;

    //

    //
    this.renderer = new THREE.WebGL1Renderer({
      // set the transparency of the scene, otherwise its black
      // alpha: true,
      // will make the edges smooth
      antialias: true,
    });
    //
    //
    //

    //
    //renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize(width, height);
    // BG color from the scene
    // this.renderer.setClearColor(this.lemonChiffon);
    this.renderer.shadowMap.enabled = true;
    // here you append it to the jsx
    this.eleModelBlOne.appendChild(this.renderer.domElement); // mount using React ref
    // test
    this.blocker.appendChild(this.renderer.domElement);
    //
    //
    //
    //
    //
    //----------------

    //---------------------------
    //     PointerLockControl
    //---------------------------
    this.controls = new PointerLockControls(this.camera, this.eleModelBlOne);
    //
    //

    this.eleModelBlOne.addEventListener("click", () => {
      this.controls.lock();
    });
    //
    this.controls.addEventListener("lock", () => {
      this.eleModelBlOne.style.display = "none";
      this.blocker.style.display = "none";
    });
    //
    this.controls.addEventListener("unlock", () => {
      this.blocker.style.display = "block";
      this.eleModelBlOne.style.display = "";
    });
    // //
    this.scene.add(this.controls.getObject());
    //
    //
    //
    //-------------------------------
    //             KEYS
    //-------------------------------
    //
    //
    const onKeyDown = function (event) {
      switch (event.code) {
        case "ArrowUp":
        case "KeyW":
          moveForward = true;
          break;

        case "ArrowLeft":
        case "KeyA":
          moveLeft = true;
          break;

        case "ArrowDown":
        case "KeyS":
          moveBackward = true;
          break;

        case "ArrowRight":
        case "KeyD":
          moveRight = true;
          break;

        case "Space":
          if (canJump === true) velocity.y += 350;
          canJump = false;
          break;
      }
    };

    const onKeyUp = function (event) {
      switch (event.code) {
        case "ArrowUp":
        case "KeyW":
          moveForward = false;
          break;

        case "ArrowLeft":
        case "KeyA":
          moveLeft = false;
          break;

        case "ArrowDown":
        case "KeyS":
          moveBackward = false;
          break;

        case "ArrowRight":
        case "KeyD":
          moveRight = false;
          break;
      }
    };
    //
    //
    this.eleModelBlOne.addEventListener("keydown", onKeyDown);
    this.eleModelBlOne.addEventListener("keyup", onKeyUp);
    //

    //
    raycaster = new THREE.Raycaster(
      new THREE.Vector3(),
      new THREE.Vector3(0, -1, 0),
      0,
      10
    );
    //
    //
    //
    //
  };
  //

  /*






  */
  // 2
  addCustomSceneObjects = () => {
    //-------------------------------
    //
    //
    // floor

    let floorGeometry = new THREE.PlaneGeometry(2000, 2000, 100, 100);
    floorGeometry.rotateX(-Math.PI / 2);

    // vertex displacement

    let position = floorGeometry.attributes.position;

    for (let i = 0, l = position.count; i < l; i++) {
      vertex.fromBufferAttribute(position, i);

      vertex.x += Math.random() * 20 - 10;
      vertex.y += Math.random() * 2;
      vertex.z += Math.random() * 20 - 10;

      position.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }

    floorGeometry = floorGeometry.toNonIndexed(); // ensure each face has unique vertices

    position = floorGeometry.attributes.position;
    const colorsFloor = [];

    for (let i = 0, l = position.count; i < l; i++) {
      color.setHSL(
        Math.random() * 0.3 + 0.5,
        0.75,
        Math.random() * 0.25 + 0.75
      );
      colorsFloor.push(color.r, color.g, color.b);
    }

    floorGeometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(colorsFloor, 3)
    );

    const floorMaterial = new THREE.MeshBasicMaterial({ vertexColors: true });

    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    this.scene.add(floor);

    // objects

    const boxGeometry = new THREE.BoxGeometry(20, 20, 20).toNonIndexed();

    position = boxGeometry.attributes.position;
    const colorsBox = [];

    for (let i = 0, l = position.count; i < l; i++) {
      color.setHSL(
        Math.random() * 0.3 + 0.5,
        0.75,
        Math.random() * 0.25 + 0.75
      );
      colorsBox.push(color.r, color.g, color.b);
    }

    boxGeometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(colorsBox, 3)
    );

    for (let i = 0; i < 500; i++) {
      const boxMaterial = new THREE.MeshPhongMaterial({
        specular: 0xffffff,
        flatShading: true,
        vertexColors: true,
      });
      boxMaterial.color.setHSL(
        Math.random() * 0.2 + 0.5,
        0.75,
        Math.random() * 0.25 + 0.75
      );

      const box = new THREE.Mesh(boxGeometry, boxMaterial);
      box.position.x = Math.floor(Math.random() * 20 - 10) * 20;
      box.position.y = Math.floor(Math.random() * 20) * 20 + 10;
      box.position.z = Math.floor(Math.random() * 20 - 10) * 20;

      this.scene.add(box);
      objects.push(box);
    }
    //
    //
    //

    /*
    
    
    
    
    
    
    */
    //---------------------
    //   Directional Light
    //---------------------
    //
    // //
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.autoUpdate = true;
    this.renderer.gammaFactor = 2.2;

    const directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(5, -1, 100);

    // position as follow , the light comes from x:-1000, comes from: y and the last comes from : z
    directionalLight.position.set(1000, 1000, 1000);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera = new THREE.OrthographicCamera(
      -100,
      200,
      -200,
      200,
      0.5,
      5000
    );
    // //
    this.scene.add(directionalLight);
    // The light points to the flat ground
    // this.directionalLight.target = this.plane;  //dont add this
    //
    //
    //THIS LIGHT IS ON THE BOTTOM
    //---------------------
    //     spotLight FF5733
    //---------------------
    //
    //
    //
    //
    // With the light you can see the colors you added to each geometry in the materials
    this.spotLight = new THREE.SpotLight(0xffffff, 0.5); //intensity:   0.5);
    // spotLight.position.set( 0 , 10 , 0 );
    this.spotLight.position.set(5, -50, 0); //x, y , z   original (5, -50, 0);
    // (2, 32, 32); with this settings the light will be on the front
    this.spotLight.castShadow = true;
    //
    // this will remove the shadows
    this.spotLight.visible = true;
    //
    this.scene.add(this.spotLight);
    // //
  };

  // 3
  startAnimationLoop = () => {
    //
    this.requestID = window.requestAnimationFrame(this.startAnimationLoop);

    const time = performance.now();

    if (this.controls.isLocked === true) {
      raycaster.ray.origin.copy(this.controls.getObject().position);
      raycaster.ray.origin.y -= 10;

      const intersections = raycaster.intersectObjects(objects);

      const onObject = intersections.length > 0;

      const delta = (time - prevTime) / 1000;

      velocity.x -= velocity.x * 10.0 * delta;
      velocity.z -= velocity.z * 10.0 * delta;

      velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

      direction.z = Number(moveForward) - Number(moveBackward);
      direction.x = Number(moveRight) - Number(moveLeft);
      direction.normalize(); // this ensures consistent movements in all directions

      if (moveForward || moveBackward)
        velocity.z -= direction.z * 400.0 * delta;
      if (moveLeft || moveRight) velocity.x -= direction.x * 400.0 * delta;

      if (onObject === true) {
        velocity.y = Math.max(0, velocity.y);
        canJump = true;
      }

      this.controls.moveRight(-velocity.x * delta);
      this.controls.moveForward(-velocity.z * delta);

      this.controls.getObject().position.y += velocity.y * delta; // new behavior

      if (this.controls.getObject().position.y < 10) {
        velocity.y = 0;
        this.controls.getObject().position.y = 10;

        canJump = true;
      }
    }

    prevTime = time;

    //
    this.renderer.render(this.scene, this.camera);
  };
  /*



  */
  handleWindowResize = () => {
    const width = this.eleModelBlOne.clientWidth;
    const height = this.eleModelBlOne.clientHeight;
    //
    // updated renderer
    this.renderer.setSize(width, height);
    // updated **camera** aspect ratio
    this.camera.aspect = width / height;
    // That is the Three.js optimization: you can group multiple camera changes into a block with only one
    this.camera.updateProjectionMatrix();
  };
  /*


  */
  render() {
    return (
      <div className="scene-oblivion">
        <div className="blocker" ref={(ref) => (this.blocker = ref)}>
          {/* --------------------- */}
          {/* --------------------- */}
          {/* --------------------- */}
          <div
            onClick={this.handleClick}
            className="modelBleOne"
            style={style}
            ref={(ref) => (this.eleModelBlOne = ref)}
          >
            <span>Click to play</span>
            <br />
            <br />
            Move: WASD
            <br />
            Jump: SPACE
            <br />
            Look: MOUSE
          </div>
          {/* --------------------- */}
          {/* --------------------- */}
        </div>
        {/* --------------------- */}
      </div>
    );
  }
}

export default TropicalVoid;
