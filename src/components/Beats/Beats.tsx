import React, { useRef, useState } from "react";

const MiniPlayer = ({ currentBeat, isPlaying, onToggle, onClose }) => {
  if (!currentBeat) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-[100] bg-white border-t border-slate-200 shadow-2xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4 min-w-0">
          <button
            onClick={onToggle}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white shadow-md transition-transform hover:scale-105 active:scale-95"
            aria-label={isPlaying ? "Pausar" : "Reproducir"}
          >
            {isPlaying ? (
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg className="h-5 w-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-900 truncate">
              {currentBeat.title}
            </p>
            <p className="text-xs text-slate-500">
              {currentBeat.bpm} BPM | {currentBeat.key}
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="text-slate-500 hover:text-slate-700 p-2 rounded-full transition-colors"
          aria-label="Cerrar reproductor"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};


const beats = [
  {
    id: 1,
    title: "Midnight Coffee",
    bpm:78,
    key: "E",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    audioUrl: "https://audiosflux.blob.core.windows.net/public-audio/musc1.wav"
  },
  {
    id: 2,
    title: "Seraph",
    bpm: 90,
    key: "C#m",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    audioUrl: "https://audiosflux.blob.core.windows.net/public-audio/LilSeraph.mp3"
  },
  {
    id: 3,
    title: "Moon",
    bpm: 89,
    key: "G#m",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    audioUrl: "https://audiosflux.blob.core.windows.net/public-audio/Moon.mp3"
  },
  {
    id: 4,
    title: "7Nights",
    bpm: 85,
    key: "C#m",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    audioUrl: "https://audiosflux.blob.core.windows.net/public-audio/7Nights.mp3"
  },
  {
    id: 5,
    title: "Shibuya",
    bpm: 95,
    key: "Bbm",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1516280440614-6697288d5d38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    audioUrl: "https://audiosflux.blob.core.windows.net/public-audio/ShibuyaNights.mp3"
  },
];


const BeatsSection = () => {
  const scrollRef = useRef(null);
  const audioRef = useRef(null); 
  const [currentBeat, setCurrentBeat] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = direction === "left" ? -320 : 320;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };


  const togglePlayPause = (beat) => {
    const audio = audioRef.current;

    if (currentBeat?.id === beat.id) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      }
      setCurrentBeat(null);
    } else {
      if (currentBeat) {
        audio.pause();
      }
      audio.src = beat.audioUrl;
      audio.play().then(() => {
        setIsPlaying(true);
        setCurrentBeat(beat);
      }).catch((err) => {
        console.error("Error al reproducir audio:", err);
      });
    }
  };

  const stopAudio = () => {
    const audio = audioRef.current;
    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
    setCurrentBeat(null);
  };

  return (
    <>
      <section id="beats" className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Catálogo Reciente
              </h2>
              <p className="mt-2 text-lg leading-8 text-slate-600">
                Explora nuestros últimos lanzamientos.
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => scroll("left")}
                className="group flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white transition-all hover:border-blue-600 hover:text-blue-600 active:scale-95"
                aria-label="Anterior"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => scroll("right")}
                className="group flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white transition-all hover:border-blue-600 hover:text-blue-600 active:scale-95"
                aria-label="Siguiente"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide px-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {beats.map((beat) => (
              <div
                key={beat.id}
                className="min-w-[280px] md:min-w-[320px] snap-center group relative flex flex-col overflow-hidden rounded-lg bg-white shadow-sm transition-all hover:shadow border border-slate-200"
              >
                <div className="relative aspect-square overflow-hidden bg-slate-200">
                  <img
                    src={beat.image}
                    alt={beat.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
                  <button
                    onClick={() => togglePlayPause(beat)}
                    className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-blue-500 ${
                      currentBeat?.id === beat.id && isPlaying
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100"
                    }`}
                  >
                    {currentBeat?.id === beat.id && isPlaying ? (
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                      </svg>
                    ) : (
                      <svg className="h-6 w-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{beat.title}</h3>
                    <div className="mt-2 flex items-center gap-3 text-sm text-slate-500">
                      <span className="flex items-center gap-1">
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        {beat.bpm} BPM
                      </span>
                      <span className="text-slate-300">|</span>
                      <span>{beat.key}</span>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-lg font-bold text-blue-600">${beat.price}</span>
                    <button className="rounded-md border border-slate-200 px-4 py-1.5 text-sm font-semibold text-slate-900 transition-colors hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600">
                      Comprar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AUDIO OCULTO */}
      <audio ref={audioRef} />

      {/* MINI REPRODUCTOR */}
      <MiniPlayer
        currentBeat={currentBeat}
        isPlaying={isPlaying}
        onToggle={() => togglePlayPause(currentBeat)}
        onClose={stopAudio}
      />
    </>
  );
};

export default BeatsSection;