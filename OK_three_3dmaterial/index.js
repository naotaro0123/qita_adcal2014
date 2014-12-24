init();
animate();

function init(){
    // シーン
    scene = new THREE.Scene();
    // カメラ
    camera = new THREE.PerspectiveCamera(55, 640/480, 1, 1000);
    camera.position.z = 1000;
    // ライティング
    var directionalLight = new THREE.DirectionalLight(0xffffff, 3);
    directionalLight.position.set(0,0,3);
    scene.add(directionalLight);
    // オブジェクト
    loader = new THREE.JSONLoader();
    loader.load("16bitmiku.js", function(geometry,materials){
        var faceMaterial = new THREE.MeshFaceMaterial(materials);
        json = new THREE.Mesh(geometry, faceMaterial);
        json.position.set(-100,100,0);
        json.scale.set(200,200,200);
        json.rotation.set(0,0.4,0);
        scene.add(json);
    });
    // レンダラー
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(640,640);
    document.body.appendChild(renderer.domElement);
}

function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene,camera);
    // 背景色
    renderer.setClearColorHex(0xffffff,1);
}
