import * as rustboy from "rustboyweb";

let f = fetch("roms/Tetris.gb")
    .then(data => data.blob())
    .then(blob => blob.arrayBuffer())
    .then(function(data) {
    let frameInfo = rustboy.get_frame_info();

    let instance = rustboy.create_instance(new Uint8Array(data), "");

    let ctx = document.getElementById("video").getContext("2d");

    let renderer = document.createElement("canvas");
    renderer.width = frameInfo.width;
    renderer.height = frameInfo.height;
    let renderCtx = renderer.getContext("2d");
    let imageData = renderCtx.createImageData(frameInfo.width, frameInfo.height);

    function frame() {
        rustboy.frame(instance, imageData.data);
        renderCtx.putImageData(imageData, 0, 0);
        ctx.drawImage(renderer, 0, 0, 480, 432);
        requestAnimationFrame(frame);
    }

    window.requestAnimationFrame(frame);

    document.addEventListener("keydown", function(event) {
        switch (event.keyCode) {
            case 38: rustboy.button_pressed(instance, rustboy.RustBoyButton.Up); break;
            case 40: rustboy.button_pressed(instance, rustboy.RustBoyButton.Down); break;
            case 37: rustboy.button_pressed(instance, rustboy.RustBoyButton.Left); break;
            case 39: rustboy.button_pressed(instance, rustboy.RustBoyButton.Right); break;
            case 88: rustboy.button_pressed(instance, rustboy.RustBoyButton.A); break;
            case 90: rustboy.button_pressed(instance, rustboy.RustBoyButton.B); break;
            case 32: rustboy.button_pressed(instance, rustboy.RustBoyButton.Select); break;
            case 13: rustboy.button_pressed(instance, rustboy.RustBoyButton.Start); break;
        }
    });

    document.addEventListener("keyup", function(event) {
        switch (event.keyCode) {
            case 38: rustboy.button_unpressed(instance, rustboy.RustBoyButton.Up); break;
            case 40: rustboy.button_unpressed(instance, rustboy.RustBoyButton.Down); break;
            case 37: rustboy.button_unpressed(instance, rustboy.RustBoyButton.Left); break;
            case 39: rustboy.button_unpressed(instance, rustboy.RustBoyButton.Right); break;
            case 88: rustboy.button_unpressed(instance, rustboy.RustBoyButton.A); break;
            case 90: rustboy.button_unpressed(instance, rustboy.RustBoyButton.B); break;
            case 32: rustboy.button_unpressed(instance, rustboy.RustBoyButton.Select); break;
            case 13: rustboy.button_unpressed(instance, rustboy.RustBoyButton.Start); break;
        }
    });
});