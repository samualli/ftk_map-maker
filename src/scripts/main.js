var u = new SpriteUtilities(PIXI);
var renderer, state;
var grid = new Container(),
    palette = new Container(),
    stage = new Container();

//Options
var grid_lines = true;
var pointer_down = false;

var width, height, tile_size, border, palette_selected;

//Local Variables
var main = {};
    main.mapsJSON = [];


/* Function main_init */
/* If Paramter is HTML element then create blank map
   Else Create Blank map and Load Tiles */

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
    //If a map is loaded
    if(main.mapsJSON.length > 0)
        load_map(main.mapsJSON[0].map);

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
/* Function Create Map
   Create empty map */
function create_map(){
    createTextureMap();

    for (var i = 0; i < width; i++) {
        for (var k = 0; k < height; k++) {
        var sprite = u.sprite(textureMap, tile_size * k, tile_size * i);
            grid.addChild(sprite);
        }
    }
    grid.interactive = true;
    grid.buttonMode = true;
    grid.on('pointerdown', pointerDown);
    grid.on('pointermove', pointerMove);
    grid.on('pointerup', pointerRelease)
    stage.addChild(grid);
}

/* Pre: array is an Map Array with values representing which frame the tile will be
*/
function load_map(array) {

    for (var i = 0; i < grid.children.length; i++) {
        grid.getChildAt(i).gotoAndStop(array[i]);
    }

    renderer.render(stage);
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
/* Pre: PIXI.point
   Post: Returns Sprite the cell in the grid */
function getCellFromPoint(point) {
   var x = Math.floor(point.x / tile_size);
   var y = Math.floor(point.y / tile_size);
   var index = x + y * width;
   
   return grid.getChildAt(index);
}

function pointerDown(e) {
    if(palette_selected == undefined)
        return;

    pointer_down = true;
    //Translates click positioning to coordinate
    var cell = getCellFromPoint(e.data.getLocalPosition(grid));
    if (cell.currentFrame == palette_selected)
        return;

    cell.gotoAndStop(palette_selected);
    renderer.render(stage);
}

function pointerMove(e) {
    if(!pointer_down)
        return;

    var cell = getCellFromPoint(e.data.getLocalPosition(grid));
    if (cell.currentFrame == palette_selected)
        return;

    cell.gotoAndStop(palette_selected)
    renderer.render(stage);
}

function pointerRelease() {
    pointer_down = false;

}
/* Post: index[0] = width; index[1] = height; */
function export_grid() {
    var array = [];

    for (var i = 0; i < grid.children.length; i++) {
        array.push(grid.getChildAt(i).currentFrame);
    }
    var thisMap = { 
        "width":width, 
        "height":height, 
        "tile_size":tile_size, 
        "map":array
    };

    return(JSON.stringify(thisMap));
}

//Need to find to either convert a string back to an array or
//externally load an array from a saved JS file.
//How do we save an array?  Local Storage // JSON // Export
