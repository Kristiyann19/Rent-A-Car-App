using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using RentACarApp.Contracts;
using RentACarApp.Database;
using RentACarApp.Database.Models;
using RentACarApp.Dtos;
using System.Security.Cryptography;
using System.Text;

namespace RentACarApp.Services
{
    public class RegisterService : IRegisterService
    {
        private readonly RentACarAppContext context;

        public RegisterService(RentACarAppContext _context)
        {  
            context = _context;
        }


        public void Register(RegisterDto register)
        {
            var user = new User
            {
                UserName = register.UserName,
                NormalizedUserName = register.UserName.ToLower(),
                Email = register.Email,
                NormalizedEmail = register.Email.ToLower(),
                PasswordSalt = PasswordHasher.GenerateSalt(),
            };
            user.Password = PasswordHasher.ComputeHash(register.Password, user.PasswordSalt);

            context.Users.Add(user);
            context.SaveChanges();        
        }
    }
}
