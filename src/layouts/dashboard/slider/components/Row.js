import { Grid, Container, Stack, Typography, Card, Box, TextField, Button, } from '@mui/material';
import Chip from '@mui/material/Chip';
import { Icon } from '@iconify/react';

export default function Row({brand, data}) {
    const { name, image} = data;
    return (
        <>
            <Card sx={{width:"250px" , m:2}}>
                <Typography sx={{m:1}} variant="h5" gutterBottom component="div">
                    {name}
                </Typography>
                <Box sx={{m:1}}>
                    <img className="img-thumbnail" src={
                        process.env.REACT_APP_STATUS === "development" ?
                        `http://127.0.0.1:8000/storage/slider_image/${image}`
                        :
                        `${process.env.REACT_APP_PRODUCTION_PORT}/storage/slider_image/${image}`

                    } alt="smt"/>
                </Box>
                <Box sx={{ display:'flex', justifyContent : 'right',}}>
                    {
                    brand ?
                    <Chip label="Brand Name" color="primary" variant="outlined" size="small"/>
                    :
                    <></>
                    
                    }
                    
                    <Button>
                        <Icon icon="fluent:delete-32-regular" width={28} height={28}/>
                    </Button>
                </Box>
                
            </Card>
        </>
    )
}