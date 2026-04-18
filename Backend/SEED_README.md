# Database Seeding & Testing Guide

## Password Hashing

This project uses **bcryptjs** for secure password hashing. The User model automatically hashes passwords before saving them to the database.

### Features:
- ✅ Automatic password hashing on user creation
- ✅ Password comparison method for authentication
- ✅ Prevents re-hashing on non-password updates
- ✅ Uses bcrypt with salt rounds of 10

## Running the Seed Script

The seed script populates your database with sample data including:
- 1 Admin user
- Complete portfolio data (profile, projects, skills, experience, education)

### To seed the database:

```bash
cd Backend
npm run seed
```

### Default Admin Credentials:
- **Username:** admin
- **Email:** admin@portfolio.com
- **Password:** admin123456

⚠️ **Important:** Change these credentials in production!

## Testing Password Hashing

To verify that password hashing is working correctly:

```bash
cd Backend
node test-password-hash.js
```

This test will:
1. Create a test user with a plain password
2. Verify the password is hashed in the database
3. Test password comparison (correct vs wrong password)
4. Verify password is not re-hashed on non-password updates
5. Test password update functionality
6. Clean up test data

## Sample Data Included

### Portfolio Data:
- **Profile:** Name, title, bio, contact info
- **About:** Description and highlights
- **Skills:** 3 categories (Frontend, Backend, Tools)
- **Tech Stack:** 8 technologies with icons
- **Education:** 2 educational entries
- **Experience:** 2 work experiences
- **Projects:** 3 projects (2 featured)
- **Contact:** Email, phone, social links

## Customizing Sample Data

Edit `Backend/seed.js` to customize the sample data:

```javascript
const sampleUser = {
  username: 'your_username',
  email: 'your_email@example.com',
  password: 'your_password',
  role: 'admin'
};

const samplePortfolio = {
  // Customize your portfolio data here
};
```

## Database Connection

Make sure your `.env` file has the correct MongoDB connection string:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

## Troubleshooting

### Connection Issues:
- Verify your MongoDB URI is correct
- Check if your IP is whitelisted in MongoDB Atlas
- Ensure your database user has proper permissions

### Seed Script Fails:
- Make sure all dependencies are installed: `npm install`
- Check if MongoDB is running
- Verify your `.env` file exists and has correct values

## Security Notes

1. **Never commit** `.env` file to version control
2. **Change default credentials** before deploying to production
3. **Use strong passwords** for admin accounts
4. **Keep JWT_SECRET** secure and random
5. **Use HTTPS** in production

## Additional Scripts

Add to `package.json`:

```json
"scripts": {
  "seed": "node seed.js",
  "test:password": "node test-password-hash.js",
  "test:db": "node test-db-connection.js"
}
```
