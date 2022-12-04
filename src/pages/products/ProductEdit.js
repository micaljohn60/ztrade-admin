import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// material
import { Container, Stack, Typography, Card, CardMedia, Box, MenuItem, TextField, Button, Grid, Paper, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Snackbar, Checkbox, Alert } from '@mui/material';
// components
import CircularProgress from '@mui/material/CircularProgress';
import { useParams } from 'react-router-dom';
import MuiAlert from '@mui/material/Alert';
import { Icon } from '@iconify/react';
import { styled } from '@mui/material/styles';
import { v4 as uuidv4 } from 'uuid';
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import { fetchStores } from '../../redux/actions/store_actions';
import { fetchCategories } from '../../redux/actions/category_actions';
import Dropzone from './components/DropZone';

import { addProduct, fetchSingleProducts, productCleanUp, singleProductCleanUp, updateProduct } from '../../redux/actions/product_actions';
import DeleteProductImage from './components/DeleteProductImage';
import Loading from '../../share/Loading/Loading';


// ----------------------------------------------------------------------


const Input = styled('input')({
    display: 'none',
});
const CustomAlert = React.forwardRef((props, ref) => {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function EditProduct() {

    const { productId } = useParams();


    const dispatch = useDispatch();

    const categories = useSelector((state) => state.categories.categories);
    const product = useSelector((state) => state.singleProduct.product);
    const message = useSelector((state) => state.singleProduct.message);
    const productLoading = useSelector((state) => state.singleProduct.loading);
    const categoryLoading = useSelector((state) => state.categories.loading);
    const stores = useSelector((state) => state.store.stores);
    const storeLoading = useSelector((state) => state.store.loading);
    const isError = useSelector((state) => state.singleProduct.error);
    const productError = useSelector((state) => state.singleProduct.errorMessage);
    const [radioValue, setRadioValue] = useState("none")
    const [isConfirmClick, setIsConfrimClick] = useState(false);
    const [open, setOpen] = useState(false);
    const [job_category, setJobCategory] = useState('sales and marketing');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [storeId, setStoreId] = useState('');
    const [salary, setSalary] = useState('0');
    const [images, setImages] = useState([]);
    const [deleteProductImageList, setDeleteImageProductlist] = useState([]);
    const [deleteProductImageListId, setDeleteImageProductlistId] = useState([]);
    const [count, setCount] = useState(0);
    const [skillInputFields, setSkillInputFields] = useState([{ id: uuidv4(), skillName: '' }])
    const [confirmLoading,setConfirmLoading] = useState(false);
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
        
        if(deleteProductImageListId.length === product.data.product_image.length && images.length <= 0){
            alert("You Need at least one image to update")
        }
        else{
            setConfirmLoading(true)
            for (let i = 0; i < images.length; i += 1) {
                formData.append(`thumbnails${i}`, images[i]);
            }

            formData.append('deleteImagelist', JSON.stringify(deleteProductImageListId))
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
            dispatch(updateProduct(productId, formData))
        }
       

        // console.log(deleteProductImageListId)

        // const data = {
        //     "name": name,
        //     "price": price,
        //     "item_description": description,
        //     "thumbnails": images,
        //     "category_id": categoryId,
        //     "percentage_id": 1,
        //     "store_id": storeId
        // }
        // dispatch(addProduct(formData))
      
        // console.log(formData.get('thumbnails0'))
        // console.log(formData.get('thumbnails1'))

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

    const handleGG = (data) => {
        setDeleteImageProductlist([...deleteProductImageList, data]);
        console.log(deleteProductImageList)
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

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

    useEffect(() => {
        dispatch(fetchCategories())
        dispatch(fetchStores())
        dispatch(fetchSingleProducts(productId));
        

        if (isError) {
            setConfirmLoading(false)
            setOpen(true)
        }

        // return () => {
        //     setTimeout(() => {
        //         dispatch(productCleanUp())
        //     }, 1000);
        // }
        if(!productLoading){
            setNewArrival(product.data.new_arrival === '0' ? 0 : 1)
            setMostPopular(product.data.most_popular === '0' ? 0 : 1)
            setTopSellingProduct(product.data.top_selling  === '0' ? 0 : 1)
            setRadioValue(product.data.store === null ? "none" : "yes")
            setStoreId(product.data.store === null ? 0 : product.data.store.id)
        }
        // setMostPopular(product.data.most_popular === '0' ? `false` : `true`)
        // setTopSellingProduct(product.data.top_selling  === '0' ? `false` : `true`)
        // return () => {            
        //     dispatch(singleProductCleanUp())
        // }


    }, [product && product.status,isError])

    return (
        <Page title="Create New Product">
            {
                productLoading ?
                    <Loading/>
                    :
                    
                    <Container>
                        {
                                message.length > 0 ?
                                <Alert severity="success">{message}</Alert>
                                :
                                ""
                            }
                        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>

                            {
                                isError ?
                                    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                                        <CustomAlert onClose={handleClose} severity="error" sx={{ width: '100%', }}>

                                            {productError.errors.name ?? productError.errors.name} &nbsp;
                                            {productError.errors.item_description}
                                            {productError.errors.image}
                                            {productError.errors.price}
                                            {
                                                productError.errors.category_id ?
                                                    "Please Select a category"
                                                    :
                                                    ""
                                            }
                                        </CustomAlert>
                                    </Snackbar>
                                    :
                                    ""
                            }

                            


                            <Typography variant="h4" gutterBottom color="#1B458D">
                                Edit Product to Update {product.data.name}
                            </Typography>
                            {
                                confirmLoading ?
                                <CircularProgress/>
                                :
                                <Button
                                variant="contained"

                                onClick={handleSubmit}

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
                                    <TextField id="outlined-basic" defaultValue={product.data.name} onChange={e => setName(e.target.value)} label="Product Title" variant="outlined" style={{ width: 800 }} sx={{ m: 2 }} />

                                </Box>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center" >
                                    <TextField id="outlined-basic" defaultValue={product.data.item_description} onChange={e => setDescription(e.target.value)} label="Product Description Description" variant="outlined" style={{ width: 800 }} multiline rows={5} rowsMax={10} placeholder="Description of Job" fullWidth sx={{ m: 2 }} />
                                </Box>

                                <Box display="flex" alignItems="center" justifyContent="Center">
                                    <FormControl>
                                        <FormLabel id="demo-row-radio-buttons-group-label">Is this product has a brand? </FormLabel>
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
                                        label="Select a releted brand"
                                        value={storeId}
                                        onChange={handleStoreChange}
                                        helperText="Please select a Brand"
                                        disabled={radioValue === 'none' ? `true` : false}
                                        sx={{ m: 2 }}
                                    >
                                        {stores.map((option) => (
                                            <MenuItem key={option.id} value={option.id}>
                                                {option.brand_name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Box>
                                <Box display="flex" justifyContent="center" alignItems="center">
                                    <Typography variant="subtitle2" gutterBottom>
                                        Previously Selected Brand : {product.data.store === null ? "None" : product.data.store.brand_name}
                                    </Typography>
                                </Box>

                                <Box display="flex"
                                    alignItems="center"
                                    justifyContent="center">

                                    <TextField
                                        select
                                        label="Select"
                                        defaultValue={product.data.category.name}
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

                                    <TextField id="outlined-basic" defaultValue={product.data.price} onChange={e => setPrice(e.target.value)} label="Product Price" variant="outlined" sx={{ m: 2 }} />

                                </Box>
                                <Box display="flex" justifyContent="center" alignItems="center">
                                    <Typography variant="subtitle2" gutterBottom>
                                        Previously Selected Category : {product.data.category.name}
                                    </Typography>

                                    <div  style={{borderLeft: "3px solid #1B458D",height: "30px",marginLeft : "5px", marginRight:"5px"}}/>

                                    <Typography variant="subtitle2" gutterBottom>
                                        Previously Selected Sub Category : {product.data.sub_category === null ? "None" : product.data.sub_category.name}
                                    </Typography>
                                </Box>

                                <Box display="flex" justifyContent="center" alignItems="center">
                                    <Typography variant="subtitle2" gutterBottom>
                                       New Arrival : {product.data.new_arrival === '0' ? "No" : "Yes"}
                                    </Typography>

                                    <div  style={{borderLeft: "3px solid #1B458D",height: "30px",marginLeft : "5px", marginRight:"5px"}}/>

                                    <Typography variant="subtitle2" gutterBottom>
                                        Most Popular : {product.data.most_popular === "0" ? "No" : "Yes"}
                                    </Typography>

                                    <div  style={{borderLeft: "3px solid #1B458D",height: "30px",marginLeft : "5px", marginRight:"5px"}}/>

                                    <Typography variant="subtitle2" gutterBottom>
                                        Top Selling : {product.data.top_selling === '0' ? "No" : "Yes"}
                                    </Typography>
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
                                                                        {/* <label htmlFor="contained-button-file" >
                                                                            <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={(e) => setImages(e.target.files)} />
                                                                            <Button variant="contained" component="span" >
                                                                                <Icon icon="carbon:add-filled" />
                                                                            </Button>



                                                                        </label> */}
                                                                    </Box>

                                                                    <Box display="flex" justifyContent="center" alignItems="center">
                                                                        {
                                                                            // images.length === 0 ?
                                                                            //     <Typography variant="subtitle1" display="block" gutterBottom sx={{ mt: 3 }}>
                                                                            //         No Images, Use Shift to select Multiple Images
                                                                            //     </Typography>
                                                                            //     :

                                                                            // Array.from(images).map((data) => (
                                                                            //     <CardMedia
                                                                            //         component="img"
                                                                            //         sx={{ width: 151, m: 1 }}
                                                                            //         image={URL.createObjectURL(data)}
                                                                            //         alt="category_image"
                                                                            //     />
                                                                            // ))
                                                                        }
                                                                    </Box>

                                                                    <Box display="flex" justifyContent="center" alignItems="center">
                                                                        {
                                                                            product.data.product_image.filter(data => !deleteProductImageList.includes(data.thumbnails.replace(/["]+/g, ''))).map((data) => (
                                                                                <>

                                                                                    <Box display="flex" >
                                                                                        {/* <Button variant="contained" component="span" onClick={()=>handleGG(`${process.env.REACT_APP_PRODUCTION_PORT}storage/product_image/${data.thumbnails.replace(/["]+/g, '')}`)}>
                                                                                            Show
                                                                                        </Button> */}
                                                                                        <DeleteProductImage imageId={data.id} deleteIdState={setDeleteImageProductlistId} ids={Array.from(deleteProductImageListId)} state={setDeleteImageProductlist} imageList={Array.from(deleteProductImageList)} productImage={`${data.thumbnails.replace(/["]+/g, '')}`} />
                                                                                        <CardMedia
                                                                                            component="img"
                                                                                            sx={{ width: 151, m: 1 }}
                                                                                            image={`${process.env.REACT_APP_PRODUCTION_PORT}storage/product_image/${data.thumbnails.replace(/["]+/g, '')}`}
                                                                                            alt="category_image"
                                                                                        />
                                                                                    </Box>
                                                                                </>
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

                                <Grid sx={{ flexGrow: 1 }} container spacing={2}>
                                    <Grid item xs={12}>
                                        <h3>Images below will be delected</h3>
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
                                                                <Box display="flex" justifyContent="center" alignItems="center">
                                                                    {
                                                                        Array.from(deleteProductImageList).map((data) => (
                                                                            <>
                                                                                <Box display="flex" >

                                                                                    <CardMedia
                                                                                        component="img"
                                                                                        sx={{ width: 151, m: 1 }}
                                                                                        image={`${process.env.REACT_APP_PRODUCTION_PORT}storage/product_image/${data}`}
                                                                                        alt="category_image"
                                                                                    />
                                                                                </Box>
                                                                            </>
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
                                                                    <label htmlFor="contained-button-file-1" >
                                                                        <Input accept="image/*" id="contained-button-file-1" multiple type="file" onChange={(e) => setImages(e.target.files)} />
                                                                        <Button variant="contained" component="span" >
                                                                            <Icon icon="carbon:add-filled" />
                                                                        </Button>



                                                                    </label>
                                                                </Box>

                                                                <Box display="flex" justifyContent="center" alignItems="center">
                                                                    {
                                                                        images.length === 0 ?
                                                                            <Typography variant="subtitle1" display="block" gutterBottom sx={{ mt: 3 }}>
                                                                                No Images, Use Shift to select Multiple Images
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



                        </Card>


                    </Container>
            }
        </Page>
    );
}