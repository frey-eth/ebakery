import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: Request, context: any) {
  const { searchParams } = new URL(req.url);
  const addresses = searchParams.getAll("addresses[]");
  if (!addresses || addresses.length === 0) {
    return NextResponse.json(
      { error: "At least one address is required" },
      { status: 400 }
    );
  }

  try {
    const addressParams = addresses
      .map((address, index) => `addresses[${index}]=${address}`)
      .join("&");

    const apiUrl = `https://deep-index.moralis.io/api/v2.2/erc20/metadata?chain=eth&${addressParams}`;
    const apiResponse = await axios.get(apiUrl, {
      headers: {
        Accept: "application/json",
        "X-API-Key":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjE5ZTJlOTI3LTRiMjctNDM0Yy04ZDZhLWNiNzgxNzc4MGE2YSIsIm9yZ0lkIjoiMzg3MTY4IiwidXNlcklkIjoiMzk3ODEzIiwidHlwZUlkIjoiYWM2MDE2NGUtY2VhNy00NjRlLTllY2MtMzNiY2I2NGI4YjU5IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MTI2Njg0OTQsImV4cCI6NDg2ODQyODQ5NH0.pfvSJPSAv7q6ny3V0dT8i9Lqer6lclLcRXeDN23l_Mc",
      },
    });

    return NextResponse.json(apiResponse.data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
