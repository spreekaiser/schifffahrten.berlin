import Head from "next/head";
import Audioguide from "../components/Audiogiude";

export default function Tourguide() {
  function handleLanguage(event) {
    console.log(event.target.textContent);
  }

  return (
    <>
      <Head>
        <title>Audio Tourguide</title>
        <meta
          name="description"
          lang="en"
          content="Audio tourguide for boat trips in Berlin"
        />
        <meta
          name="description"
          lang="de"
          content="Audio tourguide für Schifffahrten in Berlin"
        />
      </Head>
      <main>
        <h1>Audio Tourguide</h1>
        <Audioguide onClick={handleLanguage} />
      </main>
    </>
  );
}
