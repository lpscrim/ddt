import { NextResponse } from "next/server";
import { list, put } from "@vercel/blob";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const folder = searchParams.get("folder") ?? "";

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: "BLOB_READ_WRITE_TOKEN is not configured." },
      { status: 500 }
    );
  }

  const prefix = folder ? `photos/${folder.replace(/^\/+|\/+$/g, "")}/` : "photos/";
  const { blobs } = await list({ prefix });

  return NextResponse.json({
    blobs: blobs.map((blob) => ({
      url: blob.url,
      pathname: blob.pathname,
      size: blob.size,
      uploadedAt: blob.uploadedAt,
    })),
  });
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const folder = (formData.get("folder") as string | null) ?? "";
  const filename = (formData.get("filename") as string | null) ?? file?.name ?? "upload";

  if (!file) {
    return NextResponse.json({ error: "File required." }, { status: 400 });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: "BLOB_READ_WRITE_TOKEN is not configured." },
      { status: 500 }
    );
  }

  const safeFolder = folder.trim().replace(/^\/+|\/+$/g, "");
  const safeFilename = filename.trim() || file.name;
  const pathname = `photos/${safeFolder ? `${safeFolder}/` : ""}${safeFilename}`;

  const { url } = await put(pathname, file, {
    access: "public",
    addRandomSuffix: false,
  });

  return NextResponse.json({ url, pathname });
}
