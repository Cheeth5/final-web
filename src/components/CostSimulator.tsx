import React, { useState, useMemo, useEffect } from 'react';
import { MapContainer, TileLayer, Polygon, useMap, Marker, useMapEvents } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import { HeatmapLayer } from 'react-leaflet-heatmap-layer-v3';
import 'leaflet/dist/leaflet.css';

import { pollutionData } from '../data/pollution-data';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

// A simple component to handle map search functionality (placeholder)
const MapSearch = ({ onSearchResult }: { onSearchResult: (latlng: LatLngExpression) => void }) => {
  const [query, setQuery] = useState('');
  const map = useMap();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    // In a real application, you would use a geocoding service like Nominatim or Google Geocoding API
    // For this example, we'll simulate a search for a known location.
    try {
      // Example: https://nominatim.openstreetmap.org/search?q=dubai&format=json&limit=1
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`);
      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        const latlng: LatLngExpression = [parseFloat(lat), parseFloat(lon)];
        map.flyTo(latlng, 13);
        onSearchResult(latlng);
      } else {
        alert('Location not found.');
      }
    } catch (error) {
      console.error('Geocoding error:', error);
      alert('Failed to search for location.');
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by name or postal code..."
        className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200 shadow-sm"
      />
      <button type="submit" className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors">
        Search
      </button>
    </form>
  );
};

// Component to handle map clicks
const MapClickHandler = ({ onMapClick }: { onMapClick: (latlng: L.LatLng) => void }) => {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng);
    },
  });
  return null;
};

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

// Heatmap Legend Component
const HeatmapLegend = () => (
  <div className="leaflet-bottom leaflet-left p-2">
    <div className="leaflet-control bg-white p-3 rounded-lg shadow-lg text-gray-800">
      <h4 className="font-bold mb-2 text-sm">Pollution Density</h4>
      <div className="flex items-center mb-1">
        <div className="w-4 h-4 bg-red-500 mr-2 rounded-full"></div>
        <span className="text-xs">High</span>
      </div>
      <div className="flex items-center mb-1">
        <div className="w-4 h-4 bg-orange-400 mr-2 rounded-full"></div>
        <span className="text-xs">Moderate</span>
      </div>
      <div className="flex items-center">
        <div className="w-4 h-4 bg-yellow-300 mr-2 rounded-full"></div>
        <span className="text-xs">Low</span>
      </div>
      <div className="flex items-center">
        <div className="w-4 h-4 bg-green-500 mr-2 rounded-full"></div>
        <span className="text-xs">Very Low</span>
      </div>
    </div>
  </div>
);

// A simple map to convert country names to approximate coordinates.
const countryCoordinates: { [key: string]: { lat: number; lng: number } } = {
  "tunisia": { lat: 34, lng: 9 },
  "france": { lat: 46, lng: 2 },
  "spain": { lat: 40, lng: -4 },
  "italy": { lat: 42.8, lng: 12.8 },
  "germany": { lat: 51, lng: 10.5 },
  "united kingdom": { lat: 54, lng: -2 },
  "usa": { lat: 38, lng: -97 },
  "china": { lat: 35, lng: 105 },
  "india": { lat: 21, lng: 78 },
  "brazil": { lat: -14, lng: -51 },
  "philippines": { lat: 13, lng: 122 },
  "vietnam": { lat: 14, lng: 108 },
  "indonesia": { lat: -5, lng: 120 },
  "nigeria": { lat: 9, lng: 8 },
  "egypt": { lat: 27, lng: 30 },
  "turkey": { lat: 39, lng: 35 },
  "thailand": { lat: 15, lng: 101 },
  "malaysia": { lat: 4, lng: 102 },
  "bangladesh": { lat: 24, lng: 90 },
  "pakistan": { lat: 30, lng: 70 },
  "mexico": { lat: 23, lng: -102 },
  "japan": { lat: 36, lng: 138 },
};

const CostSimulator = () => {
  const [numBots, setNumBots] = useState(1);
  const [surfaceType, setSurfaceType] = useState<'sand' | 'rocky' | 'hard'>('sand');
  const [area, setArea] = useState(1000); // in square meters
  const [mapView, setMapView] = useState<'normal' | 'heatmap'>('normal');
  const [heatMapData, setHeatMapData] = useState<{ max: number; data: any[] } | null>(null);

  useEffect(() => {
    // The pollution data is now imported directly as a module.
    // No need to fetch and parse a CSV file.
    setHeatMapData({ max: 10, data: pollutionData });
  }, []);

  // Placeholder for polygon coordinates. In a real app, you'd use a drawing tool.
  const polygon: LatLngExpression[] = [
    [25.27, 55.29],
    [25.27, 55.30],
    [25.28, 55.30],
    [25.28, 55.29],
  ];

  const [clickedPosition, setClickedPosition] = useState<L.LatLng | null>(null);
  const [searchedPosition, setSearchedPosition] = useState<LatLngExpression | null>(null);

  const cost = useMemo(() => {
    const baseCostPerBot = 500; // Base cost per bot deployment
    const costPerSqMeter = 0.5; // Base cost per square meter

    let surfaceMultiplier = 1;
    if (surfaceType === 'rocky') surfaceMultiplier = 1.5;
    if (surfaceType === 'hard') surfaceMultiplier = 1.2;

    // More bots might be more efficient up to a point
    const botEfficiencyFactor = 1 / Math.pow(numBots, 0.25);

    const totalAreaCost = area * costPerSqMeter * surfaceMultiplier;
    const totalBotCost = numBots * baseCostPerBot * botEfficiencyFactor;

    const finalCost = totalAreaCost + totalBotCost;

    return finalCost.toFixed(2);
  }, [numBots, surfaceType, area]);

  const handleSearchResult = (latlng: LatLngExpression) => {
    setSearchedPosition(latlng);
    setClickedPosition(null); // Clear click marker on new search
  };

  const handleMapClick = (latlng: L.LatLng) => {
    setClickedPosition(latlng);
    setSearchedPosition(null); // Clear search marker on new click
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left side: Map */}
      <div className="lg:col-span-2 h-96 lg:h-[60vh] rounded-lg overflow-hidden border border-gray-200 relative">
        <MapContainer center={[0, 0]} zoom={3} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
          {mapView === 'normal' ? (
            <>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Polygon pathOptions={{ color: 'blue' }} positions={polygon} />
            </>
          ) : (
            <>
              <TileLayer
                attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              />
              {heatMapData && heatMapData.data.length > 0 && (
                <>
                  <HeatmapLayer
                    points={heatMapData.data}
                    longitudeExtractor={(m: any) => m.lng}
                    latitudeExtractor={(m: any) => m.lat}
                    intensityExtractor={(m: any) => parseFloat(m.val)}
                    radius={40} // Increased radius for better country-level visualization
                    blur={30}   // Increased blur
                    max={heatMapData.max}
                    gradient={{ 0.2: 'green', 0.4: 'yellow', 0.7: 'orange', 1.0: 'red' }}
                  />
                  <HeatmapLegend />
                </>
              )}
            </>
          )}

          <div className="leaflet-top leaflet-left p-2">
            <div className="leaflet-control bg-white p-2 rounded-lg shadow-lg">
              <MapSearch onSearchResult={handleSearchResult} />
            </div>
          </div>

          <div className="leaflet-top leaflet-right p-2">
            <div className="leaflet-control bg-white p-1 rounded-lg shadow-lg flex flex-col gap-1">
              <button onClick={() => setMapView('normal')} className={`px-3 py-1 text-sm rounded-md ${mapView === 'normal' ? 'bg-sky-500 text-white' : 'bg-transparent hover:bg-gray-100'}`}>Normal</button>
              <button onClick={() => setMapView('heatmap')} className={`px-3 py-1 text-sm rounded-md ${mapView === 'heatmap' ? 'bg-sky-500 text-white' : 'bg-transparent hover:bg-gray-100'}`}>Heatmap</button>
            </div>
          </div>

          <MapClickHandler onMapClick={handleMapClick} />
          {mapView === 'normal' && clickedPosition && <Marker position={clickedPosition} />}
          {mapView === 'normal' && searchedPosition && <Marker position={searchedPosition} />}
        </MapContainer>
      </div>

      {/* Right side: Controls and Cost */}
      <div className="flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">Configuration</h3>
          
          <div className="space-y-6">
            {/* Number of Bots */}
            <div>
              <label htmlFor="numBots" className="block text-sm font-medium text-gray-700 mb-2">
                Number of Labib-Bots
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  id="numBots"
                  min="1"
                  max="10"
                  value={numBots}
                  onChange={(e) => setNumBots(parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="font-bold text-sky-600 text-lg w-10 text-center">{numBots}</span>
              </div>
            </div>

            {/* Surface Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Surface Type
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['sand', 'rocky', 'hard'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSurfaceType(type)}
                    className={`px-4 py-2 text-sm font-semibold rounded-lg border transition-all duration-200 ${
                      surfaceType === type
                        ? 'bg-sky-500 text-white border-sky-500'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Area */}
            <div>
              <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-2">
                Cleaning Area (m²)
              </label>
              <input
                type="number"
                id="area"
                value={area}
                onChange={(e) => setArea(parseInt(e.target.value, 10) || 0)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                Note: In a full version, this would be calculated from the map drawing.
              </p>
            </div>
          </div>
        </div>

        {/* Cost Display */}
        <div className="mt-8 bg-gradient-to-br from-sky-50 to-blue-100 p-6 rounded-xl border border-sky-200">
          <p className="text-sm font-medium text-gray-600">Estimated Project Cost</p>
          <p className="text-4xl font-bold text-sky-600">
            ${cost}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            This is a simulation. Final costs may vary.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CostSimulator;
