import React, {Component} from 'react';
import Post from "../../../components/Post/Post";
import axios from '../../../axios';
import './Posts.css';
import FullPost from "../FullPost/FullPost";
import {Route} from "react-router-dom";
// import {Link} from "react-router-dom";


class Posts extends Component {
    state = {
        posts: [],
        selectedPostId: null,
        error: false
    };

    postSelectedHandler = (id) => {
        this.setState({selectedPostId: id});
        this.props.history.push({pathname: '/posts/' + id});
        // this.props.history.push('/posts/' + id);
    };

    componentDidMount() {
        console.log("Props from Posts: ", this.props);
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

    render() {
        let posts = <p style={{textAlign: 'center', color: 'red'}}>Something went wrong!!!</p>;
        if (!this.state.error) {
            posts = this.state.posts.map((post) => {
                return (
                    // {/*<Link to={'/posts/' + post.id} key={post.id}>*/}
                        <Post
                            key={post.id}
                            title={post.title}
                            author={post.author}
                            clicked={() => this.postSelectedHandler(post.id)}
                        />
                    // </Link>
                )
            });
        }

        return (
            <div>
            <section className="Posts">
                {posts}
            </section>
                <Route path={this.props.match.url + '/:id'} exact component={FullPost}/>

            </div>
        );
    }
}

export default Posts;