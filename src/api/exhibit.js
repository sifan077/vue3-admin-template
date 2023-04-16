import http from '../utils/http/http.js'

const getExhibitList = () => {
    return http.get("/exhibit/all");
}

export default {
    getExhibitList,
}