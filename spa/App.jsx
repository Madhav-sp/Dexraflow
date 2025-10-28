// src/App.jsx
import Navbar from "./components/Navbar";
import SectionCard from "./components/SectionCard";
import Section from "./components/layout/Section";
import Divider from "./components/layout/Divider";
import { ContainerScroll } from "./components/ContainerScroll";
import FeatureGrid from "./components/FeatureGrid";
import UseCases from "./components/UseCases";
import Integrations from "./components/Integrations";
import Testimonials from "./components/Testimonials";
import Pricing from "./components/Pricing";
import CTA from "./components/CTA";
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
            <Section>
                <RadialTimelineSection/>
                {/*<SectionCard>*/}
                {/*<ContainerScroll*/}
                {/*  titleComponent={*/}
                {/*    <header className="mx-auto max-w-3xl text-center">*/}
                {/*      <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">*/}
                {/*        Build with AI you can trust*/}
                {/*      </h1>*/}
                {/*      <p className="mt-4 text-lg text-slate-600">*/}
                {/*        Dexraflow turns scattered docs and tools into one intelligent workspace.*/}
                {/*      </p>*/}
                {/*      <br/>*/}
                {/*      <br/>*/}
                {/*    </header>*/}
                {/*  }*/}
                {/*>*/}
                {/*  <div className="h-full w-full flex items-center justify-center">*/}
                {/*    <div className="text-center">*/}
                {/*      <p className="text-sm uppercase tracking-wider text-slate-500">Preview</p>*/}
                {/*      <h3 className="mt-2 text-2xl font-bold">Ask anything across your files</h3>*/}
                {/*      <p className="mt-1 text-slate-600">Every answer links back to the source.</p>*/}
                {/*    </div>*/}
                {/*  </div>*/}

                {/*</ContainerScroll>*/}
                {/*</SectionCard>*/}
            </Section>

            <Divider/>

            {/*<Section id="features">*/}
            {/*  <SectionCard className={"bg-gray-700"}>*/}
            {/*    <FeatureGrid />*/}
            {/*  </SectionCard>*/}
            {/*</Section>*/}

            <Divider/>

            {/*<Section id="use-cases">*/}
            {/*  <SectionCard className={"oklch(85.2% 0.199 91.936)"}>*/}
            {/*    <UseCases />*/}
            {/*  </SectionCard>*/}
            {/*</Section>*/}

            <Divider/>

            <Section id="integrations">
                <SectionCard className={"bg-black"}>
                    <IntegrationsGrid/>
                </SectionCard>
            </Section>

            <Divider/>

            {/*<Section id="testimonials">*/}
            {/*  <SectionCard >*/}
            {/*    <Testimonials />*/}
            {/*  </SectionCard>*/}
            {/*</Section>*/}

            <Divider/>

            {/*<Section id="pricing">*/}
            {/*  <SectionCard>*/}
            {/*    <Pricing />*/}
            {/*  </SectionCard>*/}
            {/*</Section>*/}

            <Divider/>

            <Section id="get-started">
                <SectionCard className={"bg-black"}>
                    {/*<CTA />*/}
                    <ShowcaseSection/>
                </SectionCard>
            </Section>
        </main>

        <Footer/>
    </div>
  );
}
