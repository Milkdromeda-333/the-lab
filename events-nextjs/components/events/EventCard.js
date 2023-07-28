import Link from "next/link";


export default function EventCard(props) {

    const { title, image, date, location, id } = props;

    const readableDate = new Date(date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        years: 'numeric'
    });

    const formattedAddress = location.replace(', ', '\n');

    const exploreLink = `/events/${id}`;

    return (
        <div className="card">
            <img src={image} alt={title} />

            <h2>{title}</h2>
            <div>
                <time>{readableDate}</time>
            </div>
            <div>
                <div>{formattedAddress}</div>
            </div>
            <div>
                <Link href={exploreLink}>Explore event</Link>
            </div>
        </div>
    );
}