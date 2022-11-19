import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Container, Stack, Typography, Card, Box, TextField, Button, Alert, CardMedia } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Icon } from '@iconify/react';
import Row from '../../../share/row/Row';
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import { addBanner, fetchBanners } from '../../../redux/actions/banner_actions';
import BannerLists from './components/BannerLists';



const Input = styled('input')({
    display: 'none',
});

export default function BannerManagement() {

    const [name, setName] = useState('');
    const [image, setImage] = useState(null);

    const dispatch = useDispatch();

    const banners = useSelector((state) => state.banner.banners);
    const isLoading = useSelector((state) => state.banner.loading);


    const handleClick = (e) => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("image", image)

        dispatch(addBanner(formData))
    }

    useEffect(() => {
        dispatch(fetchBanners())
    }, [])

    return (
        <>
            {
                isLoading ?

                    "loading"

                    :
                    <Page title="Create New Banner">

                        <Container>
                            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                                <Typography variant="h4" gutterBottom color="#108992">
                                    Create New Banner
                                </Typography>
                                <Button
                                    variant="contained"

                                    onClick={handleClick}
                                    startIcon={<Iconify icon="eva:plus-fill" />}
                                >
                                    Confirm
                                </Button>
                            </Stack>

                            <Card>

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
                                                {[0,].map((value) => (
                                                    <Grid key={value} item>
                                                        <Card
                                                            sx={{
                                                                height: 240,
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

                                                                <Grid item sx={{ m: "10%" }}>
                                                                    <label htmlFor="contained-button-file">
                                                                        <Input accept="image/*" id="contained-button-file" type="file" onChange={(e) => setImage(e.target.files[0])} />
                                                                        <Button variant="contained" component="span">
                                                                            <Icon icon="carbon:add-filled" />
                                                                        </Button>
                                                                        {/* <Button variant="outlined" disabled /> */}
                                                                    </label>
                                                                </Grid>

                                                            </Grid>

                                                            <Grid container justifyContent="center" alignItems="center">
                                                                {
                                                                    image &&
                                                                    <Box
                                                                        component="div"
                                                                    >
                                                                        <CardMedia
                                                                            component="img"
                                                                            sx={{ width: 151 }}
                                                                            image={URL.createObjectURL(image)}
                                                                            alt="category_image"
                                                                        />
                                                                    </Box>
                                                                }
                                                            </Grid>

                                                        </Card>
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        </Grid>
                                    </Grid>


                                    {/* <Box m="auto">

                            </Box> */}

                                </Box>


                            </Card>


                            {
                                banners.length === 0 ?
                                    <Alert severity="warning" sx={{ mt: 3 }}>No Banners Create One</Alert>
                                    :
                                
                                banners.map((banner)=>(
                                    <BannerLists banner={banner} bannerId={banner.id}/>
                                ))
                                    
                            }




                        </Container>



                    </Page>
            }
        </>
    )
}