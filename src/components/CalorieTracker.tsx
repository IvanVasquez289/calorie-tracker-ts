import { useMemo } from "react"
import type { Activity } from "../types"
import CalorieDisplay from "./CalorieDisplay"

interface CalorieTrackerProps {
    activities: Activity[]
}
const CalorieTracker = ({ activities }: CalorieTrackerProps) => {

  const caloriesConsumed = useMemo(() => activities.reduce((total, activity) => activity.categoria === 1 ? total + activity.calorias : total, 0), [activities])
  const caloriesBurned = useMemo(() => activities.reduce((total, activity) => activity.categoria === 2 ? total + activity.calorias : total, 0), [activities])
  const difference = useMemo(() => caloriesConsumed - caloriesBurned, [caloriesConsumed, caloriesBurned])
  return (
    <>
        <h2 className="text-4xl font-bold text-center text-white">Resumen de calorias</h2>
        <div className="flex flex-col gap-5 mt-10 md:flex-row md:justify-between items-center">
            <CalorieDisplay 
                calories={caloriesConsumed} 
                text="Consumidas" 
            />
            <CalorieDisplay 
                calories={caloriesBurned} 
                text="Quemadas" 
            />
            <CalorieDisplay 
                calories={difference} 
                text="Diferencia" 
            />
        </div>
    </>
  )
}

export default CalorieTracker