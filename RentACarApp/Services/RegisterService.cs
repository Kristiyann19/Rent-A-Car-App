using RentACarApp.Contracts;
using RentACarApp.Database;
using RentACarApp.Database.Models;
using RentACarApp.Dtos;
using System.Net.Mail;
using System.Net;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Mvc;


namespace RentACarApp.Services
{
    public class RegisterService : IRegisterService
    {
        private readonly RentACarAppContext context;
        private readonly IConfiguration configuration;

        public RegisterService(RentACarAppContext _context, IConfiguration _configuration)
        {  
            context = _context;
            configuration = _configuration;
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
                EmailConfirmationToken = Guid.NewGuid().ToString(),
                RoleId = 1  
            };
            user.Password = PasswordHasher.ComputeHash(register.Password, user.PasswordSalt);

            context.Users.Add(user);
            context.SaveChanges();
            //SendConfirmationEmail(user.Email, user.EmailConfirmationToken);
        }


        public void SendConfirmationEmail(string recipientEmail, string token)
        {
            var smtpServer = configuration["EmailSettings:SmtpServer"];
            var smtpPort = int.Parse(configuration["EmailSettings:SmtpPort"]);
            var smtpUsername = configuration["EmailSettings:Username"];
            var smtpPassword = configuration["EmailSettings:Password"];
            var senderEmail = configuration["EmailSettings:SenderEmail"];


            var confirmationLink = $"http://localhost:4200/confirm-email?token={token}";

            var subject = "Confirm your email";
            var body = $"Please confirm your email by clicking the following link: {confirmationLink}";

            var mailMessage = new MailMessage(senderEmail, recipientEmail, subject, body);
            mailMessage.IsBodyHtml = true;

            using (var smtpClient = new SmtpClient(smtpServer, smtpPort))
            {
                smtpClient.UseDefaultCredentials = false;
                smtpClient.Credentials = new NetworkCredential(smtpUsername, smtpPassword);
                smtpClient.EnableSsl = true;

                smtpClient.Send(mailMessage);
            }
        }

        public void ConfirmEmailAddress(string token)
        {
            var user = context.Users.SingleOrDefault(u => u.EmailConfirmationToken == token);

            if (user != null && !user.IsEmailConfirmed)
            {

                user.EmailConfirmationToken = null; // Mark the token as used
                user.IsEmailConfirmed = true; // Add a property to your User model if needed

                context.SaveChanges();

            }


        }


    }
}


