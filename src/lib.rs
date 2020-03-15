use std::ffi::c_void;
use wasm_bindgen::prelude::*;
use rustboy::*;

#[wasm_bindgen]
pub extern fn get_frame_info() -> RustBoyFrameInfo {
    RustBoyFrameInfo {
        width: 160,
        height: 144,
        bytes_per_pixel: 4
    }
}

#[wasm_bindgen]
pub struct RustBoyFrameInfo {
    pub width: u32,
    pub height: u32,
    pub bytes_per_pixel: u32
}

#[wasm_bindgen]
pub enum RustBoyButton {
    Left,
    Right,
    Up,
    Down,
    A,
    B,
    Start,
    Select
}

impl RustBoyButton {
    fn to_button(&self) -> Button {
        use RustBoyButton::*;

        match self {
            Left   => Button::Left,
            Right  => Button::Right,
            Up     => Button::Up,
            Down   => Button::Down,
            A      => Button::A,
            B      => Button::B,
            Start  => Button::Start,
            Select => Button::Select,
        }
    }
}

#[wasm_bindgen]
pub extern fn create_instance(rom_data: &[u8], save_file_path: &str) -> *const c_void {
    let instance = RustBoy::new(ROMType::Data(Vec::from(rom_data)), save_file_path, UserPalette::Default);

    Box::into_raw(instance) as *const c_void
}

#[wasm_bindgen]
pub extern fn delete_instance(instance: *const c_void) {
    let rust_boy = instance as *mut RustBoy;
    unsafe {
        rust_boy.drop_in_place();
    }
}

#[wasm_bindgen]
pub extern fn frame(instance: *const c_void, buffer: &mut [u8]) {
    let rust_boy = instance as *mut RustBoy;
    unsafe {
        if let Some(rust_boy_ref) = rust_boy.as_mut() {
            rust_boy_ref.frame(buffer);
        }
    }
}

#[wasm_bindgen]
pub extern fn button_pressed(instance: *const c_void, c_button: RustBoyButton) {
    let rust_boy = instance as *mut RustBoy;
    unsafe {
        if let Some(rust_boy_ref) = rust_boy.as_mut() {
            rust_boy_ref.set_button(c_button.to_button(), true);
        }
    }
}

#[wasm_bindgen]
pub extern fn button_unpressed(instance: *const c_void, c_button: RustBoyButton) {
    let rust_boy = instance as *mut RustBoy;
    unsafe {
        if let Some(rust_boy_ref) = rust_boy.as_mut() {
            rust_boy_ref.set_button(c_button.to_button(), false);
        }
    }
}
