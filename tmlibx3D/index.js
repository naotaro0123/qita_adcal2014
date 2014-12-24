/*
 * constant
 */
var SCREEN_WIDTH    = 465;              // 画面幅
var SCREEN_HEIGHT   = 465;              // 画面高さ
var SCREEN_CENTER_X = SCREEN_WIDTH/2;   // 画面中央X座標値
var SCREEN_CENTER_Y = SCREEN_HEIGHT/2;  // 画面中央Y座標値

/*
 * main
 */
tm.main(function() {
    // アプリケーション
    var app = tm.three.ThreeApp("#world");
    // リサイズ
    app.resize(SCREEN_WIDTH, SCREEN_HEIGHT);
    // 画面にフィット
    app.fitWindow();
    // メインシーンに切り替える
    app.replaceScene(MainScene());
    // 実行
    app.run();
});


/*
 * scene
 */
var MainScene = tm.createClass({
    // three.js 用シーンを継承
    superClass: tm.three.Scene,

    init: function() {
        // 親を初期化 fov: 視野角, aspect: 縦横比
        this.superInit(60, SCREEN_WIDTH/SCREEN_HEIGHT);

        var group = tm.three.Element();
        this.add(group);

        var texture = new THREE.ImageUtils.loadTexture( "hiyoko/texture.png");

        var material = new THREE.MeshBasicMaterial( { map: texture} );


        // LOADER
        var loader = new THREE.JSONLoader();
        loader.load('hiyoko/hiyoko.js', function(geometory,materials){
            var elm = tm.three.MeshElement(geometory,material);
            // サイズ
//            elm.scale.set(200, 200, 200);
            elm.scale.set(20, 20, 20);
            // 配置
            elm.position.x = 0;
            elm.position.y = -100;
            elm.position.z = -100;
            // キー操作
            elm.update = function(app) {
                var key = app.keyboard;
                var point = app.pointing;
                // right
                if (key.getKey("d") || key.getKey("right")) { this.position.x -= 10; }
                // left
                if (key.getKey("a") || key.getKey("left")){ this.position.x += 10; }
                // UP
                if (key.getKey("e")) { this.position.y -= 10; }
                // DOWN
                if (key.getKey("q"))   { this.position.y += 10; }
                // 離れる
                if (key.getKey("s") || key.getKey("down"))    { this.position.z -= 10; }
                // 近づく
                if (key.getKey("w") || key.getKey("up"))    { this.position.z += 10; }

                this.rotation.y += 0.05;
            };

            group.add( elm );
        });
        // カメラセットアップ
        this.camera.position.set(0, 0, 300);
    }
});




