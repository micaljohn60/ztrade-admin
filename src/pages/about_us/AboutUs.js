import { useEffect, useState } from "react";
import draftToHtml from "draftjs-to-html";
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Card, Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import htmlToDraft from 'html-to-draftjs';
import { aboutusClenaup, getAboutUs, updateAboutUs } from "../../redux/actions/about_us_action";


export default function AboutUs() {

    const [editorState, setEditorState] = useState('');
    const dispatch = useDispatch();
    const aboutus = useSelector((state) => state.aboutus.aboutus);
    const isLoading = useSelector((state) => state.aboutus.loading);
    const message = useSelector((state) => state.aboutus.message);
    // const editorState = EditorState.createWithContent(contentState);



    const _handleClick = () => {

        const data = { "description": draftToHtml(convertToRaw(editorState.getCurrentContent())) }
        dispatch(updateAboutUs(data))
        // console.log(JSON.stringify(draftToHtml(convertToRaw(editorState.getCurrentContent()))))

    }

    useEffect(() => {
        dispatch(getAboutUs())
        
        const contentBlock = htmlToDraft(aboutus.description ?? "<p>Loaiding</p>");
        
        if(contentBlock){
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        const editorStateUpdate = EditorState.createWithContent(contentState);
        setEditorState(editorStateUpdate)
        }


    }, [isLoading])

    return (
        <>
            {
            isLoading
            ?            
            "loading"
            :
            <>
            {
                message.length >=1 ? 
                "message":
                ""
            }
            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ m: 3 }}>
                <h1>About us</h1>
                <Button variant="contained" onClick={_handleClick}>Done</Button>

            </Box>

            <Card sx={{ p: 3 }} >
                <Editor
                    editorState={editorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName border"
                    onEditorStateChange={setEditorState}
                />
            </Card>

            </>
        }
        </>
    )
}