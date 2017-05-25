function toolbar_save() {

    if(grid.children.length > 0){
        localStorage.setItem("slot1", export_grid());
        console.log("Saved to Slot 1.");
    }else{
        console.log("Nothing to save.")
    }

}

function toolbar_load() {
    if(grid.children.length > 0) {
        console.log("A map is already live.");
        return;
    }
    mapObj = JSON.parse(localStorage.getItem("slot1"));
    console.log(mapObj);
    document.getElementById("input_width").value = mapObj.width;
    document.getElementById("input_height").value = mapObj.height;
    document.getElementById("input_text_size").value = mapObj.tile_size;
    document.getElementById("output_form").classList.remove("u-hidden");
}