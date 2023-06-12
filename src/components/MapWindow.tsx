import { useEffect, useState } from "react";
import { Box, Card, CardBody, position } from "@chakra-ui/react";

// LEAFLEET
import { MapContainer, ImageOverlay, Marker, Polyline } from "react-leaflet";
import L, { LatLng, LatLngBoundsExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import white from "../assets/white.png";
import userIcon from "../assets/userIcon.png";
import sensorIcon from "../assets/sensorIcon.png";
import axiosCloud, { ENDPOINT } from "../features/AxiosCloud";
import { device, simplePosition } from "../features/Interface";

export const MapWindow = () => {
  const mapSettings: {
    crs: L.CRS;
    tagMarker: L.Icon;
    sensorMarker: L.Icon;
    image: string;
    zoom: number;
    center: L.LatLngExpression | undefined;
    imageBounds: LatLngBoundsExpression;
  } = {
    crs: L.CRS.Simple,
    tagMarker: L.icon({
      iconUrl: userIcon,
      iconSize: [50, 50],
      iconAnchor: [20, 45],
      popupAnchor: [0, 0],
    }),
    sensorMarker: L.icon({
      iconUrl: sensorIcon,
      iconSize: [50, 50],
      iconAnchor: [20, 45],
      popupAnchor: [0, 0],
    }),
    image: white,
    zoom: 1,
    center: [9, 16],
    imageBounds: [
      [0, 0],
      [18, 32],
    ],
  };

  const [tagList, setTagList] = useState<device[]>([]);
  const [tagPositions, setTagPositions] = useState<simplePosition[]>([]);
  const [anchorList, setAnchorList] = useState<device[]>([]);

  const getDevices = async () => {
    await axiosCloud.get(ENDPOINT.tag).then((result) => {
      setTagList(result.data);
    });
    await axiosCloud.get(ENDPOINT.anchor).then((result) => {
      setAnchorList(result.data);
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getDevices();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const savePositions = (pos: simplePosition) => {
    const localPositions = localStorage.getItem("positions");
    if (localPositions) {
      const allPositions = JSON.parse(localPositions);
      const jsonPositions = JSON.stringify([
        ...allPositions,
        new LatLng(pos.x, pos.y),
      ]);
      localStorage.setItem("positions", jsonPositions);
    } else {
      const newPosition = JSON.stringify([new LatLng(pos.x, pos.y)]);
      localStorage.setItem("positions", newPosition);
    }
  };

  const insertPolyLineBySingleTag = () => {
    const localPositions = localStorage.getItem("positions");
    if (localPositions) {
      const allPositions = JSON.parse(localPositions);
      if (localPositions[0]) {
        return <Polyline positions={allPositions} />;
      }
    }
    return <></>;
  };

  return (
    <>
      <Card w={"90%"} h={"80%"} m={10}>
        <CardBody>
          <MapContainer
            center={mapSettings.center}
            zoom={mapSettings.zoom}
            crs={mapSettings.crs}
            minZoom={5}
            maxZoom={0}
            zoomSnap={0.0}
            dragging={false}
            //   doubleClickZoom={() => disable}
            style={{ width: "100%", height: "100%" }}
          >
            <ImageOverlay
              url={mapSettings.image}
              bounds={mapSettings.imageBounds}
            />
            {anchorList?.map((anchor, index) => (
              <Marker
                key={index}
                position={
                  new LatLng(anchor.positions[0].x, anchor.positions[0].y)
                }
                icon={mapSettings.sensorMarker}
              />
            ))}
            {tagList?.map((tag, index) => (
              <Box key={index}>
                <Marker
                  position={new LatLng(tag.positions[0].x, tag.positions[0].y)}
                  icon={mapSettings.tagMarker}
                />
                {tag.positions.map((pos) => savePositions(pos))}
                {insertPolyLineBySingleTag()}
              </Box>
            ))}
          </MapContainer>
        </CardBody>
      </Card>
    </>
  );
};
