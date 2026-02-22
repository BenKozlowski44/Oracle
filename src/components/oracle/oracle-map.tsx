"use client"

import React, { memo, useEffect } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";


// Dynamically import Leaflet components to prevent Next.js SSR issues
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });

interface LocationMarker {
    name: string;
    coordinates: [number, number]; // [latitude, longitude] for Leaflet
}

// Major fleet concentration areas (Leaflet uses [Lat, Lng], so swap from old [Lng, Lat])
const markers: LocationMarker[] = [
    { name: "Norfolk, VA", coordinates: [36.8508, -76.2859] },
    { name: "San Diego, CA", coordinates: [32.7157, -117.1611] },
    { name: "Mayport, FL", coordinates: [30.3960, -81.4286] },
    { name: "Pearl Harbor, HI", coordinates: [21.3667, -157.9485] },
    { name: "Everett, WA", coordinates: [47.9673, -122.2171] },
    { name: "Yokosuka, JP", coordinates: [35.2815, 139.6722] },
    { name: "Sasebo, JP", coordinates: [33.1614, 129.7121] },
    { name: "Rota, SP", coordinates: [36.6212, -6.3533] },
    { name: "Manama, BH", coordinates: [26.2235, 50.5876] },
];

interface OracleMapProps {
    onLocationSelect: (location: string) => void;
    selectedLocation: string;
}

const OracleMap = ({ onLocationSelect, selectedLocation }: OracleMapProps) => {
    // Fix Leaflet's default icon missing issue in Next.js
    useEffect(() => {
        // We only run this on the client
        (async () => {
            const L = await import("leaflet");
            delete (L.Icon.Default.prototype as any)._getIconUrl;
            L.Icon.Default.mergeOptions({
                iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
                iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
                shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
            });
        })();
    }, []);

    return (
        <div className="w-full rounded-md border bg-card p-4 relative overflow-hidden" style={{ height: "400px" }}>
            <MapContainer
                center={[25, 0]}
                zoom={3}
                minZoom={3}
                maxBounds={[[-90, -180], [90, 180]]}
                maxBoundsViscosity={1.0}
                scrollWheelZoom={true}
                style={{ height: "100%", width: "100%", borderRadius: "inherit", zIndex: 0 }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    noWrap={true}
                    bounds={[[-90, -180], [90, 180]]}
                />
                {markers.map(({ name, coordinates }) => (
                    <Marker
                        key={name}
                        position={coordinates}
                        eventHandlers={{
                            click: () => onLocationSelect(name),
                        }}
                    >
                        <Popup>
                            <span className="font-semibold">{name}</span>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
            <div className="absolute top-4 right-4 bg-background/90 p-2 rounded text-xs text-muted-foreground border z-10 pointer-events-none">
                Click a marker to filter
            </div>
        </div>
    );
};

export default memo(OracleMap);
