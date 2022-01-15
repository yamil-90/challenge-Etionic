import React, {useCallback, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';
import {Dimmer, Loader, Table, Pagination} from 'semantic-ui-react';

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
            console.log(data);


        } catch (e) {
            console.log(e)
        }
    }, [activePage]);

    useEffect(() => {
        const fetchData = async () => {
            await getAllNews();
        }
        fetchData();
        cycleTheNews()
    }, [getAllNews]);

    const handlePaginationChange = (e, { activePage }) => {
        setActivePage(activePage);
        const fetchData = async () => {
            await getAllNews();
        }
        fetchData();
        setOpacity(0.5);
    };

    const cycleTheNews = () => {
        const pageSize = 10;
        const newsArray = news.slice((activePage - 1) * pageSize, activePage * pageSize);
        setNewsToRender(newsArray)
    }

    const getTheNews = async (newsId) => {
        try {
            const response = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${newsId}.json`)
        } catch (err) {
            console.log(err)
        }
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
                        <Table.HeaderCell>Id</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                {newsToRender && newsToRender.map((post, index) => (
                    <Table.Body key={index}>
                        <Table.Row>
                            <Table.Cell>{post.title}</Table.Cell>
                            <Table.Cell>{post.id}</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                ))}
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

if (document.getElementById('app')) {
    ReactDOM.render(<Example/>, document.getElementById('app'));
}
