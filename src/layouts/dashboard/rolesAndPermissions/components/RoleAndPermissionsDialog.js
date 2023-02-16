import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControlLabel, FormGroup, Grid, IconButton, Switch, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import { useDispatch } from 'react-redux';
import { deleteRole } from 'src/redux/actions/role_and_permissions_actions';
import { useState } from 'react';

export default function RoleAndPermissionDialog({ roleTitle, myPermissions,roleId }) {
    const [open, setOpen] = useState(false);
    const [loading,isLoading] = useState(false);
    const dispatch = useDispatch()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleDelete = () =>{
        dispatch(deleteRole(roleId))
        setOpen(false);
    }   

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <IconButton color="primary" aria-label="upload picture" component="label" onClick={handleClickOpen}>
                <Icon icon="mingcute:more-3-line" sx={{ color: "#fff" }} />
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {roleTitle}
                    
                </DialogTitle>
                <Typography variant="h6" sx={{ml:4}}>
                    "{roleTitle}" has Following Permissions
                    </Typography>
                <DialogContent sx={{ width: "600px" }}>
                    <DialogContentText id="alert-dialog-description">
                        <FormGroup>
                            <Grid container spacing={1} sx={{ mt: 1, m: 2 }}>

                                {
                                    myPermissions.map((permission, index) => (
                                        <Grid item key={index} xs={4} md={4}>
                                            <Typography>{permission.name}</Typography>
                                        </Grid>
                                    ))
                                }

                            </Grid>
                        </FormGroup>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {
                        roleTitle == "Super Admin" || roleTitle == "Admin" ?
                        "You Cannot Delete Super Admin: Super Admin must remain untouch"
                        :
                        <IconButton color="error" aria-label="upload picture" component="label" onClick={handleDelete}>            
                            <Icon icon="icon-park-solid:delete-five" sx={{color: "#fff"}}/>
                        </IconButton>
                        
                    }
                    <Button onClick={handleClose} autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}