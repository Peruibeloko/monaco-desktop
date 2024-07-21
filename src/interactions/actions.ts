import { editor, KeyCode, KeyMod } from 'monaco-editor';
import * as commands from './commands';
import { TabManager } from '../hooks/useTabs';

export const setupActions = (TabManager: TabManager): editor.IActionDescriptor[] => [
  {
    id: 'save',
    label: 'Save File',
    keybindings: [KeyMod.CtrlCmd | KeyCode.KeyS],
    run: ed => {
      commands.save(ed.getValue(), TabManager.currentFilePath);
    }
  },
  {
    id: 'saveAs',
    label: 'Save As...',
    keybindings: [KeyMod.CtrlCmd | KeyMod.Shift | KeyCode.KeyS],
    run: async ed => {
      const path = await commands.saveAs(ed.getValue());
      TabManager.updateActiveTabPath(path);
    }
  },
  {
    id: 'load',
    label: 'Open File...',
    keybindings: [KeyMod.CtrlCmd | KeyCode.KeyO],
    run: async ed => {
      const { contents, path } = await commands.load();
      TabManager.newTab(path);
      ed.setValue(contents);
    }
  }
];
