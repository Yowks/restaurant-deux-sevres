import { MapContainer, TileLayer,Marker,Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";
import { RestaurantInterface } from '../../interface/restaurant';

const Map: React.FC<RestaurantInterface> = ({address, name}) => {
  const lat=0; const lon = 0
  
  return (
    <MapContainer center={[ 46.5926541, -0.3962844]} zoom={13} scrollWheelZoom={false} style={{height:"100%"}}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={[ lat, lon]}>
      <Popup>
        {name}
      </Popup>
    </Marker>
  </MapContainer>
  )
}

export default Map