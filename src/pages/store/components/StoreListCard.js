import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import StoreDeleteDialog from './StoreDeleteDialog';

export default function StoreListCard({ data }) {
    const { brand_name, image } = data;
    return (
        <Card sx={{ width: 300, border: 1, borderColor: "#000", m: 1 }} >
            <CardMedia
                component="img"
                height="140"
                image={process.env.REACT_APP_STATUS === "development" ?
                    `http://127.0.0.1:8000/storage/store_image/${image}`
                    :
                    `${process.env.REACT_APP_PRODUCTION_PORT}/storage/store_image/${image}`}
                alt="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {brand_name}
                </Typography>
            </CardContent>
            <CardActions>
                <StoreDeleteDialog storeName={brand_name} storeId={data.id} />
                {/* <Button size="small">Share</Button>
        <Button size="small">Learn More</Button> */}
            </CardActions>
        </Card>
    );
}