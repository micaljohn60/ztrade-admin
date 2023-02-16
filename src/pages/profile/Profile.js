import { Grid, Card, TextField, Box, Avatar, Typography, CardHeader, Button } from "@mui/material";
import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "src/redux/actions/user_actions";
import Loading from "src/share/Loading/Loading";

export default function Profile() {

    const [name,setName] = useState('');
    const [image,setImage] = useState('');
    const dispatch = useDispatch();
    
    const isLoading = useSelector((state) => state.user.isLoading);
    const user = useSelector((state) => state.user.user);

    const updateUser=()=>{
        const formData = FormData();
        formData.append("name",name);
        formData.append("image",image);
        dispatch()
    }

    useEffect(()=>{
        dispatch(loadUser())

    },[])

    return (
        <>
        {
            isLoading?
            <Loading/>
            :
            <>
            <Grid container
                direction="row">
        <Grid item md={10} sx={{mb:2}}>
        <Box display="flex" justifyContent="end" >
            <Button variant="contained" component="label">
                Update Profile
            </Button>
        </Box>
        </Grid>
        </Grid>
            <Grid container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                gap={2}
            >
                <Grid item md={7}>
                    <Card >
                        <Box sx={{ m: 5 }}>
                            <Grid container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                                gap={2}>

                                <Grid item md={5}>
                                    <TextField
                                        fullWidth
                                        required
                                        id="outlined-required"
                                        label="User Name"
                                        defaultValue={user.user.name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </Grid>
                                <Grid item md={5}>
                                    <TextField
                                        fullWidth
                                        required
                                        id="outlined-required"
                                        label="Email"
                                        disabled
                                        defaultValue={user.user.email}
                                    />
                                </Grid>
                                <Grid item md={10}>
                                    <a href="">Change Password</a>
                                </Grid>
                            </Grid>
                        </Box>
                    </Card>
                    <Card sx={{ mt: 3 }}>
                        <Typography variant="h5" gutterBottom sx={{ m: 3 }}>
                            Roles and Permissions
                        </Typography>
                        <Box sx={{ m: 5 }}>
                            <Grid container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                                gap={2}>



                            </Grid>
                        </Box>
                    </Card>
                </Grid>
                <Grid item md={3}>
                    <Card >
                        <Grid container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            gap={2}>

                            <Avatar sx={{ bgcolor: "#1B458D", mt: 3, width: 90, height: 90 }} >
                            {user.user.name[0]}
                            </Avatar>

                            <Typography variant="h5" gutterBottom>
                                {user.user.name}
                            </Typography>

                        </Grid>

                    </Card>

                    <Card sx={{ mt: 3 }}>

                        <Box sx={{ mb: 3 }}>
                            <CardHeader
                                avatar={
                                    <Avatar sx={{ bgcolor: "#1B458D" }} aria-label="recipe">
                                        R
                                    </Avatar>
                                }

                                title="Change your Profile"

                            />
                            <Box display="flex" justifyContent="center">
                            <Button variant="contained" component="label" sx={{mt:2}} onChange={(e) => setImage(e.target.files[0])}>
                                Select File
                                <input hidden accept="image/*" multiple type="file" />
                            </Button>
                            </Box>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
            </>
        }
        </>
    );
}