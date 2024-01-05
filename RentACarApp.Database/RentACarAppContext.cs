using Microsoft.EntityFrameworkCore;
using RentACarApp.Database.Models;
using System.Reflection;

namespace RentACarApp.Database
{
    public class RentACarAppContext : DbContext
    {
        public RentACarAppContext(DbContextOptions<RentACarAppContext> options) : base(options)
        {

        }

        public DbSet<Car> Cars { get;set; }

        public DbSet<User> Users { get;set; }

        public DbSet<Role> Roles { get;set; }

        public DbSet<RentalCar> RentalCars { get;set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            ApplyConfiguration(builder);
        }

        protected void ApplyConfiguration(ModelBuilder builder)
        {
            var typesToRegister = Assembly.GetExecutingAssembly().GetTypes()
                .Where(t => t.GetInterfaces().Any(gi =>
                    gi.IsGenericType
                    && gi.GetGenericTypeDefinition() == typeof(IEntityTypeConfiguration<>)))
                .ToList();

            foreach (var type in typesToRegister)
            {
                dynamic configurationInstance = Activator.CreateInstance(type);
                builder.ApplyConfiguration(configurationInstance);
            }
        }
    }
}
