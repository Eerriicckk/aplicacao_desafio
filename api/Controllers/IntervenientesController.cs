using api.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IntervenientesController : ControllerBase
    {
        private readonly IntervenientesRepository _repository;
        public IntervenientesController(IntervenientesRepository repository)
        {
            _repository = repository;
        }

        //[HttpGet] //5282
        [HttpGet("frontend")]
        public IActionResult Frontend()
        {
            return Ok(_repository.All());
        }

        [HttpGet("backend")]
        public IActionResult Backend(
            [FromQuery(Name = "search")] string? paramSearch,
            [FromQuery(Name = "sort")] string? paramSort,
            [FromQuery(Name = "page")] int? paramPage
            )
        {
            string search = string.IsNullOrEmpty(paramSearch) == true ? "" : paramSearch;
            string sort = string.IsNullOrEmpty(paramSort) == true ? "a" : paramSort;
            int page = paramPage.GetValueOrDefault(1) == 0 ? 1 : paramPage.GetValueOrDefault(1);

            return Ok(_repository.Query(search, sort, page));
        }

        [HttpGet("teste")]
        public IEnumerable<string> Teste()
        {
            return new string[] { "value1", "value2" };
        }
    }
}
