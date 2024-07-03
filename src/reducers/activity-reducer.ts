import { Activity } from "../types";

export type ActivityActions = 
    {type: 'save-activity', payload: {newActivity: Activity}} |
    {type: 'set-activeId', payload: {id: Activity['id']}} |
    {type: 'update-activity', payload: { updatedActivity: Activity }} |
    {type: 'delete-activity', payload: {id: Activity['id']}}

type ActivityState = {
  activities: Activity[];
  activeId: Activity['id'];
};

const localStorageActivities = (): Activity[] => {
  const activities = localStorage.getItem('activities')
  return activities ? JSON.parse(activities) : []
}
export const initialState: ActivityState = {
  activities: localStorageActivities(),
  activeId: '',
};

export const activityReducer = (
  state: ActivityState = initialState,
  action: ActivityActions
) => {
    if(action.type === 'save-activity'){
        return{
            ...state,
            activities: [...state.activities, action.payload.newActivity]
        }
    }

    if(action.type === 'set-activeId'){
        return{
            ...state,
            activeId: action.payload.id
        }
    }

    if(action.type === 'update-activity'){
        const updatedActivities = state.activities.map(
          act => act.id === action.payload.updatedActivity.id ? action.payload.updatedActivity : act
        )
        return {
            ...state,
            activities: updatedActivities,
            activeId: ''
        }
    }

    if(action.type === 'delete-activity'){
      const updatedActivities = state.activities.filter(act => act.id !== action.payload.id)
      return {
          ...state,
          activities: updatedActivities,
      }
    }
    return state
};
