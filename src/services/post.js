import { 
    getAll, 
    getById, 
    addPost 
} from '../repositories/post.js';

export function getPostsList(category, take) {
    return getAll(category, take);
}

export function getSinglePost(id) {
    return getById(id);
}

export function createNewPost(postData) {
    return addPost(postData); 
}