import { Box } from "@mui/material"
import permission_denine from "../../images/permission_denine.png"

export default function PermissionDenied(){
    return(
        <Box display="flex" justifyContent="center" alignItems="center">
        <img src={permission_denine}></img>
        </Box>
    )
}