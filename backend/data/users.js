import bcrypt from 'bcryptjs';
const users = [
  {
    firstname: 'Admin',
    lastname:'manager',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    orgnizationname:"forever",
    isAdmin: true,
    
  },
  {
    firstname: 'John',
    lastname:'Doe',
    email: 'john@example.com',
    password: bcrypt.hashSync('123456', 10),
    orgnizationname:"forever",
    isAdmin: false,
  },
 
];

export default users;
