import React from "react";

const Contacto = () => {
  return (
    <section
      id="contacto"
      className="bg-white py-24 sm:py-32 border-t border-slate-100"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-16 gap-y-14 lg:grid-cols-2">
          
          {/* COLUMNA IZQUIERDA: Información de Contacto */}
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Hablemos de tu proyecto
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              ¿Tienes dudas sobre las licencias? ¿Necesitas un Beat Custom
              exclusivo? O simplemente quieres saludar. Estoy a un mensaje de
              distancia.
            </p>

            <div className="mt-8 space-y-6">
              {/* 1. Email de Contacto */}
              <div className="flex items-center gap-x-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 ring-1 ring-blue-100">
                  {/* Icono Envelope */}
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                </div>
                <div className="text-base text-slate-600">
                  <span className="block font-semibold text-slate-900">
                    Email
                  </span>
                  contacto@fluxbeats.com
                </div>
              </div>

              {/* 2. Tiempo de Respuesta */}
              <div className="flex items-center gap-x-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 ring-1 ring-blue-100">
                  {/* Icono Reloj */}
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="text-base text-slate-600">
                  <span className="block font-semibold text-slate-900">
                    Respuesta rápida
                  </span>
                  Generalmente en menos de 24 horas.
                </div>
              </div>

              {/* 3. Redes Sociales */}
              <div className="flex items-center gap-x-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 ring-1 ring-blue-100">
                  {/* Icono Share/Network */}
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                    />
                  </svg>
                </div>
                <div>
                  <span className="block font-semibold text-slate-900 text-base">
                    Sígueme
                  </span>
                  <div className="flex gap-4 mt-1">
                    {/* Links de Redes */}
                    <a
                      href="#"
                      className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors flex items-center gap-1"
                    >
                      Instagram
                    </a>
                    <span className="text-slate-300">|</span>
                    <a
                      href="#"
                      className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors flex items-center gap-1"
                    >
                      YouTube
                    </a>
                    <span className="text-slate-300">|</span>
                    <a
                      href="#"
                      className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors flex items-center gap-1"
                    >
                      Airbit
                    </a>
                    <span className="text-slate-300">|</span>
                    <a
                      href="#"
                      className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors flex items-center gap-1"
                    >
                      BeatStars
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA: Formulario de Contacto */}
          <form className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold leading-6 text-slate-900"
                >
                  Nombre / Artista
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="name"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold leading-6 text-slate-900"
                >
                  Email
                </label>
                <div className="mt-2.5">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="subject"
                  className="block text-sm font-semibold leading-6 text-slate-900"
                >
                  Asunto
                </label>
                <div className="mt-2.5">
                  <select
                    id="subject"
                    name="subject"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  >
                    <option>Información sobre Licencias</option>
                    <option>Beat Personalizado (Custom)</option>
                    <option>Colaboración</option>
                    <option>Otro</option>
                  </select>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold leading-6 text-slate-900"
                >
                  Mensaje
                </label>
                <div className="mt-2.5">
                  <textarea
                    name="message"
                    id="message"
                    rows={4}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 resize-none"
                    defaultValue={""}
                  />
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                className="rounded-md bg-blue-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all w-full sm:w-auto"
              >
                Enviar Mensaje
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contacto;