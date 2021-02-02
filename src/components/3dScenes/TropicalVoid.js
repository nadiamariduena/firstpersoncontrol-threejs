import React, { Component } from "react";
import * as THREE from "three";
//
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

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
    this.camera.position.x = -30;
    this.camera.position.y = 35;
    this.camera.position.z = -18; // origin: 50
    //
    this.camera.lookAt(this.scene.position);

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
    // OrbitControls allow a camera to orbit around the object
    // https://threejs.org/docs/#examples/controls/OrbitControls
    this.controls = new OrbitControls(this.camera, this.eleModelBlOne);
    //  ------------- **
    // this.controls.addEventListener("change", render)
    //
    //
    //  to limit zoom distance so that the User
    //  dont zoom out of the specified range

    this.controls.maxDistance = 70;

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
    //
    this.materialArrayCube = [];
    // you need an image for each side
    this.texture_ft = new THREE.TextureLoader().load(
      "./images/serenity_ft.jpg"
    );
    this.texture_bk = new THREE.TextureLoader().load(
      "./images/serenity_bk.jpg"
    );
    this.texture_up = new THREE.TextureLoader().load(
      "./images/serenity_up.jpg"
    );
    this.texture_dn = new THREE.TextureLoader().load(
      "./images/serenity_dn.jpg"
    );
    this.texture_rt = new THREE.TextureLoader().load(
      "./images/serenity_rt.jpg"
    );
    this.texture_lf = new THREE.TextureLoader().load(
      "./images/serenity_lf.jpg"
    );

    this.materialArrayCube.push(
      new THREE.MeshBasicMaterial({
        map: this.texture_ft,
      })
    );
    this.materialArrayCube.push(
      new THREE.MeshBasicMaterial({
        map: this.texture_bk,
      })
    );
    this.materialArrayCube.push(
      new THREE.MeshBasicMaterial({
        map: this.texture_up,
      })
    );
    this.materialArrayCube.push(
      new THREE.MeshBasicMaterial({
        map: this.texture_dn,
      })
    );
    this.materialArrayCube.push(
      new THREE.MeshBasicMaterial({
        map: this.texture_rt,
      })
    );
    this.materialArrayCube.push(
      new THREE.MeshBasicMaterial({
        map: this.texture_lf,
      })
    );
    //
    // Without this the image will be shown to the exterior of the cube
    for (let i = 0; i < 6; i++) this.materialArrayCube[i].side = THREE.BackSide;

    //
    //

    this.skyBoxGeo = new THREE.BoxGeometry(10000, 10000, 10000);
    this.skyBox = new THREE.Mesh(this.skyBoxGeo, this.materialArrayCube);
    this.scene.add(this.skyBox);
    //
    // -----------------------
    //
    // -----------------------

    //
    //
    // ----------------
    //   FLASH Lights             ****
    // ---------------
    // add a bluelight 0x062d89 or red ff0000 or purple b600c7
    // this.flash = new THREE.PointLight(0xfed9ff, 30, 500, 1.7); //1.7 intensity .. 0 is really strong
    // //  You will position it BEHIND a cloud
    // this.flash.position.set(200, 300, 100);
    // // and added it to the scene
    // this.scene.add(this.flash);
    //
    //                           *****
    //
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
    // --------------------
    //  MOUNTAIN White
    // --------------------
    // terrain_grosso_moon.-Normalize-4_.glb
    // 32,5Kb
    //
    loader.load(
      "./models/terrain_grosso/mountain_white_reflexe-normalize-4.glb",
      (gltf) => {
        gltf.scene.traverse((model) => {
          if (model.material) model.material.metalness = 0.08;

          model.receiveShadow = true;
          model.scale.set(2.3, 2.3, 2.3);
          // model.rotation.y = 1;

          //
          model.position.x = 12;
          model.position.y = -8;
          model.position.z = -2;
        });

        this.scene.add(gltf.scene);
      }
    );
    //
    //-----------------------
    // feullage
    //-----------------------
    //feuilles-Normalize-_2.glb
    // 103.7Kb

    loader.load(
      "./models/feuille_green_heart/feuilles_2_with-smoothModifier-smoothShading-and-Subdivisionof1_normalize4.glb",
      (gltf) => {
        gltf.scene.traverse((model) => {
          if (model.material) model.material.metalness = 0.08;

          model.receiveShadow = true;
          // w , h , z (z is going to fill it)
          model.scale.set(1.6, 1.6, 1.6);

          //
          //
          model.rotateX(0 * THREE.Math.DEG2RAD);
          model.rotateY(-180 * THREE.Math.DEG2RAD);
          model.rotateZ(0 * THREE.Math.DEG2RAD);
          //
          model.position.x = 4;
          model.position.y = 8;
          model.position.z = -10;
        });

        this.scene.add(gltf.scene);
      }
    );

    //----------------------
    //   FLOR AZUL
    //-----------------------
    //flower-blau-Normal-4_2.glb       200Kb
    loader.load(
      "./models/flower-blau-tests/flower-blau-Normal-4_2.glb",
      (gltf) => {
        gltf.scene.traverse((model) => {
          if (model.material) model.material.metalness = 0.08;
          model.castShadow = true;
          // w , h , z (z is going to fill it)
          model.scale.set(1.4, 1.4, 1.4);
          // model.rotation.y = 1;
          model.rotation.x += -0.05;
          //
          model.position.x = 3.5;
          model.position.y = 5;
          model.position.z = -5;
        });

        this.scene.add(gltf.scene);
      }
    );
    //

    // --------------------------
    //  YELLOW TREE
    // --------------------------
    // 128,1kb

    loader.load("./models/lemon-tree/lemon-tree_normalize-4.glb", (gltf) => {
      gltf.scene.traverse((model) => {
        if (model.material) model.material.metalness = 0.08;
        model.castShadow = true;
        // w , h , z (z is going to fill it)
        model.scale.set(0.9, 0.9, 0.9);
        // model.rotation.y = 1;
        model.rotation.x += -0.05;
        //
        model.position.x = -2.2;
        model.position.y = -3.2;
        model.position.z = -1;
      });

      this.scene.add(gltf.scene);
    });
    //
    //---------------------
    // Bird Paradiso
    //---------------------
    // 63,9Kb
    //
    loader.load(
      "./models/bird-bleu/bird_with_smoothShading_and_with_smooth-modifier-and_with_compression_default.glb",
      (gltf) => {
        this.bird_paradiso = gltf.scene;
        gltf.scene.traverse((modelStone) => {
          if (modelStone.material) modelStone.material.metalness = 0.02;
          modelStone.receiveShadow = true;
          modelStone.scale.set(0.7, 0.7, 0.7);
          // Rotating mesh by 90 degree in X axis.
          modelStone.rotation.x = Math.PI * 2;
          modelStone.rotation.y += Math.PI / 2;
          modelStone.rotation.z += Math.PI / 2;
          //
          modelStone.position.x = 9;
          modelStone.position.y = 1;
          modelStone.position.z = -6;
        });

        this.scene.add(gltf.scene);
      }
    );
    //
    //
    //
    //
    // --------------------
    //  EGGS FACE
    // --------------------
    //
    //36.9kb
    loader.load("./models/eggs/eggs__normalize3.glb", (gltf) => {
      this.WireFace = gltf.scene;

      gltf.scene.traverse((model) => {
        // start  //
        if (model.material) model.material.metalness = 0.08;
        //
        model.receiveShadow = true;
        model.scale.set(1.2, 1.2, 1.2);
        //
        model.position.x = -8;
        model.position.y = -6;
        model.position.z = 8;
      });

      this.scene.add(gltf.scene);
    });
    //
    // ----------------
    // ear Plant
    // ----------------
    //
    //24.4Kb
    loader.load("./models/eggs/ear-alone-normalize3-.glb", (gltf) => {
      this.WireFace = gltf.scene;

      gltf.scene.traverse((model) => {
        //
        //
        if (model.material) model.material.metalness = 0.08;
        //
        model.receiveShadow = true;
        model.scale.set(3, 3, 3);
        //
        model.position.x = 10.9;
        model.position.y = -3;
        model.position.z = 7.4;
      });

      this.scene.add(gltf.scene);
    });

    //
    //
    //6.1Kb  POOL
    loader.load(
      "./models/eggs/pool-plant_3normalize_powder-pink.glb",
      (gltf) => {
        this.WireFace = gltf.scene;

        gltf.scene.traverse((model) => {
          // start

          //
          if (model.material) model.material.metalness = 0.08;
          //
          model.receiveShadow = true;
          model.scale.set(3, 3, 3);
          //
          model.position.x = 12.9;
          model.position.y = -3;
          model.position.z = 7.4;
        });

        this.scene.add(gltf.scene);
      }
    );
    //
    //
    //ear_pool2-giantblack_trii-norm3.glb
    //
    loader.load(
      "./models/giantFlowerBottom/ear_pool2-giantblack-charbon101010dark_velour_trii-norm3_smoothmodifier-and-subdivision.glb",
      (gltf) => {
        this.WireFace = gltf.scene;

        gltf.scene.traverse((model) => {
          // start

          //
          if (model.material) model.material.metalness = 0.08;
          //
          model.receiveShadow = true;
          model.scale.set(3, 3, 3);
          //
          model.position.x = 12.9;
          model.position.y = -13;
          model.position.z = 7.4;
        });

        this.scene.add(gltf.scene);
      }
    );

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
  };

  // 3
  startAnimationLoop = () => {
    //

    //
    //--------------------
    //
    //--------------------
    //
    // if (this.meshy) {
    // in case  <ou want to animate a model from blender
    // }
    //
    //
    //
    //
    // -----------------------
    // ANIMATE the FlashLight         *****           ****
    // -----------------------
    // if (Math.random() > 0.93 || this.flash.power > 100) {
    //   if (this.flash.power < 100)
    //     this.flash.position.set(
    //       Math.random() * 400,
    //       300 + Math.random() * 200,
    //       100
    //     );
    //   this.flash.power = 50 + Math.random() * 500;
    // }
    //
    //                    *****           ****
    //
    //
    //
    //----------------------------

    this.renderer.render(this.scene, this.camera);
    this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
  };
  /*



  */
  handleWindowResize = () => {
    /*
    Every time that 'resize' event (on top of the page) is being called
    on the window, this function here 'handleWindowResize' is going to be called,
    Sit guesses the camera *aspect* ration and UPDATES it
    
    updateProjectionMatrix(); is useful when making changes to the FRUSTUM, 
    its often CALLED after resizing, because resizing is a CHANGE.
    */
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
