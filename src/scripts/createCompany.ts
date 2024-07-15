/* eslint-disable no-console */
import { PrismaClient } from '@prisma/client'
import readline from 'readline'

const prisma = new PrismaClient()

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const question = (query: string): Promise<string> => {
  return new Promise((resolve) => {
    rl.question(query, resolve)
  })
}

async function createCompany(): Promise<void> {
  try {
    const title = await question('Enter company title: ')
    const email = await question('Enter company email: ')
    const city = await question('Enter company city: ')
    const address = await question('Enter company address: ')
    const description = (await question('Enter company description: ')) || null
    const websiteUrl = (await question('Enter company website URL: ')) || null

    const newCompany = await prisma.company.create({
      data: {
        title,
        email,
        city,
        address,
        description,
        websiteUrl,
      },
    })

    console.log('Company created successfully:', newCompany)
  } catch (error) {
    console.error('Error creating company:', error)
  } finally {
    await prisma.$disconnect()
    rl.close()
  }
}

createCompany()
