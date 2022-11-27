import React, {useState, useEffect} from 'react';
import Search from "../components/Search"
import Picture from '../components/Picture';

const Homepage = () => {
    let [input, setInput] = useState("");
    let [page, setPage] = useState(2); 
    // page initial value should be "2" because we load Homepage initially is using "initialURL". It's parameter page value is "1".
    // But if we need to load more picture, we must load pictures begin with page "2".
    let [currentSearch, setCurrentSearch] = useState("");
    const searchURL = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=1`;
    const auth = "563492ad6f91700001000001bb3fccf57572421e8bdd03bc8241e39a";
    const initialURL = "https://api.pexels.com/v1/curated?page=1&per_page=15";
    let [data, setData] = useState(null);

    // fetch data from pexels api
    const search = async(url) => {
        setPage(2);
        const dataFetch = await fetch(url, {
            method: "GET", 
            headers: {
                Accept: "application/json",
                Authorization: auth
            }
        });
        let parseData = await dataFetch.json();
        setData(parseData.photos);
        // console.log(parseData);
    }

    // load more picture
    const morepicture = async() => {
        let newURL;
        if(input === "") {
            newURL = `https://api.pexels.com/v1/curated?page=${page}&per_page=15`;
        } else {
            newURL = `https://api.pexels.com/v1/search?query=${input}&per_page=15&page=${page}`;
        }
        setPage(page+1);
        const dataFetch = await fetch(newURL, {
            method: "GET", 
            headers: {
                Accept: "application/json",
                Authorization: auth
            }
        });
        let parseData = await dataFetch.json();
        setData(data.concat(parseData.photos)); // array1.concat(array2) -> conbines array1 with array2
    }

    // fetch data when the page loads up
    useEffect(() => {
        search(initialURL);
    }, []);
    useEffect(() => {
        if(currentSearch == "") {
            search(initialURL);
        } else {
            search(initialURL);
        }
        search(currentSearch);
    }, [currentSearch]);

    return (
        <div style={{minHeight: "100vh"}}>
            <Search search={() => {search(searchURL); setCurrentSearch(input);}} setInput={setInput} input={input}/>
            <div className="pictures">
                {data && data.map((d) => { 
                    // data will be null in the initial. Hence, "map" function will been error.
                    // Therefore, we need add "data &&" to determine whether the data exist.
                    // If it is false, map function will not be executed. 
                    return <Picture data={d}/>
                })}
            </div>
            <div className="morePicture">
                <button onClick={morepicture}>Load More</button>
            </div>
        </div>
    )
}

export default Homepage