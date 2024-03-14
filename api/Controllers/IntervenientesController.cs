using api.Data;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IntervenientesController : ControllerBase
    {
        private readonly Contexto _context;

        public IntervenientesController(Contexto context)
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
            [FromQuery(Name = "sort")] string? paramSort,
            [FromQuery(Name = "sortField")] string? paramSortField,
            [FromQuery(Name = "page")] int? paramPage,
            [FromQuery(Name = "perPage")] int? paramPerPage,
            [FromQuery(Name = "dtInicial")] DateTime paramDtIni,
            [FromQuery(Name = "dtFinal")] DateTime paramDtFin

            )
        {
            string sort = string.IsNullOrEmpty(paramSort) == true ? "a" : paramSort;
            string sortField = string.IsNullOrEmpty(paramSortField) == true ? "next" : paramSortField;
            int page = paramPage.GetValueOrDefault(1) == 0 ? 1 : paramPage.GetValueOrDefault(1);
            int perPage = paramPerPage.GetValueOrDefault(1) == 0 ? 10 : paramPerPage.GetValueOrDefault(1);


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

            if (!string.IsNullOrEmpty(sortField))
            {
                switch (sortField)
                {
                    case "DataChegada":
                        query = query.Where(i => i.DataChegada >= paramDtIni && i.DataChegada <= paramDtFin);
                        query = query.OrderBy(i => i.DataChegada);
                        break;
                    case "DataEmbarque":
                        query = query.Where(i => i.DataEmbarque >= paramDtIni && i.DataEmbarque <= paramDtFin);
                        query = query.OrderBy(i => i.DataEmbarque);
                        break;
                    case "PrevisaoDeEmbarque":
                        query = query.Where(i => i.PrevisaoDeEmbarque >= paramDtIni && i.PrevisaoDeEmbarque <= paramDtFin);
                        query = query.OrderBy(i => i.PrevisaoDeEmbarque);
                        break;
                    case "PrevisaoDeChegada":
                        query = query.Where(i => i.PrevisaoDeChegada >= paramDtIni && i.PrevisaoDeChegada <= paramDtFin);
                        query = query.OrderBy(i => i.PrevisaoDeChegada);
                        break;
                    case "LiberadoParaFaturamento":
                        query = query.Where(i => i.LiberadoParaFaturamento >= paramDtIni && i.LiberadoParaFaturamento <= paramDtFin);
                        query = query.OrderBy(i => i.LiberadoParaFaturamento);
                        break;
                }
            }
            else
            {

                if (sort == "a")
                {
                    query = query.OrderBy(i => i.ID);
                }
                else if (sort == "d")
                {
                    query = query.OrderByDescending(i => i.ID);
                }
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
