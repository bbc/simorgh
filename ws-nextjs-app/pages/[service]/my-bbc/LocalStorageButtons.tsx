/** @jsx jsx */

import React, { useEffect, useState } from 'react';
import { jsx } from '@emotion/react';
import Heading from '#app/components/Heading';
import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';
import styles from './styles';

interface StorageItem {
  title: string;
  path: string;
  id: string;
  isActive: Boolean;
}
interface ChosenTopic {
  [key: string]: string[];
}
interface ArticleListItem {
  topicId: string;
  topicTitle: string;
  title: string;
  imageUrl: string;
  description: string;
  imageAlt: string;
  id: string;
  link: string;
}

const LocalStorageButtons: React.FC = (service) => {
  const getInitialState = () => {
    if (typeof window !== 'undefined') {
        const storedState = localStorage.getItem('ws_bbc_chosen_topics');
        return storedState ? JSON.parse(storedState) : {};
    }
    return {[service.service]: []};
  };
  
  const englishCats = [
    {
        title: "Manchester United",
        data: {
            count: 9999,
            id: "c3yznj5rnp8t",
            path: "/sport/topics/c3yznj5rnp8t"
        }
    },
    {
        title: "Liverpool FC",
        data: {
            count: 9999,
            id: "c452mkpvxelt",
            path: "/sport/topics/c452mkpvxelt"
        }
    },
    {
        title: "Latin America",
        data: {
            count: 9999,
            id: "c90djjwx3xlt",
            path: "/news/topics/c90djjwx3xlt"
        }
    },
    {
        title: "Middle East",
        data: {
            count: 9999,
            id: "c05p9vgdr6pt",
            path: "/news/topics/c05p9vgdr6pt"
        }
    },
    {
        title: "Technology",
        data: {
            count: 9999,
            id: "cvrl9jzx0r5t",
            path: "/news/topics/cvrl9jzx0r5t"
        }
    }
  ];
  
  const getLangFromService = (service) => {
    switch(service) {
        case 'news':
        case 'sport':
            return 'en';
        break;
        case 'mundo':
            return 'es';
        break;
        default:
            return service.substring(0, 2);
        break;
    }
  }

  let hasInitiated = false;
  const [items, setItems] = useState<StorageItem[]>([]);
  const [titles, setTitles] = useState<ArticleListItem[]>([]);
  const [chosenTopics, setChosenTopics] = useState<ChosenTopic>(getInitialState);

  useEffect(() => {
    // Get items from local storage
    const storageItems: StorageItem[] = [];
    const chosenTopicItems: StorageItem[] = [];
    const articleListItems: ArticleListItem[] = [];
    let myTopics, myChosenTopics;
    myTopics = localStorage.getItem('ws_bbc_topics') || '{}';
    myTopics = JSON.parse(myTopics);
    myTopics = Object.keys(myTopics).reduce((acc, service) => {
        Object.keys(myTopics[service]).forEach(topic => {
            acc.push({title: topic, data: myTopics[service][topic]});
        })
        return acc;
    }, []);
    myChosenTopics = localStorage.getItem('ws_bbc_chosen_topics') || '{}';
    myChosenTopics = JSON.parse(myChosenTopics);
    if (myTopics) {
        console.log(myTopics)
        let topcats = Object.values(myTopics).filter(topic => topic.data.count > 1).sort((a, b) => b.data.count - a.data.count);
        topcats = [...topcats, ...englishCats];
        console.log('topcats', topcats);
        const topiclist = document.getElementById('topicList');
        topcats.forEach(topic => {
            let isActive = false;
            if (myChosenTopics && myChosenTopics[service.service]) {
                Object.keys(myChosenTopics[service.service]).forEach(topicPath => {
                    if (myChosenTopics[service.service][topicPath] === topic.data.path) {
                        isActive = true;
                    }
                });
            }
            storageItems.push({ title: topic.title, path: topic.data.path, id: topic.data.id, isActive });
        });
        Object.keys(myChosenTopics[service.service]).forEach(topicPath => {
            handleButtonClick(myChosenTopics[service.service][topicPath], false, true);
        });
    }
// 
    setItems(storageItems);
    console.log('chosenTopics', chosenTopics);
    console.log('myChosenTopics', myChosenTopics);
//     setChosenTopics(myChosenTopics);
  }, [ chosenTopics, hasInitiated ]);
  

  
  const handleButtonClick = async (topic: string, storeTopic: Boolean, isActive: Boolean, index: integer) => {
    
    const pieces = topic.split('/');
    const topicId = pieces.at(-1);
    const service = pieces[1];
    if (storeTopic) {

        // if (!isActive) {
//             setItems(storageItems);
//         };
        let currentTopics = chosenTopics;
        if (!isActive) {
            if (!currentTopics[service]) {
                currentTopics[service] = [];
            }
            currentTopics[service].push(topic);        
        }
        else {
            const topicIndex = currentTopics[service].indexOf(topic);
            currentTopics[service].splice(topicIndex, 1);
        }
        window.localStorage.setItem('ws_bbc_chosen_topics', JSON.stringify(currentTopics));
        setChosenTopics(currentTopics);
    }
    if (!isActive || !storeTopic) {
        try {
          const response = await fetch(`https://web-cdn.api.bbci.co.uk/fd/simorgh-bff?id=${topicId}&service=${service}&pageType=topic`);
          // const response = await fetch(`${getEnvConfig().SIMORGH_MOST_READ_CDN_URL}/fd/simorgh-bff?id=${topicId}&service=${service}&pageType=topic`);
          const data = await response.json();
          const articles = data.data.curations[0].summaries;
          const topicTitle = data.data.title;
          let topicArticles = {};
          topicArticles[topicTitle] = {};
          const textDir = ['arabic'].includes(service) ? 'rtl' : 'ltr';
          const lang = getLangFromService(service);
          articles.slice(0, 6).forEach(({ title, imageUrl, description, imageAlt, id, link }) => {
            const realImageUrl = imageUrl.replace('{width}', '320');
            topicArticles[topicTitle] = { topicTitle, topicId, title, imageUrl: realImageUrl, description, imageAlt, id, link };
            setTitles(prevTitles => [...prevTitles, { topicTitle, topicId, title, imageUrl: realImageUrl, description, imageAlt, id, link, textDir, lang }]);
          });
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    }
    else if (isActive && storeTopic) {
        let newTitles = titles.filter(title => title.topicId !== topicId);
        setTitles(newTitles);
    }
    console.log('isActive', isActive);
    console.log('index', index);
    if (!isActive && index) {
        items[index].isActive = true;
        setItems(items);
    }
    else if (isActive && index) {
        items[index].isActive = false;
        setItems(items);
    }
  };

  return (
    <>
    <div css={styles.buttons}>
      {items.map(({title, path, id, isActive}, index) => (
        <button key={index} id={id} className={isActive ? 'active' : 'inactive'} onClick={() => handleButtonClick(path, true, isActive, index)}>
          {title}
        </button>
      ))}
    </div>
    <ul css={styles.orderedList}>

    
            {titles.map(({ topicTitle, topicId, title, imageUrl, description, imageAlt, id, link, textDir, lang }, index) => (
          <>
          {index % 6 === 0 && (
                <Heading level={2} dir={textDir}>{topicTitle}</Heading>
            )}
            <li css={styles.listItem} key={link} dir={textDir} lang={lang}>
            
            <a href={link} dir={textDir}>
                <img src={imageUrl} alt={imageAlt} />
                <span css={styles.title} dir={textDir}>{title}</span>
            </a>
          </li>
          </>
        ))}
        </ul>
    </>
  );
};

export default LocalStorageButtons;