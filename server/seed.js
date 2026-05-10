import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import connectDB from './config/db.js'
import User from './models/User.js'
import Service from './models/Service.js'
import Project from './models/Project.js'
import Order from './models/Order.js'
import Review from './models/Review.js'

dotenv.config()

async function seed() {
  await connectDB()

  await Promise.all([
    User.deleteMany(),
    Service.deleteMany(),
    Project.deleteMany(),
    Order.deleteMany(),
    Review.deleteMany(),
  ])

  const password = await bcrypt.hash('admin123', 10)
  const admin = await User.create({
    name: 'Admin',
    email: 'admin@bani.kz',
    phone: '+7 700 000 00 00',
    role: 'admin',
    password,
  })

  const customer = await User.create({
    name: 'Client',
    email: 'client@bani.kz',
    phone: '+7 701 111 11 11',
    password,
  })

  const services = await Service.insertMany([
    {
      title: 'Проектирование бани',
      description: 'Индивидуальный проект с планировкой, сметой и подбором материалов.',
      priceFrom: 150000,
      durationDays: 7,
    },
    {
      title: 'Строительство под ключ',
      description: 'Полный цикл строительства: фундамент, коробка, отделка и инженерия.',
      priceFrom: 3500000,
      durationDays: 45,
    },
  ])

  const project = await Project.create({
    title: 'Семейная баня из бруса',
    category: 'Бани из бруса',
    area: 42,
    budget: 4800000,
    imageUrl: '/images/portfolio/portfolio/portfolio-01.jpg',
    services: services.map((service) => service._id),
  })

  await Order.create({
    customer: customer._id,
    services: services.map((service) => service._id),
    project: project._id,
    address: 'Алматы, пригородный участок',
    totalPrice: 4800000,
    status: 'new',
  })

  await Review.create({
    author: customer._id,
    project: project._id,
    rating: 5,
    text: 'Команда помогла быстро выбрать проект и понятно объяснила этапы строительства.',
  })

  console.log('Seed completed')
  console.log('Admin login: admin@bani.kz / admin123')
  await mongoose.disconnect()
}

seed().catch(async (error) => {
  console.error(error)
  await mongoose.disconnect()
  process.exit(1)
})
