import EventCard from "@/components/EventCard";
import DateFilter from "@/components/DateFilter";
import fs from "fs/promises";
import path from "path";
import Head from "next/head";

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data/EventList.json");
  const jsonData = await fs.readFile(filePath, "utf-8");
  const EventList = JSON.parse(jsonData).events;

  return {
    props: {
      list: [...EventList],
    },
  };
}

export default function Events(props: any) {
  return (
    <>
      <Head>
        <title>NextJS | Events</title>
        <meta
          name="description"
          content="Find a lot of greate events that allow you to grow"
        />
      </Head>
      <DateFilter />
      {props.list.map((event: Record<string, any>) => (
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
