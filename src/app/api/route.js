import { NextResponse } from "next/server";

export async function GET(req, res) {
    // console.log(JSON.parse(req.body));
    console.log("asd");
    return new Response("yo yo world")
    // return res.status(200).json({ text: 'Hello' })
}
export async function POST(req, res) {
    // const dd = await req.json();
    // // const ress = await fetch("https://localhost:7155/api/TranslateApi");
    // await fetch('https://localhost:7155/api/TranslateApi', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(dd), // Assuming `inputs` is your state with the new data
    // });
    // // console.log(JSON.parse(req.body));
    // console.log("asd");
    // console.log(req.body);
    // return NextResponse.json(dd)
    return res.status(200).json({ text: 'Hello' })
}
