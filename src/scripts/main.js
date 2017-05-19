var u = new SpriteUtilities(PIXI);
var renderer, state;
var grid = new Container(),
    palette = new Container(),
    stage = new Container();

//Options
var grid_lines = true;

var width, height, tile_size, border, palette_selected;


function main_init(form){
    //Get form values
    width = parseInt(form.width.value),
    height = parseInt(form.height.value),
    tile_size = parseInt(form.tile_size.value);
    border = 2;

    //Set stage
    //250px for palette
    renderer = autoDetectRenderer (width * tile_size + 250, height * tile_size);
    renderer.backgroundColor = 0xFFFFFF;

    //Move hero card
    var el = document.querySelector(".hero-card");
    el.classList.add("move-up");
    
    create_map();
    create_palette();

    setTimeout(function(){ 
        document.getElementById("ui-container").classList.add('u-hidden'); 
        document.body.appendChild(renderer.view);
        renderer.render(stage);
    }, 500);
    
}
function create_palette(){
    for (var i = 0; i < textureMap.length; i++) {
        var sprite = u.sprite(textureMap, tile_size * i, 0);
        sprite.gotoAndStop(i);
        sprite.interactive = true;
        sprite.buttonMode = true;
        sprite.on('pointerdown', setPalette);
        palette.addChild(sprite);
    }
    palette.x = width * tile_size + tile_size;
    stage.addChild(palette);
}

function create_map(){
    createTextureMap();

    for (var i = 0; i < width; i++) {
        for (var k = 0; k < height; k++) {
        var sprite = u.sprite(textureMap, tile_size * i, tile_size * k);
            sprite.interactive = true;
            sprite.buttonMode = true;
            sprite.on('pointerdown', paint);
            grid.addChild(sprite);
        }
    }
    //grid.interactive = true;
    //grid.buttonMode = true;
    stage.addChild(grid);
}

function setPalette() {
    if(palette_selected == undefined) {
        this.tint = 0x36B29E;
        palette_selected = this.currentFrame;
        renderer.render(stage);
        return;
    }
    if(palette_selected != this.currentFrame) {
        //Reset tint of prev selected palette
        palette.getChildAt(palette_selected).tint = 0xFFFFFF;
        this.tint = 0x36B29E;
        palette_selected = this.currentFrame;;
    }
    
    renderer.render(stage);
}

function paint() {
    if(palette_selected == undefined)
        return;

    this.gotoAndStop(palette_selected);
    renderer.render(stage);
}

function export_grid() {
    var array = [];
    var string = "["
    for (var i = 0; i < grid.children.length; i++) {
        //array.push(grid.getChildAt(i).currentFrame);
        string += grid.getChildAt(i).currentFrame;
        if(i < grid.children.length - 1)
            string += ','
    }

    string += "]";
    return(string);
}

//Need to find a way to tag a texture
