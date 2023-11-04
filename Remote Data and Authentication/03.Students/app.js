async function solve() {
    const url = 'http://localhost:3030/jsonstore/collections/students';
    const table = document.querySelector('#results tbody')
    const response = await fetch(url);

    const data = await response.json();

    Object.values(data).forEach(s => {
        const firstName = s.firstName;
        const lastName = s.lastName;
        const facultyNumber = s.facultyNumber;
        const grade = Number(s.grade);

        const tr = document.createElement('tr');

        const firstNameCell = tr.insertCell(0);
        firstNameCell.innerText = firstName;

        const lastNameCell = tr.insertCell(1);
        lastNameCell.innerText = lastName;

        const facultyNumberCell = tr.insertCell(2);
        facultyNumberCell.innerText = facultyNumber;

        const gradeCell = tr.insertCell(3);
        gradeCell.innerText = grade;

        table.appendChild(tr);
    });

    const submitBtn = document.getElementById('submit');
    submitBtn.addEventListener('click', onSubmit);

    async function onSubmit(event){
        event.preventDefault();
        
        const firstNameInput = document.getElementsByName('firstName')[0];
        const lastNameInput = document.getElementsByName('lastName')[0];
        const facultyNumberInput = document.getElementsByName('facultyNumber')[0];
        const gradeInput = document.getElementsByName('grade')[0];

        const inputsArray = document.querySelectorAll('.inputs input');

       /* Array.from(inputsArray).map(i => {
            i.setAttribute('required', '')
        })*/

        if(isNaN(gradeInput.value)) {
            return alert('Wrong input data!');
        }

        if(firstNameInput.valule !== '' && 
        lastNameInput.value !== '' && 
        facultyNumberInput.value !== '' &&
        gradeInput.value !== '') {
            const response = await fetch(url, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName:firstNameInput.value, 
                    lastName:lastNameInput.value,
                    facultyNumber: Number(facultyNumberInput.value),
                    grade: Number(gradeInput.value)
                })
            });
            const tr = document.createElement('tr');
    
            const firstNameCell = tr.insertCell(0);
            firstNameCell.innerText = firstNameInput.value;
    
            const lastNameCell = tr.insertCell(1);
            lastNameCell.innerText = lastNameInput.value;
    
            const facultyNumberCell = tr.insertCell(2);
            facultyNumberCell.innerText = facultyNumberInput.value;
    
            const gradeCell = tr.insertCell(3);
            gradeCell.innerText = gradeInput.value;
            table.appendChild(tr);
        }
        firstNameInput.valule = '';
        lastNameInput.value = '';
        facultyNumberInput.value = '';
        gradeInput.value = '';
    }

} solve();