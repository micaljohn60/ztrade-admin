import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Grid, TextField, CardMedia, MenuItem } from '@mui/material';
import { Icon } from '@iconify/react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { deleteCategory, deleteSubCategory, updateCategory, updateSubCategory } from '../../../../redux/actions/category_actions';

const Input = styled('input')({
  display: 'none',
});


export default function DeleteCategoryDialog({ categoryImage, categoryName, categoryId, isCategory, categories, categoryUpdatePermission, categoryDeletePermission }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [newCategoryName, setCategoryName] = useState('');
  const [newCategoryId, setNewCategoryId] = useState('');
  const [id, setId] = useState(null);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setId(categoryId)
    setName(categoryName);
    setNewCategoryId(categoryId)
    setOpen(true);
  };

  const handleSelectChange = (event) => {
    setNewCategoryId(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    isCategory ?
      dispatch(deleteCategory(id))
      :
      dispatch(deleteSubCategory(id))
  }
  const handleUpdate = (event) => {
    if (isCategory) {
      const formData = new FormData();
      formData.append("name", newCategoryName);
      formData.append("image", newImage);
      dispatch(updateCategory(formData, categoryId));
    }
    else {
      const formData = new FormData();
      formData.append("name", newCategoryName);
      formData.append("category_id", newCategoryId);

      dispatch(updateSubCategory(formData, categoryId));
    }

  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        {categoryName}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >

        <DialogTitle id="alert-dialog-title">
          Edit Section for  {isCategory ? "Category" : "Sub Category"}
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="alert-dialog-description">
            You are now editing this {isCategory ? "Category" : "Sub Category"} ({categoryName}), products that are also related to this category will be automatically updated.
          </DialogContentText>
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
              <TextField id="outlined-basic" label={isCategory ? "Add New Category Title" : "Add New Sub-Category Title"} variant="outlined" fullWidth sx={{ m: 2 }} onChange={(e) => setCategoryName(e.target.value)} error={categoryName === ""} helperText={categoryName === "" ? 'Empty field!' : ' '} />
            </Box>

          </Box>

          <Grid
            container
            spacing={0}
            direction="row"
            justifyContent="center"
            alignItems="center"

          >

            {
              isCategory ?
                <>


<Grid container justifyContent="center" alignItems="center">
                     <Box
                        component="div"
                      >
                        <CardMedia
                          component="img"
                          sx={{ width: 151 }}
                          image={process.env.REACT_APP_PRODUCTION_PORT + "storage/category_image/"+ categoryImage}
                          alt="category_image"
                        />
                      </Box>
                    
                  </Grid>
                  <Grid item sx={{ m: "3%" }}>
                    <label htmlFor="contained-button-file-1">
                      <Input accept="image/*" id="contained-button-file-1" multiple type="file" onChange={(e) => setNewImage(e.target.files[0])} />
                      <Button variant="contained" component="span">
                        <Icon icon="carbon:add-filled" />
                      </Button>
                      {/* <Button variant="outlined" disabled /> */}
                    </label>
                  </Grid>
                  
                  

                  <Grid container justifyContent="center" alignItems="center">
                    {
                      newImage &&
                      <Box
                        component="div"
                      >
                        <CardMedia
                          component="img"
                          sx={{ width: 151 }}
                          image={URL.createObjectURL(newImage)}
                          alt="category_image"
                        />
                      </Box>
                    }
                  </Grid>
                </>
                :
                <>
                  <TextField
                    id="outlined-select-currency-1"
                    select
                    label="Select"
                    value={newCategoryId}
                    onChange={handleSelectChange}
                    helperText="Please select a Product category"
                    sx={{ m: 2 }}
                  >
                    {categories.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </>
            }

          </Grid>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancle</Button>
          {
            categoryUpdatePermission ?
              <Button onClick={handleUpdate} autoFocus>
                Update
              </Button>
              :
              ""
          }
        </DialogActions>


        <DialogTitle id="alert-dialog-title">
          {"Delete Section"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            If you delete this {isCategory ? "Category" : "Sub Category"} ({categoryName}), products that are also related to this category will be automatically removed.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancle</Button>
          {
            categoryDeletePermission ?
              <Button onClick={handleDelete} autoFocus>
                Yes
              </Button>
              :
              ""
          }
        </DialogActions>
      </Dialog>
    </div>
  );
}