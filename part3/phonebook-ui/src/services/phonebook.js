import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  return axios.get(baseUrl).then(response => response.data)
}

const create = (newEntry) => {
  return axios.post(baseUrl, newEntry).then(response => response.data)
}

const update = (id, newEntry) => {
  return axios.put(`${baseUrl}/${id}`, newEntry).then(response => response.data)
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/:${id}`).then(response => response.data)
}

const phonebookService = { getAll, create, update, remove };
export default phonebookService;