import PostCreate from "./PostCreate";
import PostList from "./PostList";

export default function App() {
    return (
        <div className="container">
            <h1>Create Post</h1>

            <PostCreate />

            <h2>Post List</h2>
            <PostList />
        </div>
    )
}
