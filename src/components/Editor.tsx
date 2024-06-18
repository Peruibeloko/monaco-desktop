import MonacoEditor, { MonacoEditorProps } from 'react-monaco-editor';
import { useWindowSize } from '../hooks/useWindowSize';

const Editor = () => {
  const size = useWindowSize();

  const options: MonacoEditorProps = {
    theme: 'vs-dark',
    ...size
  };

  return <MonacoEditor {...options} />;
};

export default Editor;
