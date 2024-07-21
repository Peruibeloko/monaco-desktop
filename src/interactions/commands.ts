import { invoke } from '@tauri-apps/api';

export const save = (contents: string, filePath: string) => {
  const path = /temp\d+/.test(filePath) ? '' : filePath;
  invoke<string>('save', { contents, filePath: path }).catch(console.error);
};

export const saveAs = async (contents: string) => {
  // TODO notify the user when saving a new file errors
  // ? maybe show a system dialog when the error happens in rust?

  return invoke<string>('save_as', { contents })
    .catch(console.error)
    .then(() => 'temp0');
};

export const load = async () => {
  interface FileLoadResult {
    contents: string;
    path: string;
  }

  return await invoke<FileLoadResult>('load', {});
};

export const loadGivenPath = async (path: string) => {
  return await invoke<string>('load_given_path', { path });
};
