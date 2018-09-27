import React, {Component} from 'react';
// import axios from 'axios';
import axios from '../../Axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state = {
        posts: [],
        selectedPostId: null,
        error: false
    };

    componentDidMount() {
        axios.get('/posts')
            .then((response) => {
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map((post) => {
                    return {
                        ...post,
                        author: 'Myroslav'
                    }
                });

                this.setState({posts: updatedPosts});
                console.log(response);
            })
            .catch((error) => {
                this.setState({error: true});
                console.error('Error from get: ', error);
            })
    }

    postSelectedHandler = (id) => {
        this.setState({selectedPostId: id})
    };

    render() {
        let posts = <p style={{textAlign: 'center', color: 'red'}}>Something went wrong!!!</p>;
        if(!this.state.error) {
            posts = this.state.posts.map((post) => {
                return <Post
                    key={post.id}
                    title={post.title}
                    author={post.author}
                    clicked={() => this.postSelectedHandler(post.id)}
                />
            });
        }

        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/new-post">New post</a></li>
                        </ul>
                    </nav>
                </header>
                <section className="Sections">
                    {posts}
                </section>
                {/*<section>*/}
                    {/*<FullPost id={this.state.selectedPostId}/>*/}
                {/*</section>*/}
                {/*<section>*/}
                    {/*<NewPost/>*/}
                {/*</section>*/}
            </div>
        );
    }
}

export default Blog;