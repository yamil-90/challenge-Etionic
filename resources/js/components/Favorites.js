import React, {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import {Dimmer, Loader, Table, Pagination, Button, Portal, Segment, Header, Icon} from 'semantic-ui-react';
import Nav from "./Nav";

import { deleteFavorite } from '../utils/helpers';

const Favorites = () => {
    const [pages, setPages] = useState(1)
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState([]);
    const [openPortal, setOpenPortal] = useState(false);
    const [portalMessage, setPortalMessage] = useState('');
    const [reloading, setReloading] = useState(false);
    const [activePage, setActivePage] = useState(1);

    useEffect(()=>{
        getFavorites(window.userId)
        setReloading(false)
        setLoading(false)
    },[reloading])

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

    const getFavorites = async (user_id) => {
        try {
            const response = await axios.get('/api/get-favorites', {
                params: {
                    user_id
                }
            });
            setFavorites(response.data);
            setLoading(false)

        }catch (e) {
            console.log('error es',e)
        }
    }

    const handlePaginationChange = (e, {activePage}) => {
        setActivePage(activePage);
        //TODO add get favorites
        setLoading(true)
    };

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
                        <Table.HeaderCell>Remove from Favorites</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {(favorites.length !== 0 && Promise.allSettled(favorites)) && favorites.map((data) => (
                        <Table.Row key={data.link_id}>
                            <Table.Cell>
                                <a href={data.link} target="_blank">
                                    <Icon name="external alternate"/>
                                </a>
                                {data.title}

                            </Table.Cell>
                            <Table.Cell>

                                    <Button
                                        icon="trash"
                                        onClick={async () => {
                                            const status = await deleteFavorite(data.link_id,)
                                            showStatusPortal(status)
                                            if (status === 'Entry deleted successfully') {
                                                setReloading(true)
                                            }
                                        }}
                                    />
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
            {favorites && (
                <Pagination
                    boundaryRange={0}
                    defaultActivePage={1}
                    siblingRange={2}
                    totalPages={Math.ceil(pages / 10)}
                    onPageChange={handlePaginationChange}
                />
            )}
            </>
    )
}

export default Favorites;


