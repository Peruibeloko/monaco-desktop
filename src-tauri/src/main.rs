// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
#![allow(unused)] // get rid of warnings for unused

use std::collections::HashMap;
use std::path::PathBuf;
use tauri::utils::platform::current_exe;
use winreg::enums::HKEY_CURRENT_USER;
use winreg::RegKey;

mod commands;
use commands::file;

#[cfg(target_os = "windows")]
fn is_in_context_menu() -> bool {
    let hkcu = RegKey::predef(HKEY_CURRENT_USER);

    let monaco = match hkcu.open_subkey(r"SOFTWARE\Classes\*\shell\Monaco") {
        Ok(key) => key,
        Err(_) => return false,
    };

    let command = match monaco.open_subkey(r"command") {
        Ok(key) => key,
        Err(_) => return false,
    };

    return match command.get_value::<String, &str>("") {
        Ok(_) => return true,
        Err(_) => return false,
    };
}

#[cfg(target_os = "windows")]
fn add_to_context_menu(editor_path: PathBuf) {
    let hkcu = RegKey::predef(HKEY_CURRENT_USER);

    let shell = match hkcu.open_subkey(r"SOFTWARE\Classes\*\shell") {
        Ok(key) => key,
        Err(_) => return,
    };

    let monaco = match shell.create_subkey(r"Monaco") {
        Ok((key, _)) => key,
        Err(_) => return,
    };

    let command = match monaco.create_subkey(r"command") {
        Ok((key, _)) => key,
        Err(_) => return,
    };

    monaco.set_value("", &"Open with Monaco");
    monaco.set_value("Icon", &editor_path.as_os_str());
    
    // todo: this adds unecessary backslash escapes to the path, find another way to interpolate
    // ? maybe array join?
    command.set_value("", &vec![editor_path.to_str().unwrap_or_default(), "\"%1\""].join(" "));
}

#[cfg(target_os = "macos")]
fn add_to_context_menu(editor_path: PathBuf) {}

#[cfg(target_os = "linux")]
fn add_to_context_menu(editor_path: PathBuf) {}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            file::load,
            file::load_given_path,
            file::save,
            file::save_as
        ])
        // .setup(|app| {
        //     let path_to_editor = match current_exe() {
        //         Ok(path) => path,
        //         Err(_) => return Ok(()),
        //     };

        //     if (is_in_context_menu()) {
        //         return Ok(());
        //     }

        //     add_to_context_menu(path_to_editor);
        //     Ok(())
        // })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
