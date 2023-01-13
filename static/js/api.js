import { BASE } from './constant.js';

const datas = {

    getImage: async () => {
        return await axios.get(`https://api.unsplash.com/photos/random`, {
            params: {
                client_id: BASE.API_KEY
            }
        }).then(res => res.data)
    },
    getHomeData: async () => {
        return await axios.get(BASE.URL + '/posts').then(res => res.data).then(res => res.data.posts).catch(() => {
            window.location.href = '/404';
        }
        );
    },
    getCardDetailData: async (id) => {
        return await axios.get(BASE.URL + '/post' + id).then(res => res.data).then(res => res.data).catch((err) => {
            window.location.href = '/404';
        });
    },
    createPost: async (param) => {
        return await axios.post(BASE.URL + '/post', param).then(res => res.data)
    },
    updatePost: async (id,param) => {
        return await axios.patch(BASE.URL+'/post'+id, param).then(res=> res.data);
    },
    deletePost: async (id) => {
        return await axios.delete(BASE.URL + '/post' + id).then(res => console.log(res));
    },
    createComment: async (id, content) => {
        return await axios.post(BASE.URL + '/comment' + id, content).then(res => res.data).catch(() => {
            window.location.href = '/404';
        });
    },
    deleteComment: async (id) => {
        return await axios.delete(BASE.URL + '/comment/' + id).then(res => console.log(res));
    }
}

export default datas;