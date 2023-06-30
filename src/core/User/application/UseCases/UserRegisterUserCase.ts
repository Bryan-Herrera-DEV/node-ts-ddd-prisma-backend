import { TUserRegisterUserCase } from '../../domain/IUserApplicationUserCases';

export const UserRegisterUserCase: TUserRegisterUserCase = (req, res, saveUserImp) => async () => {
    try {
        req.body.createdAt = new Date()
        req.body.updatedAt = new Date()
        await saveUserImp(req.body)
        res.status(200).json({ message: 'User created' })
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' })
    }
}