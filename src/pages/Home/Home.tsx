// Componentes
import BeatsSection from "@/components/Beats/Beats";
import Contacto from "@/components/Contacto/Contacto";
import Hero from "@/components/Hero/Hero";
import Licencias from "@/components/Licencias/Licencias";
import SobreMi from "@/components/SobreMi/SobreMi";
import Testimonios from "@/components/Testimonios/Testimonios";

// Página principal que compone todas las secciones del landing
const Home = () => {
	return (
		<>
			{/* Sección hero principal */}
			<Hero />
			{/* Catálogo de beats */}
			<BeatsSection />
			{/* Planes de licencia */}
			<Licencias />
			{/* Reseñas de clientes */}
			<Testimonios />
			{/* Sobre el productor */}
			<SobreMi />
			{/* Formulario de contacto */}
			<Contacto />
		</>
	);
};

export default Home;
