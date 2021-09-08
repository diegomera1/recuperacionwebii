const { API } = require('../config');
const axios = require('axios').default;


exports.create = async (venta) => {
    return axios.post(API + '/venta', venta).then(response => {
        return response.data;
    }).catch(error => {
        console.error(error);
    })
}

exports.get = async (ventaId) => {
    return axios.get(API + '/venta/' + ventaId).then(response => {
        return response.data;
    });
}

exports.getAll = async () => {
    return axios.get(API + '/venta').then(response => {
        return response.data;
    });
};

exports.delete = async (ventaId) => {
    return axios.delete(API + '/venta/' + ventaId).then(response => {
        return response.data;
    })
}

exports.update = async(ventaId, venta) => {
    return axios.patch(API + '/venta/' + ventaId, venta).then(response => {
        return response.data;
    })
}
