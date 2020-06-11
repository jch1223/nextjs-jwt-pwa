import fetch from "isomorphic-unfetch"

export const isofetch = (url, type) => {
    return fetch(url)
        .then((response) => {
            response.json()
        })
        .then(handleErrors)
        .catch(error => {
            throw error
        })
}


export const handleErrors = (response) => {
    if (response === "TypeError: Failed to fetch") {
        throw Error("Server error.")
    }

    return response
}
