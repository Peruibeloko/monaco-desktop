import { invoke } from '@tauri-apps/api';
import { editor } from 'monaco-editor';

export const save = (contents: string, filePath: string) => {
  const path = /temp\d+/.test(filePath) ? '' : filePath;
  invoke<string>('save', { contents, filePath: path }).catch(console.error);
};

export const saveAs = async (contents: string) => {
  // TODO notify the user when saving a new file errors
  // ? maybe show a system dialog when the error happens in rust?
  
  return invoke<string>('save_as', { contents }).catch(err => (console.error(err), 'temp0'));
};

export const load = async (editor: editor.ICodeEditor) => {
  interface FileLoadResult {
    contents: string;
    path: string;
  }

  return await invoke<FileLoadResult>('load', {}).catch(
    err => (console.error(err), { contents: 'Error loading file', path: 'temp0' })
  );
};
