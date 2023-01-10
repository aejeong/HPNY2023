import {BASE} from './constant.js';

const datas = {
    getHomeData : async () => {
        return await axios.get(BASE.URL+'/posts').then(res => res.data).then(res=> res.data.posts).catch(()=> console.log('error'));
    },
    getCardDetailData: async (id) => {
        return await axios.get(BASE.URL+'/post'+id).then(res=> res.data).then(res=> res.data).catch(()=> console.log('error'));
    },
    updatePost: async (id) => {
        // return await axios.patch(BASE.URL+'/post'+id).then(res=> res.data).then(res=> res)
    },
    createComment: async (id, content)=> {
        return await axios.post(BASE.URL+'/comment'+id, content).then(res=> res.data).catch(()=> console.log('error'));
    }
}

export default datas;