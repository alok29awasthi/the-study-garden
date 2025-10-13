import { useState, useEffect } from "react";
import { PlayCircle, Loader2, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Video {
  class: string;
  subject: string;
  title: string;
  youtubeLink: string;
}

interface GroupedVideos {
  [className: string]: {
    [subject: string]: Video[];
  };
}

const DemoVideos = () => {
  const [videos, setVideos] = useState<GroupedVideos>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Extract YouTube video ID from various URL formats
  const getYouTubeId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Replace this URL with your actual Google Sheets published CSV URL
        const SHEET_CSV_URL = "YOUR_GOOGLE_SHEET_CSV_URL_HERE";
        
        // For demo purposes, using sample data
        // In production, uncomment the fetch code below and replace with your sheet URL
        
        /*
        const response = await fetch(SHEET_CSV_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch video data");
        }
        
        const csvText = await response.text();
        const rows = csvText.split('\n');
        const parsedVideos: Video[] = [];
        
        // Skip header row, parse CSV
        for (let i = 1; i < rows.length; i++) {
          const row = rows[i].split(',');
          if (row.length >= 4 && row[0] && row[1] && row[2] && row[3]) {
            parsedVideos.push({
              class: row[0].trim(),
              subject: row[1].trim(),
              title: row[2].trim(),
              youtubeLink: row[3].trim(),
            });
          }
        }
        */
        
        // Sample demo data - replace with actual Google Sheets fetch
        const parsedVideos: Video[] = [
          {
            class: "Class 5",
            subject: "Mathematics",
            title: "Introduction to Fractions",
            youtubeLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          },
          {
            class: "Class 5",
            subject: "Mathematics",
            title: "Decimals Made Easy",
            youtubeLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          },
          {
            class: "Class 5",
            subject: "Science",
            title: "The Solar System",
            youtubeLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          },
          {
            class: "Class 8",
            subject: "Mathematics",
            title: "Linear Equations",
            youtubeLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          },
          {
            class: "Class 8",
            subject: "Science",
            title: "Chemical Reactions",
            youtubeLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          },
        ];
        
        // Group videos by class and subject
        const grouped: GroupedVideos = {};
        parsedVideos.forEach(video => {
          if (!grouped[video.class]) {
            grouped[video.class] = {};
          }
          if (!grouped[video.class][video.subject]) {
            grouped[video.class][video.subject] = [];
          }
          grouped[video.class][video.subject].push(video);
        });
        
        setVideos(grouped);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching videos:", err);
        setError("Unable to load videos. Please try again later.");
        setLoading(false);
        toast({
          title: "Error",
          description: "Failed to load demo videos",
          variant: "destructive",
        });
      }
    };

    fetchVideos();
  }, [toast]);

  if (loading) {
    return (
      <section id="demo-videos" className="py-16 px-4 md:py-24 bg-muted/30">
        <div className="container mx-auto max-w-6xl text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
          <p className="mt-4 text-muted-foreground">Loading demo videos...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="demo-videos" className="py-16 px-4 md:py-24 bg-muted/30">
        <div className="container mx-auto max-w-6xl text-center">
          <AlertCircle className="h-12 w-12 mx-auto text-destructive mb-4" />
          <p className="text-destructive">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="demo-videos" className="py-16 px-4 md:py-24 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 md:mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Watch Our Demo Lessons
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience our teaching style through these sample videos
          </p>
        </div>

        {Object.keys(videos).length === 0 ? (
          <div className="text-center bg-card rounded-3xl p-12 shadow-soft">
            <PlayCircle className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <p className="text-xl text-muted-foreground">
              Demo videos will appear here once added to the Google Sheet
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Add videos with columns: Class | Subject | Title | YouTube Link
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {Object.entries(videos).map(([className, subjects], classIndex) => (
              <div key={classIndex} className="animate-fade-in" style={{ animationDelay: `${classIndex * 0.1}s` }}>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <span className="w-2 h-8 bg-gradient-hero rounded-full" />
                  {className}
                </h3>
                
                {Object.entries(subjects).map(([subject, videoList], subjectIndex) => (
                  <div key={subjectIndex} className="mb-8">
                    <h4 className="text-xl font-semibold text-secondary mb-4 ml-5">
                      {subject}
                    </h4>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 ml-5">
                      {videoList.map((video, videoIndex) => {
                        const videoId = getYouTubeId(video.youtubeLink);
                        return (
                          <div
                            key={videoIndex}
                            className="bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-hover transition-all duration-300 hover:scale-105"
                          >
                            {videoId ? (
                              <div className="aspect-video">
                                <iframe
                                  className="w-full h-full"
                                  src={`https://www.youtube.com/embed/${videoId}`}
                                  title={video.title}
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                />
                              </div>
                            ) : (
                              <div className="aspect-video bg-muted flex items-center justify-center">
                                <AlertCircle className="h-12 w-12 text-muted-foreground" />
                              </div>
                            )}
                            <div className="p-4">
                              <h5 className="font-semibold text-foreground line-clamp-2">
                                {video.title}
                              </h5>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default DemoVideos;
