import {
    Contact,
    ContactCreate,
    ContactRepository,
} from '../interfaces/contact.interface';
import { UserRepository } from '../interfaces/user.interface';
import { ContactsRepositoryPrisma } from '../repositories/contact.repository';
import { UserRepositoryPrisma } from '../repositories/user.repository';

/**
 * Use case class for managing contact-related business logic.
 */
class ContactUseCase {

    private contactRepository: ContactRepository;
    private userRepository: UserRepository;

    /**
     * Initializes the ContactUseCase with contact and user repository instances.
     * The default repositories are ContactsRepositoryPrisma and UserRepositoryPrisma.
     */
    constructor() {
        this.contactRepository = new ContactsRepositoryPrisma();
        this.userRepository = new UserRepositoryPrisma();
    }

    /**
     * Creates a new contact for the user.
     * 
     * @param {ContactCreate} param0 - The contact creation data including email, name, phone, and userEmail.
     * @throws {Error} If the user is not found or the contact already exists.
     * @returns {Promise<Contact>} The newly created contact.
     */
    async create({ email, name, phone, userEmail }: ContactCreate) {

        const user = await this.userRepository.findByEmail(userEmail);

        if (!user) {
            throw new Error('User not found');
        }

        const verifyIfExistsContact =
            await this.contactRepository.findByEmailOrPhone(email, phone);

        if (verifyIfExistsContact) {
            throw new Error('Contact already exists');
        }

        const contact = await this.contactRepository.create({
            email,
            name,
            phone,
            userId: user.id,
        });

        return contact;
    }

    /**
     * Lists all contacts for the specified user.
     * 
     * @param {string} userEmail - The email of the user whose contacts should be retrieved.
     * @throws {Error} If the user is not found.
     * @returns {Promise<Contact[]>} A list of all contacts associated with the user.
     */
    async listAllContacts(userEmail: string) {

        const user = await this.userRepository.findByEmail(userEmail);

        if (!user) {
            throw new Error('User not found');
        }

        const contacts = await this.contactRepository.findAllContacts(user.id);

        return contacts;
    }

    /**
     * Updates an existing contact by ID.
     * 
     * @param {Contact} param0 - The contact data to update, including id, name, email, and phone.
     * @returns {Promise<Contact>} The updated contact.
     */
    async updateContact({ id, name, email, phone }: Contact) {

        const data = await this.contactRepository.updateContact({
            id,
            name,
            email,
            phone,
        });

        return data;
    }

    /**
     * Deletes a contact by ID.
     * 
     * @param {string} id - The ID of the contact to delete.
     * @returns {Promise<string>} A message indicating whether the deletion was successful.
     */
    async delete(id: string) {

        const data = await this.contactRepository.delete(id);

        return data;
    }
}

export { ContactUseCase };
