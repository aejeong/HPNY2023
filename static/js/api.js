import { BASE } from './constant.js';
// import { createApi } from '../../node_modules/unsplash-js'
const datas = {

    // getImage: async () =>{
    //     return await axios.
    // },
    getHomeData: async () => {
        return await axios.get(BASE.URL + '/posts').then(res => res.data).then(res => res.data.posts).catch(() => {
            window.location.href = '/404';
            console.log(err)
        }
        );
    },
    getCardDetailData: async (id) => {
        return await axios.get(BASE.URL + '/post' + id).then(res => res.data).then(res => res.data).catch((err) => {
            console.log(err)
            window.location.href = '/404';
        });
    },
    updatePost: async (id) => {
        // return await axios.patch(BASE.URL+'/post'+id).then(res=> res.data).then(res=> res)
    },
    deletePost: async (id) => {
        return await axios.delete(BASE.URL+'/post'+id).then(res=> console.log(res));
    },
    createComment: async (id, content) => {
        return await axios.post(BASE.URL + '/comment' + id, content).then(res => res.data).catch(() => {
            window.location.href = '/404';
            console.log(err)
        });
    },
    deleteComment: async (id) =>{
        return await axios.delete(BASE.URL + '/comment/' + id).then(res=> console.log(res));
    }
}

export default datas;