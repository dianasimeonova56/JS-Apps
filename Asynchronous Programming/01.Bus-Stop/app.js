async function getInfo() {
    //read input value
    //request to server
    //parse data
    //display data
    //check error
    const stopNameElement = document.getElementById('stopName');
    const timetableElement = document.getElementById('buses');


    const stopId = document.getElementById('stopId').value;
    const url = `http://localhost:3030/jsonstore/bus/businfo/${stopId}`;

    try {
        stopNameElement.textContent = 'Loading...';
        timetableElement.replaceChildren();
        const res = await fetch(url);
        
        if(res.status !== 200) {
            throw new Error('Stop ID not found!');
        }
        const data = await res.json();

        stopNameElement.textContent = data.name;

        Object.entries(data.buses).forEach(bus => {
            const liElement = document.createElement('li');
            liElement.textContent = `Bus ${bus[0]} arrives in ${bus[1]} minutes`
            timetableElement.appendChild(liElement);
        })

    } catch (error) {
        console.log(error)
        stopNameElement.textContent = "Error!";
    }

}