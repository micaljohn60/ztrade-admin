import * as React from 'react';
import { useEffect, useState } from 'react';
import { Grid, Container, Stack, Typography, Card, Box, TextField, Button, Chip, MenuItem, CardMedia, Snackbar, Alert } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import { Icon } from '@iconify/react';
import CircularProgress from '@mui/material/CircularProgress';
import { addCategory, fetchCategories, addSubCategory, fetchSubCategories, cleanUp, updateCategory } from '../../../redux/actions/category_actions';
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import DeleteCategoryDialog from './component/DeleteCategoryDialog';
import Loading from 'src/share/Loading/Loading';


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
    const [loadingState, setLoadingState] = useState(false);
    const [subLoadingState, setSubLoadingState] = useState(false);

    const categoryGetDenied = useSelector((state) => state.categories.deninePermission);
    const staffLoading = useSelector((state) => state.user.isLoading);
    const staff = useSelector((state) => state.user.user);

    const [hasCategoryCreatePermission, setHasCategoryCreatePermission] = useState(false);
    const [hasCategoryEditPermission, setHasCategoryEditPermission] = useState(false);
    const [hasCategoryUpdatePermission, setHasCategoryUpdatePermission] = useState(false);
    const [hasCategoryDeletePermission, setHasCategoryDeletePermission] = useState(false);


    const handleClick = (e) => {
        setLoadingState(true);
        const formData = new FormData();
        formData.append("name", categoryName);
        formData.append("image", image);
        dispatch(addCategory(formData));
    }

    const handleSubCategory = (e) => {
        setSubLoadingState(true)
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

    const setCategoryPermission = (permissions) => {
        for (let i = 0; i < permissions.length; i++) {
            if (permissions[i].name == "category-create") {
                setHasCategoryCreatePermission(true)
            }
            if (permissions[i].name == "category-edit") {
                setHasCategoryEditPermission(true)
            }
            if (permissions[i].name == "category-delete") {
                setHasCategoryDeletePermission(true)
            }


        }

    }



    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(fetchSubCategories());
        if (isError) {
            setOpen(true)
            setLoadingState(false);
            setSubLoadingState(false)
        }

        if (!staffLoading) {
            setCategoryPermission(staff.permissions)
        }

        return () => {
            setTimeout(() => {
                dispatch(cleanUp())
            }, 1000);

        }
    }, [staff && staff.permissions, isError])


    return (
        <>
            <Page title="Create New Product Category">

                {
                    staffLoading ?
                        <Loading />
                        :
                        <Container>

                            {
                                !hasCategoryCreatePermission ?
                                    ""
                                    :
                                    <>
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
                                            <Typography variant="h4" gutterBottom color="#1B458D">
                                                Create New Product Category
                                            </Typography>
                                            {
                                                loadingState ?
                                                    <CircularProgress />
                                                    :
                                                    <Button
                                                        variant="contained"
                                                        onClick={handleClick}
                                                        startIcon={<Iconify icon="eva:plus-fill" />}
                                                    >
                                                        Confirm
                                                    </Button>
                                            }

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
                                                    <TextField id="outlined-basic" label="Add Product Category Title" variant="outlined" fullWidth sx={{ m: 2 }} onChange={(e) => setCategoryName(e.target.value)} error={categoryName === ""} helperText={categoryName === "" ? 'Empty field!' : ' '} />
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
                                                        <Input accept="image/*" id="contained-button-file" type="file" onChange={(e) => setImage(e.target.files[0])} />
                                                        <Button variant="contained" component="span">
                                                            <Icon icon="carbon:add-filled" />
                                                        </Button>
                                                        {/* <Button variant="outlined" disabled /> */}
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
                                    </>
                            }
                            {
                                categoryGetDenied ?
                                    <Alert severity="error" sx={{ mt: 3 }}>You don't have permission to see this category</Alert>
                                    :
                                    <Grid container spacing={2}>
                                        {
                                            categories.length === 0 ?
                                                <Alert severity="warning" sx={{ mt: 3 }}>No Category Here! Create New One</Alert>
                                                :
                                                categories.map((category) => (
                                                    <Grid item sx={{ mt: 2 }}>
                                                        <DeleteCategoryDialog categoryImage={category.image} categoryName={category.name} categoryId={category.id} isCategory categoryUpdatePermission={hasCategoryEditPermission} categoryDeletePermission={hasCategoryDeletePermission} />
                                                    </Grid>

                                                ))
                                        }
                                    </Grid>
                            }




                            {
                                loading ?
                                    "loading"
                                    :
                                    <div>
                                        {
                                            categoryGetDenied ?
                                                ""
                                                :
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

                                                    {
                                                        subLoadingState ?
                                                            <CircularProgress />
                                                            :
                                                            <Button
                                                                variant="contained"
                                                                sx={{ mt: 3 }}
                                                                onClick={handleSubCategory}
                                                                startIcon={<Iconify icon="eva:plus-fill" />}
                                                            >
                                                                Add
                                                            </Button>
                                                    }

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
                                        }
                                        {
                                            categoryGetDenied ?
                                                <Alert severity="error" sx={{ mt: 3 }}>You don't have permission to see this category</Alert>
                                                :
                                                <Grid container spacing={2}>
                                                    {
                                                        subCategories.length === 0 ?
                                                            <Alert severity="warning" sx={{ mt: 3 }}>No Sub Category Here! Create New One</Alert>
                                                            :
                                                            subCategories.map((category) => (
                                                                <Grid item sx={{ mt: 2 }}>
                                                                    <DeleteCategoryDialog categoryName={category.name} categoryId={category.id} isCategory={false} categories={categories} categoryUpdatePermission={hasCategoryEditPermission} categoryDeletePermission={hasCategoryDeletePermission} />
                                                                </Grid>
                                                            ))
                                                    }
                                                </Grid>
                                        }
                                    </div>



                            }

                        </Container>
                }
            </Page>
        </>
    )
}