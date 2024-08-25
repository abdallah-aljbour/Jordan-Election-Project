import React from "react";
import Counter from "../components/Counter";
import VotingPercentage from "../components/VotingPercentageM";
import Hero from "../components/Hero";
import Faq from "../components/FAQ";
import DidYouKnow from "../components/DidUKnow";
import Advertisment from "../components/Advertisment";
import AdvertisementPopup from "../sharedComponants/AdvertisementPopup";
import HeaderM from "../components/HeaderM";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <HeaderM />
      <Hero />
      <Counter />
      <VotingPercentage />
      <Advertisment />
      <Faq />

      <DidYouKnow />
      <Footer />
    </>
  );
}

export default Home;
