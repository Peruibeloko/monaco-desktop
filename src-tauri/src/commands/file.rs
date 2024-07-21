use rfd::FileDialog;
use serde_json::{json, Value};
use std::fs;
use std::path::{Path, PathBuf};

#[tauri::command]
pub fn save(contents: &str, file_path: &str) -> Result<(), String> {
    let map_err = |err| String::from(format!("Failed to save to file: {:#?}", err));

    if (file_path == "") {
        return save_as(contents);
    }

    let path = Path::new(file_path);
    fs::write(path, contents).map_err(map_err)
}

#[tauri::command]
pub fn save_as(contents: &str) -> Result<(), String> {
    let map_err = |err| String::from(format!("Failed to save to file: {:#?}", err));

    FileDialog::new().save_file().map_or_else(
        || Err("User cancelled".into()),
        |path| fs::write(path, contents).map_err(map_err),
    )
}

#[tauri::command]
pub fn load() -> Value {
    let path = match FileDialog::new().pick_file() {
        Some(selection) => selection,
        None => Path::new("temp0").to_path_buf(),
    };

    if (path.to_str() == Some("temp0")) {
        return json!({
            "contents": "No file selected",
            "path": path
        });
    }

    let contents = match fs::read_to_string(&path) {
        Ok(data) => data,
        Err(err) => format!("Failed to load file: {:#?}", err),
    };

    json!({
        "contents": contents,
        "path": path,
    })
}

#[tauri::command]
pub fn load_given_path(path: &str) -> String {
    return match fs::read_to_string(path) {
        Ok(data) => data,
        Err(err) => format!("Failed to load file: {:#?}", err),
    };
}
