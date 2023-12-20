using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using RentACarApp.Contracts;
using RentACarApp.Database;
using RentACarApp.Database.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace RentACarApp.Services
{
    public class LoginService : ILoginService
    {
        private readonly RentACarAppContext context;
        private readonly IConfiguration configuration;

        public LoginService(RentACarAppContext _context, IConfiguration _configuration)
        {
            context = _context;
            configuration = _configuration;
        }

        public string Login(string username)
        {
            var LoginUser = context.Users.SingleOrDefault(x => x.UserName == username);

            if (LoginUser == null)
            {
                return string.Empty;
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(configuration["Jwt:Key"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, username)
                }),
                Expires = DateTime.UtcNow.AddMinutes(30),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            string userToken = tokenHandler.WriteToken(token);
            return userToken;
        }

    }
}
