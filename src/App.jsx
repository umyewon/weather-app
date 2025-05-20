import { useState, useEffect } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ClipLoader } from "react-spinners";

/* 컴포넌트 */ 
import WeatherBox from './component/WeatherBox'
import WeatherButton from './component/WeatherButton'

// 1. 앱이 실행되자마자 현재 위치 기반의 날씨 조회 및 노출
// 2. 날씨 정보 : 도시, 섭씨, 화씨, 날씨 상태정보 노출
// 3. 5개의 버튼 : 1개는 현재 위치, 4개는 각기 다른 도시
// 4. 현재 위치 & 도시 버튼을 클릭하면 도시 별 날씨 조회
// 5. 데이터를 가져오는 동안 로딩 스피너가 돈다.
function App() {
  const API_KEY = "7fcffc196a363dd854adda9de7124a11";  // API 키
  const cities = ['Seoul', 'Paris', 'New York'];       // 도시 정보

  const [weather, setWeather] = useState(null);        // 날씨 설정
  const [city, setCity] = useState('');                // 날짜 설정
  const [loading, setLoading] = useState(false);       // 로딩바 설정
  const [apiError, setApiError] = useState(true);        // 에러설정

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position)=>{
      let lat = position.coords.latitude;
      let lon = position.coords.longitude; 
      getWeatherByCurrentLocation(lat, lon);
    });
  }

  const getWeatherByCurrentLocation = async(lat, lon) => {
    try{
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=kr&units=metric`;
      setLoading(true);
      let response = await fetch(url) // async 함수여야 await 사용 가능
      let data = await response.json();
      setWeather(data);
    } catch(err){
      console.log(err.message);
      setApiError(err.message);
      setLoading(false);
    }
  }

  const getWeatherByCity = async() => {
    try{
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&lang=kr&units=metric`;
      let response = await fetch(url) // async 함수여야 await 사용 가능
      let data = await response.json();
      setWeather(data);
    } catch(err){
      console.log(err.message);
      setApiError(err.message);
      setLoading(false);
    }
  }

  useEffect(()=>{
    console.log('city ??', city)
    setLoading(true);
    city ? getWeatherByCity() : getCurrentLocation(); // 현재 위치 가져오기
  },[city]) // []

  useEffect(() => {
    console.log('Weather ??', weather)
    setLoading(false);
  }, [weather])
  

  return (
    <div>
      {loading?<ClipLoader className="container"
          color="#f88c6b"
          loading={loading}   // 로딩 show,hide 조절
          size={180}
          aria-label="Loading Spinner"
          data-testid="loader"
          /> : !apiError ? 
      (<div className="container">
        <WeatherBox weather={weather} />
        <br/>
        <WeatherButton cities={cities} setCity={setCity} selectedCity={city}  />
      </div>) : <div className="container errorMsg"><h2>잠시 후 다시 시도해 주십시오.</h2></div>
      }
    </div>
  )
}

export default App
