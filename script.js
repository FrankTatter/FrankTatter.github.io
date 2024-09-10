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
camera.position.set(8,11,18);

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

const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.5);
scene.add(ambientLight);

// spot lights

const spotLight1 = new THREE.SpotLight(0xeeaf61, 1, 60, Math.PI / 8, 0);
spotLight1.position.set(-10, 30, 30);
spotLight1.castShadow = true;
const spotLightHelper1 = new THREE.SpotLightHelper(spotLight1);
//scene.add(spotLight1, spotLightHelper1);

const spotLight = new THREE.SpotLight(0xFA5F55, 1, 60, Math.PI / 8, 0);
spotLight.position.set(-20, 30, 30);
spotLight.castShadow = true;
const spotLightHelper = new THREE.SpotLightHelper(spotLight);
//scene.add(spotLight, spotLightHelper);

const spotLight2 = new THREE.SpotLight(0xffffff, 1, 80, Math.PI / 8, 0);
spotLight2.position.set(0, -50, 0);
spotLight2.castShadow = true;
const spotLightHelper2 = new THREE.SpotLightHelper(spotLight2);
//scene.add(spotLight2, spotLightHelper2);

const spotLight3 = new THREE.SpotLight(0xffffff, 1, 80, Math.PI / 8, 0);
spotLight3.position.set(-30, 30, -30);
spotLight3.castShadow = true;
const spotLightHelper3 = new THREE.SpotLightHelper(spotLight3);
//scene.add(spotLight3, spotLightHelper3);

scene.add(spotLight, spotLight1, spotLight2, spotLight3);


//This adds controls to the camera, so we can rotate / zoom it with the mouse
if (objToRender === "ramenShop") {
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.12;
    controls.maxPolarAngle = Math.PI*4/9; 
}

let x;

x=true;
//Render the scene
function animate() {
    requestAnimationFrame(animate);
    if (x) {
        controls.update();
    }
    //controls.update();

    renderer.render(scene, camera);
}

//Add a listener to the window, so we can resize the window and the camera
window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

let obj; 
let newUrl;

function onClick(event) {
    obj = getFirstObjectWithName(event, window, camera, scene);

    // false for not mobile device
    if (obj == "1" ||obj == "2" ||obj == "3" ||obj == "4" ||obj == "5" ||obj == "6" ||obj == "7" ||obj == "8" ||obj == "9"||obj == "aboutMe") {
        console.log(obj);
        newUrl = "https://franktatter.github.io/"+obj+".html"
        window.location.replace(newUrl);
    }
}


function onTouch(event) {
    obj = getFirstObjectWithName(event, window, camera, scene);

    if(obj == "chair3"){
        // true for mobile device
        camera.position.set(2 ,3.3, 5.3);
        camera.rotation.set(-1.5 , 0, 0);
        controls.enabled = false;
    }
}


export function getFirstObjectWithName(event, window, camera, scene){
    
    const raycaster = new THREE.Raycaster();
    const getFirstValue = true;

    const mousePointer = getMouseVector2(event, window);
	const intersections = checkRayIntersections(mousePointer, camera, raycaster, scene, getFirstValue);

    return(intersections[0].object.name);
}

export function getMouseVector2(event, window){
    let mousePointer = new THREE.Vector2()

    mousePointer.x = (event.clientX / window.innerWidth) * 2 - 1;
	mousePointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

    return mousePointer;
}

export function checkRayIntersections(mousePointer, camera, raycaster, scene) {
    raycaster.setFromCamera(mousePointer, camera);

    let intersections = raycaster.intersectObjects(scene.children, true);

    return intersections;
}

if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    document.addEventListener('touchstart', onTouch);
}

document.body.onkeyup = function(e) {
    if (e.key == " " ||
        e.code == "Space" ||      
        e.keyCode == 32      
    ) {
        x=false;
        camera.rotation.set(-1.5 , 0, 0);
        camera.position.set(2 ,3.3, 5.3);
        document.addEventListener('click', onClick);
        controls.enabled = false;
        console.log(camera.position, camera.rotation);
    }

    if (e.keyCode == 27 
    ) {
        x=true;
        document.removeEventListener('click', onClick);
        controls.enabled = true;
    }

    if (e.keyCode == 75
    ) {
        camera.rotation.set(-1.5 , 0, 0);
        console.log("hi");
    }
}

//Start the 3D rendering
animate();
