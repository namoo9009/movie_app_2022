//rce 단축키 : 클래스형 컴포넌트 만들기
import axios from 'axios';
import React, { Component } from 'react';
// import Movie from './components/Movie';
import Movie from '../components/Movie';
// import './App.css';
import './Home.css';




export class Home extends Component {

    // Model(데이터 관리)
    state = {
        isLoading: true,
        movies: []
    }

    getMovies = async () => {
        const {
            data: { 
                data: {
                    movies
                }
            }
        } = await axios.get('https://yts-proxy.now.sh/list_movies.json?genre=animation&sort_by=like_count');
        // console.log(movies.data.data.movies);
        console.log(movies); //여기서의 movies는 데이터 안에 있는 movies를 나타낸다.
        // this.setState({isLoading: false, movies: movies}); // state에 는 movies: getMovies에 있는 movies
        this.setState({isLoading: false, movies}); // 키와 키 같이 동일하면 한번만 써줘도된다.
    }


    componentDidMount(){
        // setTimeout(() => {
        //    this.setState({isLoading: false}) 
        // }, 6000);
        // axios.get('https://yts-proxy.now.sh/list_movies.json');

        this.getMovies();
    }

    // Control
    render() {
        
        const {isLoading, movies} = this.state; //구조분해 할당

        return (
        
            <section className='container'>
                {isLoading ? 
                (<div className='loader'><span className='loader_text'>'Loading...'</span></div>) :

                    (<div className='movies'>
                        {movies.map((movie,index) => (<Movie
                            key = {index}
                            id = {movie.id}
                            year = {movie.year}
                            title = {movie.title}
                            summary = {movie.summary}
                            poster = {movie.medium_cover_image}
                            genres={movie.genres}
                        />)
                        )}
                    </div>)
                }
            </section>
        

        )
    }
}

export default Home;