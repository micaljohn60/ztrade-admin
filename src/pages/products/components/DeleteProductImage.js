import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import { Box } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Icon } from '@iconify/react';

import { deleteProductImage } from '../../../redux/actions/product_actions';

export default function DeleteProductImage({imageId,state,productImage,imageList,deleteIdState,ids}) {
  const [open, setOpen] = useState(false);
  const [name,setName] =  useState(null);
  const [id,setId] =  useState(null);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setId(imageId)
    
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () =>{
      dispatch(deleteProductImage(id))
  }

  const handleStateChange = ()=>{
    console.log("Hey")
    
    deleteIdState([...ids,imageId])
    console.log(ids);
    state([...imageList,productImage])  
    console.log(imageList)  
  }

  return (
    <Box position="absolute" top="5px">
        <IconButton color="error" aria-label="upload picture" component="label" onClick={handleStateChange}>            
            <Icon icon="icon-park-solid:delete-five" sx={{color: "#fff"}}/>
        </IconButton>

        {/* <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            {"Are you sure you wnat to delete"}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Are you Sure you want to delete this Image?
                <p>
                    You will ne be able to recover after this!
                </p>
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Cancle</Button>
            <Button onClick={handleDelete} autoFocus>
                Yes
            </Button>
            </DialogActions>
        </Dialog> */}
    </Box>
  );
}