import axiosInstance from './axiosInstance'

// GET
export const get = (url) => {
    return axiosInstance.get(url)
}

// POST
export const post = (url, data) => {
    return axiosInstance.post(url, data)
}

// PUT
export const put = (url, data) => {
    return axiosInstance.put(url, data)
}

// DELETE
export const deleteData = (url) => {
    return axiosInstance.delete(url)
}