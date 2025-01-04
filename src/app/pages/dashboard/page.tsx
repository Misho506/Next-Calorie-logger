'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import CalorieChart from '../../components/CalorieChart'

export default function Dashboard() {
  const [mealCalories, setMealCalories] = useState('')
  const [exerciseCalories, setExerciseCalories] = useState('')
  const [calorieData, setCalorieData] = useState([])
  const [activeTab, setActiveTab] = useState('meal')

  useEffect(() => {
    fetchCalorieData()
  }, [])

  const fetchCalorieData = async () => {
    try {
      const response = await fetch('/api/calories')
      if (response.ok) {
        const data = await response.json()
        setCalorieData(data)
      } else {
        console.error('Failed to fetch calorie data')
      }
    } catch (error) {
      console.error('Error fetching calorie data:', error)
    }
  }

  const handleMealSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/calories/meal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ calories: mealCalories }),
      })
      if (response.ok) {
        setMealCalories('')
        fetchCalorieData()
      } else {
        console.error('Failed to log meal calories')
      }
    } catch (error) {
      console.error('Error logging meal calories:', error)
    }
  }

  const handleExerciseSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/calories/exercise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ calories: exerciseCalories }),
      })
      if (response.ok) {
        setExerciseCalories('')
        fetchCalorieData()
      } else {
        console.error('Failed to log exercise calories')
      }
    } catch (error) {
      console.error('Error logging exercise calories:', error)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Calories Logger Dashboard</h1>
      <div className="flex justify-between mb-4">
        <Link href="/profile" className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700">
          Profile
        </Link>
        <Link href="/login" className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
          Logout
        </Link>
      </div>
      <div className="mb-6">
        <div className="flex border-b border-gray-200">
          <button
            className={`py-2 px-4 ${activeTab === 'meal' ? 'border-b-2 border-sky-500 text-sky-600' : 'text-gray-500 hover:text-gray-700'
              }`}
            onClick={() => setActiveTab('meal')}
          >
            Log Meal
          </button>
          <button
            className={`py-2 px-4 ${activeTab === 'exercise' ? 'border-b-2 border-sky-500 text-sky-600' : 'text-gray-500 hover:text-gray-700'
              }`}
            onClick={() => setActiveTab('exercise')}
          >
            Log Exercise
          </button>
        </div>
        <div className="mt-4">
          {activeTab === 'meal' ? (
            <form onSubmit={handleMealSubmit} className="space-y-4">
              <div>
                <label htmlFor="mealCalories" className="block text-sm font-medium text-gray-700">
                  Meal Calories
                </label>
                <input
                  id="mealCalories"
                  type="number"
                  required
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                    focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                  value={mealCalories}
                  onChange={(e) => setMealCalories(e.target.value)}
                  placeholder="Enter calories consumed"
                />
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
              >
                Log Meal
              </button>
            </form>
          ) : (
            <form onSubmit={handleExerciseSubmit} className="space-y-4">
              <div>
                <label htmlFor="exerciseCalories" className="block text-sm font-medium text-gray-700">
                  Exercise Calories
                </label>
                <input
                  id="exerciseCalories"
                  type="number"
                  required
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                    focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                  value={exerciseCalories}
                  onChange={(e) => setExerciseCalories(e.target.value)}
                  placeholder="Enter calories burned"
                />
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
              >
                Log Exercise
              </button>
            </form>
          )}
        </div>
      </div>
      <div className="mt-8">
        <CalorieChart data={calorieData} />
      </div>
    </div>
  )
}

