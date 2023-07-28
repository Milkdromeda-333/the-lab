import EventList from "@/components/events/EventList";

export default function Events({ events }) {

    return (
        <div>
            <EventList {...events} />
        </div>
    );
}