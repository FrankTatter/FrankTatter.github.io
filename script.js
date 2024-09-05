//import THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
//to allow camera top move
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
//to allow for importing the .gltf file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

//create a three js sceen
const scene = new THREE.Scene();
//create a new camera with positions and angles
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// create a global object
let object;
//orbital controlls
let controls;

//set object to render
let objToRender = "ramenShop";

//instantiate loader for file
const loader = new GLTFLoader();

//load file
loader.load(
    `${objToRender}.glb`,
    function (gltf) {
        //If the file is loaded, add it to the scene
        object = gltf.scene;
        object.scale.set(3,3,3);
        scene.add(object);
    },
    function (xhr) {
        //While it is loading, log the progress
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        //If there is an error, log it
        console.error(error);
    }
);

//Instantiate a new renderer and set its size
const renderer = new THREE.WebGLRenderer({ alpha: false }); //Alpha: true allows for the transparent background
renderer.setSize(window.innerWidth, window.innerHeight);

//Add the renderer to the DOM
document.getElementById("3Dcontainer").appendChild(renderer.domElement);

//Set how far the camera will be from the 3D model
camera.position.z = objToRender === "ramenShop" ? 25 : 500;

//Add lights to the scene, so we can actually see the 3D model

const topLight = new THREE.DirectionalLight(0xFFD06A, 0.5); // (color, intensity)
topLight.position.set(-80, 80, 70) //top-left-ish
topLight.castShadow = true;
scene.add(topLight);

const toppLight = new THREE.DirectionalLight(0xfdf4dc, 0.5); // (color, intensity)
toppLight.position.set(80, -50, 60) //top-left-ish
toppLight.castShadow = true;
scene.add(toppLight);

const ambientLight = new THREE.AmbientLight(0xFFD06A, objToRender === "ramenShop" ? 5 : 1);
scene.add(ambientLight);

//This adds controls to the camera, so we can rotate / zoom it with the mouse
if (objToRender === "ramenShop") {
    controls = new OrbitControls(camera, renderer.domElement);
}

//Render the scene
function animate() {
    requestAnimationFrame(animate);
    //Here we could add some code to update the scene, adding some automatic movement

    //Make the eye move
    if (object && objToRender === "shop") {
        //I've played with the constants here until it looked good 
        object.rotation.y = -3 + mouseX / window.innerWidth * 3;
        object.rotation.x = -1.2 + mouseY * 2.5 / window.innerHeight;
    }
    renderer.render(scene, camera);
}

//Add a listener to the window, so we can resize the window and the camera
window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

//add mouse position listener, so we can make the eye move
// document.onmousemove = (e) => {
//     mouseX = e.clientX;
//     mouseY = e.clientY;
// }

document.body.onkeyup = function(e) {
    if (e.key == " " ||
        e.code == "Space" ||      
        e.keyCode == 32      
    ) {
      console.log(camera.position);
      camera.position.set(2 ,3.3, 5.3);
      camera.rotation.set(-1.5 , 0, 0);
    }
  }

//Start the 3D rendering
animate();