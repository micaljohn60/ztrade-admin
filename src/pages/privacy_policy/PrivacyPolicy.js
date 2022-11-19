import { useState } from "react";
import draftToHtml from "draftjs-to-html";
import { EditorState,convertToRaw } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Card, Box, Button } from "@mui/material";

export default function PrivacyPolicy() {

    const [editorState,setEditorState] = useState(EditorState.createEmpty())
    const _handleClick = () =>(
        console.log(JSON.stringify(draftToHtml(convertToRaw(editorState.getCurrentContent()))))

    )

    return (
        <>
        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{m:3}}>
            <h1>Privacy Policy</h1>
            <Button variant="contained" onClikc={_handleClick}>Done</Button>
            
        </Box>
            
            <Card sx={{p:3}} >
            <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName border"
                onEditorStateChange={setEditorState}
            />
            </Card>
            
        </>
    )
}