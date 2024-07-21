// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
#![allow(unused)] // get rid of warnings for unused

mod commands;
use commands::file;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            file::load,
            file::load_given_path,
            file::save,
            file::save_as
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
