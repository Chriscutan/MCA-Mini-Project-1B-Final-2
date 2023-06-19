import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { City, Country } from "country-state-city";
import Select from "react-select";
import axios from "axios";
import WeatherCard from "../components/WeatherCard";
import TempChart from "../components/TempChart";
import HumidityChart from "../components/HumidityChart";
import DewPointChart from "../components/DewPointChart";

function Weather() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [currentWeather, setCurrentWeather] = useState({});

  useEffect(() => {
    setCountries(
      Country.getAllCountries().map((country) => ({
        value: {
          latitude: country.latitude,
          longitude: country.longitude,
          isoCode: country.isoCode,
        },
        label: country.name,
      }))
    );

    setCities(
      City.getCitiesOfCountry(selectedCountry?.isoCode).map((city) => ({
        value: {
          latitude: city.latitude,
          longitude: city.longitude,
          name: city.name,
        },
        label: city.name,
      }))
    );
  }, [selectedCountry]);

  const getWeatherStatus = async () => {
    const response = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${selectedCity.latitude}&longitude=${selectedCity.longitude}&hourly=temperature_2m,relativehumidity_2m,dewpoint_2m,precipitation,rain&current_weather=true`
    );
    setCurrentWeather(response.data);
  };

  return (
    <div className="bg-gray-100">
      <Header />

      <div className="max-w-7xl mx-auto flex justify-center p-3">
        {/* City Selection */}
        <div className=" max-w-sm space-y-3 bg-gray-100 p-3 rounded-lg w-[20%] mr-5 h-fit">
          <Select
            options={countries}
            onChange={(val) => setSelectedCountry(val.value)}
          />

          <Select
            options={cities}
            onChange={(val) => setSelectedCity(val.value)}
          />

          <button
            onClick={getWeatherStatus}
            className="bg-green-400 w-[100%] text-sm font-bold p-2 rounded-lg hover:scale-105 transition-all duration-200 ease-out"
          >
            Get Weather
          </button>
        </div>
        {/* Weather */}
        {currentWeather && (
          <div className="w-[80%]">
            <div className="flex items-center ">
              <WeatherCard
                title="Temperature"
                value={currentWeather?.current_weather?.temperature}
                topColor="indigo"
                unit="°"
              />

              <WeatherCard
                title="Wind Direction"
                value={currentWeather?.current_weather?.winddirection}
                topColor="blue"
                unit="°"
              />

              <WeatherCard
                title="Wind Speed"
                value={currentWeather?.current_weather?.windspeed}
                topColor="red"
                unit="m/s"
              />
            </div>

            {/* Charts */}
            <div>
              <TempChart results={currentWeather} />
              <HumidityChart results={currentWeather} />
              <DewPointChart results={currentWeather} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Weather;
