import { get, post, put, del } from './api.js'

const endpoints = {
    catalog: '/data/albums?sortBy=_createdOn%20desc',
    add: '/data/albums',
    byId: '/data/albums/',
    likes: '/data/likes'
};

export async function getAllAlbums() {
    return get(endpoints.catalog)
}

export async function getAlbumById(id) {
    return get(endpoints.byId + id)
}

export async function createAlbum(data) {
    return post(endpoints.add, data)
}

export async function updateAlbum(id, data) {
    return put(endpoints.byId + id, data)
}

export async function deleteAlbum(id) {
    return del(endpoints.byId + id)
}

export async function getAlbumLikes(albumId) {
    return get(endpoints.likes + `?where=albumId%3D%22${albumId}%22&distinct=_ownerId&count`)
}

export async function likeAlbum(data) {
    return post(endpoints.likes, {data})
}

export async function getLikesForUser(albumId, userId) {
    return get(endpoints.likes + `?where=albumId%3D%22${albumId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
}

// export async function searchCar(query) {
//     if(query != '') {
//         return get(endpoints.add + `?where=model%20LIKE%20%22${query}%22`)
//     }
    
// }