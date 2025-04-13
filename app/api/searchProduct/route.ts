import { NextResponse} from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        // const cookie = req.headers.get("cookie");
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/searchProducts?search=${body.search}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // 'Cookie':cookie as string,
            },
            
        });
        if (!response.ok) {
            console.log(response.statusText,"server error message")
            throw new Error(`Error: ${response.statusText}`);
        }
        const Response = await response.json();
        return NextResponse.json(Response);
    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Something went wrong' }, { status: 500 });
    }
}
