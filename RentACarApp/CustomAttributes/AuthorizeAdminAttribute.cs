using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using RentACarApp.Database;
using System.Security.Claims;

namespace RentACarApp.CustomAttributes
{
    public class AuthorizeAdminAttribute : TypeFilterAttribute 
    {
        public AuthorizeAdminAttribute() : base(typeof(AuthorizeAdminFilter))
        {
                
        }
    }

    public class AuthorizeAdminFilter : IAuthorizationFilter
    {
        private readonly RentACarAppContext contextt;
        public AuthorizeAdminFilter(RentACarAppContext _context)
        {
            contextt = _context;
        }
        public void OnAuthorization(AuthorizationFilterContext context)
        {

            var user = context.HttpContext.User
                .FindFirst(ClaimTypes.Name).Value;

            var userRoleIdCLaim = contextt.Users
                .Where(x => x.UserName == user)
                .FirstOrDefault(x => x.RoleId == 3);

            if (userRoleIdCLaim != null)
            {
                return;
            }
            context.Result = new ForbidResult();
        }
    }
}
