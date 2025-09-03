"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import L from "leaflet";
import AddInfoPopUp from "@/components/popup/Add_Info_Popup";

// Fix default Leaflet icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Haversine distance
function haversine(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6371000;
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Cluster people within a radius
function clusterPeople(
  people: MissingPerson[],
  rangeMeters: number
): { lat: number; lng: number; count: number }[] {
  const clusters: { lat: number; lng: number; count: number }[] = [];
  people.forEach((p) => {
    let found = false;
    for (const cluster of clusters) {
      if (haversine(p.lat, p.lng, cluster.lat, cluster.lng) <= rangeMeters) {
        cluster.lat =
          (cluster.lat * cluster.count + p.lat) / (cluster.count + 1);
        cluster.lng =
          (cluster.lng * cluster.count + p.lng) / (cluster.count + 1);
        cluster.count++;
        found = true;
        break;
      }
    }
    if (!found) clusters.push({ lat: p.lat, lng: p.lng, count: 1 });
  });
  return clusters;
}

// Watch zoom
function ZoomWatcher({ onZoomChange }: { onZoomChange: (z: number) => void }) {
  const map = useMap();
  useEffect(() => {
    const handleZoom = () => onZoomChange(map.getZoom());
    map.on("zoomend", handleZoom);
    return () => map.off("zoomend", handleZoom);
  }, [map, onZoomChange]);
  return null;
}

// Fly-to for sidebar button
function MapFlyTo({ position }: { position: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    if (position) map.flyTo(position, map.getZoom(), { animate: true });
  }, [position, map]);
  return null;
}

// Click handler for adding missing person
function ClickHandler({
  onClick,
}: {
  onClick: (latlng: { lat: number; lng: number }) => void;
}) {
  useMapEvents({
    click(e) {
      onClick(e.latlng);
    },
  });
  return null;
}

interface OSMMapProps {
  missingPersons: MissingPerson[];
  flyToLocation: [number, number] | null;
}

export default function OSMMap({ missingPersons, flyToLocation }: OSMMapProps) {
  const [zoom, setZoom] = useState<number>(13);
  const zoomThreshold = 12; // below this show clusters
  const [clickedPosition, setClickedPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const getClusterRadius = () => {
    if (zoom <= 6) return 50000;
    if (zoom <= 8) return 20000;
    if (zoom <= 11) return 5000;
    return 500;
  };

  const clusters =
    zoom <= zoomThreshold
      ? clusterPeople(missingPersons, getClusterRadius())
      : [];

  const handleMapClick = (latlng: { lat: number; lng: number }) => {
    setClickedPosition(latlng);
    // setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setClickedPosition(null); // remove pin after modal closes
  };

  return (
    <>
      <MapContainer
        center={flyToLocation || [19.7667, 96.0315]}
        zoom={zoom}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Modal to add missing person info */}
        {isModalOpen && (
          <AddInfoPopUp
            show={isModalOpen}
            latProps={clickedPosition.lat}
            lngProps={clickedPosition.lng}
            onClose={closeModal}
          />
        )}

        <ZoomWatcher onZoomChange={(z) => setZoom(z)} />
        {flyToLocation && <MapFlyTo position={flyToLocation} />}
        <ClickHandler onClick={handleMapClick} />

        {/* Show clusters or individual markers */}
        {zoom <= zoomThreshold
          ? clusters.map((c, i) => (
              <Circle
                key={i}
                center={[c.lat, c.lng]}
                radius={getClusterRadius() / 2}
                pathOptions={{
                  color: "red",
                  fillColor: "#c94d5f",
                  fillOpacity: 0.5,
                }}
              >
                <Popup>{c.count} missing person(s)</Popup>
              </Circle>
            ))
          : missingPersons.map((p) => (
              <Marker key={p._id} position={[p.lat, p.lng]}>
                <Popup>
                  {p.name} <br />
                </Popup>
              </Marker>
            ))}

        {/* Temporary marker for clicked location */}
        {clickedPosition && (
          <Marker position={[clickedPosition.lat, clickedPosition.lng]}>
            <Popup>
              <div>New Missing Person Location :</div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              >
                Add Missing Person
              </button>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </>
  );
}
