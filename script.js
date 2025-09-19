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
camera.position.set(40,20,-22);

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

const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.75);
scene.add(ambientLight);

//directional light

const DL = new THREE.DirectionalLight(0xeeaf61, 0.5, 80, Math.PI / 8, 0)
DL.position.set(-10, 10, 10);
DL.castShadow = true;
const DLhelper = new THREE.DirectionalLightHelper(DL);
//scene.add(DL, DLhelper);


// spot lights

const spotLight = new THREE.SpotLight(0xFA5F55, 1, 80, Math.PI / 8, 0);
spotLight.position.set(-20, 30, 30);
spotLight.castShadow = true;
const spotLightHelper = new THREE.SpotLightHelper(spotLight);
//scene.add(spotLight, spotLightHelper);

const spotLight1 = new THREE.SpotLight(0xeeaf61, 1, 80, Math.PI / 8, 0);
spotLight1.position.set(-10, 30, 30);
spotLight1.castShadow = true;
const spotLightHelper1 = new THREE.SpotLightHelper(spotLight1);
//scene.add(spotLight1, spotLightHelper1);

const spotLight2 = new THREE.SpotLight(0xffffff, 1, 80, Math.PI / 8, 0);
spotLight2.position.set(0, -50, 0);
spotLight2.castShadow = true;
const spotLightHelper2 = new THREE.SpotLightHelper(spotLight2);
//scene.add(spotLight2, spotLightHelper2);

const spotLight3 = new THREE.SpotLight(0xffffff, 1, 80, Math.PI / 8, 0);
spotLight3.position.set(-26, 26, -26);
spotLight3.castShadow = true;
const spotLightHelper3 = new THREE.SpotLightHelper(spotLight3);
//scene.add(spotLight3, spotLightHelper3);

scene.add(spotLight, spotLight1, spotLight2, spotLight3);

//This adds controls to the camera, so we can rotate / zoom it with the mouse
if (objToRender === "ramenShop") {
    controls = new OrbitControls(camera, renderer.domElement);
    controls.mouseButtons.RIGHT = THREE.MOUSE.ROTATE;
    controls.enableDamping = true;
    controls.dampingFactor = 0.2;
    controls.maxPolarAngle = Math.PI*4/9;
    controls.maxDistance = 50;
    controls.minDistance = 12.5;
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
let posterSelected = false;

function onClick(event) {
    obj = getFirstObjectWithName(event, window, camera, scene);

    if(obj == "Torus004_1"){ 
        // true for mobile device
        x=false;
        gsap.to(camera.position, {x:2.05, y:3.3, z:5.3, duration: 0.5});
        gsap.to(camera.rotation, {x: -1.5, y: 0, z: 0, duration: 0.5, ease:"none"});
        document.addEventListener('click', onClick);
        controls.enabled = false;
    }
    console.log(obj);

    // false for not mobile device
    if ((obj == "wokLogo003_1" ||obj == "woksForDinner001" ||obj == "woksForDinner002"||obj == "woksForDinner003"||obj == "wokLogo003") && x == false) {
        console.log(obj);
        window.location.href='woksForDinner.html?post=bento'
    }
    else if ((obj == "Text006" ||obj == "Text018" ||obj == "Text017"||obj == "cyberThreatAwareness") && x == false) {
        console.log(obj);
        window.location.href='cyberThreatAwareness.html?post=bento'
    }
    else if ((obj == "discoveryEducation" ||obj == "Text005" ||obj == "Text016"||obj == "Text014") && x == false) {
        console.log(obj);
        window.location.href='discoveryEducation.html?post=bento'
    }
    else if ((obj == "aboutMe" ||obj == "Text") && x == false) {
        console.log(obj);
       window.location.href='aboutMe.html?post=bento'
    }
    else if ((obj == "exit" ||obj == "Text008") && x == false) {
        console.log(obj);
        x=true;
        controls.enabled = true;
        gsap.to(camera.position, {x:8, y:11, z:25, duration: 1});
    }
    else if (obj == "poster1" && posterSelected == false) {
        posterSelected = true;
        controls.enabled = false;
        gsap.to(camera.position, {x:0, y:3, z:-16, duration: 0.5});
        gsap.to(camera.rotation, {x:0, y:0, z:0, duration: 0.5});
        gsap.to(scene.children[5].children[32].position, {x:0, y:1, z:-4.5, duration: 1});
        gsap.to(scene.children[5].children[32].rotation, {x:0, y:0, z:0, duration: 1});
    }
    else if (obj == "poster2" && posterSelected == false) {
        posterSelected = true;
        controls.enabled = false;
        gsap.to(camera.position, {x:0, y:3, z:-16, duration: 0.5});
        gsap.to(camera.rotation, {x:0, y:0, z:0, duration: 0.5});
        gsap.to(scene.children[5].children[35].position, {x:0, y:1, z:-4.5, duration: 1});
        gsap.to(scene.children[5].children[35].rotation, {x:0, y:0, z:0, duration: 1});
    }
    else if (obj == "poster3" && posterSelected == false) {
        posterSelected = true;
        controls.enabled = false;
        gsap.to(camera.position, {x:0, y:3, z:-16, duration: 0.5});
        gsap.to(camera.rotation, {x:0, y:0, z:0, duration: 0.5});
        gsap.to(scene.children[5].children[36].position, {x:0, y:1, z:-4.5, duration: 1});
        gsap.to(scene.children[5].children[36].rotation, {x:0, y:0, z:0, duration: 1});
    }
    else if (obj == "binLid" || obj == "bin") {
        gsap.to(scene.children[5].children[25].rotation, {x:0.5, y:1.5707963267948966, z:0, duration: 0.5, ease: "back.out(0.5)"});
        gsap.to(scene.children[5].children[25].rotation, {x:0.006, y:1.5707963267948966, z:0, duration: 1, delay: 0.5, ease: "bounce.out"});
    }
}


function onTouch(event) {
    obj = getFirstObjectWithNameTouch(event, camera, scene);

    if(obj == "Torus004_1"){
        // true for mobile device
        x=false;
        gsap.to(camera.position, {x:2.05, y:4.3, z:5.3, duration: 0.5});
        gsap.to(camera.rotation, {x: -1.5, y: 0, z: 0, duration: 0.5, ease:"none"});
        document.addEventListener('click', onClick);
        controls.enabled = false;
    }
    else if (obj == "poster1" && posterSelected == false) {
        posterSelected=true;
        controls.enabled = false;
        gsap.to(camera.position, {x:0, y:3, z:-16, duration: 0.5});
        gsap.to(camera.rotation, {x:0, y:0, z:0, duration: 0.5});
        gsap.to(scene.children[5].children[32].position, {x:0, y:1, z:-4.5, duration: 1});
        gsap.to(scene.children[5].children[32].rotation, {x:0, y:0, z:0, duration: 1});
    }
    else if (obj == "poster2" && posterSelected == false) {
        posterSelected=true;
        controls.enabled = false;
        gsap.to(camera.position, {x:0, y:3, z:-16, duration: 0.5});
        gsap.to(camera.rotation, {x:0, y:0, z:0, duration: 0.5});
        gsap.to(scene.children[5].children[35].position, {x:0, y:1, z:-4.5, duration: 1});
        gsap.to(scene.children[5].children[35].rotation, {x:0, y:0, z:0, duration: 1});
    }
    else if (obj == "poster3" && posterSelected == false) {
        posterSelected=true;
        controls.enabled = false;
        gsap.to(camera.position, {x:0, y:3, z:-16, duration: 0.5});
        gsap.to(camera.rotation, {x:0, y:0, z:0, duration: 0.5});
        gsap.to(scene.children[5].children[36].position, {x:0, y:1, z:-4.5, duration: 1});
        gsap.to(scene.children[5].children[36].rotation, {x:0, y:0, z:0, duration: 1});
    }
    else if (posterSelected) {
        setTimeout(() => {posterSelected=false;}, 500); 
        controls.enabled = true;
        gsap.to(camera.position, {x:0, y:5, z:-20, duration: 0.5});
        //poster 1
        gsap.to(scene.children[5].children[32].position, {x:1.4462063312530518, y:1.2948734760284424, z:-1.5894981622695923, duration: 0.5});
        gsap.to(scene.children[5].children[32].rotation, {x:0, y:0, z:-0.14900684876465822, duration: 0.5});
        //poster2
        gsap.to(scene.children[5].children[35].position, {x:0.6585921049118042, y:1.4721720218658447, z:-1.5894981622695923, duration: 0.5});
        gsap.to(scene.children[5].children[35].rotation, {x:0, y:0, z:0.2617685261862562, duration: 0.5});
        //poster 3
        gsap.to(scene.children[5].children[36].position, {x:-0.054011255502700806, y:1.0971174240112305, z:-1.5894981622695923, duration: 0.5});
        gsap.to(scene.children[5].children[36].rotation, {x:0, y:0, z:0.006877208719303045, duration: 0.5});
    }
    else if (obj == "binLid" || obj == "bin") {
        gsap.to(scene.children[5].children[25].rotation, {x:0.5, y:1.5707963267948966, z:0, duration: 0.5, ease: "back.out(0.5)"});
        gsap.to(scene.children[5].children[25].rotation, {x:0.006, y:1.5707963267948966, z:0, duration: 1, delay: 0.5, ease: "bounce.out"});
    }
}


export function getFirstObjectWithName(event, window, camera, scene){
    
    const raycaster = new THREE.Raycaster();
    const getFirstValue = true;

    const mousePointer = getMouseVector2(event, window);
	const intersections = checkRayIntersections(mousePointer, camera, raycaster, scene, getFirstValue);


    return(intersections[0].object.name);
}

export function getFirstObjectWithNameTouch(event, camera, scene){
    
    const raycaster = new THREE.Raycaster();
    const getFirstValue = true;

    const touchPointer = getTouchVector2(event);
	const intersections = checkRayIntersections(touchPointer, camera, raycaster, scene, getFirstValue);

    return(intersections[0].object.name);
}

export function getTouchVector2(event){
    let touchPointer = new THREE.Vector2()

    event.preventDefault();
	event = event.changedTouches[ 0 ];
    var rect = renderer.domElement.getBoundingClientRect();

    touchPointer.x = ( ( event.clientX - rect.left) / rect.width) * 2 - 1;
	touchPointer.y = - ( ( event.clientY - rect.top) / rect.height) * 2 + 1;

    return touchPointer;
}

export function getMouseVector2(event, window){
    let mousePointer = new THREE.Vector2()

    mousePointer.x = (event.clientX / window.innerWidth) * 2 - 1;
	mousePointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
    console.log(mousePointer);

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


document.addEventListener('click', onClick);

document.body.onkeyup = function(e) {
    if (e.key == " " ||
        e.code == "Space" ||      
        e.keyCode == 32      
    ) {
        
        //console.log(camPos);
        // x=false;
        // gsap.to(camera.position, {x:2, y:3.3, z:5.3, duration: 0.5});
        // gsap.to(camera.rotation, {x: -1.5, y: 0, z: 0, duration: 0.5, ease:"none"});
        // document.addEventListener('click', onClick);
        // controls.enabled = false;
    }

    if (e.keyCode == 27 
    ) {
        if (posterSelected){
            setTimeout(() => {posterSelected=false;}, 500); 
            controls.enabled = true;
            gsap.to(camera.position, {x:0, y:5, z:-20, duration: 0.5});
            //poster 1
            gsap.to(scene.children[5].children[32].position, {x:1.4462063312530518, y:1.2948734760284424, z:-1.5894981622695923, duration: 0.5});
            gsap.to(scene.children[5].children[32].rotation, {x:0, y:0, z:-0.14900684876465822, duration: 0.5});
            //poster2
            gsap.to(scene.children[5].children[35].position, {x:0.6585921049118042, y:1.4721720218658447, z:-1.5894981622695923, duration: 0.5});
            gsap.to(scene.children[5].children[35].rotation, {x:0, y:0, z:0.2617685261862562, duration: 0.5});
            //poster 3
            gsap.to(scene.children[5].children[36].position, {x:-0.054011255502700806, y:1.0971174240112305, z:-1.5894981622695923, duration: 0.5});
            gsap.to(scene.children[5].children[36].rotation, {x:0, y:0, z:0.006877208719303045, duration: 0.5});
        }else if(!x){
            x=true;
       
            //document.removeEventListener('click', onClick);
            controls.enabled = true;
            gsap.to(camera.position, {x:8, y:11, z:25, duration: 1});
        }
    }

    if (e.keyCode == 75
    ) {
        console.log(scene.children[5].children);
        //console.log(camPos);
        // camera.rotation.set(-1.5 , 0, 0);
        // console.log(camera.rotation);
    } 
}

window.onload = function() {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const parameterValue = urlParams.get('post');

    if (parameterValue == "bento") {
        x=false;
        gsap.to(camera.position, {x:2.05, y:3.3, z:5.3, duration: 0.5});
        gsap.to(camera.rotation, {x: -1.5, y: 0, z: 0, duration: 0.5, ease:"none"});
        document.addEventListener('click', onClick);
        controls.enabled = false;
    }else{
        gsap.to(camera.position, {x:40, y:22, z:-22, duration: 0});
        gsap.to(camera.position, {x:25, y:15, z:17, duration: 2.5});
        gsap.to(camera.position, {x:8, y:11, z:25, duration: 2.5});
    }
}

//Start the 3D rendering
animate();
