using System.Collections.Generic;
using System.Linq;
using CadastroCliente.Models;
using Microsoft.EntityFrameworkCore;

namespace CadastroCliente.Context
{
    public class AppDbContext : DbContext 
    {
        internal readonly object Cliente;

        public AppDbContext(DbContextOptions<AppDbContext> options) : base (options)
        { }

        public static void Initialize(EmpresaContext context)
        {
            context.Database.EnsureCreated();
        }

        public override int SaveChanges()
        {
            //Soft-Delete
            foreach (var item in ChangeTracker.Entries()
               .Where(e => e.State == EntityState.Deleted &&
               e.Metadata.GetProperties().Any(x => x.Name == "IsDeleted")))
            {
                item.State = EntityState.Unchanged;
                item.CurrentValues["IsDeleted"] = true;
            }
            return base.SaveChanges();
        }
    }

}
