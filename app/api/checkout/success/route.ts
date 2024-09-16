import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

//購入履歴の保存
export async function POST(request: Request) {
  const { sessionId } = await request.json();

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    const userId = session.client_reference_id;
    if (!userId) {
      throw new Error(
        "User ID (client_reference_id) is missing from the session."
      );
    }

    const bookId = session.metadata?.bookId;
    if (!bookId) {
      throw new Error("bookId is required but was not provided.");
    }

    const existsPurchase = await prisma.purchase.findFirst({
      where: {
        userId,
        bookId,
      },
    });

    console.log(existsPurchase);

    if (!existsPurchase) {
      const purchase = await prisma.purchase.create({
        data: {
          userId,
          bookId,
        },
      });
      return NextResponse.json({ purchase });
    } else {
      return NextResponse.json({ message: "既に購入済みです。" });
    }
  } catch (err) {
    return NextResponse.json(err);
  }
}
