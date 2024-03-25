"use client";
import React, { useState } from 'react';
import { useDataContext } from '../context/DataProvider';
import * as XLSX from 'xlsx';


function ProjectsContainer(props) {
    const { flag, setFlag } = props;
    let { appss, translations, selected } = useDataContext();
    const [appInput, setAppInput] = useState('');
    const [popup, setPopup] = useState(false);

    function downloadExcel(app) {
        const filteredArray = translations.filter(item => item.appId === app.id);
        app.translations = filteredArray;
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet([app]);
        XLSX.utils.book_append_sheet(wb, ws, "Translations");
        XLSX.writeFile(wb, `${app.name}.xlsx`);
    }
    const handleAdd = () => {
        setPopup(!popup);
    }
    const handleCreate = async () => {
        const newApp = {
            id: 0,
            name: appInput,
            lastDeployed: new Date().toISOString(),
            translations: [{ id: 0, key: "", English: "", French: "", Dutch: "", appId: 0 }]
        }
        try {
            const response = await fetch('https://localhost:7155/api/AppApi', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newApp),
            });

            if (!response.ok) {
                throw new Error('Failed to save translation');
            }

        } catch (error) {
            console.error('Error saving translation:', error);
        }
        setAppInput('');
        setFlag(!flag);
        setPopup(!popup);


    }
    const handleDeploy = async (app) => {
        try {
            const response = await fetch('https://localhost:7155/api/AppApi/saveData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(app),
            });

            if (!response.ok) {
                throw new Error('Failed to save translation');
            }

        } catch (error) {
            console.error('Error saving translation:', error);
        }

    }


    return (
        <div className="w-full max-w-4xl flex flex-wrap gap-x-4 gap-y-6 pt-8 px-2 mx-auto justify-center text-white relative">

            <div className={`absolute border-2 border-black w-60 h-[150px] mt-6 mx-auto z-50 bg-white text-black grid gap-2 p-2 transition-all duration-200 ease-in  ${popup ? "opacity-100" : "opacity-0"}`}>
                <h2 className='text-center font-semibold'>Enter app name</h2>
                <input className='border-[1px] border-black rounded-lg pl-2' type="text" value={appInput} onChange={(e) => setAppInput(e.target.value)} />
                <button className='bg-[#008CFF] px-3 py-1 w-fit justify-self-center rounded-lg text-white font-semibold' onClick={handleCreate}>create</button>
            </div>

            {appss && (
                appss.map((app, index) => {
                    return (
                        <div key={index} className="border-[1px] border-black h-fit p-3 relative">
                            <div className='bg-[#008CFF] absolute -top-4 rounded-lg px-3 py-2'>{app.name}</div>
                            <div>
                                <div className='py-5 text-black'><h1 className='font-semibold'>Last deployment: <span className='font-normal'> {app?.lastDeployed}</span> </h1></div>
                                <div className='flex gap-x-3 justify-between'>
                                    <button onClick={() => downloadExcel(app)} className='bg-[#008CFF] px-3 py-2 font-semibold rounded-md'>download on xslx</button>
                                    <button onClick={() => handleDeploy(app)} className='bg-[#008CFF] px-3 py-2 font-semibold rounded-md'>deploy</button>
                                </div>
                            </div>

                        </div>
                    )
                })

            )}
            <button onClick={handleAdd} className="bg-[#008CFF] h-fit px-3 py-2 rounded-lg w-full max-w-[330px] self-center font-semibold text-lg" >Add app</button>
        </div>
    );
}

export default ProjectsContainer;