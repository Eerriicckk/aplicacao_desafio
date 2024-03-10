using System;
using System.Linq;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class IntervenientesRepository
    {
        private readonly Contexto _context;

        public IntervenientesRepository(Contexto context)
        {
            _context = context;
        }

        public DbSet<Intervenientes> All()
        {
            return _context.Intervenientes;
        }

        public Object Query(string? paramSearch, string? paramSort, int? paramPage)
        {
            var query = (from intervenientes
                         in _context.Intervenientes
                         select intervenientes);


            string search = string.IsNullOrEmpty(paramSearch) == true ? "" : paramSearch;
            string sort = string.IsNullOrEmpty(paramSort) == true ? "a" : paramSort;

            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(i => i.Exportador.Contains(search) || i.Importador.Contains(search));
                Console.WriteLine($"Log Level: {search}");
            }

            if(sort == "a")
            {
                query = query.OrderBy(i => i.ID);
            }
            else if(sort == "d")
            {
                query = query.OrderByDescending(i => i.ID);
            }

            var total = query.Count();
            int perPage = 5;
            int last_page = total / perPage;
            int page = paramPage.GetValueOrDefault(1) == 0 ? 1 : paramPage.GetValueOrDefault(1);
            if(page > 0)
            {
                page = page > last_page ? last_page : page;
            } 
            else if(page < 0)
            {
                page = 1;
            }
       


            return new
            {
                data = query.Skip((page - 1) * perPage).Take(perPage),
                total,
                page,
                last_page = total / perPage
            };
        }
    }
}
