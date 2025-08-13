import { type User, type InsertUser, type Service, type InsertService, type Appointment, type InsertAppointment, type ContactMessage, type InsertContactMessage } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllServices(): Promise<Service[]>;
  getService(id: string): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  
  getAllAppointments(): Promise<Appointment[]>;
  getAppointment(id: string): Promise<Appointment | undefined>;
  getAppointmentsByDate(date: string): Promise<Appointment[]>;
  createAppointment(appointment: InsertAppointment): Promise<Appointment>;
  updateAppointmentStatus(id: string, status: string): Promise<Appointment | undefined>;
  
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getAllContactMessages(): Promise<ContactMessage[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private services: Map<string, Service>;
  private appointments: Map<string, Appointment>;
  private contactMessages: Map<string, ContactMessage>;

  constructor() {
    this.users = new Map();
    this.services = new Map();
    this.appointments = new Map();
    this.contactMessages = new Map();
    
    // Initialize with default services
    this.initializeServices();
  }

  private initializeServices() {
    const defaultServices: InsertService[] = [
      // Relaxation Category
      {
        name: "Massage Relaxant",
        description: "Un moment de pure détente pour relâcher les tensions du quotidien. Techniques douces et huiles essentielles apaisantes.",
        duration: 60,
        price: 75,
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        category: "relaxation"
      },
      {
        name: "Massage Aromathérapie",
        description: "Les bienfaits des huiles essentielles au service de votre bien-être. Un voyage sensoriel pour corps et esprit.",
        duration: 75,
        price: 90,
        image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        category: "relaxation"
      },
      {
        name: "Massage aux Pierres Chaudes",
        description: "L'alliance parfaite entre chaleur et massage. Les pierres chaudes détendent profondément muscles et esprit.",
        duration: 90,
        price: 110,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        category: "relaxation"
      },
      // Therapeutic Category
      {
        name: "Massage Thérapeutique",
        description: "Ciblé sur les zones de tension chroniques. Techniques de deep tissue pour soulager durablement douleurs et contractures.",
        duration: 75,
        price: 95,
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        category: "therapeutic"
      },
      {
        name: "Massage Sportif",
        description: "Spécialisé pour les athlètes et sportifs. Optimise la récupération musculaire et prévient les blessures.",
        duration: 60,
        price: 85,
        image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        category: "therapeutic"
      },
      {
        name: "Massage Deep Tissue",
        description: "Pression profonde pour traiter les tensions musculaires chroniques et améliorer la mobilité.",
        duration: 90,
        price: 105,
        image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        category: "therapeutic"
      },
      // Specialty Category
      {
        name: "Massage Prénatal",
        description: "Spécialement conçu pour les futures mamans. Soulage les maux de grossesse dans le respect total de votre état.",
        duration: 60,
        price: 80,
        image: "https://images.unsplash.com/photo-1583416750470-965b2707b355?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        category: "specialty"
      },
      {
        name: "Réflexologie Plantaire",
        description: "Stimulation des points réflexes du pied pour harmoniser l'ensemble de l'organisme. Technique ancestrale aux bienfaits prouvés.",
        duration: 45,
        price: 65,
        image: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        category: "specialty"
      },
      {
        name: "Massage Ayurvédique",
        description: "Massage traditionnel indien aux huiles chaudes pour équilibrer corps, esprit et âme selon les doshas.",
        duration: 90,
        price: 115,
        image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        category: "specialty"
      }
    ];

    defaultServices.forEach(service => {
      const id = randomUUID();
      const serviceWithId: Service = { ...service, id };
      this.services.set(id, serviceWithId);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllServices(): Promise<Service[]> {
    return Array.from(this.services.values());
  }

  async getService(id: string): Promise<Service | undefined> {
    return this.services.get(id);
  }

  async createService(insertService: InsertService): Promise<Service> {
    const id = randomUUID();
    const service: Service = { ...insertService, id };
    this.services.set(id, service);
    return service;
  }

  async getAllAppointments(): Promise<Appointment[]> {
    return Array.from(this.appointments.values());
  }

  async getAppointment(id: string): Promise<Appointment | undefined> {
    return this.appointments.get(id);
  }

  async getAppointmentsByDate(date: string): Promise<Appointment[]> {
    return Array.from(this.appointments.values()).filter(
      appointment => appointment.date === date && appointment.status === "confirmed"
    );
  }

  async createAppointment(insertAppointment: InsertAppointment): Promise<Appointment> {
    const id = randomUUID();
    const appointment: Appointment = { 
      ...insertAppointment, 
      id, 
      status: "confirmed",
      createdAt: new Date(),
      comments: insertAppointment.comments || null
    };
    this.appointments.set(id, appointment);
    return appointment;
  }

  async updateAppointmentStatus(id: string, status: string): Promise<Appointment | undefined> {
    const appointment = this.appointments.get(id);
    if (appointment) {
      const updatedAppointment = { ...appointment, status };
      this.appointments.set(id, updatedAppointment);
      return updatedAppointment;
    }
    return undefined;
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = randomUUID();
    const message: ContactMessage = { 
      ...insertMessage, 
      id, 
      createdAt: new Date()
    };
    this.contactMessages.set(id, message);
    return message;
  }

  async getAllContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }
}

export const storage = new MemStorage();
