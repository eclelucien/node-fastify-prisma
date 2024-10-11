import { User, UserCreate, UserRepository } from '../interfaces/user.interface';
import { UserRepositoryPrisma } from '../repositories/user.repository';


class UserUseCase {

    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepositoryPrisma();
    }

    /**
     * Creates a new user if the email is not already in use.
     * 
     * @param {UserCreate} user - The user creation data including name and email.
     * @throws {Error} If a user with the provided email already exists.
     * @returns {Promise<User>} The newly created user.
     */
    async create(user: UserCreate): Promise<User> {
        const verifyIfUserExists = await this.userRepository.findByEmail(user.email);

        if (verifyIfUserExists) {
            throw new Error('User already exists');
        }

        const result = await this.userRepository.create(user);
        return result;
    }
}

export { UserUseCase };
