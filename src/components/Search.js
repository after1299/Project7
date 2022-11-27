import React, {useState} from 'react'

const Search = ({search, setInput, input}) => {
    const inputHandler = (e) => {
        // console.log(e.target.value);
        setInput(e.target.value);
    }

    return (
        <div className='search'>
            <input onChange={inputHandler} type="text" name="" id="" />
            <button onClick={search}>Search</button>
        </div>
    )
}

export default Search