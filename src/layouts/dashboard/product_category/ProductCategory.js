
import { useEffect, useState } from 'react';
import { Grid, Container, Stack, Typography, Card, Box, TextField, Button, Chip, MenuItem, CardMedia } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import { Icon } from '@iconify/react';
import { addCategory, fetchCategories, addSubCategory, fetchSubCategories } from '../../../redux/actions/category_actions';
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';


const Input = styled('input')({
    display: 'none',
});

export default function ProductCategory() {

    const [dropdownCategory, setDropDownCategory] = useState(null);
    const [categoryName, setCategoryName] = useState(null);

    const [subCategoryName, setSubCategoryName] = useState(null);
    const [image, setImage] = useState(null);
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories.categories);
    const subCategories = useSelector((state) => state.categories.subcategories);
    const loading = useSelector((state) => state.categories.loading);


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

    const handleChange = (event) => {
        setDropDownCategory(event.target.value);
    };

    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(fetchSubCategories());
    }, [])


    return (
        <>
            <Page title="Create New Product Category">

                <Container>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
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
                                <TextField id="outlined-basic" label="Add Product Category Title" variant="outlined" fullWidth sx={{ m: 2 }} onChange={(e) => setCategoryName(e.target.value)} />
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
                    {
                        categories.length === 0 ?
                        "No Category"
                        :
                        categories.map((category) => (
                            <Chip label={category.name} color="primary" variant="outlined" />
                        ))
                    }
                   

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
                                {
                                subCategories.length === 0 ?
                                "No Sub Category"
                                :
                                subCategories.map((category) => (
                                    <Chip label={category.name} color="primary" variant="outlined" />
                                ))
                                }
                            </div>   

                            
                            
                    }

                </Container>
            </Page>
        </>
    )
}