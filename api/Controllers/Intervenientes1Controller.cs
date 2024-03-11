using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using api.Data;
using api.Models;

namespace api.Controllers
{
    public class Intervenientes1Controller : Controller
    {
        private readonly Contexto _context;

        public Intervenientes1Controller(Contexto context)
        {
            _context = context;
        }

        // GET: Intervenientes1
        public async Task<IActionResult> Index()
        {
            return View(await _context.Intervenientes.ToListAsync());
        }

        // GET: Intervenientes1/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var intervenientes = await _context.Intervenientes
                .FirstOrDefaultAsync(m => m.ID == id);
            if (intervenientes == null)
            {
                return NotFound();
            }

            return View(intervenientes);
        }

        // GET: Intervenientes1/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Intervenientes1/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("ID,Exportador,Importador,DataEmbarque,PrevisaoDeEmbarque,DataChegada,PrevisaoDeChegada,DI,Navio,Master,House,Fatura,FreteModo,Container,CanalParametrizacao,Origem,Destino,LiberadoParaFaturamento")] Intervenientes intervenientes)
        {
            if (ModelState.IsValid)
            {
                _context.Add(intervenientes);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(intervenientes);
        }

        // GET: Intervenientes1/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var intervenientes = await _context.Intervenientes.FindAsync(id);
            if (intervenientes == null)
            {
                return NotFound();
            }
            return View(intervenientes);
        }

        // POST: Intervenientes1/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("ID,Exportador,Importador,DataEmbarque,PrevisaoDeEmbarque,DataChegada,PrevisaoDeChegada,DI,Navio,Master,House,Fatura,FreteModo,Container,CanalParametrizacao,Origem,Destino,LiberadoParaFaturamento")] Intervenientes intervenientes)
        {
            if (id != intervenientes.ID)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(intervenientes);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!IntervenientesExists(intervenientes.ID))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(intervenientes);
        }

        // GET: Intervenientes1/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var intervenientes = await _context.Intervenientes
                .FirstOrDefaultAsync(m => m.ID == id);
            if (intervenientes == null)
            {
                return NotFound();
            }

            return View(intervenientes);
        }

        // POST: Intervenientes1/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var intervenientes = await _context.Intervenientes.FindAsync(id);
            if (intervenientes != null)
            {
                _context.Intervenientes.Remove(intervenientes);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool IntervenientesExists(int id)
        {
            return _context.Intervenientes.Any(e => e.ID == id);
        }
    }
}
