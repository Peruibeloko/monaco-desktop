// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
#![allow(unused)] // get rid of warnings for unused

use rfd::FileDialog;
use serde_json::{json, Value};
use std::fs;
use std::path::Path;

#[tauri::command]
fn save(contents: &str, file_path: &str) -> Result<(), String> {
    let map_err = |err| String::from(format!("Failed to save to file: {:#?}", err));

    if (file_path == "") {
        return save_as(contents);
    }

    let path = Path::new(file_path);
    fs::write(path, contents).map_err(map_err)
}

#[tauri::command]
fn save_as(contents: &str) -> Result<(), String> {
    let map_err = |err| String::from(format!("Failed to save to file: {:#?}", err));

    FileDialog::new().save_file().map_or_else(
        || Err("User cancelled".into()),
        |path| fs::write(path, contents).map_err(map_err),
    )
}

#[tauri::command]
fn load() -> Result<Value, Value> {
    FileDialog::new().pick_file().map_or_else(
        || {
            Err(json!({
                "contents": "User cancelled",
                "path": "temp0"
            }))
        },
        |path| match fs::read_to_string(&path) {
            Ok(data) => Ok(json!({
                "contents": data,
                "path": &path
            })),
            Err(err) => Err(json!({
                "contents": format!("Failed to load file: {:#?}", err),
                "path": path
            })),
        },
    )
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![save, save_as, load])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
