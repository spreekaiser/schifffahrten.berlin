import { useRouter } from "next/router";

export default function BookingForm() {
  const router = useRouter();
  const { id } = router.query;
  if (!id) {
    return null;
  }

  return <h1>Here comes the booking form</h1>;
}
