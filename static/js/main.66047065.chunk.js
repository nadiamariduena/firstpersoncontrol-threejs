(this["webpackJsonpfirstperson-control1-threejs"]=this["webpackJsonpfirstperson-control1-threejs"]||[]).push([[0],{36:function(e,n,t){},43:function(e,n,t){"use strict";t.r(n);var a=t(6),o=t(2),r=t.n(o),s=t(24),i=t.n(s),c=(t(36),t(1)),l=t(3),d=t(4),p=t(5),h=t(28),m=t(7),u=t(0),j=t(25),b=t(26),w=t(27),O={height:600},v=function(e){Object(d.a)(t,e);var n=Object(p.a)(t);function t(){var e;Object(c.a)(this,t);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(e=n.call.apply(n,[this].concat(o))).sceneSetup=function(){var n=e.eleModelBlOne.clientWidth,t=e.eleModelBlOne.clientHeight;e.scene=new u.bb,e.camera=new u.S(55,n/t,1,3e4),e.camera.position.x=12,e.camera.position.y=0,e.camera.position.z=0,e.camera.lookAt(e.scene.position),e.renderer=new u.ob({antialias:!0}),e.renderer.setSize(n,t),e.renderer.shadowMap.enabled=!0,e.eleModelBlOne.appendChild(e.renderer.domElement),e.cameraControlsFirstPerson=new j.a(e.camera,e.eleModelBlOne),e.cameraControlsFirstPerson.lookSpeed=.05,e.cameraControlsFirstPerson.movementSpeed=8},e.addCustomSceneObjects=function(){var n=new b.a,t=new w.a;t.setDecoderPath("myDecoder/"),n.setDRACOLoader(t),n.load("./models/palmera-sun-palmeras2_retoucheeeggg.glb",(function(n){e.meshy=n.scene,n.scene.traverse((function(e){e.material&&(e.material.metalness=.08),e.receiveShadow=!0,e.scale.set(2,2,2),e.position.x=0,e.position.y=-.4,e.position.z=0})),e.scene.add(n.scene)}));var a=new u.T(500,500,100,55),o=new u.I({color:14540253,wireframe:!0});e.plane=new u.G(a,o),e.plane.rotation.x=-.5*Math.PI,e.plane.position.y=-1,e.plane.receiveShadow=!0,e.scene.add(e.plane),e.renderer.outputEncoding=u.pb,e.renderer.shadowMap.enabled=!0,e.renderer.shadowMap.autoUpdate=!0,e.renderer.gammaFactor=2.2;var r=new u.j(16777215);r.position.set(5,-1,100),r.position.set(1e3,1e3,1e3),r.castShadow=!0,r.shadow.camera=new u.R(-100,200,-200,200,.5,5e3),e.scene.add(r),e.spotLight=new u.gb(16777215,.5),e.spotLight.position.set(5,-50,0),e.spotLight.castShadow=!0,e.spotLight.visible=!0,e.scene.add(e.spotLight),e.stop=0,e.stepy=0,e.clock=new u.h},e.startAnimationLoop=function(){e.stop+=.005,e.stepy+=5e-5,e.delta=e.clock.getDelta(),e.cameraControlsFirstPerson.update(e.delta),e.renderer.render(e.scene,e.camera),e.requestID=window.requestAnimationFrame(e.startAnimationLoop)},e.handleWindowResize=function(){var n=e.eleModelBlOne.clientWidth,t=e.eleModelBlOne.clientHeight;e.renderer.setSize(n,t),e.camera.aspect=n/t,e.camera.updateProjectionMatrix()},e}return Object(l.a)(t,[{key:"componentDidMount",value:function(){this.sceneSetup(),this.addCustomSceneObjects(),this.startAnimationLoop(),window.addEventListener("resize",this.handleWindowResize)}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.handleWindowResize),window.cancelAnimationFrame(this.requestID)}},{key:"render",value:function(){var e=this;return Object(a.jsx)("div",{className:"scene-oblivion",children:Object(a.jsx)("div",{className:"modelBleOne",style:O,ref:function(n){return e.eleModelBlOne=n}})})}}]),t}(o.Component),f=t(30),g=function(){var e=Object(o.useState)(!1),n=Object(f.a)(e,2),t=n[0],s=n[1];return window.addEventListener("scroll",(function(){s(!0)})),Object(a.jsx)(r.a.Fragment,{children:Object(a.jsx)("div",{className:"back-to-top",children:Object(a.jsxs)("h1",{className:"scrollTop",onClick:function(){window.scrollTo({top:0,behavior:"smooth"})},style:{display:t},children:[" ","Back to top ",Object(a.jsx)("span",{children:"\u27f6 "})]})})})};o.Component;var x=function(){return Object(a.jsx)(r.a.Fragment,{children:Object(a.jsx)("section",{className:"container-section-scene-home",children:Object(a.jsx)("div",{className:"scene-threejs",children:Object(a.jsx)("div",{className:"wrapper-flag-scene-threejs",children:Object(a.jsx)("div",{className:"wrapper-scene-oblivion",children:Object(a.jsx)(v,{})})})})})})},y=function(e){Object(d.a)(t,e);var n=Object(p.a)(t);function t(){return Object(c.a)(this,t),n.apply(this,arguments)}return Object(l.a)(t,[{key:"render",value:function(){return Object(a.jsx)(h.a,{children:Object(a.jsx)("div",{className:"App",children:Object(a.jsx)("div",{id:"wrapper-app",children:Object(a.jsx)(m.c,{children:Object(a.jsx)(m.a,{exact:!0,path:"/",component:x})})})})})}}]),t}(o.Component),S=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,44)).then((function(n){var t=n.getCLS,a=n.getFID,o=n.getFCP,r=n.getLCP,s=n.getTTFB;t(e),a(e),o(e),r(e),s(e)}))};i.a.render(Object(a.jsx)(r.a.StrictMode,{children:Object(a.jsx)(y,{})}),document.getElementById("root")),S()}},[[43,1,2]]]);
//# sourceMappingURL=main.66047065.chunk.js.map