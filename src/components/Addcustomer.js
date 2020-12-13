import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Editcustomer(props) {
  const [open, setOpen] = React.useState(false);
  const [customer, setCustomer] = React.useState({

      //nämä komponentit renderöityvät muokkaukseen
      firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: ''
      });

      const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
  
      const handleInputChange = (event) => {
          setCustomer({...customer, [event.target.name]:event.target.value })
      }
  
      const addCustomer = () => {
          props.AddCustomer(customer);
          handleClose();
        }

    
  return (
    <div>          
        <Button size="small" variant="contained" color="primary" onClick={handleClickOpen}>Add a new Customer</Button> 

        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit Customer</DialogTitle>
        <DialogContent>
          <TextField
              autoFocus
              margin="dense"
              name="firstname"
              value={customer.firstname}
              label="Firstname"
              onChange={e => handleInputChange(e)}
              fullWidth
            />
          <TextField
              autoFocus
              margin="dense"
              name="lastname"
              value={customer.lastname}
              label="Lastname"
              onChange={e => handleInputChange(e)}
              fullWidth
            />
          <TextField
              autoFocus
              margin="dense"
              name="streetaddress"
              value={customer.streetaddress}
              label="Streetaddress"
              onChange={e => handleInputChange(e)}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              name="postcode"
              value={customer.postcode}
              label="Postcode"
              onChange={e => handleInputChange(e)}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              name="city"
              value={customer.city}
              label="City"
              onChange={e => handleInputChange(e)}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              name="email"
              value={customer.email}
              label="Email"
              onChange={e => handleInputChange(e)}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              name="phone"
              value={customer.phone}
              label="Phone"
              onChange={e => handleInputChange(e)}
              fullWidth
            />     
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={addCustomer} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    );
}