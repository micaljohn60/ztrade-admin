import { useState } from 'react';

// material
import { Container, Stack, Typography, Card, Box, MenuItem, TextField, Button, Grid, Paper } from '@mui/material';
// components
import { Icon } from '@iconify/react';
import { styled } from '@mui/material/styles';
import { v4 as uuidv4 } from 'uuid';
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';



// ----------------------------------------------------------------------

const jobCategories = [
  {
    value: 'electronic',
    label: 'Electronic',
  },
  {
    value: 'fashion',
    label: 'Fashion',
  },
  {
    value: 'health care',
    label: 'Health Care',
  },
  {
    value: 'household_and_kitchen',
    label: 'Household & Kitchen',
  },
];

const Input = styled('input')({
  display: 'none',
});

export default function CreateProduct() {

  const [job_category, setJobCategory] = useState('sales and marketing');

  const [job_title, setTitle] = useState('');
  const [job_description, setJobDescription] = useState('');
  const [requirements, setRequirements] = useState('');
  const [salary, setSalary] = useState('0');
  const [skillInputFields, setSkillInputFields] = useState([{ id: uuidv4(), skillName: '' }])

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


  const handleChange = (event) => {
    setJobCategory(event.target.value);
  };


  const handleSubmit = (e) => {
    e.preventDefault()

    const data = {
      job_title,
      job_description,
      salary,
    }
    console.log(data)

  }

  return (
    <Page title="Create New Product">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom color="#108992">
            Create New Product
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
              <TextField id="outlined-basic" onChange={e => setTitle(e.target.value)} label="Product Title" variant="outlined" style={{ width: 800 }} sx={{ m: 2 }} error={job_title === ""} helperText={job_title === "" ? 'Empty field!' : ' '} />

            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center" >
              <TextField id="outlined-basic" onChange={e => setJobDescription(e.target.value)} error={job_description === ""} helperText={job_description === "" ? 'Empty field!' : ' '} label="Product Description Description" variant="outlined" style={{ width: 800 }} multiline rows={5} rowsMax={10} placeholder="Description of Job" fullWidth sx={{ m: 2 }} />
            </Box>

            <Box display="flex"
              alignItems="center"
              justifyContent="center">

              <TextField
                id="outlined-select-currency"
                select
                label="Select"
                value={job_category}
                onChange={handleChange}
                helperText="Please select a Product category"
                sx={{ m: 2 }}
              >
                {jobCategories.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                id="outlined-select-currency"
                select
                label="Select"
                value={job_category}
                onChange={handleChange}
                helperText="Please select a Product Sub category"
                sx={{ m: 2 }}
              >
                {jobCategories.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              <TextField id="outlined-basic" onChange={e => setSalary(e.target.value)} error={salary === ""} helperText={salary === "" ? 'Empty field!' : ' '} label="Product Price" variant="outlined" sx={{ m: 2 }} />

            </Box>

            

            <Box display="flex" alignItems="center" justifyContent="center">

              <Grid sx={{ flexGrow: 1 }} container spacing={2}>
                <Grid item xs={12}>
                  <Grid container justifyContent="center" spacing={1}>
                    {[0, 1, 2, 3, 4].map((value) => (
                      <Grid key={value} item>
                        <Card
                          sx={{
                            height: 240,
                            width: 200,
                            backgroundColor: (theme) =>
                              theme.palette.mode === 'dark' ? '#1A2027' : '#f5f5f5',
                          }}
                        >

                          <Grid 
                            container
                            spacing={0}
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            
                            >

                              <Grid item sx={{m:"50%"}}>
                                <label htmlFor="contained-button-file">
                                <Input accept="image/*" id="contained-button-file" multiple type="file" />
                                <Button variant="contained" component="span">
                                  <Icon icon="carbon:add-filled" />
                                </Button>
                                <Button variant="outlined" disabled  />
                                </label>
                              </Grid>
                            
                          </Grid>

                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>

            </Box>

          </Box>

        </Card>


      </Container>
    </Page>
  );
}