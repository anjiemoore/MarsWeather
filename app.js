const API_KEY = 'DEMO_KEY'
const API_URL = `https://api.nasa.gov/insight_weather/?api_key=${API_KEY}&feedtype=json&ver=1.0`

getWeather().then(sols => {
    console.log(sols)
});

async function getWeather() {
    const res = await fetch(API_URL);
    const data = await res.json();
    const {
        sol_keys,
        validity_checks,
        ...solData
    } = data;
    return Object.entries(solData).map(([sol, data_2]) => {
        return {
            sol: sol,
            minTemp: data_2.AT.mn,
            maxTemp: data_2.AT.mx,
            solDate: new Date(data_2.First_UTC),
            solSeason: data_2.Season,
            // solWindSpeed: data.HWS.av,
            // solWindDir: data.WD.most_common.compass_point,
            solSunrise: new Date(data_2.First_UTC),
            solSunset: new Date(data_2.First_UTC)
        };
    });
}