// server/src/middleware/validate.ts - CORECTAT

import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";

export const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validăm request-ul folosind schema primită
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      // Dacă validarea trece, mergem la următorul pas (controller-ul rutei)
      return next();
    } catch (error) {
      // Dacă validarea eșuează, Zod aruncă o eroare pe care o prindem aici
      if (error instanceof ZodError) {
        // AM ȘTERS `return` DE AICI
        // Doar trimitem răspunsul de eroare și funcția se încheie.
        res.status(400).json(error.errors);
      } else {
        // Tratăm și alte erori posibile
        res.status(500).json({ message: "Internal server error" });
      }
    }
  };
