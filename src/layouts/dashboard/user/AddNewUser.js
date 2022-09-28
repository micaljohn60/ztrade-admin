import { useState } from 'react';

// material
import { Container, Stack, Typography, Card, Box, MenuItem, TextField, Button, } from '@mui/material';
import IconButton from '@mui/material/IconButton';

// components
import { Icon } from '@iconify/react';
import { styled } from '@mui/material/styles';
import { v4 as uuidv4 } from 'uuid';
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';



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

    const [role, setRole] = useState('sales and marketing');
    const [userName, setUserName] = useState('');
    const [email, setUserEmail] = useState('');
    const [password, setUserPassword] = useState('');


    const [salary, setSalary] = useState('0');
    const [skillInputFields, setSkillInputFields] = useState([{ id: uuidv4(), skillName: '' }])

    const [values, setValues] = useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
      });
    
      const handleChange = (prop) => (event) => {
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


    const handleSubmit = (e) => {
        e.preventDefault()

        const data = {

        }
        console.log(data)

    }

    return (
        <Page title="Create New Product">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom color="#108992">
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
                            <TextField id="outlined-basic" onChange={e => setUserPassword(e.target.value)} label="User Password" variant="outlined" style={{ width: 800 }} sx={{ m: 2 }} error={password === ""} helperText={password === "" ? 'Empty field!' : ' '} />

                        </Box>

                        <Box display="flex"
                            alignItems="center"
                            justifyContent="center">

                            <TextField
                                id="outlined-select-currency"
                                select
                                label="Select"
                                value={role}
                                onChange={handleRoleChange}
                                helperText="Please select Role To Assign"
                                sx={{ m: 2 }}
                            >
                                {jobCategories.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>

                        </Box>


                    </Box>

                </Card>


            </Container>
        </Page>
    );
}