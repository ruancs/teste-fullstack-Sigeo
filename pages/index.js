
import MapComponent from "../components/MapComponent";
import LocationsList from "../components/LocationList"

export default function Page() {
  return (
    <>
    <h1 style={{ textAlign:'center', backgroundColor: '#c3c3e9' }}>Sigeo API - Posto salva vidas</h1>
    <div className="main">
        <LocationsList/>
        <MapComponent />
        <style>{`
        .main {
          display: flex;
          justify-content:space-between;
          align-items: center;
          padding: 20px;
        }
      `}</style>
    </div>
    </>
  );
}
