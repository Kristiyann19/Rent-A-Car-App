using System.Net.Mail;
using System.Net;
using RentACarApp.Database;
using RentACarApp.Contracts;

namespace RentACarApp.Services
{
    public class EmailService : IEmailService
    {
        private readonly RentACarAppContext context;
        private readonly IConfiguration configuration;

        public EmailService(RentACarAppContext _context, IConfiguration _configuration)
        {
            context = _context;
            configuration = _configuration;
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

                user.EmailConfirmationToken = null;
                user.IsEmailConfirmed = true;

                context.SaveChanges();

            }
        }
    }
}
