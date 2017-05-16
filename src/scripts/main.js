var u = new SpriteUtilities(PIXI);
var renderer;
var stage = new Container();



function main_createMap(form){
    const width = parseInt(form.width.value),
          height = parseInt(form.height.value),
          tile_size = parseInt(form.tile_size.value);
          border = 2;

    renderer = autoDetectRenderer (width * tile_size, height * tile_size);
    renderer.backgroundColor = 0xFFFFFF;

    document.querySelector(".hero-card").style.display = "none";
    document.body.appendChild(renderer.view);

    // var graphic = u.rectangle(tile_size, tile_size, 0xFFFFFF, 0xCAA555, border);
    // var texture = renderer.generateTexture(graphic);
    // var grid = new Container();
    // var sprite = new Sprite(texture);
    // sprite.interactive = true;
    // sprite.buttonMode = true;
    // sprite.on('pointerdown', onClick);
    
    var grid = new Container();
    var graphic = new PIXI.Graphics();
    graphic.lineStyle(2, 0xCAA555);
    graphic.beginFill(0xFFFFFF, 1);
    graphic.drawRect(0,0, 55, 55);
    var texture = renderer.generateTexture(graphic);
    var sprite = new Sprite(texture);
    sprite.interactive = true;
    sprite.buttonMode = true;
    sprite.on('pointerdown', onClick);
    grid.addChild(sprite);
    stage.addChild(grid);
    console.log(sprite);

    renderer.render(stage);
    


}



//CLick functions

function onClick() {
    console.log("clicked me");
}