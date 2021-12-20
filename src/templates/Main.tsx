import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Card from "../components/Card";
import garden from "../services/apiConnection";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import langEn from "../EN";
import langCs from "../CS";

Modal.setAppElement("body");

interface Garden {
  name: string;
  image: any;
  description: string;
  properties: Array<any>;
  url: string;
}

export default () => {
  const [apiKey, setApiKey] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [gardenData, setGardenData] = useState<Garden>({
    name: "",
    image: "",
    description: "",
    properties: [],
    url: "",
  });
  const [geo, setGeo] = useState([1, 2]);

  const openModal = (properties: any) => {
    setGardenData(properties.properties);
    setGeo(properties.geometry.coordinates);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const [lang, setLang] = useState("CS");
  const [gardens, setGardens] = useState([]);
  const [init, setInit] = useState(false);
  useEffect(() => {
    const getData = async () => {
      const apiData = await garden(apiKey);
      setInit(true);
      setGardens(apiData.features || []);
    };
    !init && getData();
  }, [apiKey]);
  const dictionary = lang === "CS" ? langCs : langEn;
  return (
    <div className="main-template">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <h1>{gardenData.name}</h1>
        <img className="photo" src={gardenData.image.url} />
        <p>
          <span>{dictionary.description}:</span> {gardenData.description}
        </p>
        {gardenData.properties.map((element, i) => (
          <p key={"x-" + i}>
            <span>{element.description}</span>: {element.value}
          </p>
        ))}
        <a target="_blank" href={gardenData.url}>
          Website
        </a>
        <br />
        <a
          href={
            "https://www.google.cz/maps/@" + geo[1] + "," + geo[0] + ",17.00z"
          }
          target="_blank"
        >
          {dictionary.map}
        </a>
      </Modal>

      <Header />
      {gardens.map((garden, i) => (
        <Card
          {...garden}
          openModal={openModal}
          lang={dictionary}
          key={"card-" + i}
        />
      ))}
      <Footer
        setLang={setLang}
        lang={dictionary}
        setApiKey={setApiKey}
        setInit={setInit}
      />
    </div>
  );
};
