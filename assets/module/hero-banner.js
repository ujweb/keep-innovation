import * as THREE from "https://cdn.skypack.dev/three@0.150.1";

const canvas = document.getElementById("shaderCanvas");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0xffffff, 1); // 白色背景
const scene = new THREE.Scene();

const scaleY = 1.25;
const paddingBottom = 444;

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / (window.innerHeight + paddingBottom), 0.1, 100);

// 初始顏色
let color1 = new THREE.Color("#27B4B9");
let color2 = new THREE.Color("#D8EFEE");
let color3 = new THREE.Color("#0E8A89");

// 顏色過渡變數
let targetColor1 = color1.clone();
let targetColor2 = color2.clone();
let targetColor3 = color3.clone();

// 顏色過渡的時間（秒）
let transitionDuration = 1;
let transitionStartTime = null;

const params = {
    color1: "#27B4B9",
    color2: "#D8EFEE",
    color3: "#0E8A89",
    uStrength: 3.4,
    uSpeed: 0.25,
    uDensity: 1.2,
    uAmplitude: 0,
    uFrequency: 0,
    rotationX: 0,
    rotationY: 0,
    rotationZ: 0,
    positionX: 0,
    positionY: 0,
    positionZ: -0.3,
    fov: 45,
    cAzimuthAngle: 170,
    cPolarAngle: 70,
    cDistance: 4.4,
    cameraZoom: 1,
    wireframe: false,
    brightness: 1,
    scale: 2.75,
};

camera.fov = params.fov;
camera.updateProjectionMatrix();
camera.position.set(0, 0, params.cDistance);
scene.add(camera);

const geometry = new THREE.PlaneGeometry(4, 4, 256, 256);
const uniforms = {
    u_time: { value: 0 },
    u_speed: { value: params.uSpeed },
    u_density: { value: params.uDensity },
    u_strength: { value: params.uStrength },
    u_amplitude: { value: params.uAmplitude },
    u_frequency: { value: params.uFrequency },
    color1: { value: new THREE.Color(params.color1) },
    color2: { value: new THREE.Color(params.color2) },
    color3: { value: new THREE.Color(params.color3) },
    brightness: { value: params.brightness },
};

const vertexShader = `
uniform float u_time;
uniform float u_speed;
uniform float u_density;
uniform float u_strength;
uniform float u_amplitude;
uniform float u_frequency;
varying vec2 vUv;
varying float vWave;

vec2 hash(vec2 p) {
    p = vec2(dot(p, vec2(127.1,311.7)),
    dot(p, vec2(269.5,183.3)));
    return -1.0 + 2.0*fract(sin(p)*43758.5453123);
}

float perlin(vec2 p) {
vec2 i = floor(p);
vec2 f = fract(p);
vec2 u = f*f*(3.0 - 2.0*f);

return mix(
    mix(dot(hash(i + vec2(0,0)), f - vec2(0,0)),
    dot(hash(i + vec2(1,0)), f - vec2(1,0)), u.x),
    mix(dot(hash(i + vec2(0,1)), f - vec2(0,1)),
    dot(hash(i + vec2(1,1)), f - vec2(1,1)), u.x),
    u.y);
}

void main() {
    vUv = uv;
    vec3 pos = position;

    // Perlin noise 基於不同 offset，產生 x, y, z 的變化
    float noiseZ = perlin(vec2(pos.x * u_density + u_time * u_speed, pos.y * u_density + u_time * u_speed));
    float noiseX = perlin(vec2(pos.y * u_density + 10.0 + u_time * u_speed, pos.z * u_density + 10.0 + u_time * u_speed));
    float noiseY = perlin(vec2(pos.x * u_density - 10.0 + u_time * u_speed, pos.z * u_density - 10.0 + u_time * u_speed));

    float waveZ = noiseZ * u_strength * 0.5;
    float waveX = noiseX * u_strength * 0.25;
    float waveY = noiseY * u_strength * 0.125;

    pos.z += waveZ;
    pos.x += waveX;
    pos.y += waveY;

    vWave = waveZ;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

const fragmentShader = `
uniform vec3 color1;
uniform vec3 color2;
uniform vec3 color3;
uniform float brightness;
varying vec2 vUv;
varying float vWave;

void main() {
    vec3 gradient = mix(color1, color2, vUv.y);
    vec3 mixed = mix(gradient, color3, vWave * 0.5 + 0.5);

    gl_FragColor = vec4(mixed * brightness, 1.0);
}
`;

const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
    side: THREE.DoubleSide,
    wireframe: params.wireframe,
});

const mesh = new THREE.Mesh(geometry, material);
mesh.rotation.x = THREE.MathUtils.degToRad(params.rotationX);
mesh.rotation.y = THREE.MathUtils.degToRad(params.rotationY);
mesh.rotation.z = THREE.MathUtils.degToRad(params.rotationZ);
mesh.position.set(params.positionX, params.positionY, params.positionZ);
mesh.scale.set(params.scale, params.scale, params.scale);
scene.add(mesh);

// 顏色過渡更新
function updateColors(t) {
    if (transitionStartTime === null) transitionStartTime = t;
    let elapsedTime = (t - transitionStartTime) / 1000; // 轉換為秒

    if (elapsedTime < transitionDuration) {
        color1.lerp(targetColor1, elapsedTime / transitionDuration);
        color2.lerp(targetColor2, elapsedTime / transitionDuration);
        color3.lerp(targetColor3, elapsedTime / transitionDuration);
        uniforms.color1.value.set(color1);
        uniforms.color2.value.set(color2);
        uniforms.color3.value.set(color3);
    } else {
        uniforms.color1.value.set(targetColor1);
        uniforms.color2.value.set(targetColor2);
        uniforms.color3.value.set(targetColor3);
    }
}

// 顏色切換函數
function switchToColorSet1() {
    targetColor1 = new THREE.Color("#27B4B9");
    targetColor2 = new THREE.Color("#D8EFEE");
    targetColor3 = new THREE.Color("#0E8A89");
    transitionStartTime = null; // 重置過渡時間
}

function switchToColorSet2() {
    targetColor1 = new THREE.Color("#F3A460");
    targetColor2 = new THREE.Color("#FDEED8");
    targetColor3 = new THREE.Color("#ED7012");
    transitionStartTime = null; // 重置過渡時間
}

function switchToColorSet3() {
    targetColor1 = new THREE.Color("#FFE029");
    targetColor2 = new THREE.Color("#FFFBEB");
    targetColor3 = new THREE.Color("#F8B300");
    transitionStartTime = null; // 重置過渡時間
}

function switchToColorSet4() {
    targetColor1 = new THREE.Color("#A1A3DE");
    targetColor2 = new THREE.Color("#FBFBFB");
    targetColor3 = new THREE.Color("#5F63C3");
    transitionStartTime = null; // 重置過渡時間
}

window.switchToColorSet1 = switchToColorSet1;
window.switchToColorSet2 = switchToColorSet2;
window.switchToColorSet3 = switchToColorSet3;
window.switchToColorSet4 = switchToColorSet4;

// 動畫更新函數
let hasFadedIn = false;
function animate(t) {
    const heroBannerDeco = document.querySelectorAll(".hero__banner__decoration");
    const heroBannerArticle = document.querySelectorAll(".hero__banner__article");
    if (!hasFadedIn) {
        document.getElementById("shaderCanvas").style.opacity = "1";
        document.querySelector(".hero__banner__text").style.color = "#1d4843";
        for (let index = 0; index < heroBannerDeco.length; index++) {
            const element = heroBannerDeco[index];
            element.style.opacity = "0.7";
        }
        for (let index = 0; index < heroBannerArticle.length; index++) {
            const element = heroBannerArticle[index];
            element.style.color = "#1d4843";
        }
        hasFadedIn = true;
    }

    updateColors(t); // 更新顏色過渡
    uniforms.u_time.value = t * 0.001;
    renderer.setSize(window.innerWidth, window.innerHeight + paddingBottom);
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();

// 監聽窗口大小調整
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / (window.innerHeight + paddingBottom);
    camera.updateProjectionMatrix();
});
