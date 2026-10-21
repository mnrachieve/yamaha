export const revalidate = 3600;

export async function GET() {
  const response = await fetch("https://shop.yamaha-motor-india.com/products.json?limit=250", {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    return Response.json({ products: [] }, { status: 502 });
  }

  return Response.json(await response.json());
}
