import React, { useState, useEffect } from 'react';
import ReactTable from "react-table-6";  
import "react-table-6/react-table.css";
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import Addcustomer from './Addcustomer';
import Editcustomer from './Editcustomer';



export default function Customerlist() {
    const [customers, setCustomers] = useState([]);
    

    useEffect(() => fetchData(), []);

//haetaan asiakkaiden tiedot herokussa olevasta tietokannasta
    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then(response => response.json())
            .then(data => setCustomers(data.content))
    }


//snackbar---------------------------------------------------------
    const [open, setOpen] = React.useState(false);
    const handleClick = () => {
        setOpen(true)
        
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    }
//snackbar---------------------------------------------------------------
//Delete customer funktio------------------------------------------------------

const Deletecustomer = (link) => {
    if (window.confirm("Are you sure?")) {
    fetch(link, {method: 'DELETE'})
    .then(response => this.setState({open:true, message:'Customer deleted'}))
    .catch(err => console.error(err))
    //seuraavaksi deleteCar aktivoi snackbarin funktion (handleClick), joka vaihtaa setOpen tilaksi (True)
    .then(res => handleClick())
    .then(res => fetchData()); 
     //setOpen true johtaa siihen, että snackbar renderöidään hetkeksi näkyville
    }
} 
//Delete customer funktio------------------------------------------------------
//add customer funktio---------------------------------------------------------
const AddCustomer = (newCustomer) => {
    fetch('https://customerrest.herokuapp.com/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCustomer)      
        })
        .then(response => this.fetchData())
        .then(response => this.setState({open:true, message:'New customer saved to database'}))
        .catch(err => console.error(err));
        
}


//addCustomer funktio---------------------------------------------------------
//editCustomer funktio---------------------------------------------------------
const editCustomer = (link, customer) => {
    fetch(link, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(customer)      
        })
        .then(response => this.setState({open:true, message:'Changes to customer are saved'}))
        .catch(err => console.error(err))
        .then(res => fetchData());
}
//editCustomer funktio---------------------------------------------------------


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
        {
            Header: "",
            filterable: false,
            sortable: false,
            width: 90,
            accessor: "links.0.href", 
            Cell: ({value, row}) => (<Editcustomer editCustomer={editCustomer} customer={row} link={value} />)
        },
        {
            Header: '',
            filterable: false,
            sortable: false,
            width: 160,
            accessor: 'links.0.href',
            Cell: ({value}) => <Button color="secondary" variant="contained" size="small" onClick={() => Deletecustomer(value)}>Delete</Button>
        }
    
            
    ]

    return (
        <div>
        <Addcustomer AddCustomer={AddCustomer} />   
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
    );
}


