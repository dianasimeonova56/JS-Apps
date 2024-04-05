import { get, post, put, del } from './api.js'

const endpoints = {
    catalog: '/data/fruits?sortBy=_createdOn%20desc',
    add: '/data/fruits',
    byId: '/data/fruits/',
};

export async function getAllFruits() {
    return get(endpoints.catalog)
}

export async function getFruitById(id) {
    return get(endpoints.byId + id)
}

export async function createFruit(data) {
    return post(endpoints.add, data)
}

export async function updateFruit(id, data) {
    return put(endpoints.byId + id, data)
}

export async function deleteFruit(id) {
    return del(endpoints.byId + id)
}

export async function searchFruit(query) {
    if(query != '') {
        return get(endpoints.add + `?where=name%20LIKE%20%22${query}%22`)
    }
    
}