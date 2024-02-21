import {
    GET_LIST,
    GET_ONE,
    GET_MANY,
    GET_MANY_REFERENCE,
    CREATE,
    UPDATE,
    UPDATE_MANY,
    DELETE,
    DELETE_MANY,
    fetchUtils,
} from 'react-admin';
import { stringify } from 'query-string';
import addUploadFeature from './addUploadFeature';
import DataService from './dataService';
const dataService = DataService.getInstance();

const config = require('../config')
const API_URL = config.baseUrl + '/api';

/**
 * @param {String} type One of the constants appearing at the top of this file, e.g. 'UPDATE'
 * @param {String} resource Name of the resource to fetch, e.g. 'posts'
 * @param {Object} params The Data Provider request params, depending on the type
 * @returns {Object} { url, options } The HTTP request parameters
 */
const convertDataProviderRequestToHTTP = (type, resource, params) => {

    let options = {}
    options.headers = new Headers({ Accept: 'application/json', 'Accept-Encoding': 'gzip, deflate'});
    const token = localStorage.getItem('token');
    if(token) {
        options.headers.set('authorization', `${token}`);
    }    
    switch (type) {
    case GET_LIST: {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, perPage]),
            filter: JSON.stringify(params.filter),
            lang: dataService.lang,
        };

        return { url: `${API_URL}/${resource}?${stringify(query)}`, options:options };
    }
    case GET_ONE:
        return { url: `${API_URL}/${resource}/${params.id}` , options:options};
    case GET_MANY: {
        const query = {
            filter: JSON.stringify({ ids: params.ids }),
            lang: dataService.lang,
        };
        return { url: `${API_URL}/${resource}?${stringify(query)}` , options:options};
    }
    case GET_MANY_REFERENCE: {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, perPage]),
            filter: JSON.stringify({ ...params.filter, [params.target]: params.id }),
        };

        return { url: `${API_URL}/${resource}?${stringify(query)}` , options:options};
    }
    case UPDATE:
        options.method = 'PUT'
        options.body = JSON.stringify(params.data)
        return {
            url: `${API_URL}/${resource}/${params.id}`,
            options: options,
        };
    case UPDATE_MANY:
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        options.method = 'PUT';
        options.body = JSON.stringify(params.data);
        return {
            url: `${API_URL}/${resource}?${stringify(query)}`,
            options: options,
        };
    case CREATE:
        options.method = 'POST'
        options.body = JSON.stringify(params.data)
        return {
            url: `${API_URL}/${resource}`,
            options: options,
        };
    case DELETE:
        options.method = 'DELETE'
        return {
            url: `${API_URL}/${resource}/${params.id}`,
            options: options,
        };
    case DELETE_MANY: {
        options.method = 'DELETE'
        const query = {
            filter: JSON.stringify({ ids: params.ids }),
        };
        return {
            url: `${API_URL}/${resource}?${stringify(query)}`,
            options: options,
        };
    }
    default:
        throw new Error(`Unsupported fetch action type ${type}`);
    }
};

/**
 * @param {Object} response HTTP response from fetch()
 * @param {String} type One of the constants appearing at the top of this file, e.g. 'UPDATE'
 * @param {String} resource Name of the resource to fetch, e.g. 'posts'
 * @param {Object} params The Data Provider request params, depending on the type
 * @returns {Object} Data Provider response
 */
const convertHTTPResponseToDataProvider = (response, type, resource, params) => {
    const { headers, json } = response;
    if (json.result === 'fail' && json.msg) {
        throw new Error(json.msg);
    }
    switch (type) {
    case GET_LIST:
    case GET_MANY_REFERENCE:
        return {
            data: json.map(x => x),
            total: parseInt(headers.get('Content-Range').split('/').pop(), 10),
        };
    case CREATE:
        return { data: { ...params.data, id: json.id } };
    default:
        return { data: json };
    }
};

/**
 * @param {string} type Request type, e.g GET_LIST
 * @param {string} resource Resource name, e.g. "posts"
 * @param {Object} payload Request parameters. Depends on the request type
 * @returns {Promise} the Promise for response
 */
const dataProvider = (type, resource, params) => {
    const { fetchJson } = fetchUtils;
    const { url, options } = convertDataProviderRequestToHTTP(type, resource, params);

    return fetchJson(url, options)
        .then(response => convertHTTPResponseToDataProvider(response, type, resource, params))
        .catch((err) => {
            return Promise.reject(err)
        })

};

const uploadCapableDataProvider = addUploadFeature(dataProvider);

export default uploadCapableDataProvider;