import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";
import type { TrainSummary } from "../types";
import { DataProvenance } from "../components/common";
import { SearchBar } from "../components/SearchBar";

export function Home() {
  const [popular, setPopular] = useState<TrainSummary[]>([]);

  useEffect(() => {
    api.listTrains().then((t) => setPopular(t.slice(0, 3))).catch(() => setPopular([]));
  }, []);

  return (
    <div>
      <section className="hero">
        <div className="hero-kicker">RAIL JOURNEY INTELLIGENCE</div>
        <h1>Track your train with a changing ETA.</h1>
        <p>
          See where your train is, when it is expected to arrive, and how
          operational changes affect your journey — live.
        </p>
        <div className="hero-search">
          <SearchBar />
        </div>
        <div className="hero-meta">
          <DataProvenance />
        </div>

        <div className="rail-illustration">
          <div className="train-dot" />
        </div>
      </section>

      {popular.length > 0 && (
        <section className="popular">
          <div className="section-title">Popular trains</div>
          <div className="popular-grid">
            {popular.map((t) => (
              <Link to={`/train/${t.id}`} key={t.id} className="card popular-card">
                <div className="popular-number">{t.train_number}</div>
                <div className="muted popular-name">{t.train_name}</div>
                <div className="popular-route">
                  {t.source} <span className="popular-arrow">→</span>{" "}
                  {t.destination}
                </div>
                <div className="muted popular-eta">
                  Expected {t.current_eta ?? "—"}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
