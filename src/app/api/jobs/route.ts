// app/api/jobs/route.ts
import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
export const dynamic = 'force-dynamic'
export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Read existing jobs
    const filePath = path.join(process.cwd(), 'src/app/versions/jobs.json');
    let jobs = [];
    
    try {
      const fileContent = await fs.readFile(filePath, 'utf8');
      jobs = JSON.parse(fileContent);
    } catch (error) {
      // File doesn't exist or is empty, start with empty array
    }
    
    // Add new job
    jobs.push(data);
    
    // Write back to file
    await fs.writeFile(filePath, JSON.stringify(jobs, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in POST /api/jobs:', error);
    return NextResponse.json({ error: 'Failed to save job data' }, { status: 500 });
  }
}

