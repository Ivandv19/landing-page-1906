import BeatsSection from "../../components/Beats/Beats";
import Hero from "../../components/Hero/Hero";
import Licencias from "../../components/Licencias/Licencias";
import SobreMi from "../../components/SobreMi/SobreMi";
import Testimonios from "../../components/Testimonios/Testimonios";
import Contacto from "../../components/Contacto/Contacto";

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
}

export default Home;