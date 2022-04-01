import "./Tourism.css";

export default function Tourism() {
  return (
    <div className="container tourism-container">
      <h1>Lieux à visiter :</h1>
      <iframe
        title="Map Gîte"
        src="https://www.google.com/maps/d/embed?mid=1ewTUOmKSfvzNqaJOlLjEdyh1qvOnTToo&ehbc=2E312F"
        className="tourism-map"
      ></iframe>

      <div className="tourism-legend">
        <h2>
          <u>Légende :</u>
        </h2>
        <ul className="tourism-legend-list">
          <div>
            <li>
              <span className="tourism-legend-circle red"></span>
              Le gîte
            </li>
            <li>
              <span className="tourism-legend-circle orange"></span>
              Restaurants et bars
            </li>
            <li>
              <span className="tourism-legend-circle purple"></span>
              Culture
            </li>
          </div>
          <div>
            <li>
              <span className="tourism-legend-circle yellow"></span>
              Plages
            </li>
            <li>
              <span className="tourism-legend-circle dark-green"></span>
              Boutiques
            </li>
            <li>
              <span className="tourism-legend-circle blue"></span>
              Jeux et Loisirs
            </li>
          </div>
          <div>
            <li>
              <span className="tourism-legend-circle brown"></span>
              Lieux historiques
            </li>
            <li>
              <span className="tourism-legend-circle green"></span>
              Randonnées
            </li>
            <li>
              <span className="tourism-legend-circle dark-blue"></span>
              Ports de plaisance
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
}
