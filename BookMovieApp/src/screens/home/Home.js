import React, { Component } from 'react';
import './Home.css';
import Header from '../../common/header/Header';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';



const styles = theme => ({
   

    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    },

    upcomingMoviesHeading: {
        textAlign: 'center',
        background: '#ff9999',
        padding: '8px',
        fontSize: '1rem'
    },

    gridListUpcomingMovies: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
        width: '100%'
    },

    gridListMain: {

        transform: 'translateZ(0)',
        cursor: 'pointer'
    },

    formControl: {
        margin: theme.spacing.unit,
        minWidth: 240,
        maxWidth: 240
    },

    title: {
        color: theme.palette.primary.light
    }

    

});

class Home extends Component {

    constructor() {
        super();
        this.state = {
            artists: [],
            genresList: [],
            artistsList: [],
            releaseDateStart: "",
            releaseDateEnd: "",
            movie: "",
            genres: [],
            upcomingMovies: [],
            releasedMovies: [],
            
            
        }
    }

    componentWillMount() {


        
        // Genres get request


        let genres = null;
        let genresXhr = new XMLHttpRequest();
        genresXhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    genresList: JSON.parse(this.responseText).genres
                });
            }
        });

        genresXhr.open("GET", this.props.baseUrl + "genres");
        genresXhr.setRequestHeader("Cache-Control", "no-cache");
        genresXhr.send(genres);


        // upcoming movie GET request using status=PUBLISHED
        
        
        let published = null;
        let publishedXhr = new XMLHttpRequest();
        let that = this;
        publishedXhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    upcomingMovies: JSON.parse(this.responseText).movies
                });
            }
        });

        publishedXhr.open("GET", this.props.baseUrl + "movies?status=PUBLISHED");
        publishedXhr.setRequestHeader("Cache-Control", "no-cache");
        publishedXhr.send(published);

        
         // artists get request

        
         let artists = null;
         let artistsXhr = new XMLHttpRequest();
         artistsXhr.addEventListener("readystatechange", function () {
             if (this.readyState === 4) {
                 that.setState({
                     artistsList: JSON.parse(this.responseText).artists
                 });
             }
         });
 
         artistsXhr.open("GET", this.props.baseUrl + "artists");
         artistsXhr.setRequestHeader("Cache-Control", "no-cache");
         artistsXhr.send(artists);


        // Released movie GET request using status = RELEASED

        
        let released = null;
        let releasedXhr = new XMLHttpRequest();
        releasedXhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    releasedMovies: JSON.parse(this.responseText).movies
                });
            }
        });

        releasedXhr.open("GET", this.props.baseUrl + "movies?status=RELEASED");
        releasedXhr.setRequestHeader("Cache-Control", "no-cache");
        releasedXhr.send(released);

       
    }



    artistHandler = event => {
        this.setState({ artists: event.target.value });
    }

    movieChangeHandler = event => {
        this.setState({ movie: event.target.value });
    }

    genreHandler = event => {
        this.setState({ genres: event.target.value });
    }

    movieClickHandler = (movieId) => {
        this.props.history.push('/movie/' + movieId);
    }

    releaseDateStartHandler = event => {
        this.setState({ releaseDateStart: event.target.value });
    }

    releaseDateEndHandler = event => {
        this.setState({ releaseDateEnd: event.target.value });
    }

    

    filterHandler = () => {
        let queryString = "?status=RELEASED";

        if (this.state.releaseDateStart !== "") {
            queryString += "&start_date=" + this.state.releaseDateStart;
        }

        if (this.state.releaseDateEnd !== "") {
            queryString += "&end_date=" + this.state.releaseDateEnd;
        }

        if (this.state.movie !== "") {
            queryString += "&title=" + this.state.movie;
        }
       
        if (this.state.artists.length > 0) {
            queryString += "&artists=" + this.state.artists.toString();
        }

        if (this.state.genres.length > 0) {
            queryString += "&genres=" + this.state.genres.toString();
        }
       
        // Get request for Filter

        let that = this;
        let filter = null;
        let filterXhr = new XMLHttpRequest();
        filterXhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    releasedMovies: JSON.parse(this.responseText).movies
                });
            }
        });

        filterXhr.open("GET", this.props.baseUrl + "movies" + encodeURI(queryString));
        filterXhr.setRequestHeader("Cache-Control", "no-cache");
        filterXhr.send(filter);
    }



    render() {
        
        const {classes} = this.props;

        return (
            <div>
                <Header baseUrl={this.props.baseUrl} />
               

                {/*upcoming movies heading */}

                <div className={classes.upcomingMoviesHeading}>        
                    <span>Upcoming Movies</span>
                </div>


                 {/*using GridList, Gridtile component of Material UI for upcoming movies */}


                <GridList cols={6} className={classes.gridListUpcomingMovies} >
                    {this.state.upcomingMovies.map(movie => (
                        <GridListTile key={"upcoming" + movie.id}>
                            <img src={movie.poster_url} className="image" alt={movie.title} />
                            <GridListTileBar title={movie.title} />
                        </GridListTile>
                    ))}
                </GridList>



                <div className="flex-container">

                     {/*using GridList, Gridtile component of Material UI  for released movies*/}


                    <div className="leftside">
                        <GridList cellHeight={350} cols={4} className={classes.gridListMain}>
                            {this.state.releasedMovies.map(movie => (
                                <GridListTile onClick={() => this.movieClickHandler(movie.id)} className="released-movie-grid-item" key={"grid" + movie.id}>
                                    <img src={movie.poster_url} className="image" alt={movie.title} />
                                    <GridListTileBar title={movie.title} subtitle={<span>Release Date: {new Date(movie.release_date).toDateString()}</span>} />
                                </GridListTile>
                            ))}
                        </GridList>
                    </div>


                     {/*using card,form component of Material UI for filter */}



                    <div className="rightside">
                        <Card>
                            <CardContent>
                                
                                {/*Filter Title */}

                                <FormControl className={classes.formControl}>
                                    <Typography className={classes.title}> FIND MOVIES BY: </Typography>
                                </FormControl>

                                {/*Movie Name */}

                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="movie">Movie Name</InputLabel>
                                    <Input id="movie" onChange={this.movieChangeHandler} />
                                </FormControl>

                                
                                {/*Genres */}
                                
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="select-multiple-checkbox">Genres</InputLabel>
                                    <Select
                                        multiple
                                        input={<Input id="select-multiple-checkbox-genre" />}
                                        renderValue={selected => selected.join(',')}
                                        value={this.state.genres}
                                        onChange={this.genreHandler}
                                    >
                                        {this.state.genresList.map(genre => (
                                            <MenuItem key={genre.id} value={genre.genre}>
                                                <Checkbox checked={this.state.genres.indexOf(genre.genre) > -1} />
                                                <ListItemText primary={genre.genre} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>


                                 {/*Artists */}

                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="select-multiple-checkbox">Artists</InputLabel>
                                    <Select
                                        multiple
                                        input={<Input id="select-multiple-checkbox" />}
                                        renderValue={selected => selected.join(',')}
                                        value={this.state.artists}
                                        onChange={this.artistHandler}
                                    >
                                        {this.state.artistsList.map(artist => (
                                            <MenuItem key={artist.id} value={artist.first_name + " " + artist.last_name}>
                                                <Checkbox checked={this.state.artists.indexOf(artist.first_name + " " + artist.last_name) > -1} />
                                                <ListItemText primary={artist.first_name + " " + artist.last_name} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>



                                 {/*Release date */}


                                <FormControl className={classes.formControl}>
                                    <TextField
                                        id="releaseDateStart"
                                        label="Release Date Start"
                                        type="date"
                                        defaultValue=""
                                        InputLabelProps={{ shrink: true }}
                                        onChange={this.releaseDateStartHandler}
                                    />
                                </FormControl>

                                <FormControl className={classes.formControl}>
                                    <TextField
                                        id="releaseDateEnd"
                                        label="Release Date End"
                                        type="date"
                                        defaultValue=""
                                        InputLabelProps={{ shrink: true }}
                                        onChange={this.releaseDateEndHandler}
                                    />
                                </FormControl>
                                <br />

                                 {/*Apply button */}


                                <FormControl className={classes.formControl}>
                                    <Button onClick={() => this.filterHandler()} variant="contained" color="primary">
                                        APPLY
                                    </Button>
                                </FormControl>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div >
        )
    }
}

export default withStyles(styles)(Home);  