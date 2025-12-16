import React from 'react';

const Hero = () => {
  return (
    <div className="relative isolate bg-white px-6 pt-14 lg:px-8 overflow-hidden">
      
      {/* --- Fondo Atmosférico Superior (Efecto Blur) --- */}
      <div
        className="absolute -top-40 left-[calc(50%-10rem)] -z-10 h-[40rem] w-[40rem] transform-gpu blur-3xl sm:left-[calc(50%-20rem)]"
        aria-hidden="true"
      >
        <div 
          className="h-full w-full bg-gradient-to-tr from-blue-200 to-cyan-400 opacity-30 rounded-full animate-pulse-slow" 
          style={{ animationDuration: '8s' }} // Animación de pulso lenta
        />
      </div>

      {/* --- Contenido Principal (Centrado) --- */}
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
            Beats que fluyen con tu contenido.
          </h1>
          
          <p className="mt-6 text-xl font-medium text-slate-600">
            Sonidos para Creadores.
          </p>
          
          <div className="mt-10 flex items-center justify-center gap-x-6">
            {/* CTA 1: Explorar Beats */}
            <a
              href="#beats"
              className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all"
            >
              Explorar Beats
            </a>
            {/* CTA 2: Explorar Licencias */}
            <a
              href="#licencias"
              className="text-sm font-semibold leading-6 text-slate-900 flex items-center gap-1 hover:text-blue-600 transition-colors"
            >
              Explorar Licencias <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>

      {/* --- Fondo Atmosférico Inferior (Efecto Blur) --- */}
      <div
        className="absolute top-[calc(100%-20rem)] left-[calc(50%+3rem)] -z-10 h-[40rem] w-[40rem] transform-gpu blur-3xl sm:left-[calc(50%+10rem)]"
        aria-hidden="true"
      >
        <div className="h-full w-full bg-gradient-to-tr from-blue-200 to-cyan-400 opacity-30 rounded-full" />
      </div>
    </div>
  );
};

export default Hero;