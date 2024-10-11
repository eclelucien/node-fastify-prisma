import { User, UserCreate, UserRepository } from '../interfaces/user.interface';
import { UserRepositoryPrisma } from '../repositories/user.repository';

/**
 * Use case class for handling user-related business logic.
 */
class UserUseCase {

    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepositoryPrisma();
    }

    /**
     * Creates a new user if the email is not already in use.
     * 
     * @param {UserCreate} param0 - The user creation data including name and email.
     * @throws {Error} If a user with the provided email already exists.
     * @returns {Promise<User>} The newly created user.
     */
    async create({ name, email }: UserCreate): Promise<User> {
        const verifyIfUserExists = await this.userRepository.findByEmail(email);

        if (verifyIfUserExists) {
            throw new Error('User already exists');
        }

        const result = await this.userRepository.create({ email, name });
        return result;
    }
}

export { UserUseCase };
