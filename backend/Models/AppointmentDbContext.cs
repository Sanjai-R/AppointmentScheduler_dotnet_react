using Microsoft.EntityFrameworkCore;

namespace Server.Models
    {
    public class AppointmentDbContext:DbContext
        {
        public AppointmentDbContext(DbContextOptions<AppointmentDbContext> options) : base(options) { }
        public DbSet<UserModel> Users { get; set; }
        public DbSet<AppointmentModel> Appointment{ get; set; }
        }
    }
