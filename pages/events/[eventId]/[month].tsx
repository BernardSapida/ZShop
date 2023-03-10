import { useRouter } from "next/router";
import EventList from "@/components/EventList";
import EventCard from "@/components/EventCard";

export default function MonthEvent() {
  const router = useRouter();
  const year = router.query.eventId;
  const month = Number(router.query.month);

  const filteredEvents = EventList.filter(
    (event) => new Date(event.date).getMonth() == month
  );

  const eventExist = filteredEvents.length > 0;

  return (
    <>
      {eventExist ? (
        <EventCard
          title={filteredEvents[0].title}
          date={filteredEvents[0].date}
          address1={filteredEvents[0].address1}
          address2={filteredEvents[0].address2}
        />
      ) : (
        <h1>No Events Found.</h1>
      )}
    </>
  );
}
