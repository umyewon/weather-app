import React from 'react'
import { Button } from 'react-bootstrap';
import gps from '../image/gps.png';

const WeatherButton = ({cities, setCity, selectedCity}) => {
    return (
    <div className="weather-font">
        <Button variant={selectedCity == '' ? 'secondary' : 'light'} onClick={()=>{setCity('')}}><img width="25" src={gps}/></Button>

        {cities.map((item, index)=>{
            return <Button variant={selectedCity == item ? 'secondary' : 'light'} key={index} onClick={()=>{setCity(item)}}>
                {item}
            </Button>
        })}
    </div>
    );
}

export default WeatherButton