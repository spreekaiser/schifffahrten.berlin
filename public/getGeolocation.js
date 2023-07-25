export default function getGeolocation() {
  let location;

  // Aktualisierung der Geoposition
  const updatePosition = (position) => {
    const { latitude, longitude } = position.coords;
    console.log("getGeolocation --> Koordinaten:", latitude, longitude);
    // Geoposition in geohash konvertieren
    var geohash = require("ngeohash");
    let hash = geohash.encode(latitude, longitude);
    // setLocation(hash.substring(0, 8));
    location = hash.substring(0, 8);
    console.log("getGeolocation --> GeoHash:", location);
  };

  // Abfragen der Geoposition
  const requestPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(updatePosition, (error) => {
        console.error("Fehler bei der Geolokalisierung:", error);
      });
    } else {
      console.error("Geolokalisierung wird nicht unterstützt");
    }
  };

  console.log("geoLog draußen - getGeolocation: ", location);

  // startet Abfrage der GeoPosition
  requestPosition();
  return location;
}

const locationPositioning = () => {
  const location = getGeolocation();

  switch (location) {
    case "u33d9jtv":
      console.log("getGeolocation: case u33d9jtv");
      <audio autoPlay src={`/audios/welcomeAudio_de.m4a`} />;
      break;
    case "u33d9jt6":
      console.log("getGeolocation: case u33d9jt6");
      <audio autoPlay src={`/audios/welcomeAudio_de.m4a`} />;
      break;
    case "u33d9jtb":
      console.log("getGeolocation: case u33d9jtb");
      <audio autoPlay src={`/audios/welcomeAudio_de.m4a`} />;
      break;
  }
};

locationPositioning();

const updateInterval = 3000;
setInterval(() => {
  locationPositioning();
}, updateInterval);
