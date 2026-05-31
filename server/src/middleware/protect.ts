import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// 1. We create a TypeScript interface to extend Express's Request.
// This tells TypeScript that it's safe for us to attach a 'user' property to 'req'.
interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
  };
}

export const protect = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  let token;

  // 2. Check if the Authorization  header exists and starts with "Bearer"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Split the string by the space: ["Bearer", "eyJhbGci..."]
      // Grab index 1, which is the actual raw token string
      token = req.headers.authorization.split(" ")[1];

      // 3. Verify the token using your secret key
      // If someone altered the token, this line throws an error and jumps to the catch block
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        id: string;
      };

      // 4. Attach the user data to the request object
      // Now, any controller this request passes to can access 'req.user.id'
      req.user = { id: decoded.id };

      // 5. Let the request continue forward to its destination controller!
      return next();
    } catch (error) {
      // If verification fails (token expired, tampered with, etc.)
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  // 6. If no token was found in the headers at all
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token found" });
  }
};
