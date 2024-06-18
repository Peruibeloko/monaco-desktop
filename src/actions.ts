import { invoke } from '@tauri-apps/api';
import { editor } from 'monaco-editor';

const save = (text: string) => {
  invoke<string>('save', { contents: text }).catch(console.error);
};

const load = async (editor: editor.ICodeEditor) => {
  const data = await invoke<string>('load', {}).catch(err => (console.error(err), ''));
  editor.setValue(data);
};

const actions = {
  save,
  load
};

export default actions;
export type Actions = typeof actions;
