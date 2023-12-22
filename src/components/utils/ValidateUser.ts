import { baseApi } from "@/Consts";
import axios from "axios";

export const ValidateUser = async () => {
    await axios({
        method: 'get',
        url: baseApi+'/api/authenticate',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+localStorage.getItem('token')+''
        }
    })
    .then(response => {
        if (response.status === 200) {
            // The request was successful
            console.log(response.data);
        } else {
            // The request failed
            console.log('Request failed with status: ', response.status);
        }
    })
    .catch(error => {
        console.error(error);
        window.location.href = '/login';
    });
}