export class PostRepository {
    constructor() {
        this.posts = [
        {
            id: 1,
            title: "lesson 1",
            content: "express — це веб-фреймворк для Node.js",
            author: "Arina",
            category: "programming"
        },
        {
            id: 2,
            title: "lesson 2",
            content: "огляд можливостей мови JavaScript",
            author: "Kira",
            category: "programming"
        },
        {
            id: 3,
            title: "lesson 3",
            content: "UI/UX дизайн",
            author: "Polya",
            category: "design"
        }
    ];
}}

export function getAll(category, take) {
    let result = [...posts];

    if (category) {
        result = result.filter(function (post) {
        return post.category === category;
    });
}

if (take) {
    return result.slice(0, Number(take)); 
    }
    return result;
}

export function getById(id) {
    return posts.find(function (post) {
    return post.id === Number(id); 
    });
}

export function addPost(post) {
    const newPost = { id: posts.length + 1, ...post };

    return new Promise((resolve) => {
        setTimeout(() => {
            posts = [...posts, newPost];
            resolve(newPost);
        }, 500);
    });
}
