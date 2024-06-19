import { useState , ChangeEvent} from "react"
import { categories } from "../data/categories"
import { Activity } from "../types"
const Form = () => {

  const [activity, setActivity] = useState<Activity>({
    categoria: 1,
    name: '',
    calorias: 0,
  })

  const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
    const isNumberField = ['calorias','categoria'].includes(e.target.id)

    setActivity({
        ...activity, 
        [e.target.id]: isNumberField ? +e.target.value : e.target.value
    })
  }
  return (
    <form className="bg-white p-5 space-y-5 rounded shadow-md">
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
            type="button" 
            value="Guardar actividad"
            className="w-full bg-gray-800 text-white font-bold p-3 rounded cursor-pointer uppercase hover:bg-gray-900"

        />
    </form>
  )
}

export default Form