import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export async function POST(request: Request) {
  try {
    const envFilePath = path.join(process.cwd(), 'src/data/environment.ts')
    const defaultEnvFilePath = path.join(process.cwd(), 'src/data/defaultEnvironment.ts')
    
    // Read the content from the default environment file
    const defaultEnvContent = await fs.readFile(defaultEnvFilePath, 'utf-8')
    
    // Write the content to the environment file
    await fs.writeFile(envFilePath, defaultEnvContent)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to reset data' }, { status: 500 })
  }
}