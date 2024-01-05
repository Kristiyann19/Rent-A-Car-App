using Microsoft.IdentityModel.Tokens;
using RentACarApp.Contracts;
using RentACarApp.Database;
using RentACarApp.Dtos;
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
        //public string HashPassword(string password)
        //{
        //    byte[] salt = RandomNumberGenerator.GetBytes(128 / 8);
        //    return Convert.ToBase64String(KeyDerivation.Pbkdf2(
        //    password: password!,
        //    salt: salt,
        //    prf: KeyDerivationPrf.HMACSHA256,
        //    iterationCount: 100000,
        //    numBytesRequested: 256 / 8));

        //}


        public string Login(LoginDto login)
        {
            //var passwordHash = HashPassword(login.Password);
            var LoginUser = context.Users.SingleOrDefault(x => x.UserName == login.UserName );

            if (LoginUser == null)
            {
                return string.Empty;
            }

            var passwordHash = PasswordHasher.ComputeHash(login.Password, LoginUser.PasswordSalt);

            if (LoginUser.Password != passwordHash)
            {
                throw new Exception("Username or password did not match.");
            }
                

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(configuration["Jwt:Key"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Issuer = "http://localhost:19999",
				Audience = "http://localhost:19999",
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, login.UserName)
                }),
                Expires = DateTime.UtcNow.AddMinutes(30),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            string userToken = tokenHandler.WriteToken(token);
            return userToken;
        }

      
    }
}
