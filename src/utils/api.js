import axios from "axios"

export const getUsers = () => callApi("https://forinterview.onrender.com/people", "get");
export const getUserDetail = (id) => callApi(`https://forinterview.onrender.com/people/${id}`, "get");

const callApi = async (url, method, body) => {
    try {
        const response = await axios[method](url, body);
        return response.data;

    } catch (error) {
        console.log(error);
    }
}