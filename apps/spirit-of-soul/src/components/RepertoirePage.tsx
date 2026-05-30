import { band } from "@/config/band";

export default function RepertoirePage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Unser Repertoire</span>
          <h1>Repertoire</h1>
          <p>{band.repertoire.intro}</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="repertoire-grid">
            {band.repertoire.genres.map((genre, i) => (
              <div key={i} className="genre-block">
                <h2 className="genre-name">{genre.name}</h2>
                <ul className="song-list">
                  {genre.songs.map((song, j) => (
                    <li key={j} className="song-item">
                      <span className="song-index">
                        {String(j + 1).padStart(2, "0")}
                      </span>
                      {song}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
