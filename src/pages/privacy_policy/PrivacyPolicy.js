import { useState } from "react";
// import draftToHtml from "draftjs-to-html";
// import { EditorState,convertToRaw } from 'draft-js';
// import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Card, Box, Button } from "@mui/material";
import Editor from "../../share/Editor/Editor";

export default function PrivacyPolicy() {

    const [editorState,setEditorState] = useState('')
    const _handleClick = () =>(
        console.log(editorState)       

    )

    return (
        <>
        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{m:3}}>
            <h1>Privacy Policy</h1>
            <Button variant="contained" onClikc={_handleClick}>Done</Button>
            
        </Box>
            
            <Card sx={{p:3}} >
            <Editor state={setEditorState} value={editorState} />
            </Card>
            
        </>
    )
}