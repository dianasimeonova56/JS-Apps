//mostly does the job, could be refactored into simpler functions


function attachEvents() {
    const button = document.getElementById('submit').addEventListener('click', onSubmit);
    const forecastDiv = document.getElementById('forecast');
    const input = document.getElementById('location');

    async function onSubmit() {
        forecastDiv.style.display = "block";
        
        const url = 'http://localhost:3030/jsonstore/forecaster/locations';
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error("Error");
        }

        const data = await res.json();

        if(!data) {
            throw new Error("Error");
        }

        let code = '';

        for (let city of data) {
            if (city.name === input.value) {
                code = city.code;
            }
        }
        if (code === '') {
            throw new Error("Location not found!");
        }
        
        input.value = '';
        //Current conditions
        const urlCurr = `http://localhost:3030/jsonstore/forecaster/today/${code}`;
        const resCurr = await fetch(urlCurr);
        const dataCurr = await resCurr.json();

        const currDiv = document.getElementById('current');

        const divF = createElement('div', '', ['class', 'forecasts']);
        currDiv.appendChild(divF);

        const conditionSymbol = createElement('span', dataCurr.forecast.condition, ['class', 'condition symbol']);
        divF.appendChild(conditionSymbol);

        const conditionSpan = createElement('span', '', ['class', 'condition']);
        divF.appendChild(conditionSpan);

        const city = createElement('span', '', ['class', 'forecast-data']);
        city.textContent = dataCurr.name;
        divF.appendChild(city);

        const [fData, fData2] = createForecastData(dataCurr, '');
        conditionSpan.appendChild(fData);
        conditionSpan.appendChild(fData2);

        //Three-day forecast
        const urlThree = `http://localhost:3030/jsonstore/forecaster/upcoming/${code}`
        const resThree = await fetch(urlThree);
        const dataThree = await resThree.json();

        const upcomingDiv = document.getElementById('upcoming');

        const divInfo = createElement('div', '', ['class', 'forecast-info']);
        upcomingDiv.appendChild(divInfo);

        for (let i = 0; i < dataThree.forecast.length; i++) {
            const upcomingSpan = createElement('span', '', ['class', 'upcoming']);
            divInfo.appendChild(upcomingSpan);

            const upcomingSymbol = createElement('span', dataThree.forecast[i].condition, ['class', 'symbol'])
            upcomingSpan.appendChild(upcomingSymbol);
            const [fData, fData2] = createForecastData(dataThree, i);
            upcomingSpan.appendChild(fData);
            upcomingSpan.appendChild(fData2);
        }
    }

    function createElement(type, condition, attributes = []) {
        const element = document.createElement(type);
        switch (condition) {
            case 'Rain':
                element.textContent = '\u2614';
                break;
            case 'Sunny':
                element.textContent = '\u2600';
                break;
            case 'Partly sunny':
                element.textContent = '\u26C5';
                break;
            case 'Overcast':
                element.textContent = '\u2601';
                break;
        }
        if (attributes.length > 0) {
            for (let i = 0; i < attributes.length; i += 2) {
                element.setAttribute(attributes[i], attributes[i + 1]);
            }
        }
        return element;
    }
    function createForecastData(data, i) {
        const span = createElement('span', '', ['class', 'forecast-data']);
        if (i == '') {
            span.textContent = data.forecast.low + "\u00B0" + '/' + data.forecast.high + "\u00B0";
        } else {
            span.textContent = data.forecast[i].low + "\u00B0" + '/' + data.forecast[i].high + "\u00B0";
        }
        const span2 = createElement('span', '', ['class', 'forecast-data']);
        if (i == '') {
            span2.textContent = data.forecast.condition;
        } else {
            span2.textContent = data.forecast[i].condition;
        }
        return [span, span2];
    }
}

attachEvents();
