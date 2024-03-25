"use client";
import React from 'react';
import { useDataContext } from '../context/DataProvider';
import Link from 'next/link';

function Menu(props) {
    let { appss } = useDataContext();

    return (
        <div className='h-screen w-full max-w-[250px] '>
            <div className="  gap-y-3 w-full h-full  border-r-2 border-black ">
                <div className=" grid gap-y-5 text-center pt-10 text-lg font-semibold ">
                    <Link href="/" className=" h-fit p-3">
                        My Apps
                    </Link>
                    {appss && (
                        appss.map((app, index) => {
                            return (
                                <Link key={index} href={`/projects/${app.name}`} className=" h-fit p-3">
                                    {app.name}
                                </Link>
                            )
                        })
                    )}


                </div>


            </div>
        </div>
    );
}

export default Menu;