import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
/**
 * Relative path /api/${path}
 * @param path
 * @returns
 */
export async function fetchData(path: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  const response = await fetch(`${baseUrl}/api/${path}`);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json()
}

export async function postData<PostData, PostSuccessResponse>(path: string, data: PostData): Promise<PostSuccessResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const response = await fetch(`${baseUrl}/api/${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Network response was not ok');
  }

  return response.json();
}
