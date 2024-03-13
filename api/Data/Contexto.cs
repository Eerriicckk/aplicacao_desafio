using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class Contexto : DbContext
    {

        public Contexto(DbContextOptions<Contexto> options) 
            : base(options)
        { }

        public DbSet<Intervenientes> Intervenientes { get; set; }
        public DbSet<Users> Users { get; set; }

    }
}
