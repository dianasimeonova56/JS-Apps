import { get, post, put, del } from './api.js'

const endpoints = {
    catalog: '/data/motorcycles?sortBy=_createdOn%20desc',
    add: '/data/motorcycles',
    byId: '/data/motorcycles/',
};

export async function getAllRides() {
    return get(endpoints.catalog)
}

export async function getRideById(id) {
    return get(endpoints.byId + id)
}

export async function createRide(data) {
    return post(endpoints.add, data)
}

export async function updateRide(id, data) {
    return put(endpoints.byId + id, data)
}

export async function deleteRide(id) {
    return del(endpoints.byId + id)
}

export async function searchRide(query) {
    console.log(query);
    if(query != '') {
        return get(endpoints.add + `?where=model%20LIKE%20%22${query}%22`)
    }
    
}