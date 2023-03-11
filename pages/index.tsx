import EventCard from "@/components/EventCard";
import EventList from "@/components/EventList";

export default function Home() {
  return (
    <>
      {EventList.map((event) => (
        <EventCard
          key={event.id}
          id={event.id}
          title={event.title}
          date={event.date}
          address1={event.address1}
          address2={event.address2}
          showExploreBtn={true}
        />
      ))}
    </>
  );
}
