import { Grid, Container, Stack, Typography, Card, Box, TextField, Button, } from '@mui/material';
import Chip from '@mui/material/Chip';
import { Icon } from '@iconify/react';

export default function Row({brand}) {
    return (
        <>
        <Grid container spacing={1} sx={{mt:1}}>
            <Grid item md={2}>
                <Card>
                    <Typography sx={{m:1}} variant="h5" gutterBottom component="div">
                        Title
                    </Typography>
                    <Box sx={{m:1}}>
                        <img className="img-thumbnail" src="https://cmhlprodblobstorage1.blob.core.windows.net/sys-master-cmhlprodblobstorage1/h49/hba/9059128410142/EN_Homepage_Desktop.jpg" alt="smt"/>
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
            </Grid>
        </Grid>
            
        </>
    )
}