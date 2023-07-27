export default function getGeolocation() {
  return new Promise((resolve, reject) => {
    let geoLocation;

    if ("geolocation" in navigator) {
      // Aktualisierung der Geoposition
      const updatePosition = (position) => {
        const { latitude, longitude } = position.coords;
        console.log("getGeolocation --> Koordinaten:", latitude, longitude);
        // Geoposition in geohash konvertieren
        var geohash = require("ngeohash");
        let hash = geohash.encode(latitude, longitude);
        // setLocation(hash.substring(0, 8));
        geoLocation = hash.substring(0, 8);
        console.log("getGeolocation --> GeoHash:", geoLocation);

        // location value an Promise Object übergeben
        resolve(geoLocation);
      };

      // Abfragen der Geoposition
      const requestPosition = () => {
        if (navigator.geolocation) {
          navigator.geolocation.watchPosition(updatePosition, (error) => {
            console.error("Fehler bei der Geolokalisierung:", error);

            // Bei Fehler: error value an Promise Object übergeben
            reject(error);
          });
        } else {
          console.error("Geolokalisierung kann nicht abgefragt werden");
          // Falls Geolokaliesierung nicht unterstützt wird -> Promise Object ist null
          reject(null);
        }
      };

      // startet Abfrage der GeoPosition
      requestPosition();
      return geoLocation;
    } else {
      console.log("Geolokalisierung wird nicht unterstützt");
    }
  });
}

const locationPositioning = async () => {
  const position = await getGeolocation();
  console.log("getGeolocation --> position: ", position);

  switch (position) {
    case "u33d9jt":
      console.log("getGeolocation: case u33d9jt");
      try {
        // Audio aus dem Cache laden und abspielen
        const audioPath = "/audios/welcomeAudio_de.m4a";
        const response = await fetch(audioPath);
        const audioBlob = await response.blob();
        const audioURL = URL.createObjectURL(audioBlob);
        const audio_u33d9jt = new Audio(audioURL);
        audio_u33d9jt.play();
      } catch (error) {
        console.error("Fehler beim Laden und Abspielen des Audios:", error);
      }
      break;
    case "u33d9jr":
      console.log("getGeolocation: case u33d9jr");
      try {
        const audioPath = "/audios/welcomeAudio_en.m4a";
        const response = await fetch(audioPath);
        const audioBlob = await response.blob();
        const audioURL = URL.createObjectURL(audioBlob);
        const audio_u33d9jr = new Audio(audioURL);
        audio_u33d9jr.play();
      } catch (error) {
        console.error("Fehler beim Laden und Abspielen des Audios:", error);
      }
      break;
    case "u33d9jz":
      console.log("getGeolocation: case u33d9jz");
      try {
        const audioPath = "/audios/welcomeAudio_fr.m4a";
        const response = await fetch(audioPath);
        const audioBlob = await response.blob();
        const audioURL = URL.createObjectURL(audioBlob);
        const audio_u33d9jz = new Audio(audioURL);
        audio_u33d9jz.play();
      } catch (error) {
        console.error("Fehler beim Laden und Abspielen des Audios:", error);
      }
      break;
  }
};

locationPositioning();

const updateInterval = 3000;
setInterval(() => {
  locationPositioning();
}, updateInterval);
