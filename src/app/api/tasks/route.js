import connectToDatabase from '@/lib/mongodb';
import Task from '@/models/Task';

export async function GET() {
  await connectToDatabase();
  const tasks = await Task.find({});
  return Response.json(tasks);
}

export async function POST(req) {
  await connectToDatabase();
  const { title } = await req.json();
  const newTask = new Task({ title });
  await newTask.save();
  return Response.json(newTask, { status: 201 });
}
