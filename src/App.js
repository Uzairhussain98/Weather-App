import React ,{useState} from 'react';

const api = {
  key: "4970e4f266675063af77ad454f45ebd6",
  base: "https://api.openweathermap.org/data/2.5/"
}



function App() {
  
  const [query, setquery] = useState('');
  const [weather, setweather] = useState({});

  const search = evt => {
    if( evt.key === "Enter" ){
      fetch (`${api.base}weather?q=${query}&units=metrics&APPID=${api.key}`)
      .then (res => res.json())
      .then (result => {
        
        setweather(result);
        setquery('');
        console.log(result);
      });
    }
  }
  const dateBuilder = (d) =>{

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
 let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


let date = days[d.getDay()];
let day = d.getDate();
let month = months[d.getMonth()]
let year = d.getFullYear()

return ` ${date} ${day} ${month} ${year}`
  }
    
  return (
    <div className={typeof weather.main !== "undefined" ? 
    ((weather.main.temp-273.15 > 25)) ? 'App warm' : 'App' 
    : 'App'  }>
      <main>
    <div className="search-box">
    <input
      type = "Text"
      className ="search-bar"
      placeholder = "Search"
      onChange={e => setquery(e.target.value) }
      value={query}
      onKeyPress={search}
    
    
    />
</div>
{(typeof weather.main !== "undefined" ? (
  <div>
<div className="location-box">
  <div className="location">{weather.name},{weather.sys.country}</div>
  <div className="date">{dateBuilder(new Date())} </div>
</div> 
<div className="weather-box">
<div className="temp"> {Math.round(weather.main.temp-273.15)}°C </div>
<div className="weather"> {weather.weather[0].main} </div>
</div>
</div>
) : ('') )}

      </main>
    
    </div>
  );
}
  
export default App;
