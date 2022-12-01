import reactotron from 'reactotron-react-native';
import {getTasks} from '../../Services/Api';

export const getTasksAction = () => async dispatch => {
  reactotron.log('action');
  dispatch(setIsLoading(true));
  try {
    const res = await getTasks();
    const {data} = res.data;

    dispatch({
      type: 'SET_TASKS',
      payload: data,
    });
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const setIsLoading = isLoading => ({
  type: 'SET_LOADING',
  payload: isLoading,
});
