import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Book from "@/models/Book";

//Handel GET request (fetch all books)
export async function GET() {
    try{
        await connectDB();
        const Books = await Book.find({});
        return NextResponse.json(Books,{status:200});

    }
    catch(error){
        return NextResponse.json({error:"failed to fetch books"},{status:500});
    }
}

//Handel POST request (Add a new book)
export async function POST(req) {
    try{
        await connectDB();
        const{title,author,price,condition,seller} = await req.json();
        if(!title||!author||!price||!condition||!seller){
            return NextResponse.json({error:"All fields are required"},{status:400});
        }
        const newBook = await Book.create({title,author,price,condition,seller});
        return NextResponse.json(newBook,{status:201});
    }
    catch(error){
        return NextResponse.json({error:"Failed to add Book"},{status:500});
    }
}