// Define the URLs for textures
var textureURL = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/17271/lroc_color_poles_1k.jpg";
var displacementURL = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/17271/ldem_3_8bit.jpg";
var worldURL = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/17271/hipp8_s.jpg";

// Create a Three.js scene
var scene = new THREE.Scene();

// Create a camera
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Create a WebGL renderer
var renderer = new THREE.WebGLRenderer();

// Create OrbitControls for camera movement
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enablePan = false;

// Set renderer size and add it to the DOM
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a sphere geometry
var geometry = new THREE.SphereGeometry(2, 60, 60);

// Load textures using TextureLoader
var textureLoader = new THREE.TextureLoader();
var texture = textureLoader.load(textureURL);
var displacementMap = textureLoader.load(displacementURL);
var worldTexture = textureLoader.load(worldURL);

// Create a Phong material for the sphere
var material = new THREE.MeshPhongMaterial({
  color: 0xffffff,
  map: texture,
  displacementMap: displacementMap,
  displacementScale: 0.06,
  bumpMap: displacementMap,
  bumpScale: 0.04,
  reflectivity: 0,
  shininess: 0
});

// Create the moon mesh
var moon = new THREE.Mesh(geometry, material);

// Create a directional light
const light = new THREE.DirectionalLight(0xFFFFFF, 1);
light.position.set(-100, 10, 50);
scene.add(light);

// Create a hemisphere light
hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.1);
hemiLight.color.setHSL(0.6, 1, 0.6);
hemiLight.groundColor.setHSL(0.095, 1, 0.75);
hemiLight.position.set(0, 0, 0);
scene.add(hemiLight);

// Create a world mesh for the background
var worldGeometry = new THREE.SphereGeometry(1000, 60, 60);
var worldMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  map: worldTexture,
  side: THREE.BackSide
});
var world = new THREE.Mesh(worldGeometry, worldMaterial);
scene.add(world);

// Add the moon mesh to the scene
scene.add(moon);

// Set camera position
camera.position.z = 5;

// Rotate the moon
moon.rotation.x = 3.1415 * 0.02;
moon.rotation.y = 3.1415 * 1.54;

// Create marker materials
var markerMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });

// Define marker positions
var moonRadius = 2;
var marker1Position = new THREE.Vector3(moonRadius * 1.1, 0, 0);
var marker2Position = new THREE.Vector3(moonRadius * -1.1, 0, 0);
var marker3Position = new THREE.Vector3(0, -moonRadius * 1.1, 0);

// Create marker meshes
var marker1 = new THREE.Mesh(new THREE.SphereGeometry(0.05, 32, 32), markerMaterial);
var marker2 = new THREE.Mesh(new THREE.SphereGeometry(0.05, 32, 32), markerMaterial);
var marker3 = new THREE.Mesh(new THREE.SphereGeometry(0.05, 32, 32), markerMaterial);

// Set marker positions
marker1.position.copy(marker1Position);
marker2.position.copy(marker2Position);
marker3.position.copy(marker3Position);

// Enable shadows for markers
marker1.castShadow = true;
marker1.receiveShadow = true;

marker2.castShadow = true;
marker2.receiveShadow = true;

marker3.castShadow = true;
marker3.receiveShadow = true;

// Add click event listeners to markers
marker1.addEventListener("click", function () {
  console.log("Marker 1 clicked");
  window.location.href = "jaan.html";
});

marker2.addEventListener("click", function () {
  console.log("Marker 2 clicked");
  window.location.href = "jaan1.html"; 
});

marker3.addEventListener("click", function () {
  console.log("Marker 3 clicked");
  window.location.href = "jaan2.html";
});

// Add markers to the scene
scene.add(marker1);
scene.add(marker2);
scene.add(marker3);

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  moon.rotation.y += 0.002;
  moon.rotation.x += 0.0001;
  world.rotation.y += 0.0001;
  world.rotation.x += 0.0005;
  renderer.render(scene, camera);
}

// Handle window resize
function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onResize, false);

// Start the animation loop
animate();
