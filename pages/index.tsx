import EventCard from "@/components/EventCard";
import fs from "fs/promises";
import path from "path";
import useSWR from "swr";
import { useEffect, useState } from "react";
import Head from "next/head";

const fetcher = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();

  return data;
};

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data/EventList.json");
  const jsonData = await fs.readFile(filePath, "utf-8");
  const EventList = JSON.parse(jsonData).events;

  const data = await fetcher(
    "https://sampledeno-default-rtdb.firebaseio.com/data.json"
  );

  return {
    props: {
      list: [...EventList],
      data: data,
    },
  };
}

export default function Home(props: any) {
  const keys = Object.keys(props.data);
  const [names, setNames] = useState(props.data);
  const { data, error } = useSWR(
    "https://sampledeno-default-rtdb.firebaseio.com/data.json",
    fetcher,
    { refreshInterval: 1000 }
  );

  useEffect(() => {
    if (!data) console.log("Loading...");
    else setNames(data);
  }, [data, error]);

  return (
    <>
      <Head>
        <title>NextJS | Home</title>
        <meta
          name="description"
          content="Find a lot of greate events that allow you to grow"
        />
        <meta property="og:title" content="The Rock" />
        <meta property="og:type" content="video.movie" />
        <meta
          property="og:url"
          content="https://www.imdb.com/title/tt0117500/"
        />
        <meta
          property="og:image"
          content="https://ia.media-imdb.com/images/rock.jpg"
        />
      </Head>
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
