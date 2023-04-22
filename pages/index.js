import { useEffect, useState } from 'react';
import Head from 'next/head';
import { fetchNews } from '@/api';
import NewsItem from '@/components/NewsItem';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState([]);

  useEffect(() => {
    if (isLoading || list.length) return;

    (async () => {
      setIsLoading(true);
      try {
        const data = await fetchNews();
        const news = data.split('\n').filter(Boolean);
        setList(news);
      }
      catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [isLoading, list.length]);

  useEffect(() => {
    if (typeof window !== 'undefined' || !document) return;

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

    const clickHandler = (e) => {
      const activePanel = e.target.closest('.accordian-panel');
      if (!activePanel) return;
      toggleAccordian(activePanel);
    };

    const accordian = document.querySelector('.accordian');
    accordian.addEventListener('click', clickHandler);

    return () => {
      accordian.removeEventListener('click', clickHandler);
    }
  }, [])


  if (isLoading) {
    return <div>Loading...</div>;
  }

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

        {list.map((body, index) => (
          <NewsItem key={index} index={index} body={body} />
        ))}

      </div>
    </>
  );
}
