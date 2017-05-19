var textureMap = [];
var colorArray = [0x333333, 0xFFFFFF, 0xFEE5CB, 0xC1C1C1, 0xD7E15F];

function createTextureMap() {

    for (var i = 0; i < colorArray.length; i++){
        (typeof colorArray[i]);
        var graphic = new PIXI.Graphics();
            graphic.beginFill(colorArray[i], 1);
            if(grid_lines)
                graphic.lineStyle(border, 0xCAA555);
            graphic.drawRect(0,0, tile_size, tile_size);

        var texture = renderer.generateTexture(graphic);

        textureMap.push(texture);
    }
}

function createPaletteMap() {
    for (var i = 0; i < colorArray.length; i++){
        (typeof colorArray[i]);
        var graphic = new PIXI.Graphics();
            graphic.lineStyle(border, 0xCAA555);
            graphic.beginFill(colorArray[i], 1);
            graphic.drawRect(0,0, tile_size, tile_size);

        var texture = renderer.generateTexture(graphic);

        textureMap.push(texture);
    }

}