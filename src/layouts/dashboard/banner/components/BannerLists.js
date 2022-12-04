import * as React from 'react';
import { Box, Chip } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import BannerDelete from './BannerDelete';
import BannerEdit from './BannerEdit';



export default function BannerLists({banner,bannerId,state}) {
    const {name,image} = banner;
    return (
        <Card sx={{ width: 250, border: 1, borderColor: "#000", m: 1, ml:3 }} >
            <CardMedia
                component="img"
                height="140"
                image={process.env.REACT_APP_STATUS === "development" ?
                    `http://127.0.0.1:8000/storage/banner_image/${image}`
                    :
                    `${process.env.REACT_APP_PRODUCTION_PORT}/storage/banner_image/${image}`}
                alt="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
                <Box 
                    display="flex"
                    justifyContent='end'
                    alignItems='center'
                >
                    <BannerDelete bannerName={name} bannerId={bannerId} state={state}/>
                    <BannerEdit bannerName={name} bannerId={bannerId}/>
                    {/* <SliderDeleteDialog sliderName={name} sliderId={data.id}/>
                    <SliderEditDialog sliderName={name} sliderId={data.id} stores={stores} storeId={store_id}/> */}
                </Box>
               
            </CardContent>

        </Card>
    );
}