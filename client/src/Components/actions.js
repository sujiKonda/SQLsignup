import axios from 'axios';

const url = "http://localhost:4001"

let token
export async function gettoken(){
    try{
        token = localStorage.getItem('token')
        return token
    }catch(e){
        console.log("e...............:)", e)
        return e
    }
}

export async function axiosPost(params){
    return new Promise((resolve, reject)=>{
        axios.post(`${url}${params?.path ? "/"+params.path : ''}${params?.query ? "?"+params.query : ''}`, params?.body ? params.body : {}, {headers : {token}})
            .then(function (response) {
                resolve(response)
            })
            .catch(function (error) {
                reject(error)
            })
    })
}

export async function axiosPut(params){
    console.log(params.body)
    console.log("token",token);
    return new Promise((resolve, reject)=>{
        axios.put(`${url}${params?.path ? "/"+params.path : ''}${params?.query ? "?"+params.query : ''}`, params?.body ? params.body : {}, {headers : {token}})
            .then(function (response) {
                resolve(response)
            })
            .catch(function (error) {
                reject(error)
            })
    })
}

export async function axiosGet(params){
    return new Promise((resolve, reject)=>{
        axios.get(`${url}${params?.path ? "/"+params.path : ''}${params?.query ? "?"+params.query : ''}`, {headers : {token}})
            .then(function (response) {
                resolve(response)
            })
            .catch(function (error) {
                reject(error)
            })
    })
}

export async function axiosDelete(params){
    return new Promise((resolve, reject)=>{
        axios.delete(`${url}${params?.path ? "/"+params.path : ''}${params?.query ? "?"+params.query : ''}`, {headers : {token}})
            .then(function (response) {
                resolve(response)
            })
            .catch(function (error) {
                reject(error)
            })
    })
}