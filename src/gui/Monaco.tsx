import { Editor, EditorProps } from '@monaco-editor/react';

import { useTabs } from '../hooks/useTabs';
import { setupMonaco } from '../interactions/startup';
import { useWindowSize } from '../hooks/useWindowSize';

const Monaco = () => {
  const TabManager = useTabs();

  const options: EditorProps = {
    language: 'plaintext',
    theme: 'vs-dark',
    onMount: setupMonaco(TabManager),
    ...useWindowSize()
  };

  return <Editor {...options} />;
};

export default Monaco;
