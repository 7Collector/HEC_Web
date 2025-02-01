import Globe from "react-globe.gl";
import { useState, useEffect } from "react";

const Earth = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    // load data
    fetch("../datasets/ne_110m_populated_places_simple.geojson")
      .then((res) => res.json())
      .then(({ features }) => setPlaces(features));
  }, []);

  return (
    <div>
      <Globe
        globeImageUrl="/earthmap10k.jpg"
        width={1000}
        height={600}
        backgroundColor="#000000"
        labelsData={places}
        labelLat={(d) => d.geometry.coordinates[0]}
        labelLng={(d) => d.geometry.coordinates[1]}
        labelText={(d) => d.properties.name}
        labelColor={() => "rgba(255, 0, 0, 1)"}
        labelResolution={2}
      />
    </div>
  );
};

export default Earth;
