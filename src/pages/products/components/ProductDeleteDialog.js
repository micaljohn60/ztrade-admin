import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Icon } from '@iconify/react';

import { deleteProduct } from '../../../redux/actions/product_actions';

export default function ProductDeleteDialog({productName,productId,}) {
  const [open, setOpen] = useState(false);
  const [name,setName] =  useState(null);
  const [id,setId] =  useState(null);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setId(productId)
    setName(productName);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () =>{
      dispatch(deleteProduct(id))
  }

  return (
    <div>
        <IconButton color="error" aria-label="upload picture" component="label" onClick={handleClickOpen}>            
            <Icon icon="icon-park-solid:delete-five" sx={{color: "#fff"}}/>
        </IconButton>

        <Dialog
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
                If you delete this {name}, products that are connected with Store will also be removed.

                <div>
                  Delete function is currently under development, this message will disapper as soon as 
                  it is ready to use.
                </div>
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleDelete} autoFocus>
                Yes
            </Button>
            </DialogActions>
        </Dialog>
    </div>
  );
}