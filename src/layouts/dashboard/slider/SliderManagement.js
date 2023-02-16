import * as React from 'react';
import { Grid, Container, Stack, Typography, Card, Box, TextField, Button, MenuItem, CardMedia, Snackbar, Alert, Tooltip } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { styled } from '@mui/material/styles';
import { Icon } from '@iconify/react';
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import Row from './components/Row'
import { addSlider, fetchSlider, sliderCleanUp } from '../../../redux/actions/slider_actions'
import { fetchStores } from '../../../redux/actions/store_actions';
import SliderListsCard from './components/SliderListsCard';
import Loading from 'src/share/Loading/Loading';
import PermissionDenied from 'src/share/permission_denied/PermissionDenied';




const Input = styled('input')({
    display: 'none',
});

const CustomAlert = React.forwardRef((props, ref) => {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function SliderManagement() {

    const [brandId, setBrandId] = useState('sales and marketing');
    const [open, setOpen] = useState(false);
    const [radioValue, setRadioValue] = useState("homescreen")
    const [name, setName] = useState('')
    const [image, setImage] = useState(null)

    const dispatch = useDispatch()

    const [hasSliderCreatePermission, setHasSliderCreatePermission] = useState(false);
    const [hasSliderEditPermission, setHasSliderEditPermission] = useState(false);
    const [hasSliderUpdatePermission, setHasSliderUpdatePermission] = useState(false);
    const [hasSliderDeletePermission, setHasSliderDeletePermission] = useState(false);
    const [hasBrandListPermission, setHasBrandListPermission] = useState(false);


    const sliders = useSelector((state) => state.slider.sliders);
    const sliderLoading = useSelector((state) => state.slider.loading);
    const slidersGetDenied = useSelector((state) => state.slider.deninePermission);
    const stores = useSelector((state) => state.store.stores);
    const sliderError = useSelector((state) => state.slider.errorMessage);
    const isError = useSelector((state) => state.slider.error);
    const staffLoading = useSelector((state) => state.user.isLoading);
    const staff = useSelector((state) => state.user.user);

    const handleClick = (e) => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("image", image);

        if (radioValue === "homescreen") {
            formData.append("store_id", 0);
            dispatch(addSlider(formData))
        } else {
            formData.append("store_id", brandId);
            dispatch(addSlider(formData))
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const setSliderPermission = (permissions) => {
        for (let i = 0; i < permissions.length; i++) {
           
            if (permissions[i].name == "brand-list") {
                setHasBrandListPermission(true)                
            }
            if (permissions[i].name == "slider-create") {
                setHasSliderCreatePermission(true)                
            }
            if(permissions[i].name == "slider-edit"){
                setHasSliderEditPermission(true)
            }
            if(permissions[i].name == "slider-delete"){
                setHasSliderDeletePermission(true)
            }


        }

    }


    const handleRadioChange = (e) => {
        setRadioValue(e.target.value)
    }

    const handleChange = (event) => {
        setBrandId(event.target.value);
    };

    useEffect(() => {
        dispatch(fetchSlider())
        dispatch(fetchStores())

        if (isError) {
            setOpen(true)
        }


        if (!staffLoading) {
            setSliderPermission(staff.permissions)
        }

        return () => {
            setTimeout(() => {
                dispatch(sliderCleanUp())
            }, 1000);

        }
    }, [staff && staff.permissions, isError])

    return (
        <>
            <Page title="Create New Image Slider">
                {

                    staffLoading ?
                    <Loading/>
                    :
                    <>
                    {
                        !hasSliderCreatePermission || slidersGetDenied ?
                        <PermissionDenied/>
                        :
                        <Container>
                    {
                        hasSliderCreatePermission ?
                            <>
                                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>

                                    {
                                        isError ?
                                            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                                                <CustomAlert onClose={handleClose} severity="error" sx={{ width: '100%', }}>
                                                    {sliderError.errors.name} &nbsp;
                                                    {sliderError.errors.image}
                                                    {
                                                        sliderError.errors.slider_id ?
                                                            "Please Select a Store"
                                                            :
                                                            ""
                                                    }
                                                </CustomAlert>
                                            </Snackbar>
                                            :
                                            ""
                                    }
                                    <Typography variant="h4" gutterBottom color="#1B458D">
                                        Create New Image Slider
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
                                    <FormControl sx={{ ml: 2, mt: 2 }}>
                                        <FormLabel id="demo-row-radio-buttons-group-label">Select one to add Slider</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                            value={radioValue}
                                            onChange={handleRadioChange}
                                        >
                                            <FormControlLabel value="homescreen" control={<Radio />} label="Home Screen" />
                                            <Tooltip  title={hasBrandListPermission ? "" : "You Do Not Have Permissio to select Brands" }>
                                                <FormControlLabel value="brands" control={<Radio />} label="Brands" disabled={hasBrandListPermission ? 0 : 1}/>

                                            </Tooltip>

                                        </RadioGroup>
                                    </FormControl>

                                    <TextField
                                        id="outlined-select-currency"
                                        select
                                        label="Select"
                                        value={brandId}
                                        onChange={handleChange}
                                        helperText="Please select a Brand"
                                        sx={{ m: 2 }}
                                        disabled={radioValue === "homescreen" ? `true` : false}
                                    >
                                        {stores.map((option) => (
                                            <MenuItem key={option.id} value={option.id} >
                                                {option.brand_name}
                                            </MenuItem>
                                        ))}
                                    </TextField>

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
                                            <TextField id="outlined-basic" label="Slider Title" variant="outlined" fullWidth sx={{ m: 2 }} onChange={e => setName(e.target.value)} />
                                        </Box>

                                        <Grid sx={{ flexGrow: 1 }} container spacing={2}>
                                            <Grid item xs={12}>
                                                <Grid container justifyContent="center" spacing={1}>
                                                    <Grid item>
                                                        <Card
                                                            sx={{
                                                                height: 240,
                                                                width: 500,
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
                                                                sx={{ mt: 2 }}
                                                            >

                                                                <label htmlFor="contained-button-file" className="mb-2">
                                                                    <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={e => setImage(e.target.files[0])} />
                                                                    <Button variant="contained" component="span" >
                                                                        <Icon icon="carbon:add-filled" />
                                                                    </Button>
                                                                </label>


                                                                <Grid container justifyContent="center" alignItems="center" sx={{ mt: 2 }}>
                                                                    {
                                                                        image &&
                                                                        <Box
                                                                            component="div"
                                                                        >
                                                                            <CardMedia
                                                                                component="img"
                                                                                sx={{ width: 480 }}
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
                                    </Box>
                                </Card>
                            </>
                            :
                            <Alert severity="error" sx={{ mt: 3 }}>You Don't have permission to create slider</Alert>
                    }

                    {



                        // staffLoading ?
                        //     "Loading"
                        //     :
                        //     staff.permissions.filter((permission => permission.name === "slider-list").map(data=>(
                        //         <Alert severity="error" sx={{ mt: 3 }}>You Don't have Permission to see the Slider List</Alert>
                        //     )
                        //     )

                        // <Alert severity="error" sx={{ mt: 3 }}>You Don't have Permission to see the Slider List</Alert>
                        // :
                        // <>

                        //     {
                        //         sliders.length === 0 ?
                        //             <Alert severity="warning" sx={{ mt: 3 }}>No Sliders Here! Create New One</Alert>
                        //             :
                        //             <Grid sx={{ flexGrow: 1, mt: 5 }} container spacing={1}>
                        //                 {
                        //                     <Grid >
                        //                         <Grid container justifyContent="start" spacing={2}>
                        //                             {
                        //                                 sliders.map((slider) => (
                        //                                     <SliderListsCard data={slider} stores={stores} />
                        //                                     // <Row data={slider} />
                        //                                 ))
                        //                             }
                        //                         </Grid>
                        //                     </Grid>
                        //                 }
                        //             </Grid>
                        //     }
                        // </>
                        // )
                    }
                    {
                        sliderLoading ?
                            "Loading"
                            :
                            slidersGetDenied ?
                                <Alert severity="error" sx={{ mt: 3 }}>You Don't have Permission to see the Slider List</Alert>
                                :

                                <>
                                    {
                                        sliders.length === 0 ?
                                            <Alert severity="warning" sx={{ mt: 3 }}>No Sliders Here!</Alert>
                                            :
                                            <Grid sx={{ flexGrow: 1, mt: 5 }} container spacing={1}>
                                                {
                                                    <Grid >
                                                        <Grid container justifyContent="start" spacing={2}>
                                                            {
                                                                sliders.map((slider) => (
                                                                    <SliderListsCard data={slider} stores={stores} editPermission={hasSliderEditPermission} deletePermission={hasSliderDeletePermission}/>
                                                                    // <Row data={slider} />
                                                                ))
                                                            }
                                                        </Grid>
                                                    </Grid>
                                                }
                                            </Grid>
                                    }

                                </>

                    }






                    {/* <Row data={sliders}/> */}


                </Container>
                    }
                    </>
                }



            </Page>
        </>
    )
}
