import { useState , ChangeEvent, Dispatch, useEffect} from "react"
import { categories } from "../data/categories"
import { Activity } from "../types"
import { ActivityActions } from "../reducers/activity-reducer"

type FormProps = {
  dispatch: Dispatch<ActivityActions>,
  activeId: Activity['id'],
  activities: Activity[],
  
}

const initialState: Activity = {
  id: '',
  categoria: 1,
  name: '',
  calorias: 0,
}
const Form = ({dispatch,activeId,activities}:FormProps) => {

  const [activity, setActivity] = useState<Activity>(initialState)

  useEffect(() => {

    if(activeId){
        const currentActivity = activities.find(activity => activity.id === activeId)
        setActivity(currentActivity!)
    }
    
  },[activeId, activities])

  const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
    const isNumberField = ['calorias','categoria'].includes(e.target.id)

    setActivity({
        ...activity, 
        [e.target.id]: isNumberField ? +e.target.value : e.target.value
    })
  }

  const isValidActivity = () => {
    const { name, calorias } = activity
    return name.trim() !== '' && calorias > 0
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if(activeId){
      dispatch({type: 'update-activity', payload: { updatedActivity: activity}})
    }else {
      dispatch({type:'save-activity', payload:{ newActivity: {...activity, id: crypto.randomUUID()}}})
    }

    setActivity(initialState)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-5 space-y-5 rounded shadow-md">
        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="categoria" className="font-bold">Categoria</label>
            <select 
                id="categoria"
                className="border-2 border-slate-300 rounded p-2"
                value={activity.categoria}
                onChange={handleChange}
            >
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>
        </div>
        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="name" className="font-bold">Actividad</label>
            <input 
                type="text" 
                id="name"
                className="border-2 border-slate-300 rounded p-2"
                placeholder="Ej. Comida, Jugo de manzana, correr, etc." 
                value={activity.name}
                onChange={handleChange}
            />
        </div>
        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="calorias" className="font-bold">Calorias</label>
            <input 
                type="number" 
                id="calorias"
                className="border-2 border-slate-300 rounded p-2"
                placeholder="Ej. 2000" 
                value={activity.calorias}
                onChange={handleChange}
            />
        </div>
        <input 
            type="submit" 
            value={`${activity.categoria == 1 ? 'Guardar comida' : 'Guardar ejercicio'}`}
            className="disabled:opacity-40 disabled:cursor-not-allowed w-full bg-gray-800 text-white font-bold p-3 rounded cursor-pointer uppercase hover:bg-gray-900"
            disabled={!isValidActivity()}
        />
    </form>
  )
}

export default Form