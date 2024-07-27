import { getMatches } from '@tauri-apps/api/cli';
import { editor } from 'monaco-editor';
import { useCallback } from 'react';
import { TEMP_FILE_PATH } from '../constants';
import { TabManager } from '../hooks/useTabs';
import { setupActions } from './actions';
import { loadGivenPath } from './commands';

export const setupMonaco = (TabManager: TabManager) =>
  useCallback((editorInstance: editor.IStandaloneCodeEditor) => {
    const actions = setupActions(TabManager);
    const disposables = actions.map(action => editorInstance.addAction(action));

    getMatches()
      .then(async ({ args }) => {
        console.log(args);

        if (args.selectedFile.occurrences === 0) return ['', TEMP_FILE_PATH];
        const path = args.selectedFile.value as string;
        TabManager.updateActiveTabPath(path);
        return [await loadGivenPath(path), path];
      })
      .then(([contents, path]) => {
        editorInstance.setValue(contents);
      });

    return () => {
      disposables.map(d => d.dispose());
    };
  }, []);
