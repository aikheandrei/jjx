import { NextResponse } from "next/server";
import { database } from "@/db/index";
import { descriptions as descriptionSchema } from "@/db/schema";
import { eq } from "drizzle-orm";

const handleError = (error: unknown) => {
  NextResponse.json(
    { error: error instanceof Error ? error.message : "Unknown error" },
    { status: 500 },
  );
};

export async function GET() {
  try {
    const data = await database.select().from(descriptionSchema);

    // console.log(data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error during HTTP GET request:", error);
    return handleError(error);
  }
}

export async function POST(request: Request) {
  try {
    const { title, description } = await request.json();

    const data = await database.insert(descriptionSchema).values({
      title,
      description,
    });

    const currentDescription = await database
      .select({
        title: descriptionSchema.title,
        description: descriptionSchema.description,
      })
      .from(descriptionSchema)
      .where(eq(descriptionSchema.title, title));

    console.log(currentDescription);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error during HTTP POST request:", error);
    return handleError(error);
  }
}

export async function PUT(request: Request) {
  try {
    const { id, title, description } = await request.json();

    const currentTimestamp = new Date();

    const data = await database
      .update(descriptionSchema)
      .set({
        title,
        description,
        updatedAt: currentTimestamp,
      })
      .where(eq(descriptionSchema.id, id));

    console.log({ id, title, description, updatedAt: currentTimestamp });
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error during HTTP POST request:", error);
    return handleError(error);
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    const data = await database
      .delete(descriptionSchema)
      .where(eq(descriptionSchema.id, id));

    console.log(data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error during HTTP POST request:", error);
    return handleError(error);
  }
}
