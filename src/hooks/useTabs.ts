import { useState } from 'react';

interface Tabs {
  tabs: string[];
  activeTab: number;
}

export const DEFAULT_FILE_PATH = 'temp0';

const removeAt = <T>(arr: T[], index: number) => [...arr.slice(0, index), ...arr.slice(index + 1)];
const updateAt = <T>(arr: T[], index: number, newValue: T) => [
  ...arr.slice(0, index),
  newValue,
  ...arr.slice(index + 1)
];

const activeTabAfterClose = (state: Tabs, index: number) => {
  const { tabs, activeTab } = state;
  if (tabs.length === 1) return 0;
  if (activeTab === 0) return 1;
  return index - 1;
};

export type TabManager = ReturnType<typeof useTabs>;
export const useTabs = (selectedFile: string = 'temp0') => {
  const [state, setState] = useState<Tabs>({
    tabs: [selectedFile],
    activeTab: 0
  });

  const setActiveTab = (index: number) =>
    setState(prev => ({
      ...prev,
      activeTab: index
    }));

  const newTab = (path: string) =>
    setState(prev => ({
      tabs: [...prev.tabs, path],
      activeTab: prev.activeTab++
    }));

  const closeTab = (index: number) =>
    setState(prev => ({
      tabs: prev.tabs.length === 1 ? [DEFAULT_FILE_PATH] : removeAt(prev.tabs, index),
      activeTab: activeTabAfterClose(prev, index)
    }));

  const updateActiveTabPath = (path: string) =>
    setState(prev => ({
      ...prev,
      tabs: updateAt(prev.tabs, prev.activeTab, path)
    }));

  return {
    tabs: state.tabs,
    activeTabIndex: state.activeTab,
    currentFilePath: state.tabs[state.activeTab],
    newTab,
    closeTab,
    setActiveTab,
    updateActiveTabPath
  };
};
