﻿using RentACarApp.Contracts;
using RentACarApp.Database;
using RentACarApp.Database.Models;
using RentACarApp.Dtos.UserDtos;

namespace RentACarApp.Services
{
    public class RegisterService : IRegisterService
    {
        private readonly RentACarAppContext context;
        private readonly IEmailService emailService;

        public RegisterService(RentACarAppContext _context, IEmailService _emailService)
        {  
            context = _context;
            emailService = _emailService;
        }

        public bool CheckUserNameAvailability(string userName) 
            => !context.Users.Any(u => u.UserName == userName);

        public bool CheckEmailAvailability(string email)
            => !context.Users.Any(u => u.Email == email);

        public void Register(RegisterDto register)
        {
            var isUsernameAvailable = CheckUserNameAvailability(register.UserName);
            var isEmailAvailable = CheckEmailAvailability(register.Email);
            

            if (!isUsernameAvailable)
            {
                throw new Exception("UserName is already used");
            }

            if (!isEmailAvailable)
            {
                throw new Exception("Email is already used");
            }         

            var user = new User
            {
                UserName = register.UserName,
                NormalizedUserName = register.UserName.ToLower(),
                Email = register.Email,
                NormalizedEmail = register.Email.ToLower(),
                PasswordSalt = PasswordHasher.GenerateSalt(),
                EmailConfirmationToken = Guid.NewGuid().ToString(),
                RoleId = 1,   
            };
            user.Password = PasswordHasher.ComputeHash(register.Password, user.PasswordSalt);

            
            context.Users.Add(user);
            context.SaveChanges();
            emailService.SendConfirmationEmail(user.Email, user.EmailConfirmationToken);
        }

    }
}


