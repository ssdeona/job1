import type { JobsResponse, Job } from '../types/job';

const API_URL = 'https://kata-jobs.onrender.com/api/jobs';

interface GetJobsParams {
  search: string;
  city: string;
  skills: string[];
  page: number;
}

interface JobDetailResponse {
  success: boolean;
  job: Job;
}

export const getJobs = async ({
  search,
  city,
  skills,
  page,
}: GetJobsParams): Promise<JobsResponse> => {
  const params = new URLSearchParams();

  if (search) {
    params.set('search', search);
  }

  if (city) {
    params.set('city', city);
  }

  if (skills.length > 0) {
    params.set('skills', skills.join(','));
  }

  params.set('page', String(page));

  const response = await fetch(`${API_URL}?${params.toString()}`);

  if (!response.ok) {
    throw new Error('Не удалось загрузить вакансии');
  }

  return response.json();
};

export const getJobById = async (
  id: string | number,
): Promise<Job> => {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error('Вакансия не найдена');
  }

  const data: JobDetailResponse = await response.json();
  return data.job;
};