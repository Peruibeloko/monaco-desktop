import { useTabs } from '../hooks/useTabs';
import './App.css';
import Monaco from './Monaco';
import Tabs from './Tabs';

function App() {
  const TabManager = useTabs();

  return (
    <>
      <Tabs tabManager={TabManager} />
      <Monaco tabManager={TabManager} />
    </>
  );
}

export default App;
