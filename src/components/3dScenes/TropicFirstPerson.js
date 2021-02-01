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
    //
    //
    this.camera = new THREE.PerspectiveCamera(
      //
      65, // fov = field of view
      width / height, // aspect ratio
      0.1, // near plane
      1000 // far plane
    );
    //----------------------------------
    //           AXES HELPER
    //----------------------------------
    // This block of code is just to help you to see where you are at in the scene
    // if i add the this.axes, it s going to clash with the dispose inside the
    //
    // const axes = new THREE.AxesHelper(50); //origin 50
    // this.scene.add(axes);
    //
    this.camera.position.x = 40;
    this.camera.position.y = 40;
    this.camera.position.z = 40; // origin: 50
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
    /*
    THIS ERROR 
    
    ./src/components/3dScenes/TropicFirstPerson.js
Attempted import error: 'FirstPersonControls' is not exported from 'three' (imported as 'THREE').

THE SOLUTION:

instead of this:
 this.cameraControlsFirstPerson = new THREE.FirstPersonControls(
   add this: (remove the THREE)

    this.cameraControlsFirstPerson = new FirstPersonControls(

    */
    //

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

    //
    //
    //
    this.renderer.setSize(width, height);
    // BG color from the scene
    // this.renderer.setClearColor(this.lemonChiffon);
    this.renderer.shadowMap.enabled = true;
    // here you append it to the jsx
    this.eleModelBlOne.appendChild(this.renderer.domElement); // mount using React ref
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
    loader.load("./models/columns-rosso/terrain_grosso_columns.glb", (gltf) => {
      this.meshy = gltf.scene;

      gltf.scene.traverse((model) => {
        if (model.material) model.material.metalness = 0.08;

        model.receiveShadow = true;
        model.scale.set(0.8, 0.8, 0.8);
        // model.rotation.y = 1;
        // model.rotation.x += -0;
        // model.rotation.y += 0;
        //
        model.position.x = 20;
        model.position.y = -35;
        model.position.z = -2;
        //
        //
        //
      });

      this.scene.add(gltf.scene);
    });
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
