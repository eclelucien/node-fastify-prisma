import { prisma } from '../database/prisma.client';
import {
    Contact,
    ContactCreateData,
    ContactRepository,
} from '../interfaces/contact.interface';

/**
 * Prisma implementation of the ContactRepository interface.
 * This class provides methods for contact-related database operations.
 */
class ContactsRepositoryPrisma implements ContactRepository {

    /**
     * Creates a new contact in the database.
     * 
     * @param {ContactCreateData} data - The contact data, including email, name, phone, and userId.
     * @returns {Promise<Contact>} The newly created contact.
     */
    async create(data: ContactCreateData): Promise<Contact> {
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

    /**
     * Finds a contact by email or phone number.
     * 
     * @param {string} email - The email of the contact.
     * @param {string} phone - The phone number of the contact.
     * @returns {Promise<Contact | null>} The contact object if found, or null if no match exists.
     */
    async findByEmailOrPhone(
        email: string,
        phone: string,
    ): Promise<Contact | null> {
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

    /**
     * Retrieves all contacts for a specific user by userId.
     * 
     * @param {string} userId - The ID of the user.
     * @returns {Promise<Contact[]>} A list of all contacts associated with the user.
     */
    async findAllContacts(userId: string): Promise<Contact[]> {
        const result = await prisma.contacts.findMany({
            where: {
                userId,
            },
        });

        return result;
    }

    /**
     * Updates an existing contact by ID.
     * 
     * @param {Contact} param0 - The contact data to update, including id, name, email, and phone.
     * @returns {Promise<Contact>} The updated contact.
     */
    async updateContact({ id, name, email, phone }: Contact): Promise<Contact> {
        const result = await prisma.contacts.update({
            where: {
                id,
            },
            data: {
                email,
                name,
                phone,
            },
        });

        return result;
    }

    /**
     * Deletes a contact by ID.
     * 
     * @param {string} id - The ID of the contact to delete.
     * @returns {Promise<boolean>} True if the deletion was successful, false otherwise.
     */
    async delete(id: string): Promise<boolean> {
        const result = await prisma.contacts.delete({
            where: {
                id,
            },
        });

        return result ? true : false;
    }
}

export { ContactsRepositoryPrisma };
