import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, MenuItem, Grid, CardMedia, Card } from '@mui/material';
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
import { updateStore } from '../../../redux/actions/store_actions';


const Input = styled('input')({
  display: 'none',
});


export default function StoreEditDialog({ storeName, storeId }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(null);
  const [newName, setNewName] = useState('');
  const [id, setId] = useState(null);
  const [image, setImage] = useState(null)
  const [brandId, setBrandId] = useState('sales and marketing');
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setId(storeId)
    setName(storeName);
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
    formData.append("store_name", newName);
    formData.append("image", image);

    if (storeId === null) {
      formData.append("store_id", 0);
      dispatch(updateStore(formData, storeId))
    } else {
      formData.append("store_id", brandId);
      dispatch(updateStore(formData, storeId))
    }
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
        <DialogContent sx={{ height: 350 }}>
          <DialogContentText id="alert-dialog-description">
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <TextField id="outlined-basic" label="Set New Name" variant="outlined" onChange={(e) => setNewName(e.target.value)} />

              <label htmlFor="contained-button-file-1" className="mb-2">
                <Input accept="image/*" id="contained-button-file-1" multiple type="file" onChange={e => setImage(e.target.files[0])} />
                <Button variant="contained" component="span" sx={{ mb: 3, mt: 2}}>
                  <Icon icon="carbon:add-filled" />
                </Button>
              </label>
              <Card
                sx={{
                  height: 200,
                  width: 400,
                  border: '2px',
                  borderStyle: 'dotted',
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#1A2027' : '#f5f5f5',
                }}
              >

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
              </Card>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancle</Button>
          <Button onClick={updateAction} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}