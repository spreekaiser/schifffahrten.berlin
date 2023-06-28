import { useRouter } from "next/router";
import useSWR from "swr";
// import nodemailer from "nodemailer";
import styled from "styled-components";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Ticket() {
  const router = useRouter();
  const { slug } = router.query;
  const { id } = router.query;
  console.log("###  Ticket id:  -> ", id);
  console.log("###  Ticket slug:  -> ", slug);
  const { data, isLoading } = useSWR(`/api/ticket/${slug}/${id}`, fetcher);

  console.log("## -- DATA from /api/slug/id -----> ", data);

  if (!id) {
    return null;
  }

  if (isLoading) {
    return <h3>Loading ...</h3>;
  }
  if (!data) {
    console.log("In components/BoatTrip is no data coming!");
    return;
  }

  return (
    <>
      <h1>Ticket gekauft</h1>
      <p>{data.tripName}</p>
      <p>{data.adultTickets}</p>
      <p>{data.priceOfTickets}</p>
    </>
  );
}
