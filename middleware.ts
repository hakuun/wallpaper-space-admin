import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
	const response = NextResponse.next();

	if (request.nextUrl.pathname.startsWith("/api")) {
		response.headers.append("Access-Control-Allow-Origin", "*");
		response.headers.append("Access-Control-Allow-Credentials", "true");
		response.headers.append("Access-Control-Allow-Methods", "*");
		response.headers.append("Access-Control-Allow-Headers", "*");
	}

	console.log(request.url);

	return response;
}

export const config = { matcher: ["/"] };
