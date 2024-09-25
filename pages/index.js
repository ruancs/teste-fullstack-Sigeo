
import MapComponent from "../components/MapComponent";
import LocationsList from "../components/LocationList"

export default function Page() {
  return (
    <div className="flex flex-row">
        <LocationsList/>
        <MapComponent />
    </div>
  );
}
