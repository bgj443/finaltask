
import React, { useState } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Trainingslist from './Trainingslist';
import Customerlist from './Customerlist';
import Calendar from './Calendar';

export default function TabApp(props) {
    const [value, setValue] = useState('1');
    const handleChange = (event, value) => {
        setValue(value);
    }
    return (
        <div>
            <AppBar position="static" color='transparent'>
                <Tabs value={value} onChange={handleChange}>
                    <Tab value="1" label="Calendar" />
                    <Tab value="2" label="Trainings list" />
                    <Tab value="3" label="Customer list" />
                </Tabs>
            </AppBar>
            {value === "1" && <Calendar/>}
            {value === "2" && <Trainingslist/>}
            {value === "3" && <Customerlist/>}
        </div>
    )
}