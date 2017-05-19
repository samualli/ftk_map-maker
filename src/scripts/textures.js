var textureMap = [];
var colorArray = [0xFFFFFF, 0xD7E15F];

function createTextureMap() {

    for (var i = 0; i < colorArray.length; i++){
        var graphic = new PIXI.Graphics();
            graphic.lineStyle(border, 0xCAA555);
            graphic.beginFill(colorArray[i], 1);
            graphic.drawRect(0,0, tile_size, tile_size);

        var texture = renderer.generateTexture(graphic);

        textureMap.push(texture);
    }
}