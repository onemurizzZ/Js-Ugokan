"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Forecast = {
  data: string;
  dateLabel: string;
  telop: string;
  detail: {
    weather: string;
    wind: string;
    wave: string;
  };
  temperature: {
    max: {
      celsius: string;
    };
    min: {
      celsius: string;
    };
  };
  chanceOfRain: {
    T00_06: string;
    T06_12: string;
    T12_18: string;
    T18_24: string;
  };
  image: {
    url: string;
  };
};

export default function Home() {
  const baseUrl = "https://weather.tsukumijima.net/api/forecast";
  const cityNumber = 120020;

  const [loading, setLoading] = useState(true);

  const [forecasts, setForecasts] = useState<Forecast[]>([]);

  useEffect(() => {
    const fetchForecast = async () => {
      const response = await fetch(`${baseUrl}?city=${cityNumber}`);
      const data = await response.json();
      setForecasts(data.forecasts as Forecast[]);
      setLoading(false);
    };
    fetchForecast();
  }, []);

  return loading ? (
    <h1>ロード中・・・</h1>
  ) : (
    <div className="flex flex-wrap gap-2 w-screen">
      {forecasts.map((forecast, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>{forecast.dateLabel}</CardTitle>
          </CardHeader>
          <CardContent>
            <div>{forecast.telop}</div>
            <img src={forecast.image.url} width={80} height={60} />
            <div>
              <div>最高気温</div>
              <div>
                {forecast.temperature.max.celsius
                  ? forecast.temperature.max.celsius
                  : "-"}
                ℃
              </div>
              <div>最低気温</div>
              <div>
                {forecast.temperature.min.celsius
                  ? forecast.temperature.min.celsius
                  : "-"}
                ℃
              </div>
            </div>
            <div>
              <div>降水確率</div>
              <div>00-06時: {forecast.chanceOfRain.T00_06}</div>
              <div>06-12時: {forecast.chanceOfRain.T06_12}</div>
              <div>12-18時: {forecast.chanceOfRain.T12_18}</div>
              <div>18-24時: {forecast.chanceOfRain.T18_24}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
