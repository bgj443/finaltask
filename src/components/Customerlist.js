import React, { useState, useEffect } from 'react';
import ReactTable from "react-table-6";  
import "react-table-6/react-table.css"
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


export default function Customerlist() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => fetchData(), []);

    //haetaan tiedot herokussa olevasta tietokannasta
    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then(response => response.json())
            .then(data => setCustomers(data.content))
    }

    //snackbar
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
    //snackbar
//
// Tähän väliin funktiot poistolle... 
//
  //Tietorivit auton tiedoille
    const columns = [

        {
            Header: 'Firstname',
            accessor: 'firstname'
        },

        {
            Header: 'Lastname',
            accessor: 'lastname'
        },

        {
            Header: 'Streetaddress',
            accessor: 'streetaddress'
        },

        {
            Header: 'Postcode',
            accessor: 'postcode'
        },
        {
            Header: 'City',
            accessor: 'city'
        },
        {
            Header: 'Email',
            accessor: 'email'
        },
        {
            Header: 'Phone',
            accessor: 'phone'
        },
    ]

    return (
        <div>
        <ReactTable filterable={true} data={customers} columns={columns} />
        
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