import axios from "axios";

export const setFavorite = async (title, link_id, link) => {
        try {
            const result = await axios.post('/api/save-favorite', {
                title,
                link,
                link_id,
                user_id: window.userId
            });
            return result.data.status

        } catch (err) {
            console.error(err);
            return 'error saving favorite'

        }
    };

export const deleteFavorite = async (link_id) => {
        try {
            const result = await axios.delete('/api/delete-favorite', {
                data: {
                    link_id,
                    user_id: window.userId
                }
            });

            const newArray = window.favoritesIdArray.filter((item) => (
                item !== link_id && item
            ))
            window.favoritesIdArray = newArray
            return result.data.status
        } catch (err) {

            console.error(err);
            return false
        }
    };
