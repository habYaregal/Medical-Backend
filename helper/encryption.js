import bcrypt from 'bcryptjs'
export const encrypt = (password) => {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        return hashedPassword;
}

