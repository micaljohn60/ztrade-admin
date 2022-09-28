import { Grid, Container, Stack, Typography, Card, Box, TextField, Button, MenuItem, CardMedia } from '@mui/material';
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
import { addSlider, fetchSlider } from '../../../redux/actions/slider_actions'


const Input = styled('input')({
    display: 'none',
});

const jobCategories = [
    {
        value: 'electronic',
        label: 'Electronic',
    },
    {
        value: 'fashion',
        label: 'Fashion',
    },
    {
        value: 'health care',
        label: 'Health Care',
    },
    {
        value: 'household_and_kitchen',
        label: 'Household & Kitchen',
    },
];

export default function SliderManagement() {

    const [job_category, setJobCategory] = useState('sales and marketing');
    const [radioValue, setRadioValue] = useState("homescreen")
    const [name, setName] = useState(null)
    const [image, setImage] = useState(null)

    const dispatch = useDispatch()

    const sliders = useSelector((state) => state.slider.sliders);

    const handleClick = (e) => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("image", image);
        formData.append("store_id", 0);
        if (radioValue === "homescreen") {
            dispatch(addSlider(formData))
        } else {
            console.log("hello")
        }
    }


    const handleRadioChange = (e) => {
        setRadioValue(e.target.value)
    }

    const handleChange = (event) => {
        setJobCategory(event.target.value);
    };

    useEffect(() => {
        dispatch(fetchSlider())
    }, [])

    return (
        <>
            <Page title="Create New Image Slider">

                <Container>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                        <Typography variant="h4" gutterBottom color="#108992">
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
                        <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label">Select one to add Slider</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={radioValue}
                                onChange={handleRadioChange}
                            >
                                <FormControlLabel value="homescreen" control={<Radio />} label="Home Screen" />
                                <FormControlLabel value="brands" control={<Radio />} label="Brands" />

                            </RadioGroup>
                        </FormControl>

                        <TextField
                            id="outlined-select-currency"
                            select
                            label="Select"
                            value={job_category}
                            onChange={handleChange}
                            helperText="Please select a Product Sub category"
                            sx={{ m: 2 }}
                        >
                            {jobCategories.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
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
                                                    height: 200,
                                                    width: 200,
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

                                                >

                                                    <label htmlFor="contained-button-file" className="mb-2">
                                                        <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={e => setImage(e.target.files[0])} />
                                                        <Button variant="contained" component="span" sx={{ mb: "2" }}>
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
                    <Grid sx={{ flexGrow: 1, mt: 5 }} container spacing={2}>
                        {
                            <Grid >
                                <Grid container justifyContent="start" spacing={3}>
                                    {
                                        sliders.map((slider) => (
                                            <Row data={slider} />
                                        ))
                                    }
                                </Grid>
                            </Grid>
                        }
                    </Grid>



                    {/* <Row data={sliders}/> */}


                </Container>



            </Page>
        </>
    )
}