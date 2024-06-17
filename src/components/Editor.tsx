import { useState } from 'react';
import MonacoEditor, { MonacoEditorProps } from 'react-monaco-editor';

const Editor = () => {
  const [data, setData] = useState('');

  const changeHandler = (text: string) => {
    console.log(text, data);
    setData(text);
  };

  const options: MonacoEditorProps = {
    theme: 'vs-dark',
    onChange: changeHandler
  };

  return <MonacoEditor {...options} />;
};

export default Editor;
