import { useMemo } from "react"
import { categories } from "../data/categories"
import { Activity } from "../types"

type ActivityListProps = {
    activities: Activity[]
}
const ActivityList = ({ activities }: ActivityListProps) => {

  const categoryName = useMemo(() => 
    (category: Activity['categoria']) =>  categories.map(cat => cat.id === category ? cat.name : '')
    ,[])
  return (
    <>
        <h2 className="text-4xl font-bold text-slate-600 text-center">Comida y actividades</h2>
        {activities.map((activity) => (
            <div key={activity.id} className="bg-white shadow-lg px-5 py-10 flex justify-between mt-5">
                <div className="space-y-2 relative">
                    <p className={`absolute -top-8 -left-8 py-2 px-10 text-white uppercase font-bold ${activity.categoria === 1 ? 'bg-lime-600' : 'bg-red-600'}`}>
                        {categoryName(activity.categoria)}
                    </p>
                    <p className="text-2xl font-bold">{activity.name}</p>
                    <p className="font-black text-3xl text-lime-500">
                        {activity.calorias}{' '}
                        <span className="font-bold">Calorias:</span>
                    </p>
                </div>
                <div>

                </div> 
            </div>
        ))}
    </>
  )
}

export default ActivityList