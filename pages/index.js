import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Axios from "axios"
import React, { useState } from "react"

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const [audios, setaudios] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSubmit = (Event) => {
    Event.preventDefault();
    setIsSearching(true);
    setaudios([]);

    if(!searchText) {
      alert("Please enter song name");
      return;
    }

    Axios.get(
      'https://audius-discovery-14.cultur3stake.com/v1/tracks/search?query=${searchText}&app_name=OneTimePlaylist'
    )
      .then((Response) => {
        console.log(Response.data);
        setaudios(Response.data.search);
        setIsSearching(false);
      })
      .catch((Error) => {
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
            <input
              placeholder={"Search song"}
              onChange={(Event) => {
                setSearchText(Event.target.value);
              }}
            ></input>
            <button>Search</button>
          </form>

          <div>
            {isSearching ? (
              <p>Loading</p>
            ) : (
              audios?.map((data) =>
              <div>
                <Image
                  src={data["480x480"]}
                  width={200}
                  alt={data["title"]}
                />
                <p>{data["title"]}</p>
                <p></p>
              </div>
              )
            )
            
          }
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
