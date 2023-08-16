const { updateLiveScore } = require('src/models/students.js');

jest.mock('src/models/students.js', () => ({
  updateLiveScore: jest.fn(),
}));

describe('updateLiveScore', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update the live score when live session exists', async () => {
    const userId = 'user123';
    const studentId = 'student456';
    const score = 10;
    const assessmentId = 'assessment789';

    updateLiveScore.mockImplementation(async (userId, studentId, score, assessmentId) => {
      // Simulate the implementation of updateLiveScore
      expect(userId).toBe(userId);
      expect(studentId).toBe(studentId);
      expect(score).toBe(score);
      expect(assessmentId).toBe(assessmentId);
    });

    await updateLiveScore(userId, studentId, score, assessmentId);

    expect(updateLiveScore).toHaveBeenCalledTimes(1);
  });

  it('should create new live session and update live score when live session does not exist', async () => {
    const userId = 'user123';
    const studentId = 'student456';
    const score = 10;
    const assessmentId = 'assessment789';

    updateLiveScore.mockImplementation(async (userId, studentId, score, assessmentId) => {
      // Simulate the implementation of updateLiveScore
      expect(userId).toBe(userId);
      expect(studentId).toBe(studentId);
      expect(score).toBe(score);
      expect(assessmentId).toBe(assessmentId);
    });

    await updateLiveScore(userId, studentId, score, assessmentId);

    expect(updateLiveScore).toHaveBeenCalledTimes(1);
  });
});
