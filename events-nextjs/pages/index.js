import { getFeaturedEvents } from "@/dummy-data";
import EventList from "@/components/events/EventList";
import Layout from "@/components/layouts/Layout";
import AllEvents from "@/components/events/AllEvents";


export default function Home() {

  const featuredEventsArr = getFeaturedEvents();

  return (
    <Layout>
      <h1>We display events!</h1>

      <div>
        <h2>Featured Events:</h2>
        <EventList items={featuredEventsArr} />
      </div>

      <AllEvents />
    </Layout>
  );
}
