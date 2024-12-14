'use client'

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { candidateData, jobData } from '@/data/defaultEnvironment'
import { useRouter } from 'next/navigation'

// Define interfaces for the data structures
interface Versions {
  candidates: any[] // Replace 'any' with specific type from your data structure
  jobs: any[] // Replace 'any' with specific type from your data structure
}

const VersionControls: React.FC = () => {
  const router = useRouter()
  const [versions, setVersions] = useState<Versions>({ candidates: [], jobs: [] })

  useEffect(() => {
    const fetchVersions = async () => {
      try {
        const candidatesResponse = await fetch('/api/versions/candidates')
        const jobsResponse = await fetch('/api/versions/jobs')

        const candidatesData = await candidatesResponse.json()
        const jobsData = await jobsResponse.json()

        setVersions({
          candidates: candidatesData,
          jobs: jobsData
        })
      } catch (error) {
        console.error('Error fetching versions:', error)
      }
    }

    fetchVersions()
  }, [])

  const handleReset = async (): Promise<void> => {
    try {
      await fetch('/api/versions/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      router.refresh()
    } catch (error) {
      console.error('Error resetting data:', error)
    }
  }

  const handleVersionSelect = async (value: string): Promise<void> => {
    const index = parseInt(value)
    try {
      await fetch('/api/versions/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          candidateData: versions.candidates[index],
          jobData: versions.jobs[index]
        })
      })

      router.refresh()
    } catch (error) {
      console.error('Error updating version:', error)
    }
  }

  return (
    <div className="flex items-center gap-4 p-4">
      <Button 
        variant="outline"
        onClick={handleReset}
        className="whitespace-nowrap"
      >
        Reset to Default
      </Button>

      <Select onValueChange={handleVersionSelect}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select version" />
        </SelectTrigger>
        <SelectContent>
          {versions.candidates.map((_, index) => (
            <SelectItem key={index} value={index.toString()}>
              Version {index + 1}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default VersionControls