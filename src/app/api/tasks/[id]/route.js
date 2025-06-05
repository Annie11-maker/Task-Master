import connectToDatabase from '@/lib/mongodb';
import Task from '@/models/Task';

export async function PUT(req, { params }) {
  await connectToDatabase();
  const updatedTask = await Task.findByIdAndUpdate(params.id, await req.json(), {
    new: true,
  });
  return Response.json(updatedTask);
}

export async function DELETE(req, { params }) {
  await connectToDatabase();
  await Task.findByIdAndDelete(params.id);
  return new Response(null, { status: 204 });
}
