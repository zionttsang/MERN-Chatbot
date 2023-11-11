import jwt from 'jsonwebtoken'

// generate token;
export const createToken = (id: string, email: string, _expire: string) => {
    const token = jwt.sign({ id, email }, process.env.JWT_SECRET, { expiresIn: _expire })
    return token
}