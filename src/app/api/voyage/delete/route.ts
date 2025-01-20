import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "~/server/db";

/**
 * @swagger
 * /api/voyage/delete:
 *   delete:
 *     tags:
 *       - Voyage
 *     summary: Deletes a voyage
 *     description: Deletes a voyage by its ID. Note that this operation randomly fails to demonstrate error handling.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: The ID of the voyage to delete.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: The voyage was successfully deleted.
 *       400:
 *         description: Failed to delete the voyage due to a random error.
 *       404:
 *         description: The voyage with the specified ID was not found.
 *       405:
 *         description: Method Not Allowed. Only DELETE method is supported on this endpoint.
 */

export const DELETE = async (req: NextRequest) => {
  try {
    const id = req.nextUrl.searchParams.get("id");
    console.log("id", id);
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    // randomly fail the delete request
    const maybe = Math.round(Math.random());
    if (maybe) {
      return NextResponse.json(
        { error: "Random failure occurred" },
        { status: 400 },
      );
    }

    const deletedVoyage = await prisma.voyage.delete({
      where: { id },
    });

    if (deletedVoyage) {
      return NextResponse.json({
        success: true,
        status: 204,
      });
    } else {
      return NextResponse.json({ error: "Voyage not found", status: 404 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
};

export function OPTIONS() {
  return NextResponse.json(null, {
    status: 204,
    headers: {
      Allow: "DELETE, OPTIONS",
    },
  });
}
