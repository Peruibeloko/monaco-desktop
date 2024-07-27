use std::collections::HashMap;
use std::path::{Path, PathBuf};

pub enum FileSource {
    Memory,
    Disk(PathBuf)
}

#[derive(Default)]
pub struct App {
    open_files: HashMap<PathBuf, String>,
}

impl App {
    pub fn new() -> Self {
        Self::default()
    }

    pub fn add_file(&mut self, path: PathBuf, data: String) {
        self.open_files.insert(path, data);
    }
}