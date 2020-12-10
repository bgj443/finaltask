
import React, { useState } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Trainingslist from './Trainingslist';
import Customerlist from './Customerlist';


export default function TabApp(props) {
    const [value, setValue] = useState('one');
    const handleChange = (event, value) => {
        setValue(value);
    }
    return (
        <div>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange}>
                    <Tab value="one" label="Customer list" />
                    <Tab value="two" label="Trainings list" />
                </Tabs>
            </AppBar>
            {value === "one" && <Customerlist/>}
            {value === "two" && <Trainingslist/>}

        </div>
    )
}