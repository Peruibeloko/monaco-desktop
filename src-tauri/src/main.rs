// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
#![allow(unused)] // get rid of warnings for unused

use rfd::FileDialog;
use std::fs;

#[tauri::command]
fn save(contents: &str) -> Result<(), String> {
    let map_err = |err| {
        String::from(format!("Failed to save to file: {:#?}", err))
    };

    // match FileDialog::new().save_file() {
    //   Some(file_path) => {
    //     fs::write(file_path, contents).map_err(map_err)
    //   },
    //   None => Err("Canceled interaction".into()),
    // }

    FileDialog::new()
      .save_file()
      .map_or_else(
        || Err("User cancelled".into()),
        |path| fs::write(path, contents).map_err(map_err)
      )
}

#[tauri::command]
fn load() -> Result<String, String> {
    let map_err = |err| {
      String::from(format!("Failed to load file: {:#?}", err))
  };

  // match FileDialog::new().pick_file() {
  //   Some(file_path) => {
  //     fs::read_to_string(file_path).map_err(map_err)
  //   },
  //   None => Err("Canceled interaction".into()),
  // }

  FileDialog::new()
      .pick_file()
      .map_or_else(
        || Err("User cancelled".into()),
        |path| fs::read_to_string(path).map_err(map_err)
      )
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![save, load])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
