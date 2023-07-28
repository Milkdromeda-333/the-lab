import { useState } from 'react';
import { getAllEvents, getFilteredEvents } from '../../dummy-data';
import EventList from './EventList';
import Filter from './Filter';

export default function AllEvents() {

    const events = getAllEvents();

    const [filteredEvents, setFilteredEvents] = useState(events);

    return (
        <div>
            <h2>All events</h2>
            <Filter setFilteredEvents={setFilteredEvents} getFilteredEvents={getFilteredEvents} />
            <EventList items={filteredEvents} />
        </div>
    );
}