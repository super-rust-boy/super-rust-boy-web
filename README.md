# Super Rust Boy on the web
This project combines the rust boy and web assembly to get it running in a browser.

## Build steps
1. Clone this repo.
2. Get `wasm-pack` from [here](https://rustwasm.github.io/wasm-pack/installer/).
3. Run `wasm-pack build` in the root (the same directory as this README).
4. `cd` into the `app` subdirectory and run `npm install`.
5. Put some roms into `app/roms`.
6. Run `npm run start` to start the dev server.
7. Go to `localhost:8080` in a browser and voila!

## TODO
* Audio
* Save files
* Streaming ROMs over the internet