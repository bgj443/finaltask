import React, {useEffect, useState} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import moment from 'moment';



export default function Calendar() {
    const [trainings, setTrainings] = useState([]);
    const [events, setEvents] = useState([]);
 
    useEffect(() => fetchTdata(), []);

    const fetchTdata = () => {
        fetch("https://customerrest.herokuapp.com/gettrainings/")
            .then(response => response.json())
            .then(data => {setTrainings(data)})
            .catch(err => console.error(err))
            }
             useEffect(() => {fill(); }, [trainings])

   const fill = () => {
       var x;
       var eventit = [];
       for (x = 0; x < trainings.length; x++) {
        let z = {};
        z.title = trainings[x].customer.firstname + ' ' + trainings[x].customer.lastname + ' - ' + trainings[x].activity;
        z.date = trainings[x].date;
        var y = new Date(trainings[x].date);
        y.setMinutes(y.getMinutes() + trainings[x].duration);
        z.end = y;
        eventit.push(z);
         
            }
         setEvents(eventit);
        }


    return (
        <div>
            <FullCalendar
                initialView="dayGridWeek" 
                height="575px"
                headerToolbar={{
                    left: "prev,next",
                    center: "title",
                    right: "timeGridDay,timeGridWeek,dayGridMonth,"
                }}
                plugins={[dayGridPlugin, timeGridPlugin]}
               events={events}
            />
        </div>
    )
}


 


