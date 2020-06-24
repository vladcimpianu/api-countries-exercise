import React, { Component } from 'react';
import './countries.css';

const betterCountriesToFetch = [
    'germany',
    'france',
    'romania',
    'italy',
    'spain'
]

class Country extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countryList: []
        };
        this.handleCountryFetch = this.handleCountryFetch.bind(this);
    };

    getRandomCountry() {
        const randomNumber = Math.floor(Math.random() * betterCountriesToFetch.length);
        const selectedCountry = betterCountriesToFetch[randomNumber];
        return selectedCountry;
    }

    handleResult(result) {
        const newCountryList = [...this.state.countryList, result];
        this.setState( { countryList: newCountryList } )
    }

    handleCountryFetch() {
        fetch(`https://restcountries.eu/rest/v2/name/${this.getRandomCountry()}`)
        .then( response => response.json())
        .then(data => {
            this.handleResult(data[0]);
        });
    };

    render() {
        return(
            <div className='countries'>
                <button onClick={ this.handleCountryFetch }>Get Country</button>
                <div >
                    { 
                    this.state.countryList.map( (country, index) => {
                        return ( 
                            <div className='countries-container'>
                                <img className='svg-flag' src={ country.flag } alt='flag' />
                                <div key={index}> 
                                    Country: { country.name } 
                                </div>
                                <div key={index}>
                                    Capital: { country.capital }
                                </div>
                                <div key={index}>
                                    Timezone: { country.timezone }
                                </div> 
                                <div key={index}>
                                    Borders with: {country.borders.map((border) => {
                                        return `${border}, `.toLowerCase();                                    
                                    })}
                                </div>
                                <div key={index}>
                                    Population: { country.population }
                                </div>
                            </div>
                        )
                    }) 
                    }
                </div>
           </div>
        )
    };
};

export default Country;

