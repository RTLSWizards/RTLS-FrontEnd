import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Box, Skeleton, useToast, Text, Stack } from "@chakra-ui/react";

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
import cartesiano from "../assets/white.png";
import userIcon from "../assets/tagIcon.png";
import sensorIcon from "../assets/sensorIcon.png";
import axiosCloud, { ENDPOINT } from "../features/AxiosCloud";
import { device, position } from "../features/Interface";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";

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
    image: cartesiano,
    zoom: 1,
    center: [3, 4],
    imageBounds: [
      [0, 0],
      [7, 8],
    ],
  };

  const getTimeFrequency = () => {
    const timer = localStorage.getItem("refreshingTime");
    if (timer) {
      return parseInt(timer);
    } else {
      return 2000;
    }
  };

  const toast = useToast();

  let tagPositionsList: LatLng[] = [];

  const [loading, setLoading] = useState(true);

  const [tagList, setTagList] = useState<device[]>([]);
  const [anchorList, setAnchorList] = useState<device[]>([]);

  const [timer, setTimer] = useState(0);

  const getDevices = async () => {
    if (deviceDetail != null && setDeviceDetail != null) {
      await axiosCloud
        .get(deviceDetail.type + "/mac/" + deviceDetail.macAddress)
        .then((result) => {
          setDeviceDetail(result.data);
          checkZeroPostitions(deviceDetail);
          setLoading(false);
        })
        .catch((error: AxiosError) => {
          if (error.message == "Network Error") {
            toast({
              status: "error",
              title: "Server Error",
              variant: "solid",
              duration: 3000,
              isClosable: true,
              position: "top-right",
            });
          }
        });
    } else {
      await axiosCloud
        .get(ENDPOINT.tag)
        .then((result) => {
          let resultFiltered: device[] = result.data;
          resultFiltered = resultFiltered.filter((tag) => tag.positions[0]);
          setTagList(resultFiltered);
        })
        .catch((error: AxiosError) => {
          if (error.message == "Network Error") {
            toast({
              status: "error",
              title: "Server Error",
              variant: "solid",
              duration: 3000,
              isClosable: true,
              position: "top-right",
            });
          }
        });
      await axiosCloud.get(ENDPOINT.anchor).then((result) => {
        setAnchorList(result.data);
        setLoading(false);

        const checked: device[] = result.data;
        checked.map((anchor) => checkZeroPostitions(anchor));
      });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getDevices();
    }, getTimeFrequency());
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getDevices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const savePositions = (positions: position[]) => {
    for (let index = 0; index < positions.length; index++) {
      const newPos = new LatLng(positions[index].x, positions[index].y);
      tagPositionsList.push(newPos);
    }
  };

  const checkZeroPostitions = (device: device) => {
    if (device.positions[0].x == 0 || device.positions[0].y == 0) {
      toast({
        status: "warning",
        title: "Positions error",
        description: `il ${device.type} ${device.macAddress} ha una posizione (x, y) che punta a 0, per favore dare un valore diverso da 0`,
        variant: "solid",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else {
        setTimer(getTimeFrequency() / 1000);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <>
      <Text textAlign={"right"}>Next Request: {timer} s</Text>

      {!loading ? (
        <MapContainer
          center={mapSettings.center}
          zoom={mapSettings.zoom}
          crs={mapSettings.crs}
          minZoom={6.5}
          maxZoom={0}
          zoomSnap={0.0}
          dragging={false}
          //   doubleClickZoom={() => disable}
          style={{ width: "100%", height: "90%" }}
        >
          <ImageOverlay
            url={mapSettings.image}
            bounds={mapSettings.imageBounds}
          />
          {deviceDetail?.positions[0] ? (
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
        <Skeleton height="90%" />
      )}
      <Stack>
        <Box w={"100%"} h={"1px"} backgroundColor={"blackAlpha.700"}></Box>
        <Text textAlign={"center"}>Y</Text>
      </Stack>
    </>
  );
};
