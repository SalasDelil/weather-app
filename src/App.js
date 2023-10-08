import axios from 'axios';
import React, { useState } from 'react';

const App = () => {
  const [data, setData] = useState({});
  const [city, setCity] = useState('');
  const [unit, setUnit] = useState('imperial')

  //current temp, weather description, humidity, wind speed, and any other
  //use appropriate icons like sunny, rainy, cloudy
  //add feature to switch between F and C
  //error handling invalid city name or network connection


  const apiKey = 'ed6a14fdf3393a6b9f416bba4ef9c1aa';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;

  const search = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      setCity('')
    }
  };

  const handelClick = () => {
    search();
  };
  const unitToggler = () => {
    if (unit === 'imperial'){
      setUnit('metric')
    } else {
      setUnit('imperial')
    }
  }


  return (
    <React.Fragment>
      <div className='border rounded-3xl p-2'>
        <input
          className='border-collapse border-blue-400 rounded-3xl p-2'
          value={city}
          type='text'
          name='search'
          onKeyPress={search}
          placeholder='Enter city name'
          onChange={event => setCity(event.target.value)}
          required
        />
        <button className='search' onClick={() => handelClick()}>Search</button>
      </div>
      <div className='container'>
        <div className='top'>
          <div className='location'>
            <p>{data.name}</p>
          </div>
          <div className='temp'>
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
          <div className='description'>
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        <div className='bottom'>
          <div className='feels'>
            {data.main ? <p>{data.main.feels_like}°F</p> : null}
          </div>
          <div className='humidity'>
            {data.main ? <p>{data.main.humidity}%</p> : null}
          </div>
          <div className='wind'>
            {data.wind ? <p>{data.wind.speed}mph</p> : null}
          </div>
        </div>
        <div className='toggler'>
          <button className='' onClick={unitToggler}>Change unit to °{unit === 'imperial' ? 'F' : 'C'}</button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default App;