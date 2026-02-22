"use client"

import React, { memo } from "react";
import {
    ComposableMap,
    Geographies,
    Geography,
    Marker
} from "react-simple-maps";

const geoUrl = "/world-110m.json";

interface LocationMarker {
    name: string;
    coordinates: [number, number];
}

// Major fleet concentration areas
const markers: LocationMarker[] = [
    { name: "Norfolk, VA", coordinates: [-76.2859, 36.8508] },
    { name: "San Diego, CA", coordinates: [-117.1611, 32.7157] },
    { name: "Mayport, FL", coordinates: [-81.4286, 30.3960] },
    { name: "Pearl Harbor, HI", coordinates: [-157.9485, 21.3667] },
    { name: "Everett, WA", coordinates: [-122.2171, 47.9673] },
    { name: "Yokosuka, JP", coordinates: [139.6722, 35.2815] },
    { name: "Sasebo, JP", coordinates: [129.7121, 33.1614] },
    { name: "Rota, SP", coordinates: [-6.3533, 36.6212] },
    { name: "Manama, BH", coordinates: [50.5876, 26.2235] },
];

interface OracleMapProps {
    onLocationSelect: (location: string) => void;
    selectedLocation: string;
}

const OracleMap = ({ onLocationSelect, selectedLocation }: OracleMapProps) => {
    return (
        <div className="w-full rounded-md border bg-card p-4 overflow-hidden" style={{ height: "400px" }}>
            <ComposableMap projection="geoMercator" projectionConfig={{ scale: 140, center: [0, -40] }}>
                <Geographies geography={geoUrl}>
                    {({ geographies }: { geographies: any[] }) =>
                        geographies.map((geo) => (
                            <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                fill="#EAEAEC"
                                stroke="#D6D6DA"
                                style={{
                                    default: { outline: "none" },
                                    hover: { outline: "none", fill: "#EAEAEC" },
                                    pressed: { outline: "none" },
                                }}
                            />
                        ))
                    }
                </Geographies>
                {markers.map(({ name, coordinates }) => (
                    <Marker key={name} coordinates={coordinates} onClick={() => onLocationSelect(name)}>
                        <circle
                            r={6}
                            fill={selectedLocation === name ? "#E11D48" : "#F53"}
                            stroke="#fff"
                            strokeWidth={2}
                            className="cursor-pointer transition-all hover:r-8"
                        />
                        <text
                            textAnchor="middle"
                            y={-10}
                            style={{ fontFamily: "system-ui", fill: "#5D5A6D", fontSize: "10px", fontWeight: "bold" }}
                        >
                            {name.split(',')[0]} {/* Show city name only for cleanliness */}
                        </text>
                    </Marker>
                ))}
            </ComposableMap>
            <div className="absolute top-4 right-4 bg-background/90 p-2 rounded text-xs text-muted-foreground border">
                Click a marker to filter
            </div>
        </div>
    );
};

export default memo(OracleMap);
