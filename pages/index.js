import Head from 'next/head';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import { Configuration, OpenAIApi } from 'openai';

if (typeof window !== 'undefined') {
  // browser code

  const accordian = document.querySelector('.accordian');

  accordian.addEventListener('click', (e) => {
    const activePanel = e.target.closest('.accordian-panel');
    if (!activePanel) return;
    toggleAccordian(activePanel);
  });

  function toggleAccordian(panelToActivate) {
    const buttons = panelToActivate.parentElement.querySelectorAll('button');

    const contents =
      panelToActivate.parentElement.querySelectorAll('.accordian-content');

    buttons.forEach((button) => {
      button.setAttribute('aria-expanded', false);
    });
    contents.forEach((content) => {
      content.setAttribute('aria-hidden', true);
    });

    panelToActivate.querySelector('button').setAttribute('aria-expanded', true);

    panelToActivate
      .querySelector('.accordian-content')
      .setAttribute('aria-hidden', false);
  }
}

export default function Home() {
  // console.log(process.env.NEXT_PUBLIC_API_KEY);
  const [newsone, setNewsone] = useState('');
  const [newsoneTitle, setNewsoneTitle] = useState('Please wait....');
  const [newstwo, setNewstwo] = useState('');
  const [newstwoTitle, setNewstwoTitle] = useState('Please wait....');
  const [newsthree, setNewsthree] = useState('');
  const [newsthreeTitle, setNewsthreeTitle] = useState('Please wait....');
  const [newsfour, setNewsfour] = useState('');
  const [newsfourTitle, setNewsfourTitle] = useState('Please wait....');
  const [fetch, setFetch] = useState(false);

  useEffect(() => {
    const openai = new OpenAIApi(
      new Configuration({
        apiKey: process.env.NEXT_PUBLIC_API_KEY,
      })
    );

    openai
      .createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'user', content: 'Tell me 4 positive news in brief' },
        ],
      })
      .then((res) => {
        // console.log(res.data.choices[0].message.content);
        let totalnews = res.data.choices[0].message.content;
        // console.log(totalnews);
        let news1 = '';
        let news1Title = '';
        let news2 = '';
        let news2Title = '';
        let news3 = '';
        let news3Title = '';
        let news4 = '';
        let news4Title = '';

        for (let i = 0; i < totalnews.length && totalnews[i] != 2; i++) {
          news1 += totalnews[i];
        }
        setNewsone(news1);
        news1Title = news1.slice(2, 25);
        news1Title += '...';
        setNewsoneTitle(news1Title);

        for (
          let i = news1.length;
          i < totalnews.length && totalnews[i] != 3;
          i++
        ) {
          news2 += totalnews[i];
        }
        setNewstwo(news2);
        news2Title = news2.slice(2, 25);
        news2Title += '...';
        setNewstwoTitle(news2Title);

        for (
          let i = news1.length + news2.length;
          i < totalnews.length && totalnews[i] != 4;
          i++
        ) {
          news3 += totalnews[i];
        }
        setNewsthree(news3);
        news3Title = news3.slice(2, 25);
        news3Title += '...';
        setNewsthreeTitle(news3Title);

        for (
          let i = news1.length + news2.length + news3.length;
          i < totalnews.length;
          i++
        ) {
          news4 += totalnews[i];
        }
        setNewsfour(news4);

        setNewsfourTitle(news4Title);
        news4Title = news4.slice(2, 25);
        news4Title += '...';
        setNewsfourTitle(news4Title);

        setFetch(true);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  // if (newsone == 'hi') {
  //   return (
  //     <>
  //       <h1>Let's wait till we fetch some good news for you</h1>
  //       <h3>Look at this cool animation though </h3>
  //     </>
  //   );
  // }
  return (
    <>
      <Head>
        <title>GoodNews</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='wrapper'>
        <h1>GOOD NEWS</h1>

        <h2>Refresh for more good news around the globe</h2>

        <div className='accordian'>
          <div className='accordian-panel'>
            <h2 id='panel1-heading'>
              <button
                className='accordian-trigger'
                aria-controls='panel1-content'
                aria-expanded='true'>
                <span className='accordian-title' id='panel1-title'>
                  {newsoneTitle}
                </span>
                <svg aria-hidden='true' className='accordian-icon'>
                  {/* <use xlink:href='#news-svgrepo-com'></use> */}
                </svg>
              </button>
            </h2>
            <div
              className='accordian-content'
              id='panel1-content'
              aria-labelledby='panel1-heading'
              aria-hidden='false'
              role='region'>
              <p>{newsone}</p>
              <img
                className='accordian-image'
                src='https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bmV3c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60'
                alt='covid-19'
              />
            </div>
          </div>
          <div className='accordian-panel'>
            <h2 id='panel2-heading'>
              <button
                className='accordian-trigger'
                aria-controls='panel2-content'
                aria-expanded='false'>
                <span className='accordian-title' id='panel1-title'>
                  {newstwoTitle}
                </span>
                <svg aria-hidden='true' className='accordian-icon'>
                  {/* <use xlink:href='#news-svgrepo-com'></use> */}
                </svg>
              </button>
            </h2>
            <div
              className='accordian-content'
              id='panel2-content'
              aria-labelledby='panel2-heading'
              aria-hidden='false'
              role='region'>
              <p>{newstwo}</p>
              <img
                className='accordian-image'
                src='https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80'
                alt='a camera'
              />
            </div>
          </div>
          <div className='accordian-panel'>
            <h2 id='panel3-heading'>
              <button
                className='accordian-trigger'
                aria-controls='panel1-content'
                aria-expanded='false'>
                <span className='accordian-title' id='panel3-title'>
                  {newsthreeTitle}
                </span>
                <svg aria-hidden='true' className='accordian-icon'>
                  {/* <use xlink:href='#news-svgrepo-com'></use> */}
                </svg>
              </button>
            </h2>
            <div
              className='accordian-content'
              id='panel3-content'
              aria-labelledby='panel3-heading'
              aria-hidden='false'
              role='region'>
              <p>{newsthree}</p>
              <img
                className='accordian-image'
                src='https://images.unsplash.com/photo-1503694978374-8a2fa686963a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80'
                alt='a gamepad'
              />
            </div>
          </div>
          <div className='accordian-panel'>
            <h2 id='panel4-heading'>
              <button
                className='accordian-trigger'
                aria-controls='panel4-content'
                aria-expanded='false'>
                <span className='accordian-title' id='panel4-title'>
                  {newsfourTitle}
                </span>
                <svg aria-hidden='true' className='accordian-icon'>
                  {/* <use xlink:href='#news-svgrepo-com'></use> */}
                </svg>
              </button>
            </h2>
            <div
              className='accordian-content'
              id='panel4-content'
              aria-labelledby='panel4-heading'
              aria-hidden='false'
              role='region'>
              <p>{newsfour}</p>
              <img
                className='accordian-image'
                src='https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80'
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
