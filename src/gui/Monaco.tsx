import { Editor, EditorProps } from '@monaco-editor/react';

import { TabManager } from '../hooks/useTabs';
import { setupMonaco } from '../interactions/startup';
import { useWindowSize } from '../hooks/useWindowSize';

interface Props {
  tabManager: TabManager;
}

const Monaco = ({ tabManager }: Props) => {
  
  const options: EditorProps = {
    theme: 'vs-dark',
    path: tabManager.currentFilePath,
    onMount: setupMonaco(tabManager),
    width: useWindowSize().width,
    height: useWindowSize().height,
    className: 'monacoEditorRoot'
  };

  return <Editor {...options} />;
};

export default Monaco;
