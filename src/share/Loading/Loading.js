import { Box, Typography } from "@mui/material"
import loading from "../../images/loading.gif"

export default function Loading() {
    return (
        
        <Box style={{width:"100%",height:"60vh"}} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            <img src={loading} alt="Loading" style={{maxWidth : "300px" ,maxHeight : "150px"}}/>
            <Typography variant="subtitle1" gutterBottom>
                Loading
            </Typography>
        </Box>
        
    )
}