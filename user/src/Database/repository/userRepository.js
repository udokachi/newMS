import UserAttribute from '../model/userModel.js';

class UserRepository {
    async create(user) {
        const createdUser = await UserAttribute.create(user);
        return createdUser;
    }

    async findById(id) {
        const user = await UserAttribute.findById(id);
        return user;
    }

    async findAll() {
        const user = await UserAttribute.find({});
        return user;
    }

    async update(id, updates) {
        const updatedUser = await UserAttribute.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true,
        });
        return updatedUser;
    }

    async delete(id) {
        const deletedUser = await UserAttribute.findByIdAndDelete(id);
        return deletedUser;
    }
}

export default new UserRepository();
