import { useReducer, useEffect } from 'react';
import Form from "./components/Form"
import { activityReducer, initialState } from "./reducers/activity-reducer"
import ActivityList from "./components/ActivityList"

function App() {
  const [state, dispatch] = useReducer(activityReducer,initialState)

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities))
  },[state.activities])

  
  return (
    <>
     <header className="bg-lime-600 py-3">
        <div className="max-w-4xl mx-auto flex justify-between">
          <h1 className="text-lg font-bold text-white uppercase">Calorie Tracker</h1>
        </div>
     </header>
     <section className="bg-lime-500 py-20">
        <div className="max-w-4xl mx-auto">
          <Form
            dispatch={dispatch}
            activeId={state.activeId}
            activities={state.activities}
          />
        </div>
     </section>

     <section className="max-w-4xl mx-auto py-10">
        <ActivityList 
          activities={state.activities}
          dispatch={dispatch}
        />
     </section>
    </>
  )
}

export default App
