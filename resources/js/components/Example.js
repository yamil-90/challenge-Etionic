import React, {useCallback, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';
import {Dimmer, Loader, Table, Pagination, Button} from 'semantic-ui-react';

const Example = () => {

    const [pages, setPages] = useState(1)
    const [activePage, setActivePage] = useState(1)
    const [news, setNews] = useState([])
    const [newsToRender, setNewsToRender] = useState([])
    const [opacity, setOpacity] = useState(0.5)

    const getAllNews = useCallback(async () => {
        try {
            const response = await axios.get('https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty');

            const {data} = response;
            setOpacity(1);
            setNews(data);
            // console.log(data);
        } catch (e) {
            console.log(e)
        }
    }, [activePage]);

    useEffect(() => {
        const fetchData = async () => {
            // console.log('get all')
            await getAllNews();
        }
        axios.get('/api/user')
            .then(response => {
                console.log('user es', response.data);
            });

        fetchData();
    }, [getAllNews]);
    useEffect(() => {
        if (news.length !== 0) {
            // console.log('cycle start')
            cycleTheNews()

        }
    }, [news])

    const setFavorite = async (title, link) => {
        try {
            const result = await axios.post('/api/save-favorite', {
                title,
                link,
                user_id: window.userId
            });
            return result.data;
        } catch (err) {
            console.log(err);
        }
    };


    const handlePaginationChange = (e, {activePage}) => {
        setActivePage(activePage);
        getAllNews();
        setOpacity(0.5);
    };

    const cycleTheNews = async () => {
        const pageSize = 10;
        const newsArray = news.slice((activePage - 1) * pageSize, activePage * pageSize);

        const result = await getTheNews(newsArray)
        setNewsToRender(result)

    }

    const getTheNews = async (newsArray) => {
        // console.log('get the news inside')
        return Promise.all(newsArray.map(async newsId => {
            try {
                const result = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${newsId}.json`)
                // console.log('result dentro de get the news es', result)
                return result.data
            } catch (err) {
                console.log(err)
            }
        }))

    }

    return (
        <>
            {(newsToRender.length === 0 && (
                <Dimmer inverted active style={{paddingTop: 20, paddingBottom: 20}}>
                    <Loader inverted>Loading...</Loader>
                </Dimmer>
            ))}
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Title</Table.HeaderCell>
                        <Table.HeaderCell>Save as Favorite</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {(newsToRender.length !== 0 && Promise.allSettled(newsToRender)) && newsToRender.map((data) => (
                        <Table.Row key={data.id}>
                            <Table.Cell>{data.title}</Table.Cell>
                            <Table.Cell>
                                <Button
                                    icon="star"
                                    onClick={() => setFavorite(data.title, data.url)}
                                />
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
            {newsToRender && (
                <Pagination
                    boundaryRange={0}
                    defaultActivePage={1}
                    siblingRange={2}
                    totalPages={Math.ceil(pages / 10)}
                    onPageChange={handlePaginationChange}
                />
            )}
        </>
    );
}

export default Example;

if (document.getElementById('mainApp')) {
    ReactDOM.render(<Example/>, document.getElementById('mainApp'));
}
