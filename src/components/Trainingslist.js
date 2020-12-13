import React, { useState, useEffect } from 'react';
import ReactTable from "react-table-6";  
import "react-table-6/react-table.css"
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import moment from 'moment';



export default function Traininglist() {
    const [trainings, setTrainings] = useState([]);
    
    useEffect(() => fetchTdata(), []);

//-haetaan tiedot herokussa olevasta tietokannasta api:n kautta-----------------
    const fetchTdata = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data.content))      
    }
//-haetaan tiedot herokussa olevasta tietokannasta api:n kautta-----------------
//-snackbar---------------------------------------------------------------------
    const [open, setOpen] = React.useState(false);
    const handleClick = () => {
        setOpen(true);
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    }
//-snackbar---------------------------------------------------------------------
const Deletetraining = (link) => {
    if (window.confirm("Are you sure?")) {
    fetch('https://customerrest.herokuapp.com/api/trainings/' + link, {method: 'DELETE'})
    .then(response => this.fetchTdata())
    .then(response => this.setState({open:true, message:'Customer deleted'}))
    .catch(err => console.error(err))
    //seuraavaksi deleteCar aktivoi snackbarin funktion (handleClick), joka vaihtaa setOpen tilaksi (True)
    .then(res => handleClick())
    .then(res => fetchTdata()); 
     //setOpen true johtaa siihen, että snackbar renderöidään hetkeksi näkyville
    }
} 



//-Tietorivit treenien kaikille tiedoille---------------------------------
    const columns = [
        {
            Header: 'Date',
            accessor: 'date',
            //käytetään importattua moment lisäosaa apuna päivien formatoinnissa
            //moment saa rivin tiedon tietokannan muodossa ja muuttaa sen
            //format kohtaan valittuun formaattiin.
            Cell: row => (
            <span>
            {moment(row.value).format("D.M.YYYY - hh:mm")}
            </span>
            )
        },
        {
            Header: 'Duration',
            accessor: 'duration'
        },
        {
            Header: 'Activity',
            accessor: 'activity'
        },
        {
            Header: 'Firstname',
            accessor: 'customer.firstname'
        },      
        {
            Header: 'Lastname',
            accessor: 'customer.lastname'
        },            
        {
            Header: '',
            filterable: false,
            sortable: false,
            width: 150,
            accessor: 'id',
            Cell: ({value}) => <Button color="secondary" variant="contained" size="small" onClick={() => this.Deletetraining(value)}>DELETE TRAINING</Button>
        }
    ]
//-Tietorivit treenien kaikille tiedoille---------------------------------

    return (
        <div>
        <ReactTable filterable={true} data={trainings} columns={columns}  />        
        <Button onClick={handleClick}>Open simple snackbar</Button>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          autoHideDuration={3000}//kesto vaihdettu 6000ms => 3000ms, mielestäni aika oli liian pitkä (ei muuta merkitystä)
          onClose={handleClose}
          message="Row deleted"/>
      </div>
    )
}