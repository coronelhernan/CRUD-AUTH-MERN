import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import { createTokenAccess } from '../libs/jwt.js'
import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js'

const isProduction = process.env.NODE_ENV === "production";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
	// Buscamos un usuario por su email
	const userFound = await User.findOne({email})

	// Si el email ya esta registrado, retorna en la UI un mensaje al usuario
	if (userFound) return res.status(400).json(["The email is already in use"]);

	// Encriptando el password
	const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });

		const userSaved = await newUser.save();

		const token = await createTokenAccess({ id: userSaved._id})
		
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
    });

		res.json({
		id: userSaved._id,
		username: userSaved.username,
		email: userSaved.email,
		createdAt: userSaved.createdAt,
		updatedAt: userSaved.updatedAt,
		});
  } catch (error) {
		res.status(500).json({message: error.message});
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userSaved = await User.findOne({ email });
	
    if (!userSaved) {
      return res.status(400).json({
  errors: [{ message: "Invalid credentials" }]
});
    }

    // Comparacion de contrasea ingresada con la contraseña almacenada en la BD
    const isMatch = await bcrypt.compare(password, userSaved.password); 
    if (!isMatch) {
      return res.status(400).json({
  errors: [{ message: "Invalid credentials" }]
});
    }

    const token = await createTokenAccess({ id: userSaved._id });

    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
    });

    return res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });

  } catch (error) {
    return res.status(500).json({
  errors: [{ message: error.message }]
});
  }
};

export const logout = (req, res) => {
	res.cookie("token", "", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    expires: new Date(0),
  });

	return res.sendStatus(200);
}

export const profile = async (req, res) => {
	// Buscamos el usuario por Id en la base de datos
	const userSaved = await User.findById(req.user.id);

	if(!userSaved) return res.status(400).json({message: "User not found"});

	return res.json({
		id: userSaved._id,
		username: userSaved.username,
		email: userSaved.email,
		createdAt: userSaved.createdAt,
		updatedAt: userSaved.updatedAt,
	})
}

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: "Unauthorized" })

  // Verificamos con jwt, el token que nos estamos recibiendo
  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json({ message: "Unauthorized" })

    const userFound = await User.findById(user.id)
    if (!userFound) return res.status(401).json({ message: "Unauthorized" })

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  });
}