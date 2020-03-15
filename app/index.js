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
        let button = rustBoyButton(event.keyCode);
        rustboy.button_pressed(instance, button);
    });

    document.addEventListener("keyup", function(event) {
        let button = rustBoyButton(event.keyCode);
        rustboy.button_unpressed(instance, button);
    });
});

function rustBoyButton(keycode) {
    switch (keycode) {
        case 38: return rustboy.RustBoyButton.Up;
        case 40: return rustboy.RustBoyButton.Down;
        case 37: return rustboy.RustBoyButton.Left;
        case 39: return rustboy.RustBoyButton.Right;
        case 88: return rustboy.RustBoyButton.A;
        case 90: return rustboy.RustBoyButton.B;
        case 32: return rustboy.RustBoyButton.Select;
        case 13: return rustboy.RustBoyButton.Start;
    }
}