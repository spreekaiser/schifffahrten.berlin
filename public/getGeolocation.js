export default function getGeolocation() {
  let location;

  // Aktualisierung der Geoposition
  const updatePosition = (position) => {
    const { latitude, longitude } = position.coords;
    console.log("Koordinaten:", latitude, longitude);
    // Geoposition in geohash konvertieren
    var geohash = require("ngeohash");
    let hash = geohash.encode(latitude, longitude);
    // setLocation(hash.substring(0, 8));
    location = hash.substring(0, 8);
    console.log("GeoHash:", location);
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

  console.log("Log draußen - GeoHash: ", location);

  // startet Abfrage der GeoPosition
  requestPosition();
  return location;
}

const locationPositioning = () => {
  const location = getGeolocation();

  switch (location) {
    case "u33d9jtv":
      // --> !!! Logik anpassen !!!
      var PlayWelcomeAudio;
      return (PlayWelcomeAudio = true);
    case "u33d9jt6":
      var PlayWelcomeAudio1;
      return (PlayWelcomeAudio1 = true);
    case "u33d9jtb":
      var PlayWelcomeAudio2;
      return (PlayWelcomeAudio2 = true);
  }
};

locationPositioning();

const updateInterval = 3000;
setInterval(() => {
  locationPositioning();
}, updateInterval);
