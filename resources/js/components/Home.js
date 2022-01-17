import React, {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import {Dimmer, Loader, Table, Pagination, Button, Portal, Segment, Header, Icon} from 'semantic-ui-react';
import Nav from "./Nav";

import {setFavorite, deleteFavorite} from '../utils/helpers';

const Home = () => {

    const [pages, setPages] = useState(1)
    const [activePage, setActivePage] = useState(1)
    const [news, setNews] = useState([])
    const [newsToRender, setNewsToRender] = useState([])
    const [openPortal, setOpenPortal] = useState(false)
    const [portalMessage, setPortalMessage] = useState('')
    const [loading, setLoading] = useState(true)
    const [reloading, setReloading] = useState(false)


    const handleOpen = () => {
        setOpenPortal(true)

    }

    const handleClose = () => {
        setOpenPortal(false)
    }

    const showStatusPortal = (status) => {
        handleOpen()
        setPortalMessage(status)
    }

    const getAllNews = useCallback(async () => {
        try {
            const response = await axios.get('https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty');

            const {data} = response;
            setNews(data);
            setPages(data.length);

        } catch (e) {
            console.log(e)
        }
    }, [activePage]);


    useEffect(() => {
        const fetchData = async () => {
            await getAllNews();
        }
        fetchData();
        setReloading(false)
    }, [getAllNews, reloading]);

    useEffect(() => {
        if (news.length !== 0) {
            cycleTheNews()
        }
    }, [news])

    useEffect(() => {
        setReloading(false)
    }, [reloading])

    const handlePaginationChange = (e, {activePage}) => {
        setActivePage(activePage);
        getAllNews();
        setLoading(true)
    };

    const cycleTheNews = async () => {
        const pageSize = 10;
        const newsArray = news.slice((activePage - 1) * pageSize, activePage * pageSize);

        const result = await getTheNews(newsArray)
        setNewsToRender(result)
        setLoading(false)

    }

    const getTheNews = async (newsArray) => {
        return Promise.all(newsArray.map(async newsId => {
            try {
                const result = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${newsId}.json`)
                return result.data
            } catch (err) {
                console.log(err)
            }
        }))
    }
    return (
        <>
            <Nav/>
            <Portal
                closeOnTriggerClick
                openOnTriggerClick
                onOpen={handleOpen}
                onClose={handleClose}
                open={openPortal}
            >
                <Segment
                    style={{
                        left: '40%',
                        position: 'fixed',
                        top: '50%',
                        zIndex: 1000,
                    }}
                >
                    <Header>Notification</Header>
                    <p>{portalMessage}</p>
                </Segment>
            </Portal>
            {loading && (
                <Dimmer inverted active style={{paddingTop: 20, paddingBottom: 20}}>
                    <Loader inverted>Loading...</Loader>
                </Dimmer>
            )}
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
                            <Table.Cell>
                                <a href={data.url} target="_blank">
                                    <Icon name="external alternate"/>
                                </a>
                                {data.title}

                            </Table.Cell>
                            <Table.Cell>
                                {window.favoritesIdArray.indexOf(data.id) > -1 ?
                                    <Button
                                        icon="trash"
                                        onClick={async () => {
                                            const status = await deleteFavorite(data.id,)
                                            showStatusPortal(status)
                                            if (status === 'Entry deleted successfully') {
                                                setReloading(true)
                                            }
                                        }}
                                    /> :
                                    <Button
                                        icon="star"
                                        onClick={async () => {
                                            const status = await setFavorite(data.title, data.id, data.url)
                                            showStatusPortal(status)
                                            if (status === 'Entry saved successfully') {
                                                window.favoritesIdArray.push(data.id)
                                                setReloading(true)
                                            }
                                        }}
                                    />
                                }
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

export default Home;

