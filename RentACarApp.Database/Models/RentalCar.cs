using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace RentACarApp.Database.Models
{
    public class RentalCar
    {
        public int UserId { get; set; }
        public User User { get; set; }

        public int CarId { get; set; }
        public Car Car { get; set; }

    }
    public class RentalCarConfiguration : IEntityTypeConfiguration<RentalCar>
    {
        public void Configure(EntityTypeBuilder<RentalCar> builder)
        {
            builder.HasKey(x => new { x.UserId, x.CarId });
        }
    }
}
