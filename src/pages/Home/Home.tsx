import BeatsSection from "../../components/Beats/Beats";
import Contacto from "../../components/Contacto/Contacto";
import Hero from "../../components/Hero/Hero";
import Licencias from "../../components/Licencias/Licencias";
import SobreMi from "../../components/SobreMi/SobreMi";
import Testimonios from "../../components/Testimonios/Testimonios";

/**
 * Página: Landing Page (Inicio)
 * Compone todas las secciones principales: Hero, Beats, Licencias, Testimonios, Sobre Mí, Contacto.
 */
const Home = () => {
	return (
		<>
			<Hero />
			<BeatsSection />
			<Licencias />
			<Testimonios />
			<SobreMi />
			<Contacto />
		</>
	);
};

export default Home;
