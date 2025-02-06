import Globe from "react-globe.gl";
import { useState, useEffect, useRef } from "react";

const Earth = () => {
  const globeRef = useRef();
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    // load data
    fetch("../datasets/ne_110m_populated_places_simple.geojson")
      .then((res) => res.json())
      .then(({ features }) => setPlaces(features));
      const globe = globeRef.current;
      if (globe) {
        // Set the initial camera position to focus on North India
        globe.pointOfView({ lat: 28.6139, lng: 77.209, altitude: 0.8 }, 2000);
      }
  }, []);

  return (
    <div className="">
      <Globe
        ref={globeRef}
        globeImageUrl="/earthmap10k.jpg"
        width={1000}
        height={700}
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
