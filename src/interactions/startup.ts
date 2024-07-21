import { editor } from 'monaco-editor';
import { useCallback } from 'react';
import { TabManager } from '../hooks/useTabs';
import { setupActions } from './actions';
import { getMatches } from '@tauri-apps/api/cli';
import { loadGivenPath } from './commands';

export const setupMonaco = (TabManager: TabManager) =>
  useCallback((editor: editor.IStandaloneCodeEditor) => {
    const actions = setupActions(TabManager);
    const disposables = actions.map(action => editor.addAction(action));

    getMatches()
      .then(({ args }) => {
        console.log(args);

        if (args.selectedFile.occurrences === 0) throw new Error();
        const path = args.selectedFile.value as string;
        TabManager.updateActiveTabPath(path);
        return loadGivenPath(path);
      })
      .then((contents) => editor.setValue(contents));

    return () => {
      disposables.map(d => d.dispose());
    };
  }, []);
