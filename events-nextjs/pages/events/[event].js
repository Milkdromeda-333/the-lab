import { getEventById } from "@/dummy-data";
import { useRouter } from "next/router";

export default function Event() {

    const router = useRouter();

    const eventId = router.query.event;
    const event = getEventById(eventId);

    // route quesry may not be available upon first render
    if (!eventId) {
        return "Loading....";
    }

    const readableDate = new Date(event?.date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        years: 'numeric'
    });

    const formattedAddress = event?.location.replace(', ', '\n');

    const goHome = () => {
        router.push('/');
    };

    if (!event) {
        return "No event found.";
    }

    return (
        <div className="event-page-container">
            <h1>{event.title}</h1>

            <div className="event-page__card">
                <img src={event.image} alt={event.title} className="event-page-container__img" />

                <div className="event-page__date">
                    <img width="50" height="50" src="https://img.icons8.com/avantgarde/100/planner.png" alt="planner" />
                    <span>{readableDate}</span>
                </div>

                <div className="event-page__address">
                    <img width="50" height="50" src="https://img.icons8.com/avantgarde/100/clock.png" alt="clock" />
                    <span>{formattedAddress}</span>
                </div>
            </div>

            <p className="event-page-container__data">
                {event.description}
            </p>

            <button onClick={goHome}>Home</button>
        </div>
    );
}