import { Editor, EditorProps, Monaco as MonacoInstance } from '@monaco-editor/react';
import { editor } from 'monaco-editor';
import { useCallback, useState } from 'react';
import * as actions from '../actions';
import { useWindowSize } from '../hooks/useWindowSize';

const files = ['temp0'];
const activeFile = 0;

const Monaco = () => {
  const onMount = useCallback((editor: editor.IStandaloneCodeEditor, monaco: MonacoInstance) => {
    const disposables = [
      editor.addAction({
        id: 'save',
        label: 'Save File',
        keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS],
        run: ed => {
          console.log('save existing file', files, files[activeFile]);
          actions.save(ed.getValue(), files[activeFile]);
        }
      }),
      editor.addAction({
        id: 'saveAs',
        label: 'Save As...',
        keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyS],
        run: async ed => {
          const path = await actions.saveAs(ed.getValue());
          console.log('saved new file to', path);
          files[activeFile] = path;
        }
      }),
      editor.addAction({
        id: 'load',
        label: 'Open File...',
        keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyO],
        run: async ed => {
          const { contents, path } = await actions.load(ed);
          console.log('loading file', path);
          files[activeFile] = path;
          console.log('new files array', files);
          editor.setValue(contents);
        }
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
