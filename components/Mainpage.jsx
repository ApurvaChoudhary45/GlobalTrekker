'use client'
import React from 'react'
import dynamic from 'next/dynamic';
import { useSelector, useDispatch } from 'react-redux'
import { findCountry, findNews } from '@/Redux/Country/country'
import { useState, useEffect } from 'react';
import { searchCountry } from '@/Redux/Search/search';
import Link from 'next/link';
import { signOut } from "next-auth/react"
const Mainpage = () => {
  const MapView = dynamic(() => import('@/components/MapView'), {
    ssr: false,
    // ✅ This disables server-side rendering for MapView
  });
  const countries = useSelector(state => state.earth.country)
  const city = useSelector(state => state.country.query)
  const newss = useSelector(state => state.earth.cards)
  const dispatch = useDispatch()
  const [weather, setweather] = useState([])
  const [nextWeather, setnextWeather] = useState([])
  const [find, setfind] = useState('')
  const [markerPosition, setMarkerPosition] = useState(null);

  useEffect(() => {
    const fetcher = async () => {
      try {
        const data = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,population,capital,region,subregion,timezones')
        const response = await data.json()
        const randomIndex = Math.floor(Math.random() * response.length)
        const randomCountry = response[randomIndex]
        dispatch(findCountry(randomCountry))
        const latlng = randomCountry?.latlng;
        if (latlng) {
          setMarkerPosition({ lat: latlng[0], lng: latlng[1] });
        }
        dispatch(searchCountry(randomCountry?.name?.common))
        const news = await fetch(`https://gnews.io/api/v4/search?q=${randomCountry?.name?.common}&lang=en&token=a331b412159a8d82c40b848452a46202`)
        const getdata = await news.json()
        dispatch(findNews(getdata?.articles?.slice(0, 6)))
        const extra = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=8dba66ba63ea4bd287d153603250504&q=${randomCountry?.name?.common}&days=5`)
        const getExtra = await extra.json()
        setnextWeather(getExtra?.forecast?.forecastday)
      } catch (error) {
        console.log('Error Occurred while fetching')
      }
    }
    fetcher()
  }, [dispatch])


  useEffect(() => {
    if (!city || city.trim() === '') return;

    const searchCountryAndWeather = async () => {
      try {
        // 1️⃣ Fetch country info by name
        const countryRes = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(city)}?fullText=true`);
        const countryData = await countryRes.json();

        if (!countryData || countryData.status === 404 || !countryData[0]) {
          console.error("Country not found");
          return;
        }

        const foundCountry = countryData[0];
        dispatch(findCountry(foundCountry)); //  Update country info
        const latlng = foundCountry?.latlng;
        if (latlng) {
          setMarkerPosition({ lat: latlng[0], lng: latlng[1] });
        }

        // Fetch weather info using the capital of that country
        const capital = foundCountry.capital?.[0];
        if (!capital) {
          console.warn("No capital found for this country.");
          return;
        }

        const weatherRes = await fetch(`https://api.weatherapi.com/v1/current.json?key=8dba66ba63ea4bd287d153603250504&q=${encodeURIComponent(capital)}&aqi=no`);
        const weatherData = await weatherRes.json();

        if (weatherData?.error) {
          console.error("Weather API Error:", weatherData.error.message);
          return;
        }

        setweather(weatherData); // ✅ Update weather info

        const news = await fetch(`https://gnews.io/api/v4/search?q=${encodeURIComponent(capital)}&lang=en&token=a331b412159a8d82c40b848452a46202`)
        const getdata = await news.json()
        dispatch(findNews((getdata?.articles)))

        const extra = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=8dba66ba63ea4bd287d153603250504&q=${city}&days=5`)
        const getExtra = await extra.json()
        setnextWeather(getExtra?.forecast?.forecastday)

      } catch (error) {
        console.error("Error searching:", error);
      }
    };

    searchCountryAndWeather();
  }, [city, dispatch]);


  const searching = () => {
    if (find.trim() === '') return;
    dispatch(searchCountry(find))
    setfind('')
  }

  const handleMapClick = async ({ lat, lng }) => {
    try {
      const geoRes = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=98e41ec11c024306991bbc578afcd9d9`);
      const geoData = await geoRes.json();
      const countryName = geoData?.results?.[0]?.components?.country;

      if (!countryName) return;

      // Fetch country info
      const countryRes = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
      const countryData = await countryRes.json();

      // Fetch weather info using capital
      const capital = countryData?.[0]?.capital?.[0];
      const weatherRes = await fetch(`https://api.weatherapi.com/v1/current.json?key=8dba66ba63ea4bd287d153603250504&q=${capital}`);
      const weatherData = await weatherRes.json();

      const news = await fetch(`https://gnews.io/api/v4/search?q=${encodeURIComponent(capital)}&lang=en&token=a331b412159a8d82c40b848452a46202`)
      const getdata = await news.json()


      // Dispatch or setState
      dispatch(findCountry(countryData[0]));
      const latlng = countryData?.[0]?.latlng;
      if (latlng) {
        setMarkerPosition({ lat: latlng[0], lng: latlng[1] });
      }
      setweather(weatherData);
      dispatch(findNews((getdata?.articles)))

    } catch (err) {
      console.error("Error during map click fetch:", err);
    }
  };

  const getDayName = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short", // 'long' for full name like "Tuesday"
    });
  };



  return (
    <>
      <div className='relative min-h-screen'>
        <video
          className="absolute inset-0 w-full h-[80vh] object-cover blur-sm"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="https://videos.pexels.com/video-files/854225/854225-hd_1920_1080_30fps.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className='relative z-50'>
          <nav className='md:flex md:justify-between md:items-center md:px-40 py-5 backdrop:blur-2xl flex justify-between items-center px-5'>
            <h1 className='md:text-3xl font-mono font-extralight text-white text-2xl'>GlobeTrekker</h1>
            <button className='text-sm p-2 border-2 md:p-2 rounded-2xl text-white hover:bg-amber-200 hover:text-black font-mono transition-all duration-500 cursor-pointer' onClick={() => signOut()}>Log Out</button>
          </nav>
        </div>
        <div className='relative z-50 w-full max-w-2xl mx-auto text-center mt-10 px-4 '>
          <p className='text-white text-center md:text-5xl md:py-20 text-4xl py-20 font-mono'>Find a country. Track everything that matters</p>
          <input
            type="text"
            placeholder="Enter country name..."
            value={find}
            onChange={(e) => setfind(e.target.value)}
            className="w-full px-5 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all duration-300 font-mono"

          />
          <button className='text-black bg-teal-400 mt-5 p-3 rounded-2xl text-lg font-mono cursor-pointer hover:bg-teal-300' onClick={searching}>Search</button>
        </div>
        <div className='px-5'>
          <main className="md:flex md:flex-row gap-10 px-6 md:px-5 md:mt-[100px] grid grid-cols-1 mt-[190px]">

            <div className="w-full md:w-[50%] h-[400px] md:h-auto bg-gray-700 flex items-center justify-center gap-2 rounded-2xl">

              <MapView onMapClick={handleMapClick} markerPosition={markerPosition} />
            </div>

            {/* Country Info Area (30%) */}
            <aside className="w-full md:w-1/4 bg-[#1e293b] text-white p-6 rounded-3xl shadow-xl relative z-50">
              <h2 className="text-2xl font-semibold text-teal-300 mb-6 font-mono">🌍 Country Info</h2>
              <div className="space-y-4 text-base font-light">
                <div><span className="font-semibold text-teal-200">Country:</span> {countries?.name?.common}</div>
                <div><span className="font-semibold text-teal-200">Capital:</span> {countries?.capital}</div>
                <div><span className="font-semibold text-teal-200">Region:</span> {countries?.region}</div>
                <div><span className="font-semibold text-teal-200">Population:</span> {countries?.population?.toLocaleString()}</div>
                <div><span className="font-semibold text-teal-200">Timezone:</span> {countries?.timezones?.[0]}</div>
                <div className="pt-4">
                  <img src={countries?.flags?.png} alt="Flag" className="w-24 h-16 rounded-xl shadow-md border" />
                </div>
              </div>
            </aside>
            <div></div>
            <aside className="w-full md:w-1/4 bg-[#f0f9ff] text-[#0f172a] p-6 rounded-3xl shadow-xl hover:bg-[#b3daf5] transition duration-500 relative z-50">
              <img src="https://images.pexels.com/photos/12762122/pexels-photo-12762122.jpeg" alt="" className='absolute inset-0 w-full h-full rounded-3xl' />
              <div className='relative z-50'>
                <h2 className="text-2xl font-semibold text-white   mb-6 font-mono">⛅ Weather Info</h2>
                <div className="space-y-4 text-base font-medium text-white">
                  <div><span className="font-semibold text-black text-lg font-mono">Location:</span> {weather?.location?.country}</div>
                  <div><span className="font-semibold text-black text-lg font-mono">Capital:</span> {weather?.location?.name}</div>
                  <div><span className="font-semibold text-black text-lg font-mono">Temperature:</span> {weather?.current?.temp_c}°C</div>
                  <div><span className="font-semibold text-black text-lg font-mono">Condition:</span> {weather?.current?.condition?.text}</div>
                  <div className="pt-4">
                    <img src={weather?.current?.condition?.icon} alt="weather icon" className="w-20 h-20" />
                  </div>
                </div>
              </div>
            </aside>

          </main>
          <div>
            <aside className="w-full md:w-3/4 bg-[#f0f9ff] text-[#0f172a] p-6 rounded-3xl shadow-xl hover:bg-[#b3daf5] transition duration-500 relative z-50 mt-20 mx-auto">
              <h2 className="text-2xl font-semibold text-sky-700 mb-6 font-mono">⛅ 3-Day Forecast</h2>

              {Array.isArray(nextWeather) && (
                <div className="flex justify-between overflow-x-auto">
                  {nextWeather.map(item => (
                    <div
                      key={item.date}
                      className="flex-shrink-0 w-full md:w-1/5 bg-white text-center p-4 rounded-xl shadow-md"
                    >
                      <p className="font-semibold text-gray-600">{getDayName(item.date)}</p>
                      <img
                        src={`https:${item.day.condition.icon}`}
                        alt="icon"
                        className="mx-auto"
                      />
                      <p className="text-sm">{item.day.condition.text}</p>
                      <p className="text-lg font-bold">{item.day.avgtemp_c}°C</p>
                    </div>
                  ))}
                </div>
              )}
            </aside>

          </div>
          <div>
            <h1 className='text-4xl font-mono font-bold text-center mt-10'>Hot News 🔥</h1>

            <div className='md:grid md:grid-cols-3 md:gap-10'>

              {Array.isArray(newss) && newss.map(item => {
                return (<div className="w-full bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl hover:scale-105 hover:transition-all transition-shadow duration-500 mt-10" key={item.id}>
                  <img
                    src={item.image}
                    alt="News"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-5">
                    <h2 className="text-xl font-semibold text-gray-800 line-clamp-2">
                      {item.title}
                    </h2>
                    <p className="text-gray-500 text-sm mt-2 line-clamp-3">
                      {item.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm text-gray-400">Source: {item.source.name}</span>
                      <Link
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-600 font-medium hover:underline"
                      >
                        Read more →
                      </Link>
                    </div>
                  </div>
                </div>)
              })}
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default Mainpage
