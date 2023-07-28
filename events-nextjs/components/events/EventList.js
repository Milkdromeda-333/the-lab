import EventCard from "./EventCard";

export default function EventList({ items }) {

    return (
        <div className="eventlist-container">
            {items.map(event => (
                <EventCard
                    key={event.id}
                    id={event.id}
                    title={event.title}
                    location={event.location}
                    date={event.date}
                    image={event.image}
                />
            ))}
        </div>
    );
}