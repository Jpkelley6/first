import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import Refresh from './refresh.jpg'

const RandomFactHolder = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isClicked, setIsClicked] = useState(false)
    const [facts, setFacts] = useState([]);
  
    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
      fetch("https://uselessfacts.jsph.pl/random.json?language=en")
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setFacts(result);
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
}, [isClicked])
  
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <>
            <img src={Refresh} alt='refresh here' onClick={() => setIsClicked(!isClicked)}></img>
            <p key={facts.id}>
              {facts.text}
            </p>
        </>
      );
    }
  }

export default RandomFactHolder
