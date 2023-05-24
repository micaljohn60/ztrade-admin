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
import { deleteStore } from '../../../redux/actions/store_actions';


export default function StoreDeleteDialog({storeName,storeId,}) {
  const [open, setOpen] = useState(false);
  const [name,setName] =  useState(null);
  const [id,setId] =  useState(null);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setId(storeId)
    setName(storeName);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () =>{
    dispatch(deleteStore(id))
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
                If you delete this ({storeName}) , products that are also related to this category will be automatically removed.
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