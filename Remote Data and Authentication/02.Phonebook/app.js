function attachEvents() {
    //load all entries
    const url = 'http://localhost:3030/jsonstore/phonebook';

    const ul = document.getElementById('phonebook');
    const loadBtn = document.getElementById('btnLoad');
    const createBtn = document.getElementById('btnCreate');

    const person = document.getElementById('person');
    const phone = document.getElementById('phone');

    loadBtn.addEventListener('click', onClickLoad);
    createBtn.addEventListener('click', onClickCreate);

    async function onClickLoad() {
        ul.innerHTML = ''; // when clicking, delete all shown contacts to display new ones
        const response = await fetch(url);
        const data = await response.json();

        Object.values(data).forEach(x => {
            
            const {person, phone, _id} = x;

            const li = createElement('li', `${person}: ${phone}`, ul);
            li.setAttribute('id', _id);

            const deletBtn = createElement('button', 'Delete', li);
            deletBtn.setAttribute('id', 'btnDelete');
            deletBtn.addEventListener('click', onClickDelete);
        })
    }
    async function onClickDelete(event) {
        const id = event.target.parentNode.id;
        event.target.parentNode.remove();

        const deleteResponse = await fetch(`${url}/${id}`, {
            method: 'delete'
        })
    }
    async function onClickCreate() {
        if(person.value !== '' && phone.value !== ''){
            const response = await fetch(url, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({person:person.value, phone:phone.value})
            });
            loadBtn.click(); //after adding new contact, automatically load all

            person.value = '';
            phone.value = '';
        }

    }

    function createElement(type, text, appender) {
        const result = document.createElement(type);

        result.textContent = text;

        appender.appendChild(result);

        return result;
    }

}

attachEvents();