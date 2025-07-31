'use client'
import React from 'react'
import { v4 as uuidv4 } from 'uuid';
const WorldInfo = () => {
    const highlights = [
        "Largest Country — Russia ",
        "Smallest Country — Vatican City",
        "Richest Country (GDP/capita) — Luxembourg",
        "Coldest Capital City — Ulaanbaatar",
        "Hottest Country — Kuwait",
        "Most Time Zones — France",
        "Most Land Borders — China",
        "Longest Coastline — Canada",
        "Most Islands — Sweden",
        "Country with No Rivers — Saudi Arabia",
        "Most Visited Country — France",
        "Most Official Languages — Zimbabwe",
        "Youngest Country — South Sudan",
        "Most Spoken Language — English"
    ];
    const mostPopulousCountries = [
        { name: "China", population: "1,409,000,000", flag: "🇨🇳", id: uuidv4() },
        { name: "India", population: "1,406,000,000", flag: "🇮🇳", id: uuidv4() },
        { name: "United States", population: "339,000,000", flag: "🇺🇸", id: uuidv4() },
        { name: "Indonesia", population: "277,000,000", flag: "🇮🇩", id: uuidv4() },
        { name: "Pakistan", population: "241,000,000", flag: "🇵🇰", id: uuidv4() },
    ];
    const largestCountriesByArea = [
        { name: "Russia", area: "17,098,242 km²", flag: "🇷🇺", id: uuidv4() },
        { name: "Canada", area: "9,984,670 km²", flag: "🇨🇦", id: uuidv4() },
        { name: "China", area: "9,596,961 km²", flag: "🇨🇳", id: uuidv4() },
        { name: "United States", area: "9,525,067 km²", flag: "🇺🇸", id: uuidv4() },
        { name: "Brazil", area: "8,515,767 km²", flag: "🇧🇷", id: uuidv4() },
    ];

    return (
        <div>
            <h1 className='text-3xl font-mono text-center mt-10 text-blue-400 hover:text-blue-500 font-extrabold'>🌐 World at a Glance</h1>
            <div className='md:flex md:justify-around grid grid-cols-1'>
                <section className="md:max-w-[50%] w-full px-6">
                    <h1 className='text-3xl font-mono text-center mt-10 text-blue-400 bg-amber-100'>Facts</h1>
                    <div className="grid grid-cols-2 gap-5 mt-10">
                        {highlights.map((item, index) => (
                            <span
                                key={index}
                                className="bg-indigo-100 text-indigo-900 px-4 py-2 rounded-2xl text-lg shadow-sm font-medium hover:bg-indigo-200 transition cursor-pointer"
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                </section>
                <section className='md:max-w-[50%] w-full px-6'>
                    <h1 className='text-3xl font-mono text-center mt-10 text-blue-400 bg-amber-100'>Key Facts</h1>
                    <div className="flex flex-col md:flex-row justify-between gap-8 mt-10 px-4 md:px-16">

                        {/* Top 5 Populous Countries */}
                        <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-50 to-blue-100 text-gray-900 p-6 rounded-3xl shadow-xl transition duration-500 hover:shadow-2xl">
                            <h2 className="text-xl font-bold font-mono mb-4 text-blue-900">🌐 Top 5 Populous Countries</h2>

                            <div className="grid gap-4">
                                {mostPopulousCountries.map((item, index) => (
                                    <div key={index} className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between hover:bg-blue-50 transition">
                                        <div>
                                            <h3 className="text-lg font-semibold">{item.flag} {item.name}</h3>
                                            <p className="text-sm text-gray-500">Population: {item.population}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Top 5 Largest Countries by Area */}
                        <div className="w-full md:w-1/2 bg-gradient-to-br from-slate-50 to-slate-100 text-gray-900 p-6 rounded-3xl shadow-xl transition duration-500 hover:shadow-2xl">
                            <h2 className="text-xl font-bold font-mono mb-4 text-slate-900">🗺️ Top 5 Largest Countries by Area</h2>

                            <div className="grid gap-4">
                                {largestCountriesByArea.map((item, index) => (
                                    <div key={index} className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between hover:bg-slate-50 transition">
                                        <div>
                                            <h3 className="text-lg font-semibold">{item.flag} {item.name}</h3>
                                            <p className="text-sm text-gray-500">Area: {item.area}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                </section>
            </div>
        </div>
    )
}

export default WorldInfo
