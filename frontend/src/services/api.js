import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Question APIs
export const getQuestions = async (limit = 10) => {
  try {
    const response = await api.get(`/questions?limit=${limit}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const verifyAnswers = async (answers) => {
  try {
    const response = await api.post('/questions/verify', { answers });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Score APIs
export const submitScore = async (scoreData) => {
  try {
    const response = await api.post('/scores', scoreData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getLeaderboard = async (limit = 10) => {
  try {
    const response = await api.get(`/scores/leaderboard?limit=${limit}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getUserBestScore = async (playerName) => {
  try {
    const response = await api.get(`/scores/user/${playerName}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default api;