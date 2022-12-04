import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// material
import { Container, Stack, Typography, Card, CardMedia, Box, MenuItem, TextField, Button, Grid, Paper, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Snackbar, Checkbox } from '@mui/material';
// components
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { Icon } from '@iconify/react';
import { styled } from '@mui/material/styles';
import { v4 as uuidv4 } from 'uuid';
import { useSnackbar } from 'notistack';
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import { fetchStores } from '../../redux/actions/store_actions';
import { fetchCategories } from '../../redux/actions/category_actions';
import Dropzone from './components/DropZone';

import { addProduct, productCleanUp } from '../../redux/actions/product_actions';


// ----------------------------------------------------------------------


const Input = styled('input')({
  display: 'none',
});
// const CustomAlert = React.forwardRef((props, ref) => {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });
export default function CreateProduct() {
  const [open, setOpen] = useState(false);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [storeId, setStoreId] = useState('');
  const [loading,setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subCategory,setSubCategory]=useState('');
  const [skillInputFields, setSkillInputFields] = useState([{ id: uuidv4(), skillName: '' }])
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.categories.categories);
  const categoryLoading = useSelector((state) => state.categories.loading);
  const stores = useSelector((state) => state.store.stores);
  const storeLoading = useSelector((state) => state.store.loading);
  const isError = useSelector((state) => state.product.error);
  const productError = useSelector((state) => state.product.errorMessage);
  const [radioValue, setRadioValue] = useState("none");
  const [newArrival,setNewArrival] = useState(false);
  const [mostPopular,setMostPopular] = useState(false);
  const [topSellingProduct,setTopSellingProduct] = useState(false);
  const [newArrivalString,setNewArrivalString] = useState('0');
  const [mostPopularString,setMostPopularString] = useState('0');
  const [topSellingProductString,setTopSellingProductString] = useState('0');

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

  const _handleNewArrival = ()=>{
    if(!newArrival){
      setNewArrival(true)
      setNewArrivalString('1')
    }
    else{
      setNewArrival(false)
      setNewArrivalString('0')
    }
  }

  const _handleTopSellingProduct = ()=>{
    if(!topSellingProduct){
      setTopSellingProduct(true)
      setTopSellingProductString('1')
    }
    else{
      setTopSellingProduct(false)
      setTopSellingProductString('0')
    }
  }

  const _handleMostPopular = ()=>{
    if(!mostPopular){
      setMostPopular(true)
      setMostPopularString('1')
    }
    else{
      setMostPopular(false)
      setMostPopularString('0')
    }
  }

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

  const handleSubChange = (event,value) => {
    setSubCategories(value.sub_category)
    
  };

  const handleSubCategoryChange = (event) => {
    setSubCategory(event.target.value);
  };

  const handleStoreChange = (event) => {
    setStoreId(event.target.value);
  };


  const handleSubmit = (e) => {
    e.preventDefault()
    if(images.length <=0){
      alert("Need Image")
    }
    else{
      const formData = new FormData();
    for (let i = 0; i < images.length; i += 1) {
      formData.append(`thumbnails${i}`, images[i]);
    }
    formData.append('price', price);
    formData.append('name', name);
    formData.append('item_description', description);
    formData.append('category_id', categoryId);
    formData.append('percentage_id', 1);
    formData.append('store_id', radioValue === 'none' ? 0 : storeId);
    formData.append('image_list', images.length)
    formData.append('new_arrival',newArrivalString);
    formData.append('most_popular',mostPopularString);
    formData.append('top_selling',topSellingProductString);
    formData.append('subcategory_id',subCategory);
    const data = {
      "name": name,
      "price": price,
      "item_description": description,
      "thumbnails": images,
      "category_id": categoryId,
      "percentage_id": 1,
      "store_id": storeId
    }
    setLoading(true)
    dispatch(addProduct(formData))
    }

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

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    dispatch(fetchCategories())
    dispatch(fetchStores())
    if (isError) {
      setOpen(true)
      Object.values(productError.errors).map(error=>(
        enqueueSnackbar(error,{ variant: 'error'})
      ))
      setLoading(false);
     
    }

    return () => {
      setTimeout(() => {
        closeSnackbar()
        dispatch(productCleanUp())
      }, 2000);
    }

  }, [isError])

  return (
    <Page title="Create New Product">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>

        


          <Typography variant="h4" gutterBottom color="#1B458D">
            Create New Product
          </Typography>
         {
          loading?
          <CircularProgress />
          :
          <Button
          variant="contained"

          onClick={handleSubmit}
          color="primary"
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          Confirm
        </Button>
         }
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
                <FormLabel id="demo-row-radio-buttons-group-label">Is this product has a Brand? </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={radioValue}
                  onChange={handleRadioChange}
                >
                  <FormControlLabel value="none" control={<Radio />} label="None" />
                  <FormControlLabel value="yes" control={<Radio />} label="It has a Brand" />
                </RadioGroup>
              </FormControl>

              <TextField
                id="outlined-select-currency"
                select
                label="Select a releted Brand"
                value={storeId}
                onChange={handleStoreChange}
                helperText="Please select a Brand"
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

            <Box 
            display="flex"
            justifyContent="center"
            alignItems="center"
            >
              <Checkbox                
                checked={newArrival}
                onChange={_handleNewArrival}
                inputProps={{ 'aria-label': 'controlled' }}
              />
              <label>New Arrival</label>
              <Checkbox
              sx={{ml:4}}
                checked={mostPopular}
                onChange={_handleMostPopular}
                inputProps={{ 'aria-label': 'controlled' }}
              />
               <label>Most Popular</label>

               <Checkbox
              sx={{ml:4}}
                checked={topSellingProduct}
                onChange={_handleTopSellingProduct}
                inputProps={{ 'aria-label': 'controlled' }}
              />
               <label>Top Selling Product</label>
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
                  <MenuItem key={option.id} value={option.id} onClick={e=>handleSubChange(e,option)}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                id="outlined-select-currency"
                select
                label="Select"
                value={subCategory}
                onChange={handleSubCategoryChange}
                helperText="Please select a Product Sub category"
                sx={{ m: 2 }}
              >
                <MenuItem value="None">
                    None
                  </MenuItem>
                {subCategories.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>

              <TextField id="outlined-basic" type='number' onChange={e => setPrice(e.target.value)} error={price === ""} helperText={price === "" ? 'Empty field!' : ' '} label="Product Price" variant="outlined" sx={{ m: 2 }} />

            </Box>

            <Box display="flex" alignItems="center" justifyContent="center">
              {/* <Dropzone onDrop={onDrop} accept={"image/*"}/> */}

              <Grid sx={{ flexGrow: 1 }} container spacing={2}>
                <Grid item xs={12}>
                  <Grid container justifyContent="center" spacing={1}>
                    {[0,].map((value) => (
                      <Grid key={value} item>
                        <Card
                          className="border"
                          sx={{
                            height: 240,
                            width: 850,
                            border: '2px',
                            borderStyle: 'dotted',
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

                            <Grid item >
                              <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 2 }}>
                                <label htmlFor="contained-button-file" >
                                  <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={(e) => setImages(e.target.files)} />
                                  <Button variant="contained" component="span" >
                                    <Icon icon="carbon:add-filled" />
                                  </Button>



                                </label>
                              </Box>

                              <Box display="flex" justifyContent="center" alignItems="center">
                                {
                                  images.length === 0 ?
                                    <Typography variant="subtitle1" display="block" gutterBottom sx={{ mt: 3 }}>
                                      No Images, Use Ctrl to select Multiple Images
                                    </Typography>
                                    :

                                    Array.from(images).map((data) => (


                                      <CardMedia
                                        component="img"
                                        sx={{ width: 151, m: 1 }}
                                        image={URL.createObjectURL(data)}
                                        alt="category_image"
                                      />


                                    ))

                                }
                              </Box>

                            </Grid>


                          </Grid>

                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>


            </Box>

            {/* <Button variant="contained" component="span" onClick={fileHandler}>
              Show
            </Button> */}
          </Box>

        </Card>


      </Container>
    </Page>
  );
}