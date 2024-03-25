"use client"
import { useEffect, useState } from "react";
import { useDataContext } from "../app/context/DataProvider"
import ProjectsContainer from "./components/ProjectsContainer";
import fetchData from "./utils/functions";

export default function Home() {


  let { setTranslations, setAppss } = useDataContext();
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    async function getData() {
      const appsData = await fetchData('https://localhost:7155/api/AppApi');
      setAppss(appsData);

      const translationsData = await fetchData('https://localhost:7155/api/TranslateApi');
      setTranslations(translationsData);
    }
    getData();

  }, [flag]);

  return (
    <div className="flex  w-full h-screen bg-white">
      <div className="w-full pt-10">
        <h1 className="text-2xl text-center">Translator manager</h1>
        <ProjectsContainer setFlag={setFlag} flag={flag} />
      </div>
    </div>
  );
}
