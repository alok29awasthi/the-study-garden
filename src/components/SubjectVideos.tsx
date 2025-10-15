import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronRight, FileText, Video, Loader2 } from "lucide-react";
import { useInView } from "react-intersection-observer";
import Papa from "papaparse";

// ---------------- Interfaces ----------------
interface VideoItem {
  Class: string;
  Subject: string;
  Heading: string;
  "YouTube Link": string;
}

interface PDFItem {
  Class: string;
  Subject: string;
  Title: string;
  "PDF Link": string;
}

// ---------------- Sheet URLs ----------------
const VIDEOS_SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQGKHJwekNxU1khZGcVXAtb8bwRv7SyMwgPcuQuPomdRDAbkDmNunMORkqXQgBLjVEupOtjI70ETFvW/pub?gid=0&single=true&output=csv";

const PDFS_SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQGKHJwekNxU1khZGcVXAtb8bwRv7SyMwgPcuQuPomdRDAbkDmNunMORkqXQgBLjVEupOtjI70ETFvW/pub?gid=1140373478&single=true&output=csv";

// ---------------- Lazy PDF Card ----------------
const LazyPDFCard = ({ title, pdfLink }: { title: string; pdfLink: string }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  const match = pdfLink.match(/\/d\/(.+?)\//);
  const fileId = match ? match[1] : "";
  const previewUrl = `https://drive.google.com/file/d/${fileId}/preview`;

  return (
    <div
      ref={ref}
      className="relative bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all overflow-hidden max-h-[350px] max-w-[300px]"
    >
      <div className="px-3 pt-3">
        <h4 className="font-semibold text-base line-clamp-1 text-center">{title}</h4>
      </div>

      <div className="relative aspect-[4/4] mt-2 bg-muted rounded-md overflow-hidden">
        {inView ? (
          <iframe
            src={previewUrl}
            title={title}
            className="w-full h-full border-0 transition-all duration-500 ease-in-out"
          ></iframe>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground text-sm">
            <Loader2 className="h-5 w-5 animate-spin mb-2 text-primary" />
            Loading preview...
          </div>
        )}
      </div>
    </div>
  );
};

// ---------------- Main Component ----------------
const SubjectVideos = () => {
  const { className, subjectName } = useParams();
  const navigate = useNavigate();
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [pdfs, setPdfs] = useState<PDFItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showVideos, setShowVideos] = useState(false);
  const [showPdfs, setShowPdfs] = useState(false);

  // 🔹 Fetch both videos and PDFs
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [videoRes, pdfRes] = await Promise.all([
          fetch(VIDEOS_SHEET_URL),
          fetch(PDFS_SHEET_URL),
        ]);

        const [videoText, pdfText] = await Promise.all([
          videoRes.text(),
          pdfRes.text(),
        ]);

        const parsedVideos = Papa.parse(videoText, { header: true }).data as VideoItem[];
        const parsedPdfs = Papa.parse(pdfText, { header: true }).data as PDFItem[];

        // Filter & reverse (latest → first)
        const filteredVideos = parsedVideos
          .filter(
            (v) =>
              v.Class?.trim().toLowerCase() === className?.toLowerCase() &&
              v.Subject?.trim().toLowerCase() === subjectName?.toLowerCase()
          )
          .reverse();

        const filteredPdfs = parsedPdfs
          .filter(
            (p) =>
              p.Class?.trim().toLowerCase() === className?.toLowerCase() &&
              p.Subject?.trim().toLowerCase() === subjectName?.toLowerCase()
          )
          .reverse();

        setVideos(filteredVideos);
        setPdfs(filteredPdfs);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [className, subjectName]);

  // ---------------- Render ----------------
  return (
    <section className="py-10 px-4 md:py-16 bg-background min-h-screen">
      <div className="container mx-auto max-w-5xl">
        <button
          onClick={() => navigate("/", { state: { scrollTo: "classes" } })}
          className="mb-6 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/80 transition-colors"
        >
          ← Back Home
        </button>

        <h2 className="text-3xl font-bold mb-8">
          Class {className} - {subjectName}
        </h2>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="mt-2 text-muted-foreground">Loading content...</p>
          </div>
        ) : (
          <div className="space-y-10">
            {/* ✏️ PDFs Section */}
            <div className="bg-card rounded-xl shadow-soft border border-border overflow-hidden">
              <div
                onClick={() => setShowPdfs((prev) => !prev)}
                className="flex justify-between items-center cursor-pointer p-4 bg-muted/40 hover:bg-muted/60 transition-colors"
              >
                <h3 className="text-2xl font-semibold flex items-center gap-2">
                  <FileText className="h-6 w-6 text-primary" />
                  Study Material
                </h3>
                {showPdfs ? (
                  <ChevronDown className="h-6 w-6 text-muted-foreground transition-transform duration-300 rotate-180" />
                ) : (
                  <ChevronRight className="h-6 w-6 text-muted-foreground transition-transform duration-300" />
                )}
              </div>

              {showPdfs && (
                <div className="p-4 space-y-6">
                  {pdfs.length === 0 ? (
                    <p className="text-muted-foreground">No PDFs found.</p>
                  ) : (
                    <div className="grid md:grid-cols-3 gap-4 place-items-center">
                      {pdfs.map((p, i) => (
                        <LazyPDFCard key={i} title={p.Title} pdfLink={p["PDF Link"]} />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 🎥 Videos Section */}
            <div className="bg-card rounded-xl shadow-soft border border-border overflow-hidden">
              <div
                onClick={() => setShowVideos((prev) => !prev)}
                className="flex justify-between items-center cursor-pointer p-4 bg-muted/40 hover:bg-muted/60 transition-colors"
              >
                <h3 className="text-2xl font-semibold flex items-center gap-2">
                  <Video className="h-6 w-6 text-primary" />
                  Video Lessons
                </h3>
                {showVideos ? (
                  <ChevronDown className="h-6 w-6 text-muted-foreground transition-transform duration-300 rotate-180" />
                ) : (
                  <ChevronRight className="h-6 w-6 text-muted-foreground transition-transform duration-300" />
                )}
              </div>

              {showVideos && (
                <div className="p-4 grid md:grid-cols-2 gap-6">
                  {videos.length === 0 ? (
                    <p className="text-muted-foreground">No videos found.</p>
                  ) : (
                    videos.map((v, i) => (
                      <div
                        key={i}
                        className="bg-white shadow-md rounded-xl p-4 border border-gray-100"
                      >
                        <h4 className="font-semibold mb-2">{v.Heading}</h4>
                        <iframe
                          width="100%"
                          height="250"
                          src={v["YouTube Link"].replace("watch?v=", "embed/")}
                          title={v.Heading}
                          allowFullScreen
                          className="rounded-lg"
                        ></iframe>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SubjectVideos;