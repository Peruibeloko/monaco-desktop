import { invoke } from '@tauri-apps/api';
import './App.css';
import Monaco from './components/Monaco';
import { ShortcutKeys, useShortcut } from './hooks/useKeyboard';
import { useWindowSize } from './hooks/useWindowSize';

const save = (text: string) => {
  invoke<string>('save', { contents: text }).catch(console.error);
};

// const CTRL_S = ({ key, ctrl }: ShortcutKeys) => ctrl && key === 's';

function App() {
  const actions = {
    save
  };

  const editorProps = {
    size: useWindowSize(),
    actions
  };

  // useShortcut(CTRL_S, save);

  return <Monaco {...editorProps} />;
}

export default App;
