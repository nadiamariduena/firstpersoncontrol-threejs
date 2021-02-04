import React, { Component } from "react";
import * as THREE from "three";
//
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls";
// import { FirstPersonControls } from "firstpersoncontrols.js";
//
//

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

//
//

const style = {
  height: 600, // we can control scene size by setting container dimensions
};
//

//
//
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
    // this.controls.dispose();
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
    //
    //
    this.camera = new THREE.PerspectiveCamera(
      55, // fov = field of view
      width / height, // aspect ratio
      1, // near plane
      30000 // far plane
    );
    /*
    
    
    original
    
    this.camera = new THREE.PerspectiveCamera(
      //
      25, // fov = field of view
      width / height, // aspect ratio
      0.1, // near plane
      1000 // far plane
    );
    
    
    
    
    
    
    
    
    */
    //----------------------------------
    //           AXES HELPER
    //----------------------------------
    // This block of code is just to help you to see where you are at in the scene
    // if i add the this.axes, it s going to clash with the dispose inside the
    //
    // const axes = new THREE.AxesHelper(50); //origin 50
    // this.scene.add(axes);
    //
    this.camera.position.x = 12;
    this.camera.position.y = 0;
    this.camera.position.z = 0; // origin: 50
    //
    this.camera.lookAt(this.scene.position); //we are looking at the center of the scene(depends of what yoou have in the camera position)

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

    //
    //
    // *************************************
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

    //
    //
    //
    this.renderer.setSize(width, height);
    // BG color from the scene
    // this.renderer.setClearColor(this.lemonChiffon);
    this.renderer.shadowMap.enabled = true;
    // here you append it to the jsx
    this.eleModelBlOne.appendChild(this.renderer.domElement); // mount using React ref

    this.cameraControlsFirstPerson = new FirstPersonControls(
      this.camera,
      this.eleModelBlOne
    );
    // ------------ with this 2 lines , the camera will move really fast, its better to hide it while testing it
    this.cameraControlsFirstPerson.lookSpeed = 0.05; // the speed when you move (without clicking)
    // lookSpeed = 0.02; slow
    // lookSpeed = 1; extremely fast
    this.cameraControlsFirstPerson.movementSpeed = 8; //the speed when you click

    // this.cameraControlsFirstPerson.maxPolarAngle = Math.PI / 2;

    //
    //
    //
    //
  };
  //
  //
  //
  //

  /*






  */
  // 2
  addCustomSceneObjects = () => {
    //----------------------------------
    //         BLENDER  MODELS
    //----------------------------------
    //
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("myDecoder/");
    loader.setDRACOLoader(dracoLoader);

    //
    // terrain_grosso_moon.-Normalize-4_.glb
    // 49,4Kb
    loader.load("./models/palmera-sun-palmeras2_retoucheeeggg.glb", (gltf) => {
      this.meshy = gltf.scene;

      gltf.scene.traverse((model) => {
        if (model.material) model.material.metalness = 0.08;

        model.receiveShadow = true;
        model.scale.set(2, 2, 2);
        // model.rotation.y = 1;
        // model.rotation.x += -0;
        // model.rotation.y += 0;
        //
        model.position.x = 0;
        model.position.y = -0.4;
        model.position.z = 0;
        //
        //
        //
      });

      this.scene.add(gltf.scene);
    });
    //
    // Add PLANE  w , h , segments
    const planeGeometry = new THREE.PlaneGeometry(500, 500, 100, 55);
    const planeMaterial = new THREE.MeshLambertMaterial({
      color: 0xdddddd,
      wireframe: true,
    });
    // var planeMaterial = new THREE.MeshLambertMaterial((color: 0xff0000));
    this.plane = new THREE.Mesh(planeGeometry, planeMaterial);
    //
    this.plane.rotation.x = -0.5 * Math.PI;
    this.plane.position.y = -1;
    //
    //
    // *** RECEIVE SHADOW
    // related to the light and the shadow
    this.plane.receiveShadow = true;
    this.scene.add(this.plane);
    //
    //
    // var box = new THREE.Box3();
    // box.setFromObject(this.plane);
    // //
    // //
    // if (this.camera.position.x > box.max.x) {
    //   this.camera.position.x = box.max.x;
    // }

    // if (this.camera.position.x < box.min.x) {
    //   this.camera.position.x = box.max.x;
    // }

    // if (this.camera.position.z > box.max.z) {
    //   this.camera.position.z = box.max.z;
    // }

    // if (this.camera.position.z < box.min.z) {
    //   this.camera.position.z = box.max.z;
    // }

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
    //

    /*



 
 */
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
        <div
          className="modelBleOne"
          style={style}
          ref={(ref) => (this.eleModelBlOne = ref)}
        ></div>
      </div>
    );
  }
}

export default TropicalVoid;
