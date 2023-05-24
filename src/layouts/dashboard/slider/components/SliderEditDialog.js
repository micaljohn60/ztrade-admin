import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, MenuItem, Grid, CardMedia } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Icon } from '@iconify/react';

import { deleteSlider, updateSlider } from '../../../../redux/actions/slider_actions';

const Input = styled('input')({
  display: 'none',
});


export default function SliderEditDialog({ sliderName, sliderId, stores, storeId}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [newName, setNewName] = useState('');
  const [id, setId] = useState(null);
  const [image, setImage] = useState(null)
  const [brandId, setBrandId] = useState('sales and marketing');
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setId(sliderId)
    setName(sliderName);
    setOpen(true);
  };

  const handleChange = (event) => {
    setBrandId(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateAction = (e) => {
    const formData = new FormData();
    formData.append("slider_name", newName);
    formData.append("image", image);

    if (storeId === null) {
        formData.append("store_id", 0);
        dispatch(updateSlider(formData,sliderId))
    } else {
        formData.append("store_id", brandId);
        dispatch(updateSlider(formData,sliderId))
    }
}

  const handleDelete = () => {
    dispatch(deleteSlider(id))
  }

  return (
    <div>
      <IconButton color="primary" aria-label="upload picture" component="label" onClick={handleClickOpen}>
        <Icon icon="akar-icons:edit" sx={{ color: "#fff" }} />
      </IconButton>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        
      >
        <DialogTitle id="alert-dialog-title">
          {`You are now editing ${name}`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <TextField sx={{width:450}} id="outlined-basic" label="Set New Name" variant="outlined" onChange={ (e) => setNewName(e.target.value)}/>

              <TextField
                id="outlined-select-currency"
                select
                label="Store Id"
                
                value={brandId}
                onChange={handleChange}
                helperText="Please select a Product Sub category"
                sx={{ m: 2,width:450 }}
                disabled={storeId === null ? `true` : false}
              >
                {stores.map((option) => (
                  <MenuItem key={option.id} value={option.id} >
                    {option.brand_name}
                  </MenuItem>
                ))}
              </TextField>

              <label htmlFor="contained-button-file-1" className="mb-2">
                <Input accept="image/*" id="contained-button-file-1" multiple type="file" onChange={e => setImage(e.target.files[0])} />
                <Button variant="contained" component="span" sx={{ mb: "2" }}>
                  <Icon icon="carbon:add-filled" />
                </Button>
              </label>
                
              <Grid container justifyContent="center" alignItems="center">
                {
                  image &&
                  <Box
                    component="div"
                  >
                    <CardMedia
                      component="img"
                      sx={{ width: 300 }}
                      image={URL.createObjectURL(image)}
                      alt="slider image"
                    />
                  </Box>
                }
              </Grid>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={updateAction} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}