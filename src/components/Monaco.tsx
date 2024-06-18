import { Editor, EditorProps, Monaco as MonacoInstance } from '@monaco-editor/react';
import { editor } from 'monaco-editor';
import { useCallback } from 'react';

interface Props {
  size: {
    height: number;
    width: number;
  };
  actions: {
    save: (text: string) => void;
  };
}

const Monaco = ({ size, actions }: Props) => {
  const onMount = useCallback((editor: editor.IStandaloneCodeEditor, monaco: MonacoInstance) => {
    let saveAction = editor.addAction({
      id: 'save',
      label: 'Save',
      run: () => actions.save(editor.getValue())
    });

    editor.addCommand(monaco.KeyCode.Ctrl | monaco.KeyCode.KeyS, () => actions.save(editor.getValue()));

    return () => {
      saveAction.dispose();
    };
  }, []);

  const options: EditorProps = {
    language: 'plaintext',
    theme: 'vs-dark',
    onMount,
    ...size
  };

  return <Editor {...options} />;
};

export default Monaco;
