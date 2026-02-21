import { mapZodErrors } from "../utils/zodErrorMapper.js";

export const validateSchema = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    return next();
  } catch (error) {

    if (Array.isArray(error?.issues)) {
      const errors = mapZodErrors(error.issues);
      return res.status(400).json({ errors });
    }

    console.error("Error inesperado:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
