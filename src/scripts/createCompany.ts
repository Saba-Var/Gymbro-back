/* eslint-disable no-console */
import { Password } from 'utils/password'
import { prisma } from 'config/prisma'
import readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const question = (query: string): Promise<string> => {
  return new Promise((resolve) => {
    rl.question(query, resolve)
  })
}

export const createCompany = async (): Promise<void> => {
  try {
    const title = await question('Enter company title: ')
    const email = await question('Enter company email: ')
    const city = await question('Enter company city: ')
    const address = await question('Enter company address: ')
    const description = (await question('Enter company description: ')) || null
    const websiteUrl = (await question('Enter company website URL: ')) || null
    const password = await question('Enter password for the admin: ')

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

    const hashedPassword = await Password.toHash(password)

    const adminOfTheCompany = await prisma.staff.create({
      data: {
        companyId: newCompany.id,
        email,
        firstName: 'Admin',
        lastName: 'Admin',
        isAdmin: true,
        password: hashedPassword,
        privateNumber: title + ' admin',
        salaryType: 'COMBINED',
      },
    })

    console.log('Company created successfully:', newCompany)
    console.log('Admin created successfully:', adminOfTheCompany)
  } catch (error) {
    console.error('Error creating company:', error)
  } finally {
    await prisma.$disconnect()
    rl.close()
  }
}

createCompany()
