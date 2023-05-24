import * as React from 'react';
import { Grid, Container, Stack, Typography, Card, Box, TextField, Button, MenuItem, CardMedia, Snackbar,Alert } from '@mui/material';
import { useState, useEffect } from 'react';
import MuiAlert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { styled } from '@mui/material/styles';
import { Icon } from '@iconify/react';
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import StoreList from './components/StoreList';

import { addStore, fetchStores, storeCleanUP } from '../../redux/actions/store_actions';
import StoreListCard from './components/StoreListCard';
import Loading from 'src/share/Loading/Loading';
import PermissionDenied from 'src/share/permission_denied/PermissionDenied';



const Input = styled('input')({
    display: 'none',
});

const CustomAlert = React.forwardRef((props, ref) => {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Store() {
    const [open, setOpen] = useState(false);
    const [brandId, setBrandId] = useState('sales and marketing');
    const [radioValue, setRadioValue] = useState("homescreen")
    const [name, setName] = useState('')
    const [image, setImage] = useState(null)

    const dispatch = useDispatch();

    const stores = useSelector((state) => state.store.stores);
    const loading = useSelector((state) => state.store.loading);
    const storeError = useSelector((state) => state.store.errorMessage);
    const isError = useSelector((state) => state.store.error);
    const storePermissionDenied = useSelector((state) => state.store.deninePermission);

    const [hasStoreCreatePermission, setHasStoreCreatePermission] = useState(false);
    
    const [hasStoreEditPermission, setHasStoreEditPermission] = useState(false);
    const [hasStoreUpdatePermission, setHasStoreUpdatePermission] = useState(false);
    const [hasStoreDeletePermission, setHasStoreDeletePermission] = useState(false);

    const staffLoading = useSelector((state) => state.user.isLoading);
    const staff = useSelector((state) => state.user.user);

    const handleClick = (e) => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("image", image);
        dispatch(addStore(formData));

    }

    const handleRadioChange = (e) => {
        setRadioValue(e.target.value)
    }

    const handleChange = (event) => {
        setBrandId(event.target.value);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const setStorePermission = (permissions) => {
        for (let i = 0; i < permissions.length; i++) {

            if (permissions[i].name == "brand-create") {
                setHasStoreCreatePermission(true)                
            }
            if(permissions[i].name == "brand-edit"){
                setHasStoreEditPermission(true)
            }
            if(permissions[i].name == "brand-delete"){
                setHasStoreDeletePermission(true)
            }
        }

    }

    useEffect(() => {
        dispatch(fetchStores())
        if (isError) {
            setOpen(true)
        }

        
        if (!staffLoading) {
            setStorePermission(staff.permissions)
        }

        return () => {
            setTimeout(() => {
                dispatch(storeCleanUP())
            }, 1000);

        }
    }, [staff && staff.permissions, isError])

    return (
        <>
            <Page title="Brands">
                {
                    staffLoading ?
                    <Loading/>
                    :
                    <>
                    {
                        !hasStoreCreatePermission  ?
                        <PermissionDenied/>
                        :
                        <Container>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>

                        {
                            isError ?
                                <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                                    <CustomAlert onClose={handleClose} severity="error" sx={{ width: '100%', }}>
                                        {storeError.errors.name} &nbsp;
                                        {storeError.errors.image}
                                        {
                                            storeError.errors.category_id ?
                                                "Please Select a category"
                                                :
                                                ""
                                        }
                                    </CustomAlert>
                                </Snackbar>
                                :
                                ""
                        }
                        <Typography variant="h4" gutterBottom color="#1B458D">
                            Create Brand
                        </Typography>
                        <Button
                            variant="contained"

                            onClick={handleClick}
                            startIcon={<Iconify icon="eva:plus-fill" />}
                        >
                            Confirm
                        </Button>
                    </Stack>

                    <Card >

                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: 'auto', height: "50%" },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <Box display="flex"
                                alignItems="center"
                                justifyContent="center" >
                                <TextField 
                                inputProps={{ maxLength: 20 }}
                                id="outlined-basic" label="Brand Name    " variant="outlined" fullWidth sx={{ m: 2 }} onChange={e => setName(e.target.value)} />
                            </Box>

                            <Grid sx={{ flexGrow: 1 }} container spacing={2}>
                                <Grid item xs={12}>
                                    <Grid container justifyContent="center" spacing={1}>
                                        <Grid item>
                                            <Card
                                                sx={{
                                                    height: 300,
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
                                                            image &&
                                                            <Box
                                                                component="div"
                                                            >
                                                                <CardMedia
                                                                    component="img"
                                                                    sx={{ width: 300 }}
                                                                    image={URL.createObjectURL(image)}
                                                                    alt="slider image"
                                                                />
                                                            </Box>
                                                        }
                                                    </Grid>

                                                </Grid>
                                            </Card>


                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>


                            {/* <Box m="auto">

                            </Box> */}

                        </Box>
                    </Card>
                    {
                        storePermissionDenied ?
                        <Alert severity="error">You don't have permission to view.</Alert>
                            :
                            <>
                                {
                                    loading ?
                                        "Loading"
                                        :
                                        <Grid sx={{ flexGrow: 1, mt: 5 }} container spacing={1}>
                                            {
                                                stores.length === 0 ?
                                                    "No Brands Here"
                                                    :
                                                    <Grid container justifyContent="start" spacing={1}>
                                                        {

                                                            stores.map((store) => (
                                                                <StoreListCard data={store} storeDeletePermission={hasStoreDeletePermission} storeEditPermission={hasStoreEditPermission} />

                                                            ))
                                                        }
                                                    </Grid>
                                            }
                                        </Grid>
                                }
                            </>
                    }


                </Container>
                    }
                    </>
                }

            </Page>
        </>
    )
}