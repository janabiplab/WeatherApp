import React, { useEffect, useRef, useState } from 'react'
import "./weather.css"
import SearchIcon from "../assets/icon/search.jpg"
import CloudyRainIcon from "../assets/icon/cloudy_rain.png"
import CloudyStormIcon from "../assets/icon/cloudy_storm.png"
import CloudySunnyIcon from "../assets/icon/cloudy_sunny (2).png"
import CloudyIcon from "../assets/icon/cloudy.png"
import ClearIcon from "../assets/icon/sunny.png"
import HumidityIcon from "../assets/icon/humidity1.png"
import SnowfallIcon from "../assets/icon/snowfall.png"
import RainIcon from "../assets/icon/rain.png"
import WindFlowIcon from "../assets/icon/wind.png"
import MistIcon from "../assets/icon/mist.png"





function Weather() {
    const inputRef=useRef()
    const [weatherData,setWeatherData]=useState(false)
    const allIcons={
        "01d":ClearIcon,
        "01n":ClearIcon,
        "02d":CloudySunnyIcon,
        "02n":CloudySunnyIcon,
        "03d":CloudyIcon,
        "03n":CloudyIcon,
        "04d":CloudyIcon,
        "04n":CloudyIcon,
        "09d":CloudyRainIcon,
        "09n":CloudyRainIcon,
        "10d":RainIcon,
        "10n":RainIcon,
        "11d":CloudyStormIcon,
        "11n":CloudyStormIcon,
        "13d":SnowfallIcon,
        "13n":SnowfallIcon,
        "50d":MistIcon,
        "50n":MistIcon,



    }
    const search= async(city)=>{
        if(city === ""){
            alert("Please Enter The City Name");
            return;
        }
        try{
            const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
            const response=await fetch(url);
            const data=await response.json();
            if(!response.ok){
                alert(data.message);
                return;
            }
            const icon=(allIcons[data.weather[0].icon])|| ClearIcon;
            setWeatherData({
                humidity:data.main.humidity,
                windSpeed:data.wind.speed,
                temperature:Math.floor(data.main.temp,),
                location:data.name,
                icon:icon,
                
            })
        }catch(error){
            setWeatherData(false)

        }
    }
    useEffect(()=>{
        search("kolkata")
    },[])
  return (
    <div className="weather_container">
        <p className="web_name">SkyCast</p>
        <div className="search_bar">
            <input type="text" ref={inputRef} placeholder='search by city name' className="input_city"></input>
            <img src={SearchIcon} onClick={()=>search(inputRef.current.value)}className="search_image"/>
            
        </div>
        {weatherData?<>
        <div className="weather_image_container">
            <img src={weatherData.icon} className="weather_image"/>
        </div>
        <div className="temp_city_container">
            <p className="temparature">{weatherData.temperature}&#176; c</p>
            <p className="city_name">{weatherData.location}</p>
        </div>
        <div className="bottom_container">
        <div className="data_container_1">
             <img src={HumidityIcon} className="humidity_image"/>
             <div className="humidity_data">
                <p className="humidity">{weatherData.humidity} %</p>
                <span>Humidity</span>
             </div>
        </div>
        <div className="data_container_2">
            <img src={WindFlowIcon} className="wind_image"/>
             <div className="wind_data">
                <p className="wind_speed">{weatherData.windSpeed} Km/h</p>
                <span>Wind Speed</span>
             </div>

        </div>
        </div>
        </>:<></>}
       
        
       
    </div>
  )
}

export default Weather