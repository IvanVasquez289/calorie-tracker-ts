import { useMemo , Dispatch} from "react"
import { categories } from "../data/categories"
import { Activity } from "../types"
import { PencilSquareIcon } from "@heroicons/react/24/outline"
import { ActivityActions } from "../reducers/activity-reducer"
type ActivityListProps = {
    activities: Activity[],
    dispatch: Dispatch<ActivityActions>
}
const ActivityList = ({ activities,dispatch }: ActivityListProps) => {

  const categoryName = useMemo(() => 
    (category: Activity['categoria']) =>  categories.map(cat => cat.id === category ? cat.name : '')
    ,[])

  const handleActiveId = (id: Activity['id']) => {
    dispatch({type: 'set-activeId', payload: {id}})
  }
  return (
    <>
        <h2 className="text-4xl font-bold text-slate-600 text-center">Comida y actividades</h2>
        {activities.map((activity) => (
            <div key={activity.id} className="bg-white shadow-lg px-5 py-10 flex justify-between mt-5">
                <div className="space-y-2 relative">
                    <p className={`absolute -top-8 -left-8 py-2 px-10 text-white uppercase font-bold ${activity.categoria === 1 ? 'bg-lime-600' : 'bg-red-600'}`}>
                        {categoryName(activity.categoria)}
                    </p>
                    <p className="text-2xl font-bold pt-5">{activity.name}</p>
                    <p className="font-black text-3xl text-lime-500">
                        {activity.calorias}{' '}
                        <span className="font-bold">Calorias:</span>
                    </p>
                </div>
                <div className="flex gap-5 items-center">
                    <button onClick={()=> handleActiveId(activity.id)}>
                        <PencilSquareIcon className="w-8 h-8 text-gray-800" />
                    </button>
                </div> 
            </div>
        ))}
    </>
  )
}

export default ActivityList