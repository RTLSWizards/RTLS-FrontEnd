import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Box, Skeleton } from "@chakra-ui/react";

// LEAFLEET
import {
  MapContainer,
  ImageOverlay,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import L, { LatLng, LatLngBoundsExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import white from "../assets/white.png";
import userIcon from "../assets/tagIcon.png";
import sensorIcon from "../assets/sensorIcon.png";
import axiosCloud, { ENDPOINT } from "../features/AxiosCloud";
import { device, position } from "../features/Interface";
import { Link } from "react-router-dom";

export const MapWindow = ({
  deviceDetail,
  setDeviceDetail,
}: {
  deviceDetail: null | device;
  setDeviceDetail: Dispatch<SetStateAction<device | undefined>> | undefined;
}) => {
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
      iconSize: [35, 35],
      iconAnchor: [18, 32],
      popupAnchor: [18, 5],
    }),
    sensorMarker: L.icon({
      iconUrl: sensorIcon,
      iconSize: [35, 35],
      iconAnchor: [0, 0],
      popupAnchor: [18, 15],
    }),
    image: white,
    zoom: 1,
    center: [9, 16],
    imageBounds: [
      [0, 0],
      [18, 32],
    ],
  };

  let tagPositionsList: LatLng[] = [];

  const [loading, setLoading] = useState(true);

  const [tagList, setTagList] = useState<device[]>([]);
  const [anchorList, setAnchorList] = useState<device[]>([]);

  // const [tagPositionsList, setTagPositionsList] = useState<LatLng[]>([]);

  const getDevices = async () => {
    if (deviceDetail != null && setDeviceDetail != null) {
      await axiosCloud
        .get(deviceDetail.type + "/mac/" + deviceDetail.macAddress)
        .then((result) => {
          setDeviceDetail(result.data);
          setLoading(false);
        });
    } else {
      await axiosCloud.get(ENDPOINT.tag).then((result) => {
        setTagList(result.data);
      });
      await axiosCloud.get(ENDPOINT.anchor).then((result) => {
        setAnchorList(result.data);
        setLoading(false);
      });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getDevices();
    }, 5000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const savePositions = (positions: position[]) => {
    for (let index = 0; index < positions.length; index++) {
      const newPos = new LatLng(positions[index].x, positions[index].y);
      tagPositionsList.push(newPos);
    }

    // const localPositions = localStorage.getItem("positions");
    // if (localPositions) {
    //   const allPositions = JSON.parse(localPositions);
    //   const jsonPositions = JSON.stringify([
    //     ...allPositions,
    //     new LatLng(pos.x, pos.y),
    //   ]);
    //   localStorage.setItem("positions", jsonPositions);
    // } else {
    //   const newPosition = JSON.stringify([new LatLng(pos.x, pos.y)]);
    //   localStorage.setItem("positions", newPosition);
    // }
  };

  // const insertPolyLineBySingleTag = () => {
  //   const localPositions = localStorage.getItem("positions");
  //   if (localPositions) {
  //     const allPositions = JSON.parse(localPositions);
  //     if (localPositions[0]) {
  //       return <Polyline positions={allPositions} />;
  //     }
  //   }
  //   return <></>;
  // };

  return (
    <>
      {!loading ? (
        <MapContainer
          center={mapSettings.center}
          zoom={mapSettings.zoom}
          crs={mapSettings.crs}
          minZoom={4.7}
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
          {deviceDetail != null ? (
            <Marker
              position={
                new LatLng(
                  deviceDetail.positions[0].x,
                  deviceDetail.positions[0].y
                )
              }
              icon={
                deviceDetail.type == "anchor"
                  ? mapSettings.sensorMarker
                  : mapSettings.tagMarker
              }
            ></Marker>
          ) : (
            <></>
          )}
          {anchorList?.map((anchor, index) => (
            <Marker
              key={index}
              position={
                new LatLng(anchor.positions[0].x, anchor.positions[0].y)
              }
              icon={mapSettings.sensorMarker}
            >
              <Popup>
                <Link to={`device-grid/${anchor.type}/${anchor.macAddress}`}>
                  {anchor.macAddress}
                </Link>
              </Popup>
            </Marker>
          ))}
          {tagList?.map((tag, index) => (
            <Box key={index}>
              <Marker
                position={
                  new LatLng(
                    tag.positions[tag.positions.length - 1].x,
                    tag.positions[tag.positions.length - 1].y
                  )
                }
                icon={mapSettings.tagMarker}
              >
                <Popup>
                  <Link to={`/device-grid/${tag.type}/${tag.macAddress}`}>
                    {tag.macAddress}
                  </Link>
                </Popup>
              </Marker>
              <>{savePositions(tag.positions)}</>
              <Polyline positions={tagPositionsList}></Polyline>
              <>{(tagPositionsList = [])}</>
            </Box>
          ))}
        </MapContainer>
      ) : (
        <Skeleton height="100%" />
      )}
    </>
  );
};
