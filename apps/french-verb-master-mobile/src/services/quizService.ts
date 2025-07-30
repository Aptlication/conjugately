import axios from 'axios';

// Configure axios to use the web app's API endpoint
const API_BASE_URL = 'http://localhost:5000'; // Change this to your actual API URL

export interface QuizRequest {
  verb: string;
  timeFrame: string;
  tenseType: string;
  difficulty: string;
}

export interface QuizAnswer {
  text: string;
  rationale: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  question: string;
  answers: QuizAnswer[];
}

export interface Quiz {
  id: number;
  verb: string;
  tense: string;
  questions: QuizQuestion[];
}

export const quizService = {
  async generateQuiz(request: QuizRequest): Promise<Quiz> {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/get-quiz`, request);
      return response.data.quiz;
    } catch (error) {
      console.error('Error generating quiz:', error);
      throw new Error('Failed to generate quiz');
    }
  },
};