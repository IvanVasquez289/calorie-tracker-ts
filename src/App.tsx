import { useReducer, useEffect, useMemo } from 'react';
import Form from "./components/Form"
import { activityReducer, initialState } from "./reducers/activity-reducer"
import ActivityList from "./components/ActivityList"

function App() {
  const [state, dispatch] = useReducer(activityReducer,initialState)

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities))
  },[state.activities])

  const canRestartApp = useMemo(() => state.activities.length > 0, [state.activities])
  return (
    <>
     <header className="bg-lime-600 py-3">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-lg font-bold text-white uppercase">Calorie Tracker</h1>
          <button 
            className='bg-gray-800 hover:bg-gray-900 uppercase text-white p-2 font-bold rounded disabled:opacity-30 disabled:cursor-not-allowed'
            disabled={!canRestartApp}
            onClick={() => dispatch({type: 'restart-activities'})}
          >
            Reiniciar App
          </button>
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
