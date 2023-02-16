import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { Grid, TextField, Button, Card, Box,Alert } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addRoleAndPermissionAction, fetchRolesAndPermissions } from 'src/redux/actions/role_and_permissions_actions';
import Loading from 'src/share/Loading/Loading';
import PermissionDenied from 'src/share/permission_denied/PermissionDenied';
import RoleAndPermissionDialog from './components/RoleAndPermissionsDialog';


export default function RolesAndPermissions() {
    // const permissions = ["create items", "delete items", "view items", "update items"];
    const [name, setName] = useState('');
    const [permissions, setPermissions] = useState([]);
    const roleAndPermissions = useSelector((state) => state.roleAndPermissions.roleAndPermission);
    const isLoading = useSelector((state) => state.roleAndPermissions.loading);
    const dispatch = useDispatch();

    const staffLoading = useSelector((state) => state.user.isLoading);
    const staff = useSelector((state) => state.user.user);

    const [hasRoleCreatePermission, setHasRoleCreatePermission] = useState(false);
    const [hasRoleEditPermission, setHasRoleEditPermission] = useState(false);
    const [hasRoleListPermission, setHasRoleListPermission] = useState(false);
    const [hasRoleDeletePermission, setHasRoleDeletePermission] = useState(false);

    const setRolePermission = (permissions) => {
        for (let i = 0; i < permissions.length; i++) {
            if (permissions[i].name == "role-create") {
                setHasRoleCreatePermission(true)
            }
            if (permissions[i].name == "role-edit") {
                setHasRoleEditPermission(true)
            }
            if (permissions[i].name == "role-list") {
                setHasRoleListPermission(true)
            }
            if (permissions[i].name == "role-delete") {
                setHasRoleDeletePermission(true)
            }


        }

    }

    useEffect(() => {
        dispatch(fetchRolesAndPermissions())
        if (!staffLoading) {
            setRolePermission(staff.permissions)
        }
    }, [staff && staff.permissions])

    const addRoleAndPermission = () => {
        const data = {
            "name": name,
            "permission[]": permissions
        }
        console.log(data);
        dispatch(addRoleAndPermissionAction(data))
    }
    const handleChange = (value) => {
        if (permissions.includes(value)) {
            setPermissions(permissions.filter(item => item != value));

        }
        else {
            setPermissions([...permissions, value])
        }

    }



    return (
        <>
            {
                staffLoading || isLoading?
                    <Loading />
                    :
                    <>
                        {
                            !hasRoleCreatePermission && !hasRoleListPermission ?
                                <PermissionDenied />
                                :
                                <>
                                    {
                                        hasRoleCreatePermission ?
                                            <>
                                                <Card>
                                                    <Box sx={{ m: 3 }}>
                                                        <TextField
                                                            required
                                                            id="outlined-required"
                                                            label="Role Name"
                                                            onChange={(e) => setName(e.target.value)}
                                                        />
                                                        <Button variant="outlined" sx={{ m: 1 }} onClick={addRoleAndPermission}>Add New Role</Button>
                                                    </Box>

                                                    <FormGroup>
                                                        <Grid container spacing={1} sx={{ mt: 1, m: 2 }}>

                                                            {
                                                                roleAndPermissions.permissions.map((permission, index) => (
                                                                    <Grid item key={index} xs={3} md={3}>
                                                                        <FormControlLabel control={<Switch onChange={e => handleChange(permission.id)} />} label={permission.name} />
                                                                    </Grid>
                                                                ))
                                                            }

                                                        </Grid>
                                                    </FormGroup>
                                                </Card>

                                                {
                                                    !hasRoleListPermission ?
                                                        <Alert severity="error" sx={{ mt: 3 }}>You Don't have permission to view</Alert>
                                                        :
                                                        <>
                                                            <Card sx={{ mt: 2 }}>

                                                                <TableContainer component={Paper}>
                                                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                                                        <TableHead>
                                                                            <TableRow>
                                                                                <TableCell>No</TableCell>
                                                                                <TableCell align="left">Role Name</TableCell>
                                                                                <TableCell align="left">Action</TableCell>

                                                                            </TableRow>
                                                                        </TableHead>
                                                                        <TableBody>

                                                                            {
                                                                                roleAndPermissions.roles.map((role, index) => (
                                                                                    <TableRow
                                                                                        key={index}
                                                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                                    >


                                                                                        <TableCell >
                                                                                            {index + 1}
                                                                                        </TableCell>
                                                                                        <TableCell>
                                                                                            {role.name}
                                                                                        </TableCell>
                                                                                        <TableCell align="left">
                                                                                            <RoleAndPermissionDialog roleId={role.id} roleTitle={role.name} myPermissions={role.permissions}/>
                                                                                        </TableCell>



                                                                                    </TableRow>
                                                                                ))
                                                                            }

                                                                        </TableBody>
                                                                    </Table>
                                                                </TableContainer>

                                                            </Card>
                                                        </>
                                                }
                                            </>
                                            :
                                            <>
                                                            <Card sx={{ mt: 2 }}>

                                                                <TableContainer component={Paper}>
                                                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                                                        <TableHead>
                                                                            <TableRow>
                                                                                <TableCell>No</TableCell>
                                                                                <TableCell align="left">Role Name</TableCell>
                                                                                <TableCell align="left">Action</TableCell>

                                                                            </TableRow>
                                                                        </TableHead>
                                                                        <TableBody>

                                                                            {
                                                                                roleAndPermissions.roles.map((role, index) => (
                                                                                    <TableRow
                                                                                        key={index}
                                                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                                    >


                                                                                        <TableCell >
                                                                                            {index + 1}
                                                                                        </TableCell>
                                                                                        <TableCell>
                                                                                            {role.name}
                                                                                        </TableCell>
                                                                                        <TableCell align="left">
                                                                                            ND
                                                                                        </TableCell>



                                                                                    </TableRow>
                                                                                ))
                                                                            }

                                                                        </TableBody>
                                                                    </Table>
                                                                </TableContainer>

                                                            </Card>
                                                        </>
                                    }
                                </>
                        }
                    </>

            }

        </>
    )
}