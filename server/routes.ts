import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAppointmentSchema, insertContactMessageSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all services
  app.get("/api/services", async (req, res) => {
    try {
      const services = await storage.getAllServices();
      res.json(services);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch services" });
    }
  });

  // Get available time slots for a specific date
  app.get("/api/appointments/availability/:date", async (req, res) => {
    try {
      const { date } = req.params;
      const appointments = await storage.getAppointmentsByDate(date);
      
      // Define all possible time slots
      const allTimeSlots = [
        "09:00", "10:30", "12:00", "13:30", "15:00", "16:30", "18:00"
      ];
      
      // Filter out booked slots
      const bookedSlots = appointments.map(apt => apt.time);
      const availableSlots = allTimeSlots.filter(slot => !bookedSlots.includes(slot));
      
      res.json({ availableSlots });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch availability" });
    }
  });

  // Create new appointment
  app.post("/api/appointments", async (req, res) => {
    try {
      const validatedData = insertAppointmentSchema.parse(req.body);
      
      // Check if the time slot is still available
      const existingAppointments = await storage.getAppointmentsByDate(validatedData.date);
      const isSlotTaken = existingAppointments.some(apt => 
        apt.time === validatedData.time && apt.status === "confirmed"
      );
      
      if (isSlotTaken) {
        return res.status(400).json({ message: "Ce créneau n'est plus disponible" });
      }
      
      const appointment = await storage.createAppointment(validatedData);
      
      // TODO: Send email confirmation here
      // This would integrate with Nodemailer or another email service
      
      res.status(201).json(appointment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Données invalides", errors: error.errors });
      } else {
        res.status(500).json({ message: "Erreur lors de la création du rendez-vous" });
      }
    }
  });

  // Create contact message
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      
      // TODO: Send email notification here
      // This would integrate with Nodemailer to notify the therapist
      
      res.status(201).json(message);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Données invalides", errors: error.errors });
      } else {
        res.status(500).json({ message: "Erreur lors de l'envoi du message" });
      }
    }
  });

  // Get all appointments (for admin purposes)
  app.get("/api/appointments", async (req, res) => {
    try {
      const appointments = await storage.getAllAppointments();
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch appointments" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
