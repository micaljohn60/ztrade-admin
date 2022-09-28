import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { Grid, TextField, Button, Card, Box } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Icon } from '@iconify/react';


export default function RolesAndPermissions() {
    const permissions = ["create items", "delete items", "view items", "update items"];
    return (
        <>
            <Card>
                <Box sx={{ m: 3 }}>
                    <TextField
                        required
                        id="outlined-required"
                        label="Required"
                        defaultValue="Editor"
                    />
                    <Button variant="outlined" sx={{ m: 1 }}>Add New Role</Button>
                </Box>

                <FormGroup>
                    <Grid container spacing={1} sx={{ mt: 1 }}>

                        {
                            permissions.map((permission, index) => (
                                <Grid item>
                                    <FormControlLabel control={<Switch />} label={permission} />
                                </Grid>
                            ))
                        }

                    </Grid>
                </FormGroup>
            </Card>

            <Card sx={{mt:2}}>

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
                            
                            <TableRow
                                key={Math.floor(Math.random() * 10)}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell >
                                    1
                                </TableCell>
                                <TableCell>
                                    Editor
                                </TableCell>
                                <TableCell align="left">
                                    <Icon icon="fluent:delete-48-regular" width={28} height={28}/>
                                </TableCell>
                                
                            </TableRow>
                        
                        </TableBody>
                    </Table>
                </TableContainer>

            </Card>

        </>
    )
}