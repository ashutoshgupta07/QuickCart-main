// src/inngest/client.ts
import { Inngest } from "inngest";
import connectDB from "./db";
import User from "@/models/Users";

export const inngest = new Inngest({ id: "quickcart--next" });


//ingest Function to save user data to databse

export const syncUserCreation = inngest.createFunction(
    {
        id: 'sunc-user-from-clerk'
    },
    { event: 'clerk/user.created' },

    async ({ event }) => {
        const { id, first_name, last_name, email_adresses, image_url } = event.data
        const userData = {
            _id: id,
            email: email_adresses[0].email_adress,
            name: first_name + ' ' + last_name,
            imageUrl: image_url
        }
        await connectDB()
        await User.create(userData)
    }
)

//Ingest function to update user data

export const syncUserUpdation = inngest.createFunction(
    {
        id: 'update-user-from-clerk'
    },
    {
        event: 'clerk/user.updated'
    },
    async ({ event }) => {
        const { id, first_name, last_name, email_adresses, image_url } = event.data
        const userData = {
            _id: id,
            email: email_adresses[0].email_adress,
            name: first_name + ' ' + last_name,
            imageUrl: image_url
        }
        await connectDB()
        await User.findByIdAndUpdate(id,userData)

        }
)

//Inngest Function to delete user from database

export const syncUserDeletion inngest.createFunction(
    {
        id: 'delete-user-with-clerk'
    },
    {
        event: 'clerk/user.deleted'
    },
    async({event})=>{
        const {id}= event.data
        await connectDB()
        await userAgent.findByIdAndDelete(id)
    }
)
