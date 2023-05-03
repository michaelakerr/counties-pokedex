import { stringify } from "query-string";
import { fetchUtils } from "react-admin";

const apiUrl = 'https://pokeapi.co/api/v2';
const httpClient = fetchUtils.fetchJson;


// TypeScript users must reference the type `DataProvider`
export const dataProvider = {
    getList: (resource: any, params: any) => {
        const { page, perPage } = params.pagination;
        const query = {
            offset: JSON.stringify((page - 1) * perPage),
            limit: perPage,
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return httpClient(url).then(({ headers, json }) => {
            return ({
            data: json.results.map((resource: any) => {
                const URL = resource.url.split('/');
                const id = URL[URL.length-2];
                return { ...resource, pokemonId: id, id: resource.name }}),
            total: json.count,
        })});
    },

    getOne: (resource: any, params: any)  => {
        return httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => {
            return {
                data: {...json, id: params.id }
            }
        })
    },

    getMany: (resource: any, params: any)  => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        return httpClient(url).then(({ json }) => ({ data: json.map((resource: any) => ({ ...resource, id: resource._id }) ), }));
    },

    getManyReference: (resource: any, params: any)  => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify({
                ...params.filter,
                [params.target]: params.id,
            }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return httpClient(url).then(({ headers, json }) => ({
            data: json,
            total: parseInt(headers.get('content-range')?.split('/').pop() ?? "0", 10),        }));
    },

    update: (resource: any, params: any)  =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json })),

    updateMany:  (resource: any, params: any)  => {
        const query = {
            filter: JSON.stringify({ id: params.ids}),
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }));
    },

    create:  (resource: any, params: any)  =>
        httpClient(`${apiUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({
            data: { ...params.data, id: json.id },
        })),

    delete:  (resource: any, params: any)  =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'DELETE',
        }).then(({ json }) => ({ data: json })),

    deleteMany:  (resource: any, params: any)  => {
        const query = {
            filter: JSON.stringify({ id: params.ids}),
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'DELETE',
        }).then(({ json }) => ({ data: json }));
    }
};