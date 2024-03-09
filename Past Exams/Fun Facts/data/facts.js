import { get, post, put, del } from './api.js'

const endpoints = {
    catalog: '/data/facts?sortBy=_createdOn%20desc',
    add: '/data/facts',
    byId: '/data/facts/',
    likes: '/data/likes'
};

export async function getAllFacts() {
    return get(endpoints.catalog)
}

export async function getFactById(id) {
    return get(endpoints.byId + id)
}

export async function createFact(data) {
    return post(endpoints.add, data)
}

export async function updateFact(id, data) {
    return put(endpoints.byId + id, data)
}

export async function deleteFact(id) {
    return del(endpoints.byId + id)
}

export async function likeFact(id) {
    return post(endpoints.likes, id)
}

export async function totalLikes(id) {
    return get(endpoints.likes + `?where=factId%3D%22${id}%22&distinct=_ownerId&count`)
}

export async function userLikes(id, userId) {
    return get(endpoints.likes + `?where=factId%3D%22${id}%22%20and%20_ownerId%3D%22${userId}%22&count`)
}