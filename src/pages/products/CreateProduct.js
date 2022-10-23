import { useState, useEffect,useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// material
import { Container, Stack, Typography, Card, CardMedia, Box, MenuItem, TextField, Button, Grid, Paper, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
// components
import { Icon } from '@iconify/react';
import { styled } from '@mui/material/styles';
import { v4 as uuidv4 } from 'uuid';
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import { fetchStores } from '../../redux/actions/store_actions';
import { fetchCategories } from '../../redux/actions/category_actions';
import Dropzone from './components/DropZone';

import { addProduct } from '../../redux/actions/product_actions';


// ----------------------------------------------------------------------


const Input = styled('input')({
  display: 'none',
});

export default function CreateProduct() {

  const [job_category, setJobCategory] = useState('sales and marketing');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [storeId,setStoreId] = useState('');
  const [salary, setSalary] = useState('0');
  const [images, setImages] = useState([]);
  const [skillInputFields, setSkillInputFields] = useState([{ id: uuidv4(), skillName: '' }])
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.categories.categories);
  const categoryLoading = useSelector((state) => state.categories.loading);
  const stores = useSelector((state) => state.store.stores);
  const storeLoading = useSelector((state) => state.store.loading);
  const [radioValue, setRadioValue] = useState("none")

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.map((file) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        setImages((prevState) => [
          ...prevState,
          { id: uuidv4(), src: e.target.files },
        ]);
      };
      reader.readAsDataURL(file);
      return file;
    });
  }, [])

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
    setCategoryId(event.target.value);
  };

  const handleStoreChange = (event) => {
    setStoreId(event.target.value);
  };


  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData();
    for (let i = 0; i < images.length; i += 1) {
      formData.append(`thumbnails${i}`, images[i]);
    }
    formData.append('price',price);
    formData.append('name',name);
    formData.append('item_description',description);
    formData.append('category_id',categoryId);
    formData.append('percentage_id',1);
    formData.append('store_id',radioValue === 'none' ? 0 : storeId);
    formData.append('image_list', images.length)
    
    const data = {
      "name" : name,
      "price" : price,
      "item_description" : description,
      "thumbnails" : images,
      "category_id" : categoryId,
      "percentage_id" : 1,
      "store_id" : storeId
    }
    dispatch(addProduct(formData))
    console.log(formData.get('thumbnails0'))
    console.log(formData.get('thumbnails1'))

  }

  const fileHandler = (event) => {
    const formData = new FormData();
    for (let i = 0; i < images.length; i += 1) {
      formData.append(`files`, images[i])
    }
  }

  const handleRadioChange = (e) => {
    setRadioValue(e.target.value)
  }

  useEffect(() => {
    dispatch(fetchCategories())
    dispatch(fetchStores())
  }, [])

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
              <TextField id="outlined-basic" onChange={e => setName(e.target.value)} label="Product Title" variant="outlined" style={{ width: 800 }} sx={{ m: 2 }} error={name === ""} helperText={name === "" ? 'Empty field!' : ' '} />

            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center" >
              <TextField id="outlined-basic" onChange={e => setDescription(e.target.value)} error={description === ""} helperText={description === "" ? 'Empty field!' : ' '} label="Product Description Description" variant="outlined" style={{ width: 800 }} multiline rows={5} rowsMax={10} placeholder="Description of Job" fullWidth sx={{ m: 2 }} />
            </Box>

            <Box display="flex" alignItems="center" justifyContent="Center">
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">Is this product has a store? </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={radioValue}
                  onChange={handleRadioChange}
                >
                  <FormControlLabel value="none" control={<Radio />} label="None" />
                  <FormControlLabel value="yes" control={<Radio />} label="It has a Store" />
                </RadioGroup>
              </FormControl>

              <TextField
                id="outlined-select-currency"
                select
                label="Select a releted store"
                value={storeId}
                onChange={handleStoreChange}
                helperText="Please select a Store"
                disabled={radioValue === "none" ? `true` : false}
                sx={{ m: 2 }}
              >
                {stores.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.brand_name}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            <Box display="flex"
              alignItems="center"
              justifyContent="center">

              <TextField
                id="outlined-select-currency"
                select
                label="Select"
                value={categoryId}
                onChange={handleChange}
                helperText="Please select a Product category"
                sx={{ m: 2 }}
              >
                {categories.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>

              <TextField id="outlined-basic" onChange={e => setPrice(e.target.value)} error={price === ""} helperText={price === "" ? 'Empty field!' : ' '} label="Product Price" variant="outlined" sx={{ m: 2 }} />

            </Box>

            <Box display="flex" alignItems="center" justifyContent="center">
              {/* <Dropzone onDrop={onDrop} accept={"image/*"}/> */}

              <Grid sx={{ flexGrow: 1 }} container spacing={2}>
                <Grid item xs={12}>
                  <Grid container justifyContent="center" spacing={1}>
                    {[0,].map((value) => (
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

                            <Grid item sx={{ m: "50%" }}>
                              <label htmlFor="contained-button-file">
                                <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={(e) => setImages(e.target.files)} />
                                <Button variant="contained" component="span" >
                                  <Icon icon="carbon:add-filled" />
                                </Button>


                                <Button variant="outlined" disabled />
                              </label>
                              {
                                images.length === 0 ?
                                "No Images"
                                :
                                
                                  Array.from(images).map((data) => (
                                 
                                    <CardMedia
                                      component="img"
                                      sx={{ width: 151 }}
                                      image={URL.createObjectURL(data)}
                                      alt="category_image"
                                    />
                                    
                                  ))
                                
                                
                              }
                            </Grid>


                          </Grid>

                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>

            </Box>
            <Button variant="contained" component="span" onClick={fileHandler}>
              Show
            </Button>
          </Box>

        </Card>


      </Container>
    </Page>
  );
}