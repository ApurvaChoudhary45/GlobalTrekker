'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useMapEvents } from 'react-leaflet';
import { useState } from 'react';
// Fix default marker icon paths (important for Next.js)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

export default function MapView({ onMapClick, markerPosition }) {
  const [position, setPosition] = useState(null);
  const ClickHandler = ({ onMapClick }) => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);
        onMapClick({ lat, lng });
      },
    });
    return null;
  };
  return (
    <>
      <MapContainer
        center={[20, 0]}
        zoom={2}
        scrollWheelZoom={true}
        className="h-full w-full rounded-md"

      >
        <ClickHandler onMapClick={onMapClick} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        />
        {markerPosition && (
  <Marker position={[markerPosition.lat, markerPosition.lng]}>
    <Popup>Selected Country</Popup>
  </Marker>
)}
      </MapContainer>

    </>
  );
}
