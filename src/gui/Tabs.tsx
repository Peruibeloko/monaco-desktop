import { Uri } from 'monaco-editor';
import { TabManager } from '../hooks/useTabs';
import './tabs.css';

interface Props {
  tabManager: TabManager;
}

const Tabs = ({ tabManager }: Props) => {
  return (
    <div className='tabs'>
      {tabManager.tabs.map((tab, i) => (
        <button onClick={() => tabManager.setActiveTab(i)}>{Uri.parse(tab).path.split(/\\|\//).at(-1)}</button>
      ))}
    </div>
  );
};

export default Tabs;
