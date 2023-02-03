import { BASE, PATH } from './constant.js';
import { navigate } from './routes.js';

const datas = {

    getImage: async () => {
        // return await axios.get(`https://api.unsplash.com/photos/random`, {
        //     params: {
        //         client_id: BASE.API_KEY
        //     }
        // }).then(({data}) => data);
        return await axios.get(`/thirdApi/photos/random`).then(({data}) => data);
    },
    getHomeData: async () => {
        return await axios.get(`/api/posts`).then(({data: {data : posts}}) => posts);
    },
    getPostDetail: async (id) => {
        return await axios.get(`/api/post` + id).then(({data: {data}}) => data)
        .catch((err) => {
            navigate(PATH.ERROR);
        });
    },
    createPost: async (param) => {
        return await axios.post(`/api/post`, param).then(({data}) => data);
    },
    updatePost: async (id,param) => {
        return await axios.patch(`/api/post`+id, param).then(({data: {data}})=> data)
    },
    deletePost: async (id) => {
        return await axios.delete(`/api/post` + id).then(res => res);
    },
    createComment: async (id, content) => {
        return await axios.post(`/api/comment` + id, content).then(({data}) => data)
    },
    deleteComment: async (id) => {
        return await axios.delete(`/api/comment/` + id)
    }
}

export default datas;