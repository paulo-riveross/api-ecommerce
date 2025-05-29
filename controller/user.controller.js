import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export  const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
};

export const register = async (req, res) => {
  try {
     console.log("Body recibido:", req.body);
    const { name, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ mesage: "Correo ya registrado" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const token = generateToken(user);
    res.status(201).json({ user, token });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al registrar usuario", error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Correo o contraseña invalidos" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Correo o contraseña invalidos" });

    const token = generateToken(user);
    res.json({ user, token });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al iniciar sesion", error: err.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al obtener perfil", error: err.message });
  }
};
