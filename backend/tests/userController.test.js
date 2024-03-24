
describe('User Controller - getUsers', () => {
    let mockSend, mockJson, req, res;
    beforeEach(() => {
      mockSend = jest.fn();
      mockJson = jest.fn();
      req = {}; // Mock req object
      res = { status: jest.fn().mockReturnThis(), json: mockJson };
    });
  
    it('should return all users', async () => {
      User.find.mockResolvedValue(['user1', 'user2']); 
      await getUsers(req, res);
      expect(mockJson).toHaveBeenCalledWith(['user1', 'user2']);
    });
  
    it('should handle errors when retrieving users', async () => {
      User.find.mockRejectedValue(new Error('Error retrieving users'));
      await getUsers(req, res);
      expect(res.status).toHaveBeenCalledWith(500); 
      expect(mockJson).toHaveBeenCalledWith({ message: 'Error retrieving users' });
    });
  
    it('should return an empty array if no users found', async () => {
      User.find.mockResolvedValue([]);
      await getUsers(req, res);
      expect(mockJson).toHaveBeenCalledWith([]);
    });
  });
  