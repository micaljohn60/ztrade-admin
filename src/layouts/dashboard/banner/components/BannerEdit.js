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

import { updateBanner } from '../../../../redux/actions/banner_actions';

const Input = styled('input')({
  display: 'none',
});


export default function BannerEdit({ bannerName, bannerId}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(null);
  const [newName, setNewName] = useState('');
  const [id, setId] = useState(null);
  const [image, setImage] = useState('')
  const dispatch = useDispatch();
  const [isLoading,setIsLoading] = useState(false);

  const handleClickOpen = () => {
    setId(bannerId)
    setName(bannerName);
    setOpen(true);
  };


  const handleClose = () => {
    setOpen(false);
  };

  const updateAction = (e) => {
    setIsLoading(true)
    const formData = new FormData();
    formData.append("name", newName);
    formData.append("image", image);
    dispatch(updateBanner(formData,bannerId))
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



              <label htmlFor="contained-button-file-1" className="mb-2">
                <Input accept="image/*" id="contained-button-file-1" type="file" onChange={e => setImage(e.target.files[0])} />
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
          <Button onClick={handleClose}>Cancle</Button>
          {
            isLoading ?
            "Loading"
            :
            <Button onClick={updateAction} autoFocus>
            Yes
          </Button>
          }
        </DialogActions>
      </Dialog>
    </div>
  );
}