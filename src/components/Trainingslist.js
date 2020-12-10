import React, { useState, useEffect } from 'react';
import ReactTable from "react-table-6";  
import "react-table-6/react-table.css"
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import moment from 'moment';



export default function Traininglist() {
    const [trainings, setTrainings] = useState([]);

    useEffect(() => fetchData(), []);

    //haetaan tiedot herokussa olevasta tietokannasta
    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
            .then(response => response.json())
            .then(data => setTrainings(data.content))
            
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
  //Tietorivit treenien kaikille tiedoille
    const columns = [

        {
            Header: 'Date',
            accessor: 'date',
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
    ]

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