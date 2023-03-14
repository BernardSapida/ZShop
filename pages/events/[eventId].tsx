import { useRouter } from "next/router";
import EventCard from "@/components/EventCard";
import fs from "fs/promises";
import path from "path";

async function getEvents() {
  const filePath = path.join(process.cwd(), "data/EventList.json");
  const jsonData = await fs.readFile(filePath, "utf-8");
  const EventList = JSON.parse(jsonData).events;

  return EventList;
}

export async function getStaticProps() {
  const EventList = await getEvents();

  return {
    props: { list: [...EventList] },
  };
}

export async function getStaticPaths() {
  const EventList = await getEvents();

  return {
    paths: [
      ...EventList.map((event: any) => {
        return { params: { eventId: event.id } };
      }),
    ],
    fallback: false,
  };
}

export default function Event(props: any) {
  const router = useRouter();
  const eventId: number = Number(router.query.eventId) - 1;
  const eventExist: boolean = props.list[eventId] != undefined;

  return (
    <>
      {eventExist ? (
        <EventCard
          title={props.list[eventId].title}
          date={props.list[eventId].date}
          address1={props.list[eventId].address1}
          address2={props.list[eventId].address2}
          showExploreBtn={false}
        />
      ) : (
        <h1>No Events Found.</h1>
      )}
    </>
  );
}
