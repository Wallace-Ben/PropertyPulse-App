import connectDB from "@/config/database";
import Property from "@/models/Property";

// Get /api/properties/id
export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectDB();
    const { id } = await params;

    const property = await Property.findById(id);

    if (!property) return new Response("Property not found", { status: 404 });

    return new Response(JSON.stringify(property), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something Went Wrong", {
      status: 500,
    });
  }
};
