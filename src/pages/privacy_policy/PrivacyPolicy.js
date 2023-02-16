import { useEffect, useState } from "react";
import draftToHtml from "draftjs-to-html";
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Card, Box, Button, CircularProgress, Alert } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import { useDispatch, useSelector } from "react-redux";
import htmlToDraft from 'html-to-draftjs';
import Editor from "../../share/Editor/Editor";
import { getPrivicyPolicy, updatePrivacyPolicy } from "src/redux/actions/about_us_action";

export default function PrivacyPolicy() {

    

    const [editorState, setEditorState] = useState('');
    const [open, setOpen] = useState(true);
    const dispatch = useDispatch();
    const aboutus = useSelector((state) => state.policy.policy);
    const isLoading = useSelector((state) => state.policy.loading);
    const isError = useSelector((state) => state.policy.error);
    const errorMessage = useSelector((state) => state.policy.errorMessage);
    const [confirm, setConfirm] = useState(false)
    const message = useSelector((state) => state.policy.message);
    // const editorState = EditorState.createWithContent(contentState);


    const _handleClick = () => {
        /* 
        For Backup
            // const data = { "description": draftToHtml(convertToRaw(editorState.getCurrentContent())) }
            // dispatch(updateAboutUs(data))
            // console.log(JSON.stringify(draftToHtml(convertToRaw(editorState.getCurrentContent()))))
        */
        const data = { "description": editorState }
        dispatch(updatePrivacyPolicy(data))
        setConfirm(true)
    }

    useEffect(() => {
        dispatch(getPrivicyPolicy())

        // const contentBlock = htmlToDraft(aboutus.description ?? "<p>Loaiding</p>");

        // if(contentBlock){
        // const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        // const editorStateUpdate = EditorState.createWithContent(contentState);

        // }
        if (!isLoading) {
            setEditorState(aboutus.description)
        }
        if (isError) {
            setConfirm(false)
        }



    }, [aboutus && aboutus.id, isError])

    return (
        <>
            {
                message.length > 0 ?
                    <Alert severity="success">{message}</Alert>
                    :
                    ""
            }
            {

                isError ?

                    <Collapse in={open}>
                        <Alert
                            severity="warning"
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setOpen(false);
                                    }}
                                >
                                    Close
                                </IconButton>
                            }
                            sx={{ mb: 2 }}
                        >
                            {errorMessage.message}
                        </Alert>
                    </Collapse>

                    :
                    ""

            }
            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ m: 3 }}>

                <h1>Privacy Policy</h1>
                {
                    confirm ?
                        <CircularProgress />
                        :
                        <Button variant="contained" onClick={_handleClick}>Done</Button>
                }


            </Box>
            {
                isLoading
                    ?
                    "loading"
                    :
                    <>
                        <Editor state={setEditorState} value={editorState} />

                    </>
            }

        </>
    )
}