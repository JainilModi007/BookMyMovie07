import React, { Component } from 'react';
import Header from '../../common/header/Header';
import Typography from '@material-ui/core/Typography';
import './Details.css';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { Link } from 'react-router-dom';
import YouTube from 'react-youtube';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

class Details extends Component {


    constructor() {

        super();
        this.state = {
            movie: {
                genres: [],
                trailer_url: "",
                artists: []
            },
            starIcons: [{
                id: 1,
                stateId: "star1",
                color: "black"
            },
            {
                id: 2,
                stateId: "star2",
                color: "black"
            },
            {
                id: 3,
                stateId: "star3",
                color: "black"
            },
            {
                id: 4,
                stateId: "star4",
                color: "black"
            },
            {
                id: 5,
                stateId: "star5",
                color: "black"
            }]
        }
    }

    componentWillMount() {

        let that = this;
        let movie = null;
        let movieXhr = new XMLHttpRequest();
        movieXhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    movie: JSON.parse(this.responseText)
                });
            }
        });

        movieXhr.open("GET", this.props.baseUrl + "movies/" + this.props.match.params.id);
        movieXhr.setRequestHeader("Cache-Control", "no-cache");
        movieXhr.send(movie);
    }

    artistHandler = (url) => {
        window.location = url;
    }

    ratingHandler = (id) => {
        let rateList = [];
        for (let star of this.state.starIcons) {
            let starNode = star;
            if (star.id <= id) {
                starNode.color = "yellow"
            }
            else {
                starNode.color = "black";

            }
            rateList.push(starNode);
        }
        this.setState({ starIcons: rateList });
    }

    render() {

        let movie = this.state.movie;

        const yt = {

            width: '700',
            height: '300',
            playerVars: {
                autoplay: 1
            }
        }

        return (


            <div className="details">

                <Header id={this.props.match.params.id} baseUrl={this.props.baseUrl} showBookShowButton="true" />
                
                <div className="home">
                    <Typography>
                        <Link to="/">Back To Home</Link>
                    </Typography>
                </div>


                <div className="container">

                    {/*movie poster*/}


                    <div className="left">
                        <img src={movie.poster_url} alt={movie.title} />
                    </div>


                    {/*movie Title , trailer , releasedate*/}


                    <div className="center">

                        {/*movie title*/}

                        <div>
                            <Typography component="h2" variant="headline" >{movie.title} </Typography>
                        </div>

                        {/*movie genres*/}
                        
                        <div>
                            <Typography>
                                <span className="bold">Genres: </span> {movie.genres.join(', ')}
                            </Typography>
                        </div>

                        {/*movie duration*/}

                        <div>
                            <Typography><span className="bold">Duration:</span> {movie.duration} </Typography>
                        </div>

                        {/*movie date*/}

                        <div>
                            <Typography><span className="bold">Release Date:</span> {new Date(movie.release_date).toDateString()} </Typography>
                        </div>

                        {/*movie plot*/}

                        <div className="plot">
                            <Typography><span className="bold">Plot:</span> <a href={movie.wiki_url}>(Wiki Link)</a> {movie.storyline} </Typography>
                        </div>

                        {/*movie trailer*/}

                        <div className="trailer">
                            <Typography>
                                <span className="bold">Trailer:</span>
                            </Typography>
                            <YouTube onReady={this._onReady} videoId={movie.trailer_url.split("?v=")[1]}  yt={yt} />
                        </div>
            
                    </div>


                    {/*movie rating , artists*/}

                    <div className="right">

                        {/*rating*/}

                        <Typography>
                            <span className="rate">Rate this movie: </span>
                        </Typography>
                        {this.state.starIcons.map(star => (
                            <StarBorderIcon onClick={() => this.ratingHandler(star.id)} className={star.color} key={"star" + star.id} />
                        ))}

                        {/*Artists*/}


                        <div className="artist">
                            <Typography>
                                <span className="bold">Artists:</span>
                            </Typography>
                        </div>

                        {/*artist poster*/}
                        
                        <div className="artist">
                            <GridList cellHeight={160} cols={2}>
                                {movie.artists != null && movie.artists.map(artist => (
                                    <GridListTile  className="tile" onClick={() => this.artistHandler(artist.wiki_url)} key={artist.id}> <img src={artist.profile_url} alt={artist.first_name + " " + artist.last_name} />
                                        <GridListTileBar
                                            title={artist.first_name + " " + artist.last_name}
                                        />
                                    </GridListTile>
                                ))}
                            </GridList>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Details;