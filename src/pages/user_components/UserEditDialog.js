import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Icon } from '@iconify/react';

import { Box, FormControl, InputLabel, MenuItem, OutlinedInput, TextField } from '@mui/material';
import { updateStaff } from 'src/redux/actions/staff_actions';


export default function UserEditDialog({ userName, userRoles, userRole, userId, email }) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState(null);
    const [id, setId] = useState(null);
    const [roleId, setRoleId] = useState('');
    const dispatch = useDispatch();

    const [values, setValues] = useState({
        password: '',
        retypepassword: '',
        showPassword: false,
    });

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickOpen = () => {
        setId(userId)
        setName(userName);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleRoleChange = (event) => {
        setRoleId(event.target.value);
    };


    const handleUpdate = () => {
        const data = {
            "name": name,
            "password": values.password,
            "roles": roleId
        }
        dispatch(updateStaff(data,userId))

    }

    return (
        <div>
            <IconButton color="primary" aria-label="upload picture" component="label" onClick={handleClickOpen}>
                <Icon icon="ri:edit-line" sx={{ color: "#fff" }} />
            </IconButton>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"You Are Editing - " + userName}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        User Name - {userName} <br />
                        User Email - {email} <br />
                        User Role - {userRole} <br />

                        <Box
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <TextField sx={{ width: 450 ,mt:3}} id="outlined-basic" label="Set New Name" variant="outlined" onChange={(e) => setName(e.target.value)} />
                            <Box display="flex"

                                alignItems="center"
                                justifyContent="center" >
                                <FormControl sx={{ m: 1, width: 450}} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={values.showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        onChange={handleChange('password')}
                                        endAdornment={

                                            <Button
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {values.showPassword ? "Off" : "On"}
                                            </Button>

                                        }
                                        label="Password"
                                    />
                                </FormControl>


                            </Box>
                            <Box display="flex"

                                alignItems="center"
                                justifyContent="center" >
                                <FormControl sx={{ m: 1, width: 450 }} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">Retype Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={values.showPassword ? 'text' : 'password'}
                                        value={values.retypepassword}
                                        onChange={handleChange('retypepassword')}
                                        label="Retype Password"
                                    />
                                </FormControl>


                            </Box>
                            <TextField
                                id="outlined-select-currency"
                                select
                                label="Roles"

                                value={roleId}
                                onChange={handleRoleChange}
                                helperText="Please select a Role"
                                sx={{ m: 2, width: 450 }}

                            >
                                {userRoles.roles.map((option) => (
                                    <MenuItem key={option.id} value={option.id} >
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Box>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancle</Button>
                    <Button onClick={handleUpdate} autoFocus>
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}