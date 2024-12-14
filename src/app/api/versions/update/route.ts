// app/api/versions/update/route.ts
import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export async function POST(request: Request) {
  try {
    const { candidateData, jobData } = await request.json()
    const envFilePath = path.join(process.cwd(), 'src/data/environment.ts')
    
    const fileContent = `
export const candidateData = ${JSON.stringify(candidateData, null, 2)}

export const jobData = ${JSON.stringify(jobData, null, 2)}

export type CandidateDataType = typeof candidateData
export type JobDataType = typeof jobData
`
    
    await fs.writeFile(envFilePath, fileContent)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update version' }, { status: 500 })
  }
}