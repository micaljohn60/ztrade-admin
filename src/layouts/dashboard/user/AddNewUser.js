import { useEffect, useState } from 'react';

// material
import { Container, Stack, Typography, Card, Box, TextField, Button, FormControl, InputLabel, OutlinedInput, MenuItem } from '@mui/material';
import IconButton from '@mui/material/IconButton';

// components
import { Icon } from '@iconify/react';
import { styled } from '@mui/material/styles';
import { v4 as uuidv4 } from 'uuid';
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRolesAndPermissions } from 'src/redux/actions/role_and_permissions_actions';
import Loading from 'src/share/Loading/Loading';
import { addNewStaff } from 'src/redux/actions/user_actions';
import PermissionDenied from 'src/share/permission_denied/PermissionDenied';



// ----------------------------------------------------------------------

const jobCategories = [
    {
        value: 'electronic',
        label: 'Editor',
    },
    {
        value: 'fashion',
        label: 'Editor-1',
    },
    {
        value: 'health care',
        label: 'Moderator',
    },
    {
        value: 'household_and_kitchen',
        label: 'SuperUser',
    },
];

const InputData = styled('input')({
    display: 'none',
});

export default function AddNewUser() {

    const [userName, setUserName] = useState('');
    const [email, setUserEmail] = useState('');
    const [password, setUserPassword] = useState('');
    const [role, setRole] = useState('');

    const [salary, setSalary] = useState('0');
    const [skillInputFields, setSkillInputFields] = useState([{ id: uuidv4(), skillName: '' }])

    const [values, setValues] = useState({
        password: '',
        retypepassword : '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleRetypePasswordChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleChangeInput = (id, event) => {
        const newInputField = skillInputFields.map(i => {
            if (id === i.id) {
                i[event.target.name] = event.target.value
            }
            return i;
        })
        setSkillInputFields(newInputField)
    }

    const handleAddFields = () => {
        setSkillInputFields([...skillInputFields, { id: uuidv4(), skillName: '' }])
    }

    const handleRemoveFields = id => {
        const values = [...skillInputFields];
        values.splice(values.findIndex(value => value.id === id), 1);
        setSkillInputFields(values);
    }


    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };


    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault()

        const data = {
            "name": userName,
            "email": email,
            "password": values.password,
            "factory_name" : "ZTrade",
            "confirm-password" : values.retypepassword,
            "roles": role,
            "profile_pic" : "user_profile.jpg"
        }
        dispatch(addNewStaff(data))

    }

    const staffLoading = useSelector((state) => state.user.isLoading);
    const staff = useSelector((state) => state.user.user);

    const roleAndPermissions = useSelector((state) => state.roleAndPermissions.roleAndPermission);
    const isLoading = useSelector((state) => state.roleAndPermissions.loading);

    const [hasUserCreatePermission, setHasUserCreatePermission] = useState(false);
    const [hasUserEditPermission, setHasUserEditPermission] = useState(false);
    const [hasUserListPermission, setHasUserListPermission] = useState(false);
    const [hasUserDeletePermission, setHasUserDeletePermission] = useState(false);

    const setUserPermission = (permissions) => {
        for (let i = 0; i < permissions.length; i++) {
          if (permissions[i].name == "user-create") {
            setHasUserCreatePermission(true)
          }
          if (permissions[i].name == "user-edit") {
            setHasUserEditPermission(true)
          }
          if (permissions[i].name == "user-list") {
            setHasUserListPermission(true)
          }
          if (permissions[i].name == "user-delete") {
            setHasUserDeletePermission(true)
          }
    
    
        }
    
      }

    useEffect(() => {
        if (!staffLoading) {
            setUserPermission(staff.permissions)
          }
        dispatch(fetchRolesAndPermissions())
    }, [staff && staff.permissions])

    return (
        <Page title="Add New User">
            <Container>
                {
                    staffLoading || isLoading ?
                        <Loading />
                        :
                        <>
                           {
                            !hasUserCreatePermission ?
                            <PermissionDenied/>
                            :
                            <>
                             <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                                <Typography variant="h4" gutterBottom color="#1B458D">
                                    Add New User
                                </Typography>
                                <Button
                                    variant="contained"

                                    onClick={handleSubmit}

                                    startIcon={<Iconify icon="eva:plus-fill" />}
                                >
                                    Confirm
                                </Button>
                            </Stack>

                            <Card>

                                <Box

                                    component="form"
                                    sx={{
                                        '& > :not(style)': { m: 1, width: '100%' },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <Box display="flex"

                                        alignItems="center"
                                        justifyContent="center" >
                                        <TextField id="outlined-basic" onChange={e => setUserName(e.target.value)} label="User Name" variant="outlined" style={{ width: 800 }} sx={{ m: 2 }} error={userName === ""} helperText={userName === "" ? 'Empty field!' : ' '} />

                                    </Box>
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center" >
                                        <TextField id="outlined-basic" onChange={e => setUserEmail(e.target.value)} label="User Email" variant="outlined" style={{ width: 800 }} sx={{ m: 2 }} error={email === ""} helperText={email === "" ? 'Empty field!' : ' '} />

                                    </Box>

                                    <Box display="flex"

                                        alignItems="center"
                                        justifyContent="center" >
                                        <FormControl sx={{ m: 1, width: 800 }} variant="outlined">
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
                                        <FormControl sx={{ m: 1, width: 800 }} variant="outlined">
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



                                    <Box display="flex"
                                        alignItems="center"
                                        justifyContent="center">

                                        <TextField
                                            id="outlined-select-currency"
                                            select
                                            label="Select Role"
                                            value={role}
                                            onChange={handleRoleChange}
                                            style={{ width: 800 }}
                                            helperText="Please select Role To Assign"
                                            sx={{ m: 2 }}
                                        >
                                            {roleAndPermissions.roles.map((option) => (
                                                <MenuItem key={option.id} value={option.id}>
                                                    {option.name}
                                                </MenuItem>
                                            ))}
                                        </TextField>

                                    </Box>


                                </Box>

                            </Card>
                            </>
                           }
                        </>
                }


            </Container>
        </Page>
    );
}