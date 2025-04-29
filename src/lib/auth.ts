import { prisma } from './prisma'
import jwt from 'jsonwebtoken'

export const isAuthenticated = async (req: Request) => {
  const token = req.headers.get('Authorization')?.replace('Bearer ', '')

  if (!token) {
    return null
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string }

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    })

    return user
  } catch (error) {
    return null
  }
}
