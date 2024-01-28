import React, { useState } from 'react'
import '../App.css'

function Folder({ handelInsertNode, explorer }) {
    const [expand, setExpand] = useState(false);
    const [showInput, setShowInput] = useState({
        visible: false,
        isFolder: false
    });

    const handelNewFolder = (e, isFolder) => {
        e.stopPropagation();
        setExpand(true);
        setShowInput({
            visible: true,
            isFolder
        });
    }

    const onAddFolder = (e) => {
        if (e.keyCode === 13 && e.target.value) {
            handelInsertNode(explorer.id, e.target.value, showInput.isFolder)
            setShowInput({ ...showInput, visible: false })
        }
    }
    if (explorer.isFolder) {
        return (
            <div style={{ marginTop: 20, marginLeft: 20 }}>
                <div className='folder' onClick={() => setExpand(!expand)}>
                    <span className={{}}>
                        📂 {explorer.name}
                    </span>

                    <div>
                        <button onClick={(e) => handelNewFolder(e, true)}>Folder +</button>
                        <button onClick={(e) => handelNewFolder(e, false)}>File +</button>
                    </div>
                </div>

                <div style={{ display: expand ? "block" : "none", paddingLeft: 30 }}>
                    {
                        showInput.visible && (
                            <div className='inputContainer'>
                                <span> {showInput.isFolder ? "📂" : "📄"} </span>
                                <input
                                    type="text"
                                    onKeyDown={onAddFolder}
                                    autoFocus
                                    onBlur={() => setShowInput({ ...showInput, visible: false })}
                                    className='inputContainer__input' />
                            </div>
                        )
                    }
                    {explorer.items.map((exp) => {
                        return (
                            <Folder
                                explorer={exp}
                                key={exp.id}
                                handelInsertNode={handelInsertNode} />
                        )
                    })}
                </div>
            </div>
        )
    }
    else {
        return (
            <span className='file'>
                📁 {explorer.name}
            </span>
        )
    }

}

export default Folder