import { csrfFetch } from "./csrf";

export const addImage = (id, image) => async dispatch => {
    const response = await csrfFetch(`/api/tools/${id}/images`, {
        method: 'POST',
        body: JSON.stringify({url:image, preview:true})
    });
}
export const updateImage = (id, image) => async dispatch => {
    const response = await csrfFetch(`/api/tool-images/${id}`, {
        method: 'PUT',
        body: JSON.stringify({url:image})
    });
}
export const deleteImage = (id) => async dispatch => {
    const response = await csrfFetch(`/api/tool-images/${id}`, {
        method: 'DELETE',
    });
};