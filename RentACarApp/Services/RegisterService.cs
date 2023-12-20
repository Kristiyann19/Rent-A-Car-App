using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using RentACarApp.Contracts;
using RentACarApp.Database;
using RentACarApp.Database.Models;
using RentACarApp.Dtos;
using System.Security.Cryptography;

namespace RentACarApp.Services
{
    public class RegisterService : IRegisterService
    {
        private readonly RentACarAppContext context;
        public RegisterService(RentACarAppContext _context)
        {  
            context = _context;
        }

        public string HashPassword(string password)
        {
            byte[] salt = RandomNumberGenerator.GetBytes(128 / 8);
            return  Convert.ToBase64String(KeyDerivation.Pbkdf2(
            password: password!,
            salt: salt,
            prf: KeyDerivationPrf.HMACSHA256,
            iterationCount: 100000,
            numBytesRequested: 256 / 8));

        }

        public void Register(RegisterDto register)
        {

            string hashedPassword = HashPassword(register.Password);

            var user = new User
            {
                UserName = register.UserName,
                Email = register.Email,
                Password = hashedPassword
            };

            context.Users.Add(user);
            context.SaveChanges();        
        }
    }
}
