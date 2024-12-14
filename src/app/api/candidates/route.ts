// app/api/candidates/route.ts
import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
export const dynamic = 'force-dynamic'
export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Read existing candidates
    const filePath = path.join(process.cwd(), 'src/app/versions/candidates.json');
    let candidates = [];
    
    try {
      const fileContent = await fs.readFile(filePath, 'utf8');
      candidates = JSON.parse(fileContent);
    } catch (error) {
      // File doesn't exist or is empty, start with empty array
    }
    
    // Add new candidate
    candidates.push(data);
    
    // Write back to file
    await fs.writeFile(filePath, JSON.stringify(candidates, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in POST /api/candidates:', error);
    return NextResponse.json({ error: 'Failed to save candidate data' }, { status: 500 });
  }
}