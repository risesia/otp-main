import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Axios from "axios"
import React, { useState } from "react"

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const [audios, setAudios] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSubmit = (Event) => {
    Event.preventDefault();
    setIsSearching(true);
    setAudios([]);

    if(!searchText) {
      alert("Please enter song name");
      return;
    }

    Axios.get(
      `https://audius-discovery-14.cultur3stake.com/v1/tracks/search?query=${searchText}&app_name=OneTimePlaylist`
    )
      .then((Response) => {
        console.log(Response.data);
        setAudios(Response.data.data);
        setIsSearching(false);
      })
      .catch((error) => {
        console.log(error);
        setIsSearching(false);
      })
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>One Time Playlist</title>
        <meta name="description" content="Create a one-time playlist" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          One Time Playlist
        </h1>

        <div className={styles.grid}>

          <form onSubmit={handleSubmit}>
            <input className={styles.input}
              placeholder={"Search song"}
              onChange={(Event) => {
                setSearchText(Event.target.value);
              }}
            ></input>
            <button className={styles.button}>Search</button>
          </form>

          <div>
            {isSearching ? (
              <Image
                src="/Spinner-1s-200px.gif"
                width={70}
                height={70}
              />
            ) : (
              audios?.map((audio) => (
              <div className={styles.card}>
                <img
                  src={audio["artwork"]["480x480"]}
                  width={70}
                  alt={audio["title"]}  
                />
                <p>{audio["title"]}</p>
              </div>
              ))
            )}
          </div>

        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
