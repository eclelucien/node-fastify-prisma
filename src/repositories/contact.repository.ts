import { prisma } from "../database/prisma.client";
import { Contact, ContactCreateData, ContactRepository } from "../interfaces/contact.interface";

export class ContactRepositoryPrisma implements ContactRepository {

    async create(data: ContactCreateData): Promise<any> {

        const result = await prisma.contacts.create({
            data: {
                email: data.email,
                name: data.name,
                phone: data.phone,
                userId: data.userId,
            },
        });

        return result;
    }

    async findByEmailOrPhone(email: string, phone: string): Promise<any | null> {

        const result = await prisma.contacts.findFirst({
            where: {
                OR: [
                    { email },
                    { phone },
                ],
            },
        });
        
        return result || null;
    }
}
