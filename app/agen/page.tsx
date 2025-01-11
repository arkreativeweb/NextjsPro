'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface Agent {
  id: number
  name: string
  role: string
  image: string
  phone: string
  email: string
  description: string
  properties_count: number
}

export default function AgenPage() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await fetch('https://admin.arearumah.com/api/agents')
        const data = await response.json()
        setAgents(data.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching agents:', error)
        setLoading(false)
      }
    }

    fetchAgents()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Our Agents</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <div key={agent.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-48">
              <Image
                src={agent.image || '/images/default-agent.png'}
                alt={agent.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{agent.name}</h2>
              <p className="text-gray-600 mb-2">{agent.role}</p>
              
              <div className="mt-4 space-y-2">
                <p className="flex items-center text-gray-600">
                  <svg className="h-5 w-5 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  {agent.phone}
                </p>
                <p className="flex items-center text-gray-600">
                  <svg className="h-5 w-5 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  {agent.email}
                </p>
              </div>
              
              <div className="mt-4">
                <p className="text-gray-600 line-clamp-3">{agent.description}</p>
              </div>
              
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm text-gray-500">
                  Properties: {agent.properties_count}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}