import { memo, useEffect } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

// Dynamically import Leaflet components to prevent SSR issues
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer    = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer),    { ssr: false });
const Marker       = dynamic(() => import("react-leaflet").then((mod) => mod.Marker),       { ssr: false });
const Popup        = dynamic(() => import("react-leaflet").then((mod) => mod.Popup),        { ssr: false });

interface CosmMapProps {
    /** Unique location strings pulled from the live CO-SM oracle data */
    locations: string[];
    onLocationSelect: (location: string) => void;
    selectedLocation: string;
}

// Coordinate lookup keyed by the location strings stored in OracleCommand.location
// Add entries here whenever a new homeport appears in the oracle data.
const COORD_MAP: Record<string, [number, number]> = {
    "Norfolk, VA":        [36.8508, -76.2859],
    "San Diego, CA":      [32.7157, -117.1611],
    "Mayport, FL":        [30.3960, -81.4286],
    "Pearl Harbor, HI":   [21.3667, -157.9485],
    "Everett, WA":        [47.9673, -122.2171],
    "Yokosuka, JP":       [35.2815,  139.6722],
    "Sasebo, JP":         [33.1614,  129.7121],
    "Rota, SP":           [36.6212,   -6.3533],
    "Manama, BH":         [26.2235,   50.5876],
    // Common CO-SM homeports (add more as needed)
    "Groton, CT":         [41.3712,  -72.0929],
    "Kings Bay, GA":      [30.7993,  -81.5568],
    "Bangor, WA":         [47.7335, -122.7358],
    "Bremerton, WA":      [47.5673, -122.6329],
    "Guam":               [13.4443,  144.7937],
};

const CosmMap = ({ locations, onLocationSelect, selectedLocation }: CosmMapProps) => {
    // Fix Leaflet default icon issue
    useEffect(() => {
        (async () => {
            const L = await import("leaflet");
            delete (L.Icon.Default.prototype as any)._getIconUrl;
            L.Icon.Default.mergeOptions({
                iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
                iconUrl:       "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
                shadowUrl:     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
            });
        })();
    }, []);

    // Only render markers for locations that exist in the user's CO-SM data
    // AND that we have coordinates for.
    const activeMarkers = locations
        .map(loc => ({ name: loc, coordinates: COORD_MAP[loc] }))
        .filter((m): m is { name: string; coordinates: [number, number] } => !!m.coordinates);

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
                {activeMarkers.map(({ name, coordinates }) => (
                    <Marker
                        key={name}
                        position={coordinates}
                        eventHandlers={{ click: () => onLocationSelect(name) }}
                    >
                        <Popup>
                            <span className="font-semibold">{name}</span>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
            {activeMarkers.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm pointer-events-none z-10">
                    No mapped locations found in CO-SM data.
                </div>
            )}
            <div className="absolute top-4 right-4 bg-background/90 p-2 rounded text-xs text-muted-foreground border z-10 pointer-events-none">
                Click a marker to filter
            </div>
        </div>
    );
};

export default memo(CosmMap);
