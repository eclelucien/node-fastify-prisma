import { prisma } from "../database/prisma.client";
import { Contact, ContactCreate, ContactCreateData, ContactRepository } from "../interfaces/contact.interface";

export class ContactRepositoryPrisma implements ContactRepository {
    async create(data: ContactCreateData): Promise<Contact> {
        const result = await prisma.contacts.create({
            data: {
                email: data.email,
                name: data.name,
                phone: data.phone,
                userId: data.userId, // Keep this if it is part of your data model
                user: {
                    connect: { email: data.userEmail }, // Connect the contact to the user using the email
                },
            },
        });
        
        return result;
    }


    async findByEmailOrPhone(email: string, phone: string): Promise<Contact | null> {

        const result = await prisma.contacts.findFirst({
            where: {
                OR: [
                    {
                        email,
                    },
                    {
                        phone
                    }
                ]
            }
        });

        return result || null;
    }
}