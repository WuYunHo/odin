import React, { useState } from 'react';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

// 脚手架示例组件
const Forumeditor: React.FC = (props) => {
  const [editorState, setEditorState] = useState("")

  return (
   <div>
    <Editor
      editorState={editorState}
      toolbarClassName="toolbarClassName"
      wrapperClassName="wrapperClassName"
      editorClassName="editorClassName"
      onEditorStateChange={(editorState)=>setEditorState(editorState)}

      onBlur={()=>{
        console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())))
        props.getContext(draftToHtml(convertToRaw(editorState.getCurrentContent())))
      }}
    />; 
   </div>
  );
};

export default Forumeditor;
