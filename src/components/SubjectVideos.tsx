import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronRight, FileText, Video, Loader2 } from "lucide-react";
import Papa from "papaparse";

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

const VIDEOS_SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQGKHJwekNxU1khZGcVXAtb8bwRv7SyMwgPcuQuPomdRDAbkDmNunMORkqXQgBLjVEupOtjI70ETFvW/pub?gid=0&single=true&output=csv"  
//"https://docs.google.com/spreadsheets/d/e/2PACX-1vQGKHJwekNxU1khZGcVXAtb8bwRv7SyMwgPcuQuPomdRDAbkDmNunMORkqXQgBLjVEupOtjI70ETFvW/pub?output=csv";

const PDFS_SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQGKHJwekNxU1khZGcVXAtb8bwRv7SyMwgPcuQuPomdRDAbkDmNunMORkqXQgBLjVEupOtjI70ETFvW/pub?gid=1140373478&single=true&output=csv"; // replace this with your PDFs sheet CSV link

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

        // filter and reverse (latest last → first)
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

  const getEmbedLink = (url: string) => {
    if (!url) return "";
    const match = url.match(/\/d\/(.+?)\//);
    return match ? `https://drive.google.com/file/d/${match[1]}/preview` : url;
  };

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
                    <div className="grid md:grid-cols-3 gap-2">
                      {pdfs.map((p, i) => {
                        const match = p["PDF Link"].match(/\/d\/(.+?)\//);
                        const fileId = match ? match[1] : "";
                        const previewUrl = `https://drive.google.com/file/d/${fileId}/preview`;

                        return (
                          <div
                            key={i}
                            className="relative bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all overflow-hidden max-h-[350px] max-w-[300px]"
                          >
                            {/* Header / title */}
                            <div className="px-4 pt-3">
                              <h4 className="font-semibold text-lg line-clamp-1">
                                {p.Title}
                              </h4>
                            </div>

                            {/* Thumbnail (using Drive preview iframe) */}
                            <div className="relative aspect-[4/4] mt-2 bg-muted rounded-md overflow-hidden">
                              <iframe
                                src={previewUrl}
                                title={p.Title}
                                className="w-full h-full"
                              ></iframe>

                              {/* Overlay buttons */}
                              {/* <div className="absolute top-2 right-2 flex gap-2">
                                <a
                                  href={p["PDF Link"]}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  title="View PDF"
                                  className="p-2 rounded-full bg-white/80 hover:bg-white shadow transition"
                                >
                                  <Eye className="h-4 w-4 text-gray-700" />
                                </a>
                                <a
                                  href={p["PDF Link"]}
                                  download
                                  title="Download PDF"
                                  className="p-2 rounded-full bg-white/80 hover:bg-white shadow transition"
                                >
                                  <Download className="h-4 w-4 text-gray-700" />
                                </a>
                              </div> */}
                            </div>
                          </div>
                        );
                      })}
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
                  <ChevronDown className="h-6 w-6 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-6 w-6 text-muted-foreground" />
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
