import { useState } from "react";
import { useEffect } from 'react';
import { useQuill } from 'react-quilljs';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize-module-react';
import BlotFormatter from 'quill-blot-formatter';

Quill.register('modules/imageResize', ImageResize);
const CustomButton = () => <span className="octicon octicon-star" />;


const CustomToolbar = () => (
    <div id="toolbar">
      <select className="ql-header" defaultValue={""} onChange={e => e.persist()}>
        <option value="1" />
        <option value="2" />
        <option value="3" />
        <option value="4" />
        <option selected />
      </select>
      <button className="ql-bold" />     
      <button className="ql-italic" />
      <button className="ql-image" />
      <button className="ql-list" value="ordered"> 
      <i className="fa fa-list" aria-hidden="true"/>
      </button>
      <button className="ql-list" value="bullet">
        <i className="fa fa-list-ol" aria-hidden="true"/>
      </button>
      <select className="ql-color">
        <option value="red" />
        <option value="green" />
        <option value="blue" />
        <option value="orange" />
        <option value="violet" />
        <option value="#d0d1d2" />
        <option selected />
      </select>
    </div>
  );

const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'color',
];

const modules = {   

    toolbar: {
      container: "#toolbar",
    },
    clipboard: {
      matchVisual: false,
    },
    imageResize: {
      parchment: Quill.import('parchment'),
      modules: ['Resize', 'DisplaySize']
    },
    
  };

export default function Editor({state,value}){

    const { quill, quillRef, Quill } = useQuill({
      modules: { blotFormatter: {} }
    });

    if (Quill && !quill) {
      // const BlotFormatter = require('quill-blot-formatter');
      Quill.register('modules/blotFormatter', BlotFormatter);
    }

    useEffect(() => {
      if (quill) {
        quill.on('text-change', (delta, oldContents) => {
          console.log('Text change!');
          console.log(delta);
  
          let currrentContents = quill.getContents();
          console.log(currrentContents.diff(oldContents));
        });
      }
    }, [quill, Quill]);
    
    const [editorState, setEditorState] = useState(value);

    return(
        <>
        {/* <div>
          <div ref={quillRef} dangerouslySetInnerHTML={{__html: value}}/>
        </div> */}
            <CustomToolbar/>
            <ReactQuill theme="snow" value={value} onChange={(e)=>state(e)}  modules={modules} />
        </>
    )
}