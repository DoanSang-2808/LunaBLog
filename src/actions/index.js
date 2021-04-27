import apiPost from "../apis/apiPost";
export const fetchPosts = () => (
    async (dispatch) => {
        const response = await apiPost.get('/post/show');
        dispatch({
            type: 'FETCH_POSTS',
            payload: response.data
        })
    }
)