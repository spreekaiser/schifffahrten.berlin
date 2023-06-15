import Head from "next/head";
import Audioguide from "../components/Audiogiude";

export default function Tourguide() {
  function handleLanguage(event) {
    // console.log(event.target.textContent);
    switch (event.target.textContent) {
      case "deutsch":
      case "🇩🇪":
        console.log("de");
        break;
      case "english":
      case "🇬🇧":
        console.log("en");
        break;
      case "français":
      case "🇫🇷":
        console.log("fr");
        break;
      case "español":
      case "🇪🇸":
        console.log("es");
        break;
      case "italiano":
      case "🇮🇹":
        console.log("it");
        break;
    }
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
