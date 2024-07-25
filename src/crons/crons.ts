import { updateCompanyStatus } from './update-company-status'

export const initCronJobs = () => {
  updateCompanyStatus()
}
