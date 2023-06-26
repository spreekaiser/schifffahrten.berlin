import { useRouter } from "next/router";
import BoatTrip from "@/components/BoatTrip";

export default function BoatTripDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  if (!id) {
    return null;
  }
  // console.log("router-query: ", router);
  return (
    <>
      <BoatTrip id={id} />
    </>
  );
}
