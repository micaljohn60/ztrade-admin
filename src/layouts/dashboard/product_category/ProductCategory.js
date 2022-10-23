import * as React from 'react';
import { useEffect, useState } from 'react';
import { Grid, Container, Stack, Typography, Card, Box, TextField, Button, Chip, MenuItem, CardMedia, Snackbar, Alert} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import { Icon } from '@iconify/react';
import { addCategory, fetchCategories, addSubCategory, fetchSubCategories,cleanUp } from '../../../redux/actions/category_actions';
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import DeleteCategoryDialog from './component/DeleteCategoryDialog';


const Input = styled('input')({
    display: 'none',
});

const CustomAlert = React.forwardRef((props, ref) => {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ProductCategory() {
    const [open, setOpen] = useState(false);
    const [dropdownCategory, setDropDownCategory] = useState(null);
    const [categoryName, setCategoryName] = useState('');

    const [subCategoryName, setSubCategoryName] = useState(null);
    const [image, setImage] = useState(null);
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories.categories);
    const subCategories = useSelector((state) => state.categories.subcategories);
    const loading = useSelector((state) => state.categories.loading);
    const categoryError = useSelector((state) => state.categories.errorMessage);
    const isError = useSelector((state) => state.categories.error);


    const handleClick = (e) => {
        const formData = new FormData();
        formData.append("name", categoryName);
        formData.append("image", image);
        dispatch(addCategory(formData));
    }

    const handleSubCategory = (e) => {        
        const data = {
            "name": subCategoryName,
            "category_id": dropdownCategory
        };
        dispatch(addSubCategory(data))       

    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleChange = (event) => {
        setDropDownCategory(event.target.value);
    };

    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(fetchSubCategories());
        if(isError){
            setOpen(true)
        }
        
        return()=>{
            setTimeout(() => {            
                dispatch(cleanUp())
            }, 1000);
            
        }
    }, [isError])


    return (
        <>
            <Page title="Create New Product Category">

                <Container>
                    
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    {
                        isError ?
                            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                                <CustomAlert onClose={handleClose} severity="error" sx={{ width: '100%', }}>
                                    {categoryError.errors.name} &nbsp;
                                    {categoryError.errors.image}
                                    {
                                    categoryError.errors.category_id ?
                                    "Please Select a category"
                                    :
                                    ""
                                    }
                                </CustomAlert>
                            </Snackbar>
                            :
                            ""
                    }
                        <Typography variant="h4" gutterBottom color="#108992">
                            Create New Product Category
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={handleClick}
                            startIcon={<Iconify icon="eva:plus-fill" />}
                        >
                            Confirm
                        </Button>
                    </Stack>

                    <Card >

                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: 'auto', height: "50%" },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <Box display="flex"
                                alignItems="center"
                                justifyContent="center" >
                                <TextField id="outlined-basic" label="Add Product Category Title" variant="outlined" fullWidth sx={{ m: 2 }} onChange={(e) => setCategoryName(e.target.value)} error={categoryName === ""}  helperText={categoryName === "" ? 'Empty field!' : ' '}/>
                            </Box>

                        </Box>

                        <Grid
                            container
                            spacing={0}
                            direction="row"
                            justifyContent="center"
                            alignItems="center"

                        >

                            <Grid item sx={{ m: "3%" }}>
                                <label htmlFor="contained-button-file">
                                    <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={(e) => setImage(e.target.files[0])} />
                                    <Button variant="contained" component="span">
                                        <Icon icon="carbon:add-filled" />
                                    </Button>
                                    <Button variant="outlined" disabled />
                                </label>
                            </Grid>

                        </Grid>

                        <Grid container justifyContent="center" alignItems="center">
                            {
                                image &&
                                <Box
                                    component="div"
                                >
                                    <CardMedia
                                        component="img"
                                        sx={{ width: 151 }}
                                        image={URL.createObjectURL(image)}
                                        alt="category_image"
                                    />
                                </Box>
                            }
                        </Grid>

                    </Card>
                    <Grid container spacing={2}>
                        {
                            categories.length === 0 ?
                                "No Category"
                                :
                                categories.map((category) => (
                                    <Grid item sx={{mt:2}}>
                                        <DeleteCategoryDialog categoryName={category.name} categoryId={category.id} isCategory />
                                    </Grid>

                                ))
                        }
                    </Grid>


                    {
                        loading ?
                            "loading"
                            :
                            <div>
                                <Card sx={{ mt: 5 }}>

                                    <TextField
                                        id="outlined-select-currency"
                                        select
                                        label="Select"
                                        value={dropdownCategory}
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

                                    <Button
                                        variant="contained"
                                        sx={{ mt: 3 }}
                                        onClick={handleSubCategory}
                                        startIcon={<Iconify icon="eva:plus-fill" />}
                                    >
                                        Add
                                    </Button>

                                    <Box
                                        component="form"
                                        sx={{
                                            '& > :not(style)': { m: 1, width: 'auto', height: "50%" },
                                        }}
                                        noValidate
                                        autoComplete="off"
                                    >
                                        <Box display="flex"
                                            alignItems="center"
                                            justifyContent="center" >
                                            <TextField id="outlined-basic" label="Create Product Sub Category" variant="outlined" fullWidth sx={{ m: 2 }} onChange={(e) => setSubCategoryName(e.target.value)} />
                                        </Box>

                                    </Box>


                                </Card>
                                <Grid container spacing={2}>
                                    {
                                        subCategories.length === 0 ?
                                        <Alert severity="warning" sx={{mt:3}}>No Sub Category Here! Create New One</Alert>
                                            :
                                            subCategories.map((category) => (
                                                <Grid item sx={{mt:2}}>
                                                    <DeleteCategoryDialog categoryName={category.name} categoryId={category.id} isCategory={false} />
                                                </Grid>
                                            ))
                                    }
                                </Grid>
                            </div>



                    }

                </Container>
            </Page>
        </>
    )
}