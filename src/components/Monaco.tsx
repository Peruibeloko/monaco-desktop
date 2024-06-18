import { Editor, EditorProps, Monaco as MonacoInstance } from '@monaco-editor/react';
import { editor } from 'monaco-editor';
import { useCallback } from 'react';
import actions from '../actions';
import { useWindowSize } from '../hooks/useWindowSize';

const Monaco = () => {
  const onMount = useCallback((editor: editor.IStandaloneCodeEditor, monaco: MonacoInstance) => {
    const disposables = [
      editor.addAction({
        id: 'save',
        label: 'Save',
        keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS],
        run: ed => actions.save(ed.getValue())
      }),
      editor.addAction({
        id: 'load',
        label: 'Open File...',
        keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyO],
        run: async ed => await actions.load(ed)
      })
    ];

    return () => {
      disposables.map(d => d.dispose());
    };
  }, []);

  const options: EditorProps = {
    language: 'plaintext',
    theme: 'vs-dark',
    onMount,
    ...useWindowSize()
  };

  return <Editor {...options} />;
};

export default Monaco;
