import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import moment from 'moment';

export default function Addtraining(props) {
const [open, setOpen] = React.useState(false);
const [training, setTraining] = React.useState({

         date: '', duration: '', activity: '', customer: props.link
      });

      const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

      const saveTraining = () => {
        console.log(training);
        training.date = moment().toISOString(training.date);
        console.log(training);
        props.addTraining(training);
          handleClose();
        setTraining({ date: '', duration: '', activity: '', customer: props.link });
      }
   
      const handleInputChange = (event) => {
          setTraining({ ...training, [event.target.name]:event.target.value })
      }
    
  return (
    <div>          
        <Button size="small" variant="contained" color="primary" onClick={handleClickOpen}>Add Training</Button> 

        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add training</DialogTitle>
        <DialogContent>
          <TextField
              autoFocus
              id="date"
              name="date"
              type="datetime-local"
              value={training.date}
              onChange={e => handleInputChange(e)}
              fullWidth
            />
          <TextField
              autoFocus
              margin="dense"
              name="duration"
              value={training.duration}
              label="Duration"
              onChange={e => handleInputChange(e)}
              fullWidth
            />
          <TextField
              autoFocus
              margin="dense"
              name="activity"
              value={training.activity}
              label="Activity"
              onChange={e => handleInputChange(e)}
              fullWidth
            />       
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={saveTraining} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    );
}