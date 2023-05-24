import { useEffect, useState } from "react";
import draftToHtml from "draftjs-to-html";
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Card, Box, Button, CircularProgress, Alert, Grid, CardMedia } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import { useDispatch, useSelector } from "react-redux";
import htmlToDraft from 'html-to-draftjs';
import Editor from "../../share/Editor/Editor";
import { styled } from '@mui/material/styles';
import { Icon } from '@iconify/react';


import { aboutusClenaup, getAboutUs, updateAboutUs } from "../../redux/actions/about_us_action";
import Page from "src/components/Page";

const Input = styled('input')({
    display: 'none',
});

export default function AboutUs() {

    const [editorState, setEditorState] = useState('');
    const [image, setImage] = useState(null);
    const [isChange, setIsChange] = useState(null);
    const [open, setOpen] = useState(true);
    const dispatch = useDispatch();
    const aboutus = useSelector((state) => state.aboutus.aboutus);
    const isLoading = useSelector((state) => state.aboutus.loading);
    const isError = useSelector((state) => state.aboutus.error);
    const errorMessage = useSelector((state) => state.aboutus.errorMessage);
    const [confirm, setConfirm] = useState(false)
    const message = useSelector((state) => state.aboutus.message);
    // const editorState = EditorState.createWithContent(contentState);


    const _handleClick = () => {
        /* 
        For Backup
            // const data = { "description": draftToHtml(convertToRaw(editorState.getCurrentContent())) }
            // dispatch(updateAboutUs(data))
            // console.log(JSON.stringify(draftToHtml(convertToRaw(editorState.getCurrentContent()))))
        */
        const formData = new FormData();
        formData.append("description", editorState);
        formData.append("image", image);
        dispatch(updateAboutUs(formData))
        setConfirm(true)
    }

    useEffect(() => {
        dispatch(getAboutUs())

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
        <Page title="About Us">
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

                <h1>About us</h1>
                {
                    confirm ?
                        <CircularProgress />
                        :
                        <Button variant="contained" onClick={_handleClick}>Done</Button>
                }


            </Box>

            <Grid container spacing={2}>

                <Grid item xs={8}>
                    {
                        isLoading
                            ?
                            "loading"
                            :
                            <>
                                <Editor state={setEditorState} value={editorState} />

                            </>
                    }
                </Grid>
                <Grid item xs={4}>
                    <Card
                        sx={{
                            height: "100%",
                            width: 400,
                            border: '2px',
                            borderStyle: 'dotted',
                            backgroundColor: (theme) =>
                                theme.palette.mode === 'dark' ? '#1A2027' : '#f5f5f5',
                        }}
                    >

                        <Grid
                            container
                            spacing={0}
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            sx={{ mt: 1 }}
                        >

                            <label htmlFor="contained-button-file" className="mb-2">
                                <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={e => setImage(e.target.files[0])} />
                                <Button variant="contained" component="span" sx={{ mb: 1 }}>
                                    <Icon icon="carbon:add-filled" />
                                </Button>
                            </label>
                            <Grid container justifyContent="center" alignItems="center">
                                {
                                    
                                    <Box
                                        component="div"
                                    >
                                        <CardMedia
                                            component="img"
                                            sx={{ width: 300 }}
                                            image={image != null ? URL.createObjectURL(image) : "https://appstaging.ztrademm.com/storage/aboutus_image/"+aboutus.image}
                                            alt="about us image"
                                        />
                                    </Box>
                                }
                            </Grid>

                        </Grid>
                    </Card>
                </Grid>

            </Grid>

            {/* <Box display="flex" justifyContent="center">
                {
                    isLoading
                        ?
                        "loading"
                        :
                        <>
                            <Editor state={setEditorState} value={editorState} />

                        </>
                }

            
            </Box> */}




        </Page>
    )
}