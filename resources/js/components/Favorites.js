import React, {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import {Dimmer, Loader, Table, Pagination, Button, Portal, Segment, Header, Icon} from 'semantic-ui-react';
import Nav from "./Nav";

const Favorites = () => {
    const [pages, setPages] = useState(1)
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState([]);
    const [reloading, setReloading] = useState(false);
    const [activePage, setActivePage] = useState(1)

    useEffect(()=>{
        getFavorites(window.userId)
    },[])

    const getFavorites = async (userId) => {
        try {
            const response = await axios.get('/api/get-favorites', {
                data:{
                    userId
                }
            });
            console.log('data es',response.data)
            setFavorites(response.data);
            setLoading(false)

        }catch (e) {
            console.log('error es',e)
        }
    }

    const deleteFavorite = async (link_id) => {
        try {
            const result = await axios.delete('/api/delete-favorite', {
                data: {
                    link_id,
                    user_id: window.userId
                }
            });

            const newArray =window.favoritesIdArray.filter((item)=>(
                item !== link_id && item
            ))
            window.favoritesIdArray = newArray
            setReloading(true)
            showStatusPortal(result.data.status)
        } catch (err) {
            showStatusPortal()
            console.error(err);
        }
    };
    const showStatusPortal = (status) => {

    }

    const handlePaginationChange = (e, {activePage}) => {
        setActivePage(activePage);
        //TODO add get favorites
        setLoading(true)
    };

    return (
        <>
            <Nav/>
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
                    {(favorites.length !== 0 && Promise.allSettled(favorites)) && favorites.map((data) => (
                        <Table.Row key={data.id}>
                            <Table.Cell>
                                <a href={data.url} target="_blank">
                                    <Icon name="external alternate"/>
                                </a>
                                {data.title}

                            </Table.Cell>
                            <Table.Cell>

                                    <Button
                                        icon="trash"
                                        onClick={() => deleteFavorite(data.id)}
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


