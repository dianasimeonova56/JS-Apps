import { get, post, put, del } from './api.js'

const endpoints = {
    catalog: '/data/cars?sortBy=_createdOn%20desc',
    add: '/data/cars',
    byId: '/data/cars/',
};

export async function getAllCars() {
    return get(endpoints.catalog)
}

export async function getCarById(id) {
    return get(endpoints.byId + id)
}

export async function createCar(data) {
    return post(endpoints.add, data)
}

export async function updateCar(id, data) {
    return put(endpoints.byId + id, data)
}

export async function deleteCar(id) {
    return del(endpoints.byId + id)
}

export async function searchCar(query) {
    if(query != '') {
        return get(endpoints.add + `?where=model%20LIKE%20%22${query}%22`)
    }
    
}