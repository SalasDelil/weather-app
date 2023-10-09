import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { weatherIcon } from './utilities/IconsUtils';
import WeatherIcons from './assets/images/WeatherIcons.gif';
import GithubIcon from './assets/github.svg';
import Wind from './assets/wind.svg';
import Humidity from './assets/humidity.svg';

const dateBuilder = (d) => {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();
  console.log(d)

  return `${day}, ${date} ${month} ${year}`;
};

const App = () => {
  const [data, setData] = useState({});
  const [city, setCity] = useState('Addis Ababa');
  const [unit, setUnit] = useState('imperial');
  const [error, setError] = useState(null);


  //const apiKey = process.env.REACT_APP_API_KEY

  const apiKey = 'ed6a14fdf3393a6b9f416bba4ef9c1aa';
  const url = 'https://api.openweathermap.org/data/2.5/weather?q=';

  const search = (event) => {
    try {
      if (event.key === 'Enter') {
        axios.get(`${url}${city}&units=${unit}&appid=${apiKey}`).then((response) => {
          setData(response.data);
          setError(null)
        }).catch((error) => {
          setError('City not found or network error')
        });
        setCity('')
      }
    } catch (error) {
      console.log('Error fetching weather data: ', error)
    }
  };

  useEffect(() => {
    axios.get(`${url}${city}&units=${unit}&appid=${apiKey}`).then((response) => {
      setData(response.data);
      console.log(response.data);
    })
  }, );



  const unitToggler = () => {
    if (unit === 'imperial') {
      setUnit('metric')
    } else {
      setUnit('imperial')
    }
  };


  return (
    <div className='p-8 text-white'>
      <div className='items-center p-6 h-screen rounded-md shadow-md shadow-slate-300 bg-black/10'>
        <div className='flex justify-between mb-6'>
          <h2 className='font-semibold text-2xl sm:text-3xl lg:text-4xl'>Weather App</h2>
          <span className='hidden md:block'>{dateBuilder(new Date())}</span>
          <a href='https://github.com/SalasDelil/weather-app' target='_blank' rel='noopener noreferrer'>
            <img src={GithubIcon} alt='GitHub Icon' className='h-8 w-8' />
          </a>
        </div>
        <div className='flex justify-center items-center'>
          <div className='relative w-full sm:w-3/4 lg:w-1/2'>
            <input
              className="focus:ring-2 focus:ring-white focus:outline-none focus:shadow-lg text-lg leading-6 placeholder-slate-300 bg-transparent rounded-3xl w-full py-2 pl-10 ring-1 ring-slate-200 shadow-md"
              value={city}
              type='text'
              name='search'
              onKeyPress={search}
              placeholder='Enter city name'
              onChange={event => setCity(event.target.value)}
              required
            />
            <span
              className="absolute inset-y-0 left-0 flex items-center pl-3 cursor-pointer"
              onClick={search}
            >
              <svg
                width="20"
                height="20"
                fill="currentColor"
                className="text-white pointer-events-none"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                />
              </svg>
            </span>
          </div>
        </div>
        {error && <p className="text-red-500 flex justify-center items-center">{error}</p>}
        {!data ? (
          <img className='w-1/2 m-auto' src={WeatherIcons} alt='Loading weather data...' />
        ) : (
          <div className='py-6 sm:p-8 md:px-14 flex flex-col w-full lg:w-3/4'>
            <span className='flex justify-center items-center md:hidden'>{dateBuilder(new Date())}</span>
            <div className='flex flex-col space-y-4 sm:flex-row justify-between items-center'>
              <div className='flex justify-center font-medium text-3xl sm:text-2xl md:text-3xl lg:text-4xl'>
                <p>{data.name}</p>
                <p>{data.sys ? <p>, {data.sys.country}</p> : null}</p>
              </div>
              <div className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl'>
                {data.main ? <h1>{data.main.temp.toFixed()}°{unit === 'imperial' ? 'F' : 'C'}</h1> : null}
              </div>
              <div className='flex justify-center items-center flex-col space-y-6'>
                {data.weather ? (
                  <div>
                    <img src={weatherIcon(`${data.weather[0].icon}.png`)} alt={data.weather[0].main} className='h-20 sm:h-28 md:h-40' />
                    <p className='font-medium text-xl'>{data.weather[0].main}</p>
                  </div>
                ) : (
                  null
                )}
              </div>
            </div>
            <div className='flex flex-col sm:flex-row sm:space-x-8 space-y-4'>
              <div className='flex items-center space-x-4'>
                {data.main ? <>
                  <img src={Humidity} alt='humidity' className='h-10 sm:h-12 lg:h-16' />
                  <p className='text-xl sm:text-3xl'>{data.main.humidity}%</p>
                </> : null}
              </div>
              <div className='flex items-center space-x-3'>
                {data.wind ? <>
                  <img src={Wind} alt='wind blow' className='h-10 sm:h-12 lg:h-16' />
                  <p className='text-xl sm:text-3xl'>{data.wind.speed.toFixed()}{unit === 'imperial' ? ' mph' : ' m/s'}</p>
                </> : null}
              </div>
            </div>
            <div className='mt-20 sm:mt-28'>
              <button className='border rounded-md p-2 shadow-md hover:shadow-lg transition-shadow duration-800' onClick={unitToggler}>Change unit to °{unit === 'imperial' ? 'C' : 'F'}</button>
            </div>
          </div>
        )
        }
      </div>
    </div>
  );
};

export default App;