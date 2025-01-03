import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Search } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { popularPlaces, nearbyPlaces } from '../../pages/api/places';

const INDIA_CENTER = [20.5937, 78.9629];
const ZOOM_LEVEL = 5;

// Fix Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: null,
  iconUrl: null,
  shadowUrl: null,
});

// Custom icon function
const createCustomIcon = (color, size = 10) => {
  return L.divIcon({
    html: `
      <div class="marker-icon" style="
        background-color: ${color};
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 0 4px rgba(0,0,0,0.4);
        transition: all 0.3s ease;
      "></div>
    `,
    className: '',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  });
};

const mainIcon = createCustomIcon('#dc2626', 16);
const nearbyIcon = createCustomIcon('#2563eb', 14);

const PlacePopup = ({ place, onFindNearby, isNearby }) => {
  const { name, address_line1, categories, description, imageUrls } = place.properties;

  return (
    <div className="popup-content min-w-[200px] max-w-[300px]">
      <h3 className="font-bold text-lg mb-2 text-gray-800">{name}</h3>
      {address_line1 && (
        <p className="text-sm mb-1 text-gray-600">{address_line1}</p>
      )}
      <p className="text-sm mb-2 text-gray-700">{description}</p>
      {categories && (
        <div className="flex flex-wrap gap-1 mb-2">
          {categories.map((category, index) => (
            <span 
              key={index}
              className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600"
            >
              {category}
            </span>
          ))}
        </div>
      )}
      
      {imageUrls && imageUrls.length > 0 && (
        <div className="mb-2">
          {imageUrls.map((url, index) => (
            <img key={index} src={url} alt={name} className="w-full h-auto rounded-lg mb-2" />
          ))}
        </div>
      )}
      
      {!isNearby && (
        <button
          onClick={() => onFindNearby(place)}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 px-4 rounded-lg transition-colors duration-200 ease-in-out flex items-center justify-center gap-2 group"
        >
          <span className="group-hover:translate-x-1 transition-transform duration-200">
            Find Nearby Places
          </span>
        </button>
      )}
    </div>
  );
};

const SearchBar = ({ value, onChange }) => (
  <div className="absolute top-4 left-4 right-4 z-[1000] pointer-events-auto">
    <div className="bg-white shadow-md rounded-lg p-4">
      <input
        type="text"
        placeholder="Search places..."
        value={value}
        onChange={onChange}
        className="w-full p-4 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md text-black"
      />
      <Search 
        className="absolute left-8 top-1/2 transform -translate-y-1/2 text-gray-400"
        size={20}
      />
    </div>
  </div>
);

export default function IndiaMap() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [displayedNearbyPlaces, setDisplayedNearbyPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const filteredPlaces = searchQuery
    ? popularPlaces.filter(place =>
        place.properties.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.properties.address_line1.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : popularPlaces;

  const handlePlaceClick = async (place) => {
    setIsLoading(true);
    setSelectedPlace(place);
    await new Promise(resolve => setTimeout(resolve, 500));
    const nearbyForPlace = nearbyPlaces[place.id] || [];
    setDisplayedNearbyPlaces(nearbyForPlace);
    setIsLoading(false);
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg relative">
      <div className="relative rounded-xl overflow-hidden">
        <div className="pointer-events-none absolute inset-0 z-[999]">
          <SearchBar 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <MapContainer
          center={INDIA_CENTER}
          zoom={ZOOM_LEVEL}
          scrollWheelZoom={true}
          style={{ height: "600px", width: "100%" }}
          className="rounded-xl shadow-inner"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {filteredPlaces.map((place) => (
            <Marker
              key={place.id}
              position={[place.geometry.coordinates[1], place.geometry.coordinates[0]]}
              icon={mainIcon}
            >
              <Popup>
                <PlacePopup 
                  place={place} 
                  onFindNearby={handlePlaceClick}
                  isNearby={false}
                />
              </Popup>
            </Marker>
          ))}

          {selectedPlace && (
            <Marker
              position={[selectedPlace.geometry.coordinates[1], selectedPlace.geometry.coordinates[0]]}
              icon={L.icon({ iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png', iconSize: [25, 41], iconAnchor: [12, 41] })}
            >
              <Popup>
                <h3>{selectedPlace.properties.name}</h3>
                <p>{selectedPlace.properties.address_line1}</p>
              </Popup>
            </Marker>
          )}

          {displayedNearbyPlaces.map((place) => (
            <Marker
              key={place.id}
              position={[place.geometry.coordinates[1], place.geometry.coordinates[0]]}
              icon={nearbyIcon}
            >
              <Popup>
                <PlacePopup 
                  place={place} 
                  onFindNearby={handlePlaceClick}
                  isNearby={true}
                />
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {isLoading && (
          <div className="absolute inset-0 bg-white/50 flex items-center justify-center backdrop-blur-sm">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>
    </div>
  );
}