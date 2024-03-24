const mongoose = require('mongoose');
const User = require('../models/userModel');

describe('User Model', () => {
  it('should hash the password before saving', async () => {
    const user = new User({ name: 'Test', email: 'test@example.com', password: 'password123' });
    await user.save();
    expect(user.password).not.toBe('password123');
  });

  it('should validate email properly', async () => {
    const user = new User({ name: 'Test', email: 'not-an-email', password: 'password123' });
    let err;
    try {
      await user.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.email).toBeDefined();
  });
});
