import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Axios from "axios"
import React, { useState } from "react"

export default function Home() {

  const [searchText, setSearchText] = useState("");
  const [audios, setAudios] = useState([]);
  const [trending, setTrending] = useState([]);
  const [isTrending, setIsTrending] = useState(false);
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
      `https://audius-discovery-14.cultur3stake.com/v1/tracks/search?query=${searchText}&app_name=MusicPlaylist`
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

  const trendingTrack = (Event) => {
    Event.preventDefault();
    setIsTrending(true);

    Axios.get(
      `https://discovery-au-02.audius.openplayer.org/v1/tracks/trending?app_name=MusicPlaylist`
    )
      .then((Response) => {
        console.log(Response.data);
        setTrending(Response.data.data);
        setIsTrending(false);
      })
      .catch((error) => {
        console.log(error);
        setIsTrending(false);
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
          Music Playlist
        </h1>

        <div className={styles.grid}>
        <div>
        
        <form onSubmit={trendingTrack} className={styles.trending}>
            <button className={styles.button}>See Trending Track</button>
        </form>

        <div>
            {isTrending ? (
              <Image
                src="/Spinner-1s-200px.gif"
                width={70}
                height={70}
              />
            ) : (
              trending?.map((trendingSong) => (
              <div className={styles.card}>
                <img
                  src={trendingSong["artwork"]["150x150"]}
                  width={75}
                  alt={trendingSong["title"]}
                />
                <p>{trendingSong["title"]}</p>
                <p>{trendingSong["name"]}</p>
              </div>
              ))
            )}
          </div>
          </div>

          <div>
          <form onSubmit={handleSubmit} className={styles.formCenter}>
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
              audios?.map((song) => (
              <div className={styles.card}>
                <img
                  src={song["artwork"]["150x150"]}
                  width={75}
                  alt={song["title"]}
                />
                <p>{song["title"]}</p>
              </div>
              ))
            )}
          </div>
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
