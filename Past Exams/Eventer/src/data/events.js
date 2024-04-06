import { get, post, put, del } from './api.js'

const endpoints = {
    catalog: '/data/events?sortBy=_createdOn%20desc',
    add: '/data/events',
    byId: '/data/events/',
    going: '/data/going'
};

export async function getAllEvents() {
    return get(endpoints.catalog)
}

export async function getEventById(id) {
    return get(endpoints.byId + id)
}

export async function createEvent(data) {
    return post(endpoints.add, data)
}

export async function updateEvent(id, data) {
    return put(endpoints.byId + id, data)
}

export async function deleteEvent(id) {
    return del(endpoints.byId + id)
}

export async function getEventGoing(id) {
    return get(endpoints.going + `?where=eventId%3D%22${id}%22&distinct=_ownerId&count`);
}

export async function getEventGoingForUser(eventId, userId) {
    return get(endpoints.going + `?where=eventId%3D%22${eventId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}

export async function goingEvent(data) {
    return post(endpoints.going, {data})
}