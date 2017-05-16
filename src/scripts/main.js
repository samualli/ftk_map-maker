var renderer;

//Create a container object called the `stage`
var stage = new Container();

//Init SpriteUtilities
var u = new SpriteUtilities(PIXI);

function main_createMap(form){
    const width = parseInt(form.width.value),
          height = parseInt(form.height.value),
          tile_size = parseInt(form.tile_size.value);
          border = 2;

    renderer = autoDetectRenderer (width * tile_size, height * tile_size);
    renderer.render(stage);
    renderer.backgroundColor = 0xFFFFFF;
    
    //var rect = u.rectangle (tile_size, tile_size, 0xFFFFFF, 0xCAA555, 2);
    //var texture = new PIXI.Texture.from(rect);
    //console.log(texture);
    var graphic = new PIXI.Graphics();
    graphic.lineStyle(parseInt(border), 0xCAA555);
    graphic.beginFill(0xFFFFFF, 1);
    graphic.drawRect(0,0, (tile_size - border*2), (tile_size - border*2));
    var texture = renderer.generateTexture(graphic);

    //var rect = new Sprite(texture);
    //var rect_sprite = new Sprite(texture);

    for (var i = 0; i < width; i++) {
        for (var k = 0; k < height; k++) {
            var sprite = new Sprite(texture);
            sprite.interactive = true;
            sprite.buttonMode = true;
            sprite.x = i * tile_size;
            sprite.y = k * tile_size;
            sprite.on('pointerdown', onClick);
            stage.addChild(sprite);
        }
    }

    document.querySelector(".hero-card").classList.toggle("move-up");

    setTimeout(function() {
        document.querySelector(".hero-card").style.display = "none";
        document.getElementById("canvas").appendChild(renderer.view);
        //stage.addChild(circles);
        console.log(tile_size);
        //var rect = u.rectangle(tile_size, tile_size, "seaGreen", "hotPink", 2, 0, 0);
        var ball2 = u.circle(24, 0x000000);
        stage.addChild(ball2);
        update();
    }, 500);

    console.log(width + ' ' + height + ' ' + tile_size);
    return false;
}
    

var render = function() {
    renderer.render(stage);
    requestAnimationFrame(render);
}

function update() {
    requestAnimationFrame(update);

    renderer.render(stage);

}


//CLick functions

function onClick() {
    console.log("clicked me");
}