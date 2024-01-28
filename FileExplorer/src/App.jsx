
import { useState } from 'react'
import explorer from './data/folderData'
import Folder from './components/Folder';
import useTraverseTree from './hooks/use-traverse-tree';
import './App.css'

function App() {
  const [explorerData, setExplorerData] = useState(explorer);
  const { insertNode} = useTraverseTree();
  const handelInsertNode = (folderId,item,isFoldr) =>{
    const finalTree = insertNode(explorerData,folderId,item,isFoldr)

    setExplorerData(finalTree);
  }
  return (
    <>
      <div>
        <Folder handelInsertNode = {handelInsertNode}  explorer = {explorerData}/>
        {/* parsing state as a prop */}
      </div>
    </>
  )
}

export default App
