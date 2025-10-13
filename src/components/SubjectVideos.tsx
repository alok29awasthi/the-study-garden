// <-- replace this
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Papa from "papaparse";

interface VideoItem {
  Class: string;
  Subject: string;
  Heading: string;
  "YouTube Link": string;
  Order: string;
}

const GOOGLE_SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQGKHJwekNxU1khZGcVXAtb8bwRv7SyMwgPcuQuPomdRDAbkDmNunMORkqXQgBLjVEupOtjI70ETFvW/pub?output=csv"; // replace this

const SubjectVideos = () => {
  const { className, subjectName } = useParams();
  const navigate = useNavigate();
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(GOOGLE_SHEET_URL)
      .then((res) => res.text())
      .then((csvText) => {
        const parsed = Papa.parse(csvText, { header: true }).data as VideoItem[];
        const filtered = parsed
          .filter(
            (v) =>
              v.Class?.trim().toLowerCase() === className?.toLowerCase() &&
              v.Subject?.trim().toLowerCase() === subjectName?.toLowerCase()
          )
          .sort((a, b) => Number(a.Order) - Number(b.Order));
        setVideos(filtered);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [className, subjectName]);

  return (
    <section className="py-10 px-4 md:py-16 bg-background min-h-screen">
      <div className="container mx-auto max-w-5xl">
        <button
          onClick={() => navigate("/", { state: { scrollTo: "classes" } })}
          className="mb-6 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/80 transition-colors"
        >
          ← Back Home
        </button>

        <h2 className="text-3xl font-bold mb-6">
          Class {className} - {subjectName}
        </h2>

        {/* 🌀 Loading State */}
        {loading ? (
          <p className="text-lg text-muted-foreground animate-pulse">
            Loading videos...
          </p>
        ) : videos.length === 0 ? (
          <p>No videos found yet for this subject.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {videos.map((v, i) => (
              <div
                key={i}
                className="bg-white shadow-md rounded-xl p-4 border border-gray-100"
              >
                <h3 className="font-semibold mb-2">{v.Heading}</h3>
                <iframe
                  width="100%"
                  height="250"
                  src={v["YouTube Link"].replace("watch?v=", "embed/")}
                  title={v.Heading}
                  allowFullScreen
                  className="rounded-lg"
                ></iframe>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SubjectVideos;