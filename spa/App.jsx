// src/App.jsx
import Navbar from "./components/Navbar";
import SectionCard from "./components/SectionCard";
import Section from "./components/layout/Section";
// import Divider from "./components/layout/Divider";
import Footer from "./components/Footer";
import Hero from "./components/Hero.jsx";
import RadialTimelineSection from "./components/sections/RadialTimelineSection.jsx";
import IntegrationsGrid from "./components/Integrations.jsx"
import ShowcaseSection from "./components/sections/Product.jsx";
import WeezProductShowcase from "./components/sections/WeezProductShowcase.jsx";
export default function App() {
  return (
    <div className="relative min-h-screen bg-black text-slate-900">
      <Navbar />
      <Hero
          line1="Automate,"
          line2="Beautifully"
          kicker="Dexraflow — Where AI meets effortless flow"
      />
        <main role="main">
            <div className="mx-auto max-w-[80rem] px-4">
                <WeezProductShowcase/>
            </div>
            {/*<Divider/>*/}
            <Section>
                <RadialTimelineSection/>
            </Section>



            {/*<Divider/>*/}

            <Section id="integrations">
                <SectionCard className={"bg-black"}>
                    <IntegrationsGrid/>
                </SectionCard>
            </Section>


            {/*<Divider/>*/}

            <Section id="get-started">
                <SectionCard className={"bg-black"}>
                    <ShowcaseSection/>
                </SectionCard>
            </Section>
        </main>

        <Footer/>
    </div>
  );
}
