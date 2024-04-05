import { get, post, put, del } from './api.js'

const endpoints = {
    catalog: '/data/characters?sortBy=_createdOn%20desc',
    add: '/data/characters',
    byId: '/data/characters/',
    likes: '/data/useful'
};

export async function getAllChars() {
    return get(endpoints.catalog)
}

export async function getCharById(id) {
    return get(endpoints.byId + id)
}

export async function createChar(data) {
    return post(endpoints.add, data)
}

export async function updateChar(id, data) {
    return put(endpoints.byId + id, data)
}

export async function deleteChar(id) {
    return del(endpoints.byId + id)
}

export async function getCharLikes(id) {
    return get(endpoints.likes + `?where=characterId%3D%22${id}%22&distinct=_ownerId&count`);
}

export async function getCharLikesForUser(charId, userId) {
    return get(endpoints.likes + `?where=characterId%3D%22${charId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}

export async function likeChar(data) {
    return post(endpoints.likes, {data})
}