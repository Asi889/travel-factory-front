"use client";
import { useDataContext } from '../../context/DataProvider';
// import { useDataContext } from '/app/context/DataProvider';
import fetchData from '../../utils/functions';
// import fetchData from '@/app/utils/functions';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function ProjectDetails({ params }) {
    let { setTranslations, setAppss, selectedApp, setSelectedApp } = useDataContext();
    const router = usePathname();
    const lastPartOfPath = router?.split('/').pop();
    const [dataTrns, setDataTrns] = useState([]);
    const [addedInputs, setAddedInputs] = useState([]);

    const handleAddClick = () => {
        setDataTrns((prev) => [...prev, { key: '', English: '', French: '', Dutch: '', appId: selectedApp[0].id, id: 0 }]);
        setAddedInputs((prev) => [...prev, { key: '', English: '', French: '', Dutch: '', appId: selectedApp[0].id, id: 0 }])
        console.log(addedInputs);
    };
    const handleInputChange = (index, language, value) => {
        const newInputs = [...dataTrns];
        const newAddedInputs = [...addedInputs];
        newAddedInputs[0][language] = value;
        setAddedInputs(newAddedInputs);
        newInputs[index][language] = value;
        setDataTrns(newInputs);
    };

    const handleSaveClick = async () => {
        try {
            const response = await fetch('https://localhost:7155/api/TranslateApi', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(addedInputs[0]),
            });

            if (!response.ok) {
                throw new Error('Failed to save translation');
            }

        } catch (error) {
            console.error('Error saving translation:', error);
        }
    };

    useEffect(() => {
        async function getData() {
            const appsData = await fetchData('https://localhost:7155/api/AppApi');
            setAppss(appsData);
            const translationsData = await fetchData('https://localhost:7155/api/TranslateApi');
            setTranslations(translationsData);
            const project = appsData?.filter(app => app.name === lastPartOfPath);
            setSelectedApp(project);
            const filteredArray = translationsData.filter(item => item.appId === project[0].id);
            setDataTrns(filteredArray);
        }
        getData();


    }, []);

    return (
        <div className="  w-full h-screen bg-white">
            <div className="w-full pt-10">
                <h1 className="text-2xl text-center">Translator manager</h1>

            </div>
            <div className='pt-8 grid justify-center gap-3'>
                {dataTrns.map((item, index) => (
                    <div className='flex gap-4' key={index} style={{ marginBottom: '20px' }}>
                        {Object.entries(item).map(([key, value]) => {
                            if (key === "appId") return null;
                            if (key === "id") return null;
                            return (
                                <div key={key} className='grid'>
                                    <h2 className='text-center text-lg font-semibold'>{key}</h2>
                                    <input type="text" className='border-2 border-black  focus:bg-gray-200 pl-2' onChange={(e) => handleInputChange(index, key, e.target.value)} value={Array.isArray(value) ? 'Array' : value.toString()} />
                                </div>
                            )
                        })}
                    </div>
                ))}
                <button onClick={handleAddClick} className='bg-[#008CFF] px-4 py-2 w-fit rounded-lg text-white font-semibold'>Add</button>

                <button onClick={handleSaveClick} className='bg-[#008CFF] px-4 py-2 w-fit rounded-lg text-white font-semibold justify-self-end mt-4 mr-8'>Save</button>
            </div>
        </div>
    );
}

export default ProjectDetails;