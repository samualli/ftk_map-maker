var u = new SpriteUtilities(PIXI);
var renderer, state;
var grid = new Container(),
    stage = new Container();

var width, height, tile_size, border;


function main_init(form){
    //Get form values
    width = parseInt(form.width.value),
    height = parseInt(form.height.value),
    tile_size = parseInt(form.tile_size.value);
    border = 2;

    //Set stage
    renderer = autoDetectRenderer (width * tile_size, height * tile_size);
    renderer.backgroundColor = 0xFFFFFF;

    //Move hero card
    var el = document.querySelector(".hero-card");
    el.classList.add("move-up");
    
    //Create map
    create_map();

    setTimeout(function(){ 
        document.getElementById("ui-container").classList.add('u-hidden'); 
        document.body.appendChild(renderer.view);
    }, 500);
    
}

function create_map(){
    createTextureMap();

    for (var i = 0; i < width; i++) {
        for (var k = 0; k < height; k++) {
        var sprite = u.sprite(textureMap, tile_size * i, tile_size * k);
            sprite.interactive = true;
            sprite.buttonMode = true;
            sprite.on('pointerdown', onClick);
            grid.addChild(sprite);
        }
    }
    
    grid.addChild(sprite);
    stage.addChild(grid);

    renderer.render(stage);
}

//CLick functions

function onClick() {

    this.setTexture(textureMap[1]);
    renderer.render(stage);
}

//Need to find a way to tag a texture