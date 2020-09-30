const API_KEY = 'DEMO_KEY'
const API_URL = `https://api.nasa.gov/insight_weather/?api_key=${API_KEY}&feedtype=json&ver=1.0`

getWeather().then(sols => {
    console.log(sols)
});

function getWeather() {
    return fetch(API_URL).then(res => res.json()).then(data => {
        const {
            sol_keys,
            validity_checks,
            ...solData
        } = data
        return Object.entries(solData).map(([sol, data]) => {
            return {
                sol: sol,
                minTemp: data.AT.mn,
                maxTemp: data.AT.mx,
                solDate: new Date(data.First_UTC),
                solSeason: data.Season,
                solWindSpeed: data.HWS.av,
                solWindDir: data.WD.most_common.compass_point,
                solSunrise: new Date(data.First_UTC),
                solSunset: new Date(data.First_UTC)
            }
        })
    });
}