

const stats = [
  { label: 'Años produciendo', value: '3+' },
  { label: 'Beats en catálogo', value: '50+' },
  { label: 'Creadores felices', value: '10+' },
  { label: 'Calidad de Audio', value: '24-bit' },
];

const SobreMi = () => {
  return (
    <section id="sobre-mi" className="overflow-hidden bg-slate-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-center">
          
          {/* COLUMNA IZQUIERDA: Texto y Estadísticas */}
          <div className="lg:pr-8">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-blue-600">Prod. Flux</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Más que solo música, <br/>creando atmósferas.
              </p>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                Hola, soy Flux. Mi obsesión no es solo hacer beats, es diseñar el "vibe" perfecto para que tu contenido destaque.
              </p>
              <p className="mt-4 text-base leading-7 text-slate-600">
                Empecé combinando mi pasión por el código y la música ("Vibe Coding"), buscando ese sonido Lofi y Chillhop que te permite concentrarte, relajarte o crear sin distracciones.
              </p>
              <p className="mt-4 text-base leading-7 text-slate-600">
                Cada beat en este catálogo ha sido mezclado y masterizado pensando en cómo sonará en tu stream de Twitch o en tu video de YouTube.
              </p>

              {/* STATS DE LA COMPAÑÍA (Grid) */}
              <dl className="mt-10 grid grid-cols-2 gap-4 border-t border-slate-200 pt-10 sm:grid-cols-2">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                    <dt className="text-sm font-medium leading-6 text-slate-500">{stat.label}</dt>
                    <dd className="mt-2 text-3xl font-bold tracking-tight text-slate-900">{stat.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* COLUMNA DERECHA: Imagen y Decoración */}
          <div className="relative lg:mt-0"> 
            
            {/* Decoración/Sombra detrás de la imagen (Blur) */}
            <div className="absolute top-4 left-4 -right-4 -bottom-4 rounded-xl bg-blue-100/60 blur-sm -z-10 hidden sm:block" />
            
            {/* Imagen Principal */}
            <img
              src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              alt="Prod Flux Studio Setup"
              className="w-full h-auto rounded-xl bg-slate-900 shadow-xl ring-1 ring-slate-400/10 object-cover"
              width={1000}
              height={1000}
            />
            
            {/* Frase Flotante (Efecto Frosted Glass) */}
            <div className="absolute bottom-6 left-6 right-6 rounded-lg bg-white/95 backdrop-blur-sm p-4 border border-slate-200 shadow-sm hidden md:block">
              <p className="text-sm font-medium text-slate-800 italic text-center">
                "El sonido es el 50% de la experiencia visual."
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SobreMi;