import axios from "axios";


export function request(url) {
    return axios({
        baseURL: "/",
        method: "get",
        headers: {
            Accept: "application/json"
        },
        url
    }).then(response => response.data)
}
