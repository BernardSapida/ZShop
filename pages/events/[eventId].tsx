import { useRouter } from "next/router";
import EventList from "@/components/EventList";
import EventCard from "@/components/EventCard";

export default function Event() {
  const router = useRouter();
  const eventId: number = Number(router.query.eventId) - 1;
  const eventExist: boolean = EventList[eventId] != undefined;

  return (
    <>
      {eventExist ? (
        <EventCard
          title={EventList[eventId].title}
          date={EventList[eventId].date}
          address1={EventList[eventId].address1}
          address2={EventList[eventId].address2}
          showExploreBtn={false}
        />
      ) : (
        <h1>No Events Found.</h1>
      )}
    </>
  );
}
