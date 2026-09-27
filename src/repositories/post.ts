export interface Post {
    id: number
    name: string
    content: string
    author: string
    category: string
}

let posts: Post[] = [
    {
        id: 1,
        name: "lesson 1",
        content: "express — це веб-фреймворк для Node.js",
        author: "Arina",
        category: "programming"
    },
    {
        id: 2,
        name: "lesson 2",
        content: "огляд можливостей мови JavaScript",
        author: "Kira",
        category: "programming"
    },
    {
        id: 3,
        name: "lesson 3",
        content: "UI/UX дизайн",
        author: "Polya",
        category: "design"
    }
]

export const getAll = (category?: string, take?: number): Post[] => {
    let result = [...posts]
    
    if (category) {
        result = result.filter(post => post.category === category)
    }
    
    if (take) {
        return result.slice(0, take)
    }
    
    return result
}

export const getById = (id: number): Post | undefined => {
    return posts.find(post => post.id === id)
}

export const findByName = (name: string): Post | undefined => {
    return posts.find(post => post.name.trim().toLowerCase() === name.trim().toLowerCase())
}

export const addPost = (newPost: Post): Promise<Post> => {
    return new Promise<Post>((resolve) => {
        setTimeout(() => {
            posts = [...posts, newPost]
            resolve(newPost)
        }, 500)
    })
}