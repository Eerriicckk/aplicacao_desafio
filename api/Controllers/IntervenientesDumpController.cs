using api.Data;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IntervenientesDumpController : ControllerBase
    {
        private readonly Contexto _context;

        public IntervenientesDumpController(Contexto context)
        {
            _context = context;
        }

        // POST: api/IntervenientesDump C
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Intervenientes>> PostIntervenientes(Intervenientes intervenientes)
        {
            _context.Intervenientes.Add(intervenientes);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetIntervenientes", new { id = intervenientes.ID }, intervenientes);
        }

        // GET: api/IntervenientesDump R
        [HttpGet("ShowInterv")]

        public async Task<ActionResult<IEnumerable<Intervenientes>>> GetIntervenientes(
            [FromQuery(Name = "search")] string? paramSearch,
            [FromQuery(Name = "sort")] string? paramSort,
            [FromQuery(Name = "pagShift")] string? paramPagShift,
            [FromQuery(Name = "page")] int? paramPage,
            [FromQuery(Name = "perPage")] int? paramPerPage
            //[FromQuery(Name = "lastId")] int? paramLastId,
            //[FromQuery(Name = "firstId")] int? paramFirstId

            )
        {
            string search = string.IsNullOrEmpty(paramSearch) == true ? "" : paramSearch;
            string sort = string.IsNullOrEmpty(paramSort) == true ? "a" : paramSort;
            string pageShift = string.IsNullOrEmpty(paramPagShift) == true ? "next" : paramPagShift;
            int page = paramPage.GetValueOrDefault(1) == 0 ? 1 : paramPage.GetValueOrDefault(1);
            int perPage = paramPerPage.GetValueOrDefault(1) == 0 ? 10 : paramPerPage.GetValueOrDefault(1);
            //int idIni = paramLastId.GetValueOrDefault(1) == 0 ? 0 : paramLastId.GetValueOrDefault(1);
            
            //if (pageShift == "prev")
            //{
            //    idIni = paramFirstId.GetValueOrDefault(1) == 0 ? 0 : paramFirstId.GetValueOrDefault(1);
            //}

            var query = _context.Intervenientes.Select(
                i => new Intervenientes
                {
                    ID = i.ID,
                    Exportador = i.Exportador,
                    Importador = i.Importador,
                    DataEmbarque = i.DataEmbarque,
                    PrevisaoDeEmbarque = i.PrevisaoDeEmbarque,
                    DataChegada = i.DataChegada,
                    PrevisaoDeChegada = i.PrevisaoDeChegada,
                    DI = i.DI,
                    Navio = i.Navio,
                    Master = i.Master,
                    House = i.House,
                    Fatura = i.Fatura,
                    FreteModo = i.FreteModo,
                    Container = i.Container,
                    CanalParametrizacao = i.CanalParametrizacao,
                    Origem = i.Origem,
                    Destino = i.Destino,
                    LiberadoParaFaturamento = i.LiberadoParaFaturamento

                }
                );

            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(i => i.DI.Contains(search));
            }

            //if (pageShift == "prev")
            //{
            //    query = query.Where(i => i.ID < idIni);
            //    if (sort == "a")
            //    {
            //        sort = "d";
            //    }
            //    else if (sort == "d")
            //    {
            //        sort = "a";
            //    }
            //}
            //else if(pageShift == "next")
            //{
            //    query = query.Where(i => i.ID > idIni);
            //}

            if (sort == "a")
            {
                query = query.OrderBy(i => i.ID);
            }
            else if (sort == "d")
            {
                query = query.OrderByDescending(i => i.ID);
            }

            var total = query.Count();
            int last_page = total / perPage;
            last_page = ((float)total / perPage) > last_page ? last_page + 1 : last_page;

            if (page > 0)
            {
                page = page > last_page ? last_page : page;
            }
            else if (page < 0)
            {
                page = 1;
            }

            var queryEnd = query.Skip((page - 1) * perPage).Take(perPage);
            //var queryEnd = query.Take(perPage);

            //if (pageShift == "prev")
            //{
            //    if (sort == "a")
            //    {
            //        queryEnd = queryEnd.OrderByDescending(i => i.ID);
            //    }
            //    else if (sort == "d")
            //    {
            //        queryEnd = queryEnd.OrderBy(i => i.ID);
            //    }
            //}

            var data = await queryEnd.ToListAsync();

            return Ok( new { data, total,last_page, page });
        }

        // PUT: api/IntervenientesDump/5 U
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutIntervenientes(int id, Intervenientes intervenientes)
        {
            if (id != intervenientes.ID)
            {
                return BadRequest();
            }

            _context.Entry(intervenientes).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!IntervenientesExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/IntervenientesDump/5 D
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteIntervenientes(int id, Intervenientes intervCheck)
        {
            if (id != intervCheck.ID)
            {
                return BadRequest();
            }
            var intervenientes = await _context.Intervenientes.FindAsync(id);
            if (intervenientes == null)
            {
                return NotFound();
            }

            _context.Intervenientes.Remove(intervenientes);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool IntervenientesExists(int id)
        {
            return _context.Intervenientes.Any(e => e.ID == id);
        }
    }
}
